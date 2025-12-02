'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { BetDirection } from '@/hooks/useGameEngine';

interface SimulatedBet {
    id: string;
    user: string;
    amount: number;
    direction: BetDirection;
}

interface SidebarProps {
    bets: SimulatedBet[];
}

export default function Sidebar({ bets }: SidebarProps) {
    return (
        <div className="w-64 bg-[#0f172a] border-l border-slate-800 flex flex-col">
            <div className="p-4 border-b border-slate-800">
                <h2 className="text-slate-400 text-xs font-bold tracking-widest uppercase">Live Bets</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                <AnimatePresence initial={false}>
                    {bets.map((bet) => (
                        <motion.div
                            key={bet.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-between bg-slate-800/50 p-2 rounded border border-slate-700/50"
                        >
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${bet.direction === 'UP' ? 'bg-green-500' : 'bg-red-500'}`} />
                                <span className="text-slate-300 text-sm font-medium">{bet.user}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400 text-xs">${bet.amount}</span>
                                <span className={`text-xs font-bold ${bet.direction === 'UP' ? 'text-green-500' : 'text-red-500'}`}>
                                    {bet.direction}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {bets.length === 0 && (
                    <div className="text-center text-slate-600 text-xs py-10">
                        Waiting for bets...
                    </div>
                )}
            </div>
        </div>
    );
}
