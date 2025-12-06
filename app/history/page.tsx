'use client';

import React, { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/game/BottomNav";
import TradeHistory from "@/components/game/TradeHistory";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HistoryPage() {
    const [activeTab, setActiveTab] = useState('history');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Mock trade history data (same as other pages)
    const tradeHistory = [
        { id: 1, type: 'WIN' as const, amount: 50, profit: 25, date: '2025-12-03 20:15', percentage: 12.5 },
        { id: 2, type: 'LOSS' as const, amount: 30, profit: -15, date: '2025-12-03 19:45', percentage: -8.3 },
        { id: 3, type: 'WIN' as const, amount: 100, profit: 80, date: '2025-12-03 18:30', percentage: 18.2 },
        { id: 4, type: 'WIN' as const, amount: 20, profit: 15, date: '2025-12-03 17:20', percentage: 15.0 },
        { id: 5, type: 'LOSS' as const, amount: 75, profit: -40, date: '2025-12-03 16:10', percentage: -12.1 },
        { id: 6, type: 'WIN' as const, amount: 60, profit: 35, date: '2025-12-03 15:00', percentage: 14.8 },
    ];

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        if (tab === 'settings') {
            setIsSidebarOpen(true);
        } else {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="game-wrapper relative w-screen h-screen overflow-hidden bg-[#0f172a] flex">
            {/* Sidebar */}
            <Sidebar
                currentPage="trade"
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                hideMobileToggle={true}
            />

            {/* Main Area */}
            <main className="relative z-10 flex-1 h-full overflow-hidden flex flex-col">
                {/* Header/Navbar */}
                <nav style={{ borderRadius: '15px' }} className="w-full border-b border-white/5 bg-[#02040a]/80 backdrop-blur-xl z-50 shrink-0 hidden lg:block">
                    <div className="px-6 h-16 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                            <Image src="/assets/images/logo.png" alt="Binortrade" width={40} height={40} className="group-hover:scale-110 transition-transform" />
                            <span className="text-xl font-bold text-white tracking-tight font-mono">BINOR<span className="text-emerald-500">TRADE</span></span>
                        </Link>

                        {/* Navigation Menu */}
                        <div className="hidden lg:flex items-center gap-1 text-xs font-bold font-mono text-slate-400 bg-white/5 p-1 rounded-lg border border-white/5">
                            <Link href="/play" className="px-4 py-2 rounded hover:bg-white/5 transition-colors">
                                TRADE
                            </Link>
                            <Link href="/history" className="px-4 py-2 rounded bg-purple-500/10 text-purple-400">
                                HISTORY
                            </Link>
                            <Link href="#" className="px-4 py-2 rounded hover:bg-white/5 transition-colors">
                                ANALYTICS
                            </Link>
                            <Link href="#" className="px-4 py-2 rounded hover:bg-white/5 transition-colors">
                                REFFERAL
                            </Link>
                            <Link href="#" className="px-4 py-2 rounded hover:bg-white/5 transition-colors">
                                AFFILIATE
                            </Link>
                            <Link href="/account" className="primary-button px-4 py-2 rounded hover:bg-white/5 transition-colors">
                                Account
                            </Link>
                        </div>

                        <div className="flex items-center gap-6">
                            <Link href="/" className="text-slate-400 hover:text-white text-sm font-mono transition-colors">
                                EXIT
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* History Content */}
                <div className="flex-1 overflow-hidden pb-20 lg:pb-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full overflow-y-auto p-4 md:p-6"
                    >
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl font-bold text-white mb-6">Trade History</h2>
                            <TradeHistory trades={tradeHistory} />
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Navigation */}
                <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
            </main>
        </div>
    );
}
