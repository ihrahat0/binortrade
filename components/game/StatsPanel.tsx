'use client';

import { BetDirection } from '@/hooks/useGameEngine';
import { Wallet, History } from 'lucide-react';

interface StatsPanelProps {
    balance: number;
    history: { result: 'WIN' | 'LOSS'; direction: BetDirection }[];
}

export default function StatsPanel({ balance, history }: StatsPanelProps) {
    return (
        <div className="flex flex-col gap-4">
            {/* Balance Card */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                    <Wallet className="text-yellow-500 w-5 h-5" />
                    <span className="text-slate-400 font-medium">Demo Balance</span>
                </div>
                <div className="text-3xl font-bold text-white">
                    ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
            </div>

            {/* History Card */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <History className="text-blue-500 w-5 h-5" />
                    <span className="text-slate-400 font-medium">Recent Results</span>
                </div>

                <div className="space-y-2">
                    {history.length === 0 && (
                        <div className="text-slate-500 text-sm text-center py-4">No trades yet</div>
                    )}
                    {[...history].reverse().map((item, i) => (
                        <div key={i} className="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold px-2 py-1 rounded ${item.direction === 'UP' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {item.direction}
                                </span>
                            </div>
                            <span className={`font-bold ${item.result === 'WIN' ? 'text-green-500' : 'text-slate-500'}`}>
                                {item.result}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
