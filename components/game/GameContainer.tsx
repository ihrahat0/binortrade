'use client';

import { useGameEngine } from '@/hooks/useGameEngine';
import LiveChart from './LiveChart';
import ControlPanel from './ControlPanel';
import TopBar from './TopBar';
import SentimentBar from './SentimentBar';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LayoutDashboard } from 'lucide-react';

export default function GameContainer() {
    const {
        phase,
        timeLeft,
        currentPrice,
        startPrice,
        balance,
        portfolio,
        history,
        marketHistory,
        lastResult,
        simulatedBets,
        placeBet,
        cashOut,
        startTime,
        lastRoundStats,
        startSimulation
    } = useGameEngine();

    return (
        <div className="h-full w-full flex items-center justify-center p-2 md:p-4 font-sans select-none">

            {/* Game Frame - Responsive Box with Glassmorphism */}
            <div className="w-full h-screen md:h-auto md:max-w-[1200px] md:aspect-[16/10] glass md:rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_80px_rgba(34,211,238,0.1)] flex flex-col border-0 md:border-2 md:border-slate-700/50 relative glow-effect">


                {/* Header / Top Bar */}
                <TopBar balance={balance} />

                {/* Sentiment Bar */}
                <div className="bg-[#020617] px-2 md:px-4 pt-2 pb-1">
                    <SentimentBar phase={phase} />
                </div>

                {/* Main Game Area (Chart) */}
                <div className="flex-[3] flex overflow-hidden relative min-h-0">

                    {/* Chart Section */}
                    <div className="flex-1 flex flex-col relative bg-[#020617]">
                        <LiveChart currentPrice={currentPrice} startPrice={startPrice} phase={phase} timeLeft={timeLeft} startTime={startTime} />

                        {/* Result Overlay */}
                        <AnimatePresence>
                            {phase === 'RESULT' && lastRoundStats && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                    className="absolute inset-0 flex items-center justify-center z-30 bg-black/60 backdrop-blur-sm"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`
                                            text-5xl md:text-7xl font-black tracking-tighter drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]
                                            ${lastRoundStats.result === 'WIN' ? 'text-green-400' : 'text-red-500'}
                                        `}>
                                            {lastRoundStats.result === 'WIN' ? 'PROFIT' : 'LOSS'}
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <div className={`text-3xl md:text-5xl font-bold ${lastRoundStats.result === 'WIN' ? 'text-green-300' : 'text-red-300'}`}>
                                                {lastRoundStats.result === 'WIN' ? '+' : '-'}${Math.abs(lastRoundStats.profitLoss).toFixed(2)}
                                            </div>
                                            <div className="text-xl md:text-2xl font-medium text-white/80 mt-1">
                                                {lastRoundStats.percentChange.toFixed(2)}%
                                            </div>
                                        </div>

                                        {lastRoundStats.result === 'WIN' && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.2, type: "spring" }}
                                                className="mt-4 px-6 py-2 bg-green-500/20 border border-green-500/50 rounded-full"
                                            >
                                                <span className="text-green-400 font-bold tracking-widest text-sm">TRADE WON</span>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* History Bar */}
                <div className="h-10 md:h-12 bg-[#1e293b] border-t border-b border-slate-800 flex items-center px-2 md:px-4 gap-1 md:gap-2 overflow-hidden relative">
                    {/* Label */}
                    <div className="text-[9px] md:text-[10px] font-bold text-slate-500 mr-1 md:mr-2 uppercase tracking-wider hidden sm:block">History</div>

                    {/* History Items */}
                    <div className="flex gap-1 overflow-x-auto no-scrollbar mask-linear-fade">
                        {marketHistory.length === 0 && (
                            <div className="text-[9px] md:text-[10px] text-slate-600 italic">No history yet</div>
                        )}
                        {marketHistory.map((item, i) => (
                            <div
                                key={i}
                                className={`
                                    h-5 w-8 md:h-6 md:w-10 rounded-md border flex items-center justify-center text-[8px] md:text-[9px] font-bold shadow-sm shrink-0
                                    ${item.outcome === 'UP'
                                        ? 'border-green-500/50 bg-green-500/10 text-green-400 shadow-[0_0_5px_rgba(34,197,94,0.2)]'
                                        : 'border-red-500/50 bg-red-500/10 text-red-400 shadow-[0_0_5px_rgba(239,68,68,0.2)]'}
                                `}
                            >
                                {item.percentChange.toFixed(0)}%
                            </div>
                        ))}
                    </div>
                </div>

                {/* Control Panel */}
                <div className="h-1/3 border-t border-slate-800 bg-[#0a0f1e]">
                    <ControlPanel
                        onBet={placeBet}
                        onCashOut={cashOut}
                        phase={phase}
                        balance={balance}
                        portfolio={portfolio}
                        currentPrice={currentPrice}
                        startPrice={startPrice}
                    />
                </div>
            </div>
        </div>
    );
}
