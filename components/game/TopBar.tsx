import React from 'react';

interface TopBarProps {
    balance: number;
}

export default function TopBar({ balance }: TopBarProps) {
    return (
        <div className="h-14 bg-[#0f172a] border-b border-slate-800 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                    <span className="text-emerald-400 font-bold text-xs">ET</span>
                </div>
                <div className="hidden md:flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Balance</span>
                    <span className="text-white font-mono font-bold">${balance.toFixed(2)}</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-slate-800 rounded text-xs text-slate-400 font-medium">
                    Demo Account
                </div>
            </div>
        </div>
    );
}
