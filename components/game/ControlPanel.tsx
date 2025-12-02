import React, { useState } from 'react';
import { type BetDirection } from '@/hooks/useGameEngine';

interface ControlPanelProps {
    onBet: (amount: number, direction: BetDirection) => void;
    onCashOut: () => void;
    phase: 'BETTING' | 'TRADING' | 'RESULT';
    balance: number;
    portfolio: any;
    currentPrice?: number;
    startPrice?: number;
}

const QUICK_AMOUNTS = [1, 2, 5, 10, 50, 100];

export default function ControlPanel({ onBet, onCashOut, phase, balance, portfolio, currentPrice = 0, startPrice = 0 }: ControlPanelProps) {
    const [amount, setAmount] = useState(10);

    const handleQuickAmount = (value: number) => {
        setAmount(value);
    };

    const handleMaxAmount = () => {
        setAmount(Math.floor(balance));
    };

    // Calculate potential payout
    const potentialPayout = amount * 2;

    // Calculate current profit/loss
    const calculateProfitLoss = () => {
        if (!portfolio || !currentPrice || !startPrice) return { amount: 0, percentage: 0 };

        const priceChange = currentPrice - startPrice;
        const percentChange = (priceChange / startPrice) * 100;

        let profitLoss = 0;
        if (portfolio.direction === 'UP') {
            profitLoss = (percentChange / 100) * portfolio.invested;
        } else {
            profitLoss = (-percentChange / 100) * portfolio.invested;
        }

        return {
            amount: profitLoss,
            percentage: portfolio.direction === 'UP' ? percentChange : -percentChange
        };
    };

    const profitLoss = calculateProfitLoss();
    const currentValue = portfolio ? portfolio.invested + profitLoss.amount : 0;
    const isProfit = profitLoss.amount >= 0;

    return (
        <div className="p-2 md:p-4 flex flex-col gap-2 md:gap-3 h-full">
            {/* Quick Pick Amounts */}
            <div className="grid grid-cols-4 gap-1 md:gap-2">
                {QUICK_AMOUNTS.map((value) => (
                    <button
                        key={value}
                        onClick={() => handleQuickAmount(value)}
                        className={`py-1 md:py-1.5 px-1.5 md:px-2 rounded text-[10px] md:text-xs font-bold font-mono transition-all ${amount === value
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                    >
                        ${value}
                    </button>
                ))}
                <button
                    onClick={handleMaxAmount}
                    className={`py-1 md:py-1.5 px-1.5 md:px-2 rounded text-[10px] md:text-xs font-bold font-mono transition-all ${amount === Math.floor(balance)
                        ? 'bg-yellow-600 text-white'
                        : 'bg-yellow-700 text-white hover:bg-yellow-600'
                        }`}
                >
                    MAX
                </button>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="col-span-3 bg-slate-900 text-white font-mono font-bold px-2 md:px-3 py-1 md:py-1.5 rounded border border-slate-700 focus:outline-none focus:border-emerald-500 text-xs md:text-sm"
                    placeholder="Custom"
                />
            </div>

            {/* Potential Payout Display - Only show when no active trade */}
            {/* {!portfolio && (
                <div className="text-center py-1 bg-slate-900/50 rounded border border-slate-800">
                    <div className="text-[10px] md:text-xs text-slate-500 font-mono">POTENTIAL WIN</div>
                    <div className="text-sm md:text-lg font-bold text-emerald-400 font-mono">${potentialPayout.toFixed(2)}</div>
                </div>
            )} */}

            {/* BUY/SELL Actions */}
            <div className="grid grid-cols-2 gap-2 md:gap-3 relative">
                {/* BUY Button */}
                <div className="relative mt-2">
                    {/* Balance Display Above Active Button */}
                    {portfolio && portfolio.direction === 'UP' && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                            <div className="bg-slate-900 border border-emerald-500/50 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-emerald-500/20 flex items-center gap-1 whitespace-nowrap">
                                <span className="text-slate-500">TRADED</span>
                                ${portfolio.invested.toFixed(2)}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => onBet(amount, 'UP')}
                        className={`
                            w-full font-bold rounded-lg flex items-center justify-center transition-all relative
                            py-3 md:py-4 text-xs md:text-base
                            ${phase === 'TRADING' ? 'cursor-not-allowed' : ''}
                            ${portfolio && portfolio.direction === 'UP'
                                ? 'bg-emerald-600 text-white animate-glow-border ring-2 ring-emerald-400/20 ring-offset-2 ring-offset-[#0a0f1e]'
                                : portfolio && portfolio.direction === 'DOWN'
                                    ? 'bg-emerald-600/20 text-white/30 grayscale'
                                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                            }
                        `}
                        disabled={phase === 'TRADING'}
                    >
                        <span>📈 BUY</span>
                    </button>
                </div>

                {/* SELL Button */}
                <div className="relative mt-2">
                    {/* Balance Display Above Active Button */}
                    {portfolio && portfolio.direction === 'DOWN' && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                            <div className="bg-slate-900 border border-rose-500/50 text-rose-400 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-rose-500/20 flex items-center gap-1 whitespace-nowrap">
                                <span className="text-slate-500">TRADED</span>
                                ${portfolio.invested.toFixed(2)}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => onBet(amount, 'DOWN')}
                        className={`
                            w-full font-bold rounded-lg flex items-center justify-center transition-all relative
                            py-3 md:py-4 text-xs md:text-base
                            ${phase === 'TRADING' ? 'cursor-not-allowed' : ''}
                            ${portfolio && portfolio.direction === 'DOWN'
                                ? 'bg-rose-600 text-white animate-glow-border-red ring-2 ring-rose-400/20 ring-offset-2 ring-offset-[#0a0f1e]'
                                : portfolio && portfolio.direction === 'UP'
                                    ? 'bg-rose-600/20 text-white/30 grayscale'
                                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20'
                            }
                        `}
                        disabled={phase === 'TRADING'}
                    >
                        <span>📉 SELL</span>
                    </button>
                </div>
            </div>

            {/* Cash Out with Profit/Loss */}
            {portfolio && phase === 'TRADING' && (
                <button
                    onClick={onCashOut}
                    className={`w-full font-bold py-1.5 md:py-2 rounded-lg text-[10px] md:text-xs transition-all ${isProfit
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-white'
                        : 'bg-rose-500 hover:bg-rose-400 text-white'
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <span>BOOK PROFIT</span>
                        <span className="font-mono">
                            ${currentValue.toFixed(2)}
                        </span>
                        <span className={`text-[9px] ${isProfit ? 'text-emerald-200' : 'text-rose-200'}`}>
                            ({isProfit ? '+' : ''}{profitLoss.amount.toFixed(2)} / {profitLoss.percentage.toFixed(2)}%)
                        </span>
                    </div>
                </button>
            )}
        </div>
    );
}
