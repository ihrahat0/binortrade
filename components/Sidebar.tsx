'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, TrendingUp, Settings, LogOut, Menu, X, BarChart3, Trophy, Wallet } from 'lucide-react';

interface SidebarProps {
    currentPage?: string;
    mobileOnly?: boolean; // New prop to control desktop visibility
}

const menuItems = [
    { icon: Home, label: 'Home', href: '/', id: 'home' },
    { icon: TrendingUp, label: 'Trade', href: '/play', id: 'trade' },
    { icon: BarChart3, label: 'Analytics', href: '#', id: 'analytics' },
    { icon: Trophy, label: 'Leaderboard', href: '#', id: 'leaderboard' },
    { icon: Wallet, label: 'Wallet', href: '#', id: 'wallet' },
    { icon: Settings, label: 'Settings', href: '#', id: 'settings' },
];

export default function Sidebar({ currentPage = 'trade', mobileOnly = false }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button - Right Side */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 right-4 z-[60] w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Overlay for mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar - Hidden on desktop if mobileOnly is true */}
            <motion.aside
                initial={false}
                animate={{
                    x: isOpen ? 0 : '-100%',
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`
                    fixed top-0 left-0 h-screen w-64 bg-[#0a0f1e]/95 backdrop-blur-xl border-r border-white/10 z-[58]
                    ${mobileOnly ? 'lg:hidden' : 'lg:static lg:translate-x-0'}
                    flex flex-col
                `}
            >
                {/* Logo Section */}
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <Image
                                src="/assets/images/logo.png"
                                alt="Binortrade"
                                width={40}
                                height={40}
                                className="group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute inset-0 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div>
                            <span className="text-lg font-bold text-white tracking-tight font-mono block">
                                BINOR<span className="text-emerald-500">TRADE</span>
                            </span>
                            <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">Trading Terminal</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 px-3 py-4 overflow-y-auto">
                    <div className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.id;

                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                                        group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                                        ${isActive
                                            ? 'bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/5'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }
                                    `}
                                >
                                    <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-400' : ''}`} />
                                    <span className="font-medium text-sm font-mono">{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-white/10">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all group">
                        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-sm font-mono">Logout</span>
                    </button>
                </div>

                {/* Version Info */}
                <div className="px-6 py-3 border-t border-white/10">
                    <div className="flex items-center justify-between text-[9px] text-slate-600 font-mono uppercase tracking-widest">
                        <span>v2.4.0</span>
                        <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>Live</span>
                        </div>
                    </div>
                </div>
            </motion.aside>
        </>
    );
}
