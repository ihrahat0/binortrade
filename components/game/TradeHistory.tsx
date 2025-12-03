'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Trade {
    id: number;
    type: 'WIN' | 'LOSS';
    amount: number;
    profit: number;
    date: string;
    percentage: number;
}

interface TradeHistoryProps {
    trades: Trade[];
}

export default function TradeHistory({ trades }: TradeHistoryProps) {
    return (
        <div className="space-y-2">
            {trades.map((trade) => (
                <motion.div
                    key={trade.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                        bg-white/5 border rounded-lg p-4 flex items-center justify-between
                        ${trade.type === 'WIN' ? 'border-emerald-500/20' : 'border-red-500/20'}
                    `}
                >
                    <div className="flex items-center gap-4">
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${trade.type === 'WIN' ? 'bg-emerald-500/10' : 'bg-red-500/10'}
                        `}>
                            {trade.type === 'WIN' ? (
                                <TrendingUp className="w-5 h-5 text-emerald-400" />
                            ) : (
                                <TrendingDown className="w-5 h-5 text-red-400" />
                            )}
                        </div>
                        <div>
                            <p className="text-white font-semibold">{trade.type === 'WIN' ? 'Win' : 'Loss'}</p>
                            <p className="text-xs text-slate-400">{trade.date}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={`font-bold font-mono ${trade.type === 'WIN' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {trade.profit > 0 ? '+' : ''}${trade.profit.toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-400">
                            Bet: ${trade.amount} • {trade.percentage > 0 ? '+' : ''}{trade.percentage.toFixed(1)}%
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
