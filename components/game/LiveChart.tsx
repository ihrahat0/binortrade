'use client';

import { useEffect, useState } from 'react';
import { AreaChart, Area, Line, YAxis, XAxis, ResponsiveContainer, ReferenceLine, CartesianGrid } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { type BetDirection } from '@/hooks/useGameEngine';

interface Portfolio {
    invested: number;
    currentValue: number;
    direction: BetDirection;
}

interface LiveChartProps {
    currentPrice: number;
    startPrice: number;
    phase: 'BETTING' | 'TRADING' | 'RESULT';
    portfolio?: Portfolio | null;
}

// Custom Dot to render the percentage tag at the head of the chart
const CustomDot = (props: any) => {
    const { cx, cy, index, data, startPrice } = props;
    const isLast = index === data.length - 1;

    if (!isLast) return null;

    const currentPrice = data[index].price;
    const percentChange = ((currentPrice - startPrice) / startPrice * 100);
    const isPositive = percentChange >= 0;

    return (
        <g>
            {/* Halo Effect */}
            <circle cx={cx} cy={cy} r="20" fill="#22d3ee" fillOpacity="0.1" />
            <circle cx={cx} cy={cy} r="10" fill="#22d3ee" fillOpacity="0.3" />
            <circle cx={cx} cy={cy} r="4" fill="#ffffff" />

            {/* Tag */}
            <foreignObject x={cx + 15} y={cy - 15} width={100} height={30} style={{ overflow: 'visible' }}>
                <div
                    className={`
              flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-lg
              ${isPositive ? 'bg-[#22c55e] text-black' : 'bg-[#ef4444] text-white'}
            `}
                >
                    <span>{isPositive ? '▲' : '▼'}</span>
                    <span>{Math.abs(percentChange).toFixed(2)}%</span>
                </div>
            </foreignObject>
        </g>
    );
};

interface LiveChartPropsExtended extends LiveChartProps {
    timeLeft?: number;
    startTime: number;
}

export default function LiveChart({ currentPrice, startPrice, phase, timeLeft, startTime }: LiveChartPropsExtended) {
    const [data, setData] = useState<{ time: number; price: number; type: 'history' | 'live' }[]>([]);

    // Reset data when a new round starts (startTime changes)
    useEffect(() => {
        if (phase === 'TRADING') {
            setData([{ time: startTime, price: startPrice, type: 'live' }]);
        }
    }, [startTime, phase, startPrice]);

    useEffect(() => {
        const now = Date.now();
        setData((prev) => {
            // Only update chart during TRADING phase
            if (phase !== 'TRADING') {
                return prev;
            }

            const type: 'history' | 'live' = 'live';
            const newData = [...prev, { time: now, price: currentPrice, type }];

            // No need to slice for performance in a 10s window (approx 200 points)
            return newData;
        });
    }, [currentPrice, phase]);

    const isPositive = currentPrice >= startPrice;
    const strokeColor = '#22d3ee';
    const fillColor = '#22d3ee';

    // Calculate Y domain
    const maxDeviation = Math.max(
        ...data.map(d => Math.abs(d.price - startPrice)),
        1
    );
    // Increase range to make chart look "smaller" (less zoomed in)
    const range = maxDeviation * 3;
    const yDomain = [startPrice - range, startPrice + range];

    // Fixed X domain for the 10s round
    const xDomain = [startTime, startTime + 10000];

    return (
        <div className="relative w-full h-full bg-[#020617] overflow-hidden flex flex-col">
            {/* Status Bar Overlay - Moved to Top */}
            <div className="h-8 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center justify-center z-20 shrink-0">
                <span className="text-slate-300 font-bold text-sm tracking-widest uppercase shadow-black drop-shadow-md">
                    {phase === 'BETTING' ? 'Place Your Trades' : phase === 'TRADING' ? 'Trading Live' : 'Round Complete'}
                </span>
            </div>

            {/* Grid Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(30,41,59,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Wipe Animation Overlay */}
            <AnimatePresence>
                {phase === 'TRADING' && (
                    <motion.div
                        initial={{ x: '0%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 z-30 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none"
                        style={{ width: '20%', left: '-20%' }} // Start off-screen left
                    />
                )}
            </AnimatePresence>
            {/* Actually, a simple wipe might be better implemented as a curtain that slides away? 
                    Or a scanner line?
                    Let's try a scanner line that moves across.
                */}
            {phase === 'TRADING' && (
                <motion.div
                    key={startTime} // Re-trigger on new round
                    initial={{ left: '-10%' }}
                    animate={{ left: '120%' }}
                    transition={{ duration: 1.5, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-2 bg-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.5)] z-30 blur-sm"
                />
            )}

            <div className="relative flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            {/* Glow Filter */}
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* Green Gradient for upward movement */}
                            <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>

                            {/* Red Gradient for downward movement */}
                            <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis
                            dataKey="time"
                            domain={xDomain}
                            type="number"
                            hide={true}
                        />
                        <YAxis
                            domain={yDomain}
                            hide={false}
                            orientation="right"
                            tick={{ fill: '#475569', fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(val) => val.toFixed(2)}
                        />

                        {/* Start Line */}
                        <ReferenceLine
                            x={startTime}
                            stroke="#22d3ee"
                            strokeDasharray="3 3"
                            strokeWidth={1}
                            label={{ position: 'top', value: 'START', fill: '#22d3ee', fontSize: 10 }}
                        />
                        {/* START Reference Line - Enhanced */}
                        <ReferenceLine
                            y={startPrice}
                            stroke="#fbbf24"
                            strokeWidth={3}
                            strokeDasharray="8 4"
                            label={{
                                value: 'END',
                                position: 'insideTopRight',
                                fill: '#fbbf24',
                                fontSize: 14,
                                fontWeight: 'bold',
                                style: {
                                    textShadow: '0 0 10px rgba(251, 191, 36, 0.8), 0 0 20px rgba(251, 191, 36, 0.4)',
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
                                }
                            }}
                            style={{
                                filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="none"
                            fill={currentPrice >= startPrice ? "url(#colorGreen)" : "url(#colorRed)"}
                            fillOpacity={0.3}
                            isAnimationActive={false}
                        />

                        {/* Glowing Line */}
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke={currentPrice >= startPrice ? "#22c55e" : "#ef4444"}
                            strokeWidth={3}
                            dot={false}
                            isAnimationActive={false}
                            filter="url(#glow)"
                        />

                        {/* Custom Dot for Latest Point */}
                        {data.length > 0 && (
                            <Line
                                type="monotone"
                                dataKey="price"
                                dot={(props: any) => {
                                    const { cx, cy, index, payload } = props;
                                    const isLast = index === data.length - 1;

                                    if (!isLast) return null;

                                    const percentChange = ((payload.price - startPrice) / startPrice * 100);
                                    const isPositive = percentChange >= 0;

                                    return (
                                        <g>
                                            {/* Halo Effect */}
                                            <circle cx={cx} cy={cy} r="20" fill={isPositive ? "#22c55e" : "#ef4444"} fillOpacity="0.1" />
                                            <circle cx={cx} cy={cy} r="10" fill={isPositive ? "#22c55e" : "#ef4444"} fillOpacity="0.3" />
                                            <circle cx={cx} cy={cy} r="4" fill="#ffffff" />

                                            {/* Tag */}
                                            <foreignObject x={cx + 15} y={cy - 15} width={100} height={30} style={{ overflow: 'visible' }}>
                                                <div
                                                    className={`
                                                        flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-lg
                                                        ${isPositive ? 'bg-[#22c55e] text-black' : 'bg-[#ef4444] text-white'}
                                                    `}
                                                >
                                                    <span>{isPositive ? '▲' : '▼'}</span>
                                                    <span>{Math.abs(percentChange).toFixed(2)}%</span>
                                                </div>
                                            </foreignObject>
                                        </g>
                                    );
                                }}
                                isAnimationActive={false}
                                stroke="none" // No stroke for this line, only for the dot
                            />
                        )}
                    </AreaChart>
                </ResponsiveContainer>
                {/* Countdown Timer Overlay during BETTING */}
                {phase === 'BETTING' && timeLeft !== undefined && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <motion.div
                            key={timeLeft}
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="text-slate-400 text-sm font-bold tracking-widest uppercase">
                                Next Round In
                            </div>
                            <div className="text-8xl font-black text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.5)] tabular-nums">
                                {timeLeft}
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Trading Timer during TRADING phase */}
                {phase === 'TRADING' && timeLeft !== undefined && (
                    <div className="absolute top-4 right-4 z-20">
                        <div className="bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg px-4 py-2 shadow-lg">
                            <div className="text-slate-400 text-xs font-bold tracking-wider uppercase mb-1">
                                Time Left
                            </div>
                            <div className="text-3xl font-black text-cyan-400 tabular-nums">
                                {timeLeft}s
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
