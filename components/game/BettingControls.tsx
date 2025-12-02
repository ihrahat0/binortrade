'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, DollarSign } from 'lucide-react';
import { clsx } from 'clsx';
import { BetDirection } from '@/hooks/useGameEngine';

interface BettingControlsProps {
    onBet: (amount: number, direction: BetDirection) => void;
    phase: 'BETTING' | 'TRADING' | 'RESULT';
    balance: number;
    currentBet: { amount: number; direction: BetDirection } | null;
}

export default function BettingControls({ onBet, phase, balance, currentBet }: BettingControlsProps) {
    const isBettingOpen = phase === 'BETTING';
    const [amount, setAmount] = useState(100);

    const betAmounts = [10, 50, 100, 500, 1000];

    return (
        <div className="grid grid-cols-2 gap-4 mt-6">
            <button
                disabled={!isBettingOpen || !!currentBet || balance < amount}
                onClick={() => onBet(amount, 'UP')}
                className={clsx(
                    "h-32 rounded-2xl flex flex-col items-center justify-center transition-all transform hover:scale-[1.02] active:scale-95",
                    "bg-gradient-to-br from-green-500/20 to-green-900/20 border-2 border-green-500/50",
                    (!isBettingOpen || balance < amount) && "opacity-50 cursor-not-allowed grayscale",
                    currentBet?.direction === 'UP' && "ring-4 ring-green-500 ring-offset-2 ring-offset-slate-900"
                )}
            >
                <ArrowUp className="w-12 h-12 text-green-500 mb-2" />
                <span className="text-2xl font-bold text-green-400">CALL (UP)</span>
                <span className="text-sm text-green-300/60">Dynamic Return %</span>
            </button>

            <button
                disabled={!isBettingOpen || !!currentBet || balance < amount}
                onClick={() => onBet(amount, 'DOWN')}
                className={clsx(
                    "h-32 rounded-2xl flex flex-col items-center justify-center transition-all transform hover:scale-[1.02] active:scale-95",
                    "bg-gradient-to-br from-red-500/20 to-red-900/20 border-2 border-red-500/50",
                    (!isBettingOpen || balance < amount) && "opacity-50 cursor-not-allowed grayscale",
                    currentBet?.direction === 'DOWN' && "ring-4 ring-red-500 ring-offset-2 ring-offset-slate-900"
                )}
            >
                <ArrowDown className="w-12 h-12 text-red-500 mb-2" />
                <span className="text-2xl font-bold text-red-400">PUT (DOWN)</span>
                <span className="text-sm text-red-300/60">Dynamic Return %</span>
            </button>

            <div className="col-span-2 flex flex-col items-center mt-4 gap-3">
                <div className="text-slate-400 text-sm uppercase tracking-widest font-bold">Select Amount</div>
                <div className="flex gap-2 bg-slate-800/50 p-2 rounded-xl border border-slate-700">
                    {betAmounts.map((val) => (
                        <button
                            key={val}
                            onClick={() => setAmount(val)}
                            disabled={!isBettingOpen || !!currentBet}
                            className={clsx(
                                "px-4 py-2 rounded-lg font-bold text-sm transition-all",
                                amount === val
                                    ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                                    : "bg-slate-700 text-slate-300 hover:bg-slate-600",
                                (!isBettingOpen || !!currentBet) && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            ${val}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
