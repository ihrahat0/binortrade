import React from 'react';

interface SentimentBarProps {
    phase: 'BETTING' | 'TRADING' | 'RESULT';
}

export default function SentimentBar({ phase }: SentimentBarProps) {
    return (
        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden flex">
            <div className="h-full bg-emerald-500 w-[60%] opacity-50"></div>
            <div className="h-full bg-rose-500 w-[40%] opacity-50"></div>
        </div>
    );
}
