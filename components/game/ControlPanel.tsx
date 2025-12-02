import React, { useState } from 'react';
import { type BetDirection } from '@/hooks/useGameEngine';

interface ControlPanelProps {
    onBet: (amount: number, direction: BetDirection) => void;
    onCashOut: () => void;
    phase: 'BETTING' | 'TRADING' | 'RESULT';
    balance: number;
    portfolio: any;
}

const QUICK_AMOUNTS = [1, 2, 5, 10, 50, 100];

export default function ControlPanel({ onBet, onCashOut, phase, balance, portfolio }: ControlPanelProps) {
    const [amount, setAmount] = useState(10);

    const handleQuickAmount = (value: number) => {
        setAmount(value);
    };

    const handleMaxAmount = () => {
        setAmount(Math.floor(balance));
    };

    // Calculate potential payout
    const potentialPayout = amount * 2;

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

            {/* Potential Payout Display */}
            <div className="text-center py-1 bg-slate-900/50 rounded border border-slate-800">
                <div className="text-[10px] md:text-xs text-slate-500 font-mono">POTENTIAL WIN</div>
                <div className="text-sm md:text-lg font-bold text-emerald-400 font-mono">${potentialPayout.toFixed(2)}</div>
            </div>

            {/* BUY/SELL Actions */}
            <div className="grid grid-cols-2 gap-2 md:gap-3">
                <button
                    onClick={() => onBet(amount, 'UP')}
                    className={`
                        bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center justify-center transition-all
                        py-2 md:py-3 text-xs md:text-base
                        ${phase === 'TRADING' ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={phase === 'TRADING'}
                >
                    <span>📈 BUY</span>
                </button>
                <button
                    onClick={() => onBet(amount, 'DOWN')}
                    className={`
                        bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg flex items-center justify-center transition-all
                        py-2 md:py-3 text-xs md:text-base
                        ${phase === 'TRADING' ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    disabled={phase === 'TRADING'}
                >
                    <span>📉 SELL</span>
                </button>
            </div>

            {/* Cash Out (if applicable) */}
            {portfolio && (
                <button
                    onClick={onCashOut}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-1.5 md:py-2 rounded-lg text-[10px] md:text-xs"
                >
                    CASH OUT (${portfolio.currentValue.toFixed(2)})
                </button>
            )}
        </div>
    );
}
