import { useState, useEffect, useRef } from 'react';

export type GamePhase = 'BETTING' | 'TRADING' | 'RESULT';

export type BetDirection = 'UP' | 'DOWN';

interface SimulatedBet {
  id: string;
  user: string;
  amount: number;
  direction: BetDirection;
}

interface Portfolio {
  invested: number;
  currentValue: number;
  direction: BetDirection;
}

interface MarketResult {
  outcome: 'UP' | 'DOWN';
  percentChange: number;
}

interface GameState {
  phase: GamePhase;
  timeLeft: number;
  currentPrice: number;
  startPrice: number;
  startTime: number;
  history: { result: 'WIN' | 'LOSS'; direction: BetDirection }[];
  balance: number;
  portfolio: Portfolio | null;
  lastResult: 'WIN' | 'LOSS' | null;
  simulatedBets: SimulatedBet[];
  marketHistory: MarketResult[];
}

const INITIAL_PRICE = 1000;
const TRADING_DURATION = 10; // seconds
const BETTING_DURATION = 5; // seconds

export const useGameEngine = () => {
  const [isSimulation, setIsSimulation] = useState(false);
  const [phase, setPhase] = useState<GamePhase>('BETTING');
  const [timeLeft, setTimeLeft] = useState(BETTING_DURATION);
  const [currentPrice, setCurrentPrice] = useState(INITIAL_PRICE);
  const [startPrice, setStartPrice] = useState(INITIAL_PRICE);
  const [startTime, setStartTime] = useState(Date.now());
  const [balance, setBalance] = useState(1000);

  // Portfolio State replaces currentBet and winnings
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);

  const [history, setHistory] = useState<{ result: 'WIN' | 'LOSS'; direction: BetDirection }[]>([]);
  const [lastResult, setLastResult] = useState<'WIN' | 'LOSS' | null>(null);
  const [simulatedBets, setSimulatedBets] = useState<SimulatedBet[]>([]);
  const [marketHistory, setMarketHistory] = useState<MarketResult[]>([]);

  // Refs to access latest state inside intervals/effects without triggering re-runs
  const currentPriceRef = useRef(currentPrice);
  const startPriceRef = useRef(startPrice);
  const portfolioRef = useRef(portfolio);

  // Momentum ref for smooth movement
  const momentumRef = useRef(0);

  // Audio refs
  const betSoundRef = useRef<HTMLAudioElement | null>(null);
  const chartSoundRef = useRef<HTMLAudioElement | null>(null);
  const timerSoundRef = useRef<HTMLAudioElement | null>(null);
  const wonSoundRef = useRef<HTMLAudioElement | null>(null);
  const bookProfitSoundRef = useRef<HTMLAudioElement | null>(null);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // Last Round Stats for UI
  const [lastRoundStats, setLastRoundStats] = useState<{
    result: 'WIN' | 'LOSS';
    profitLoss: number;
    percentChange: number;
  } | null>(null);

  useEffect(() => {
    // Initialize sounds with error handling
    try {
      betSoundRef.current = new Audio('/assets/sounds/bet.mp3');
      chartSoundRef.current = new Audio('/assets/sounds/chartgoes.mp3');
      timerSoundRef.current = new Audio('/assets/sounds/timer.wav');
      wonSoundRef.current = new Audio('/assets/sounds/won.webm');
      bookProfitSoundRef.current = new Audio('/assets/sounds/bookprofit.webm');
      chartSoundRef.current.loop = true;

      // Preload
      betSoundRef.current.load();
      chartSoundRef.current.load();
      timerSoundRef.current.load();
      wonSoundRef.current.load();
      bookProfitSoundRef.current.load();
    } catch (e) {
      console.error("Audio init failed", e);
    }

    // Unlock audio context on first user interaction
    const unlockAudio = () => {
      if (audioUnlocked) return;

      const playPromise = chartSoundRef.current?.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Audio is unlocked!
          chartSoundRef.current?.pause();
          chartSoundRef.current!.currentTime = 0;
          setAudioUnlocked(true);

          // Remove listeners once unlocked
          document.removeEventListener('click', unlockAudio);
          document.removeEventListener('keydown', unlockAudio);
          document.removeEventListener('touchstart', unlockAudio);
        }).catch(error => {
          console.log("Audio unlock failed (browser blocked):", error);
        });
      }
    };

    document.addEventListener('click', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);

    return () => {
      if (chartSoundRef.current) {
        chartSoundRef.current.pause();
        chartSoundRef.current.currentTime = 0;
      }
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
  }, [audioUnlocked]);

  useEffect(() => {
    currentPriceRef.current = currentPrice;
  }, [currentPrice]);

  useEffect(() => {
    startPriceRef.current = startPrice;
  }, [startPrice]);

  useEffect(() => {
    portfolioRef.current = portfolio;
  }, [portfolio]);

  // --- Effect 1: Timer & Phase Management ---
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (phase === 'BETTING') {
      // Clear portfolio at start of new betting phase
      setPortfolio(null);
      setIsSimulation(false); // Reset simulation flag

      // Stop chart sound if playing
      if (chartSoundRef.current) {
        chartSoundRef.current.pause();
        chartSoundRef.current.currentTime = 0;
      }

      // Play timer sound
      if (timerSoundRef.current && audioUnlocked) {
        timerSoundRef.current.currentTime = 0;
        timerSoundRef.current.play().catch(e => console.log("Timer sound play failed", e));
      }

      // Clear simulated bets at start of betting phase
      setSimulatedBets([]);

      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Stop timer sound
            if (timerSoundRef.current) {
              timerSoundRef.current.pause();
              timerSoundRef.current.currentTime = 0;
            }

            setPhase('TRADING');
            setStartPrice(currentPriceRef.current);
            setStartTime(Date.now());

            // Start chart sound - FORCE PLAY
            if (chartSoundRef.current) {
              const playPromise = chartSoundRef.current.play();
              if (playPromise !== undefined) {
                playPromise.catch(e => {
                  console.log("Auto-play failed. Waiting for interaction.", e);
                });
              }
            }

            return TRADING_DURATION;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (phase === 'TRADING') {
      // Ensure sound is playing if we are in trading phase
      if (chartSoundRef.current && chartSoundRef.current.paused && audioUnlocked) {
        chartSoundRef.current.play().catch(e => console.log("Resume play failed", e));
      }

      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setPhase('RESULT');
            // Stop chart sound
            if (chartSoundRef.current) {
              chartSoundRef.current.pause();
              chartSoundRef.current.currentTime = 0;
            }
            return 3; // Result duration
          }
          return prev - 1;
        });
      }, 1000);
    } else if (phase === 'RESULT') {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setPhase('BETTING');
            setLastResult(null);
            return BETTING_DURATION;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [phase, audioUnlocked]);

  // --- Effect 2: Price Simulation (Only during TRADING) ---
  useEffect(() => {
    if (phase !== 'TRADING') return;

    const priceInterval = setInterval(() => {
      setCurrentPrice((prev) => {
        if (isSimulation) {
          // FORCE WIN LOGIC
          // Always move up if direction is UP, down if DOWN (but user only clicks Buy/UP in this scenario usually)
          // Let's assume UP for the "Buy" button demo

          // Smooth exponential-ish growth for excitement
          const timeElapsed = (Date.now() - startTime) / 1000; // seconds
          const progress = timeElapsed / TRADING_DURATION;

          // Base upward trend + some noise that is mostly positive
          // Reduced speed by ~10x as requested
          const trend = 0.5 + (progress * 1.5);
          const noise = (Math.random() * 2) - 0.5;

          let change = trend + noise;

          return prev + change;
        }

        // Momentum-based smoothing
        const noise = (Math.random() - 0.5) * 15;
        momentumRef.current = momentumRef.current * 0.95 + noise;

        if (momentumRef.current > 20) momentumRef.current = 20;
        if (momentumRef.current < -20) momentumRef.current = -20;

        let newPrice = prev + momentumRef.current;

        const start = startPriceRef.current;
        const maxDiff = start * 0.9; // Max 90% change

        if (newPrice > start + maxDiff) {
          newPrice = start + maxDiff;
          momentumRef.current *= -0.5; // Bounce back
        }
        if (newPrice < start - maxDiff) {
          newPrice = start - maxDiff;
          momentumRef.current *= -0.5; // Bounce back
        }

        // Prevent negative price
        if (newPrice < 1) newPrice = 1;

        return newPrice;
      });
    }, 50);

    return () => clearInterval(priceInterval);
  }, [phase, isSimulation, startTime]);

  // --- Effect 3: Update Portfolio Value in Real-time ---
  useEffect(() => {
    if (phase !== 'TRADING' || !portfolio) return;

    const start = startPriceRef.current;
    const percentChange = (currentPrice - start) / start;

    let multiplier = 1;
    if (portfolio.direction === 'UP') {
      multiplier = 1 + percentChange;
    } else {
      multiplier = 1 - percentChange;
    }

    // Ensure value doesn't go below 0
    let newValue = portfolio.invested * multiplier;
    if (newValue < 0) newValue = 0;

    setPortfolio(prev => {
      if (!prev) return null;
      return { ...prev, currentValue: newValue };
    });

  }, [currentPrice, phase]);

  // --- Effect 4: Simulated Bets Generation (During BETTING phase) ---
  useEffect(() => {
    if (phase !== 'BETTING') return;

    const betInterval = setInterval(() => {
      // 30% chance to add a bet every 200ms
      if (Math.random() > 0.7) {
        const users = ['Alex', 'Sarah', 'Mike', 'Emma', 'John', 'Kate', 'David', 'Lisa'];
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const randomAmount = Math.floor(Math.random() * 500) + 10; // 10-500
        const randomDirection: BetDirection = Math.random() > 0.5 ? 'UP' : 'DOWN';

        const newBet: SimulatedBet = {
          id: Math.random().toString(36).substr(2, 9),
          user: randomUser,
          amount: randomAmount,
          direction: randomDirection
        };

        setSimulatedBets(prev => [newBet, ...prev].slice(0, 20)); // Keep last 20
      }
    }, 200);

    return () => clearInterval(betInterval);
  }, [phase]);

  // --- Effect 3: Result Calculation (Triggered when entering RESULT phase) ---
  useEffect(() => {
    if (phase === 'RESULT') {
      const finalPrice = currentPriceRef.current;
      const start = startPriceRef.current;
      const currentPortfolio = portfolioRef.current;

      // Calculate Market Result
      const priceDiff = finalPrice - start;
      const percentChange = Math.abs(priceDiff / start) * 100; // Store as percentage (0-100)
      const outcome: 'UP' | 'DOWN' = priceDiff >= 0 ? 'UP' : 'DOWN';

      // Update Market History
      setMarketHistory(prev => [...prev, { outcome, percentChange }].slice(-20)); // Keep last 20

      let result: 'WIN' | 'LOSS' | null = null;
      let profitLoss = 0;

      // Determine User Result (if portfolio exists)
      if (currentPortfolio) {
        const isWin =
          (currentPortfolio.direction === 'UP' && outcome === 'UP') ||
          (currentPortfolio.direction === 'DOWN' && outcome === 'DOWN');

        result = isWin ? 'WIN' : 'LOSS';

        // Update Portfolio Value
        let newPortfolioValue = currentPortfolio.currentValue;
        // Use the decimal percentChange for calculation
        const decimalChange = percentChange / 100;
        const changeAmount = currentPortfolio.invested * decimalChange;

        if (isWin) {
          newPortfolioValue += changeAmount;
          profitLoss = changeAmount;
          // Play Win Sound
          if (wonSoundRef.current && audioUnlocked) {
            wonSoundRef.current.currentTime = 0;
            wonSoundRef.current.play().catch(e => console.log("Won sound play failed", e));
          }
        } else {
          newPortfolioValue -= changeAmount;
          profitLoss = -changeAmount;
        }

        if (newPortfolioValue < 0) newPortfolioValue = 0;

        // Auto-cashout: Add portfolio value to balance and clear portfolio
        // Play book profit sound if there's a profit
        if (newPortfolioValue > 0) {
          setTimeout(() => {
            setBalance((prev) => prev + newPortfolioValue);
            if (bookProfitSoundRef.current && audioUnlocked) {
              bookProfitSoundRef.current.currentTime = 0;
              bookProfitSoundRef.current.play().catch(e => console.log("Book profit sound play failed", e));
            }
          }, 1500); // Delay to show result first
        }

        setPortfolio({
          ...currentPortfolio,
          currentValue: newPortfolioValue,
          invested: newPortfolioValue
        });

        setHistory((prev) => [...prev, { result: result as 'WIN' | 'LOSS', direction: currentPortfolio.direction }].slice(-10));

        setLastRoundStats({
          result,
          profitLoss,
          percentChange
        });
      } else {
        setLastRoundStats(null);
      }

      setLastResult(result);
    }
  }, [phase, audioUnlocked]);

  const placeBet = (amount: number, direction: BetDirection) => {
    if (phase === 'BETTING' && balance >= amount) {
      setBalance((prev) => prev - amount); // Deduct immediately

      setPortfolio((prev) => {
        if (!prev) {
          // New Bet
          return {
            invested: amount,
            currentValue: amount,
            direction
          };
        } else {
          // Adding to existing bet
          // If direction is different, switch direction but keep accumulated value
          // If direction is same, just add amount
          return {
            invested: prev.invested + amount,
            currentValue: prev.currentValue + amount,
            direction: direction // Always take the new direction (switching logic)
          };
        }
      });

      // Play bet sound
      if (betSoundRef.current) {
        betSoundRef.current.currentTime = 0;
        betSoundRef.current.play().catch(e => console.log("Audio play failed", e));
      }
    }
  };

  const cashOut = () => {
    // Prevent cashing out during trading phase
    if (phase === 'TRADING') return;

    if (portfolio && portfolio.currentValue > 0) {
      setBalance((prev) => prev + portfolio.currentValue);
      setPortfolio(null);

      // Play book profit sound
      if (bookProfitSoundRef.current && audioUnlocked) {
        bookProfitSoundRef.current.currentTime = 0;
        bookProfitSoundRef.current.play().catch(e => console.log("Book profit sound play failed", e));
      }
    }
  };

  const startSimulation = (amount: number, direction: BetDirection) => {
    // Force start the round immediately
    if (balance >= amount) {
      setBalance((prev) => prev - amount);
      setPortfolio({
        invested: amount,
        currentValue: amount,
        direction
      });

      setIsSimulation(true);
      setPhase('TRADING');
      setStartPrice(currentPrice); // Lock start price
      setStartTime(Date.now());
      setTimeLeft(10); // 10 second timer

      // Play sounds
      if (betSoundRef.current) {
        betSoundRef.current.currentTime = 0;
        betSoundRef.current.play().catch(e => { });
      }
      if (chartSoundRef.current) {
        chartSoundRef.current.currentTime = 0;
        chartSoundRef.current.play().catch(e => { });
      }
    }
  };

  return {
    phase,
    timeLeft,
    currentPrice,
    startPrice,
    startTime,
    balance,
    portfolio,
    history,
    marketHistory,
    lastRoundStats,
    lastResult,
    simulatedBets,
    placeBet,
    cashOut,
    startSimulation
  };
};
