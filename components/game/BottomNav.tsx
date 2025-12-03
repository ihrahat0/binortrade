'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BottomNavProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
    const tabs = [
        { id: 'trade', icon: '/assets/icons/trading.png', label: 'Trade', href: null },
        { id: 'history', icon: '/assets/icons/history.png', label: 'History', href: null },
        { id: 'user', icon: '/assets/icons/user.png', label: 'User', href: '/account' },
        { id: 'settings', icon: '/assets/icons/setting.png', label: 'Settings', href: null },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pt-8 lg:hidden pointer-events-none">
            <div className="bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex items-center justify-around h-20 relative pointer-events-auto">

                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none rounded-2xl" />

                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    const isTrade = tab.id === 'trade';

                    const content = (
                        <>
                            {/* Active Indicator Background */}
                            {isActive && (
                                <motion.div
                                    layoutId="nav-active-bg"
                                    className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent rounded-xl"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.1 }}
                                />
                            )}

                            {/* Icon Container */}
                            <div className={`
                                relative transition-all duration-100 flex items-center justify-center
                                ${isTrade && isActive ? 'w-11 h-11 -mt-7 mb-1 z-20' : 'w-8 h-8 mb-1'}
                            `}>
                                {/* Glow Effect for Active Trade */}
                                {isTrade && isActive && (
                                    <div className="absolute inset-0 bg-emerald-500/50 blur-xl rounded-full animate-pulse" />
                                )}

                                <Image
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={isTrade && isActive ? 44 : 32}
                                    height={isTrade && isActive ? 44 : 32}
                                    className={`
                                        object-contain transition-all duration-100 relative z-10
                                        ${isActive ? 'brightness-125 drop-shadow-[0_0_16px_rgba(52,211,153,0.8)]' : 'brightness-75 grayscale opacity-70'}
                                    `}
                                />
                            </div>

                            {/* Label */}
                            {(!isTrade || !isActive) && (
                                <span className={`
                                    text-[10px] font-medium tracking-wide transition-all duration-100
                                    ${isActive ? 'text-emerald-400' : 'text-slate-500'}
                                `}>
                                    {tab.label}
                                </span>
                            )}

                            {/* Active Dot for non-trade items */}
                            {isActive && !isTrade && (
                                <motion.div
                                    layoutId="nav-active-dot"
                                    className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400"
                                    transition={{ duration: 0.1 }}
                                />
                            )}
                        </>
                    );

                    // If tab has href, use Link, otherwise use button
                    if (tab.href) {
                        return (
                            <Link
                                key={tab.id}
                                href={tab.href}
                                className={`
                                    relative flex flex-col items-center justify-center w-16 h-full transition-all duration-100
                                    ${isActive ? 'text-emerald-400' : 'text-slate-500'}
                                `}
                            >
                                {content}
                            </Link>
                        );
                    }

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`
                                relative flex flex-col items-center justify-center w-16 h-full transition-all duration-100
                                ${isActive ? 'text-emerald-400' : 'text-slate-500'}
                            `}
                        >
                            {content}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
