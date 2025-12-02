'use client';

import GameContainer from "@/components/game/GameContainer";
import Sidebar from "@/components/Sidebar";
import Link from 'next/link';
import Image from 'next/image';

export default function GamePage() {
    return (
        <div className="game-wrapper relative w-screen h-screen overflow-hidden bg-[#0f172a] flex">
            {/* Sidebar */}
            <Sidebar currentPage="trade" />

            {/* Main Game Area */}
            <main className="relative z-10 flex-1 h-full overflow-hidden flex flex-col">
                {/* Header/Navbar */}
                <nav style={{ borderRadius: '15px' }} className="w-full border-b border-white/5 bg-[#02040a]/80 backdrop-blur-xl z-50 shrink-0">
                    <div className="px-6 h-16 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                            <Image src="/assets/images/logo.png" alt="Binortrade" width={40} height={40} className="group-hover:scale-110 transition-transform" />
                            <span className="text-xl font-bold text-white tracking-tight font-mono">BINOR<span className="text-emerald-500">TRADE</span></span>
                        </Link>

                        {/* Navigation Menu */}
                        <div className="hidden lg:flex items-center gap-1 text-xs font-bold font-mono text-slate-400 bg-white/5 p-1 rounded-lg border border-white/5">
                            <Link href="/play" className="px-4 py-2 rounded bg-emerald-500/10 text-emerald-400">
                                TRADE
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
                            <Link href="#" className="primary-button px-4 py-2 rounded hover:bg-white/5 transition-colors">
                                Account
                            </Link>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* <div className="hidden md:flex flex-col items-end">
                                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest font-mono">Balance</div>
                                <div className="text-emerald-400 font-mono text-sm font-bold tracking-tight">$14,203.50</div>
                            </div> */}
                            <Link href="/" className="text-slate-400 hover:text-white text-sm font-mono transition-colors">
                                EXIT
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Game Container */}
                <div className="flex-1 overflow-hidden">
                    <GameContainer />
                </div>
            </main>
        </div>
    );
}
