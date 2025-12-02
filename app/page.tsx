"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import RealTimeTrade from '@/components/RealTimeTrade';
import Sidebar from '@/components/Sidebar';

const App: React.FC = () => {
    return (
        <div className="min-h-screen text-slate-200 selection:bg-emerald-500/30 overflow-x-hidden relative">

            {/* Mobile-Only Sidebar */}
            <div className="lg:hidden">
                <Sidebar currentPage="home" mobileOnly={true} />
            </div>

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-[#02040a]">
                <div className="grid-bg w-full h-full opacity-[0.4]"></div>
                <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[120px] mix-blend-screen animate-pulse duration-[8000ms]"></div>
                <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-emerald-900/10 blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
            </div>

            <div id="markets">
                <TickerBar />
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full border-b border-white/5 bg-[#02040a]/80 backdrop-blur-xl z-50">
                <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                        <Image src="/assets/images/logo.png" alt="Binortrade" width={40} height={40} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xl font-bold text-white tracking-tight font-mono">BINOR<span className="text-emerald-500">TRADE</span></span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-1 text-xs font-bold font-mono text-slate-400 bg-white/5 p-1 rounded-lg border border-white/5">
                        <NavItem label="MARKETS" href="#markets" active />
                        <NavItem label="TERMINAL" href="#terminal" />
                        <NavItem label="ANALYSIS" href="#analysis" />
                        <NavItem label="INSTITUTIONAL" href="#institutional" />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest font-mono">Demo Balance</div>
                            <div className="text-emerald-400 font-mono text-sm font-bold tracking-tight">$14,203.50</div>
                        </div>
                        <Link href="/auth" className="primary-button">
                            SIGN UP
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="relative z-10">

                {/* Hero Section */}
                <section className="pt-16 pb-24 md:pt-24 md:pb-32 px-6 max-w-[1400px] mx-auto border-b border-white/5">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                        {/* Hero Text */}
                        <div className="lg:col-span-5 flex flex-col space-y-8">
                            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/30 w-fit backdrop-blur-md">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase font-mono">System v2.4 Live</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.0] tracking-tight font-mono">
                                ALGORITHMIC<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400">SUPREMACY</span>
                            </h1>

                            <p className="text-slate-400 text-lg leading-relaxed max-w-lg font-light font-sans">
                                Execute trades with nanosecond precision using our proprietary AI engine. The ultimate tool for the modern quant.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href="/play" className="primary-button flex items-center gap-3 group">
                                    LAUNCH TERMINAL
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </Link>
                                <button className="px-8 py-4 border border-white/10 hover:bg-white/5 text-slate-300 font-bold rounded transition-all flex items-center gap-2 font-mono text-sm tracking-wide">
                                    READ DOCS
                                </button>
                            </div>

                            <div className="pt-8 border-t border-white/5 flex gap-12">
                                <div>
                                    <p className="text-3xl font-mono font-bold text-white">0.05<span className="text-sm text-slate-500 ml-1">ms</span></p>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1 font-mono">Execution Speed</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-mono font-bold text-white">$4.2<span className="text-sm text-slate-500 ml-1">B+</span></p>
                                    <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1 font-mono">Daily Volume</p>
                                </div>
                            </div>
                        </div>

                        {/* Hero App Preview */}
                        <div id="terminal" className="lg:col-span-7 w-full h-[640px] relative">
                            {/* The "Terminal Window" */}
                            <div className="w-full h-full relative z-10 bg-[#02040a] rounded border border-white/10 shadow-2xl flex flex-col group overflow-hidden">
                                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 mix-blend-overlay"></div>

                                {/* Toolbar */}
                                <div className="h-9 bg-[#0a0f1e] border-b border-white/5 flex items-center justify-between px-4">
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                        <div className="w-2 h-2 rounded-full bg-white/20"></div>
                                    </div>
                                    <div className="text-[10px] font-mono text-slate-500 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        LIVE_FEED_CONNECTION
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="flex-1 relative">
                                    <RealTimeTrade />
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-r border-b border-emerald-500/30 rounded-br-3xl"></div>
                            <div className="absolute -top-6 -left-6 w-24 h-24 border-l border-t border-white/10 rounded-tl-3xl"></div>
                        </div>

                    </div>
                </section>

                {/* Features Grid */}
                <section id="analysis" className="py-32 px-6 bg-[#02040a]">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="mb-20 text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-mono tracking-tight">ENGINEERED FOR ALPHA</h2>
                            <p className="text-slate-400 text-lg">
                                Our infrastructure is built to give retail traders the same edge as high-frequency trading firms.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FeatureCard
                                title="Zero-Latency Engine"
                                desc="Direct market access ensures your orders hit the order book in microseconds, eliminating slippage."
                                icon={<svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                            />
                            <FeatureCard
                                title="AI Predictive Models"
                                desc="Real-time sentiment analysis and trend prediction powered by our proprietary neural networks."
                                icon={<svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                            />
                            <FeatureCard
                                title="Deep Liquidity"
                                desc="Aggregated liquidity from over 12 tier-1 providers ensures best price execution for any size."
                                icon={<svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                            />
                            <FeatureCard
                                title="Institutional Security"
                                desc="Cold storage wallets, multi-sig authorization, and real-time threat monitoring protect your assets."
                                icon={<svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                            />
                            <FeatureCard
                                title="Advanced Charting"
                                desc="100+ technical indicators and drawing tools directly integrated into the trading terminal."
                                icon={<svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>}
                            />
                            <FeatureCard
                                title="24/7 Priority Support"
                                desc="Dedicated account managers and technical support available round the clock for all pro users."
                                icon={<svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                            />
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section id="institutional" className="py-24 max-w-4xl mx-auto px-6 border-t border-white/5">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center font-mono">SYSTEM INQUIRIES</h2>
                    <div className="space-y-4">
                        <FAQItem
                            question="How does the AI prediction engine work?"
                            answer="Our engine utilizes LSTM neural networks trained on 10 years of tick-by-tick market data to identify micro-patterns invisible to the human eye. It processes over 5,000 data points per second to generate probability maps for price action."
                        />
                        <FAQItem
                            question="Is my capital segregated?"
                            answer="Yes. All client funds are held in segregated accounts at tier-1 custodial banks. We employ a strict 1:1 reserve ratio and conduct quarterly third-party audits to ensure total transparency and solvency."
                        />
                        <FAQItem
                            question="What are the trading fees?"
                            answer="EvoTrade operates on a zero-maker-fee model. Taker fees start at 0.05% and decrease with volume. There are no deposit or withdrawal fees for crypto assets."
                        />
                        <FAQItem
                            question="Can I access the API?"
                            answer="Absolutely. We provide a full REST and WebSocket API for algorithmic traders. Our documentation covers all endpoints for market data, order management, and account history with <5ms latency."
                        />
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-32 px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="relative rounded bg-gradient-to-b from-emerald-900/20 to-[#02040a] border border-white/10 px-8 py-24 text-center group overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

                            {/* Animated Glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>

                            <div className="relative z-10">
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight font-mono">READY TO DEPLOY?</h2>
                                <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto font-light">
                                    Join the simulation today. Validate your strategies in a risk-free institutional environment.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <Link href="/auth" className="primary-button w-full sm:w-auto px-10 py-4">
                                        CREATE ACCOUNT
                                    </Link>
                                    <button className="w-full sm:w-auto px-10 py-4 bg-transparent text-white font-bold font-mono text-sm tracking-wide rounded hover:bg-white/5 transition-colors border border-white/20">
                                        VIEW LEADERBOARD
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 bg-[#010205] pt-20 pb-10">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-20">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <Image src="/assets/images/logo.png" alt="Binortrade" width={32} height={32} />
                                <span className="text-lg font-bold text-white tracking-tight font-mono">BINOR<span className="text-emerald-500">TRADE</span></span>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-mono">
                                High-frequency simulation environment for the next generation of algorithmic traders.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 text-xs uppercase tracking-widest font-mono">Platform</h4>
                            <ul className="space-y-4 text-sm text-slate-500 font-medium">
                                <li className="hover:text-emerald-400 cursor-pointer transition-colors">Terminal</li>
                                <li className="hover:text-emerald-400 cursor-pointer transition-colors">API Docs</li>
                                <li className="hover:text-emerald-400 cursor-pointer transition-colors">System Status</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 text-xs uppercase tracking-widest font-mono">Company</h4>
                            <ul className="space-y-4 text-sm text-slate-500 font-medium">
                                <li className="hover:text-emerald-400 cursor-pointer transition-colors">About Us</li>
                                <li className="hover:text-emerald-400 cursor-pointer transition-colors">Careers</li>
                                <li className="hover:text-emerald-400 cursor-pointer transition-colors">Press</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-8 text-xs uppercase tracking-widest font-mono">Legal</h4>
                            <ul className="space-y-4 text-sm text-slate-500 font-medium">
                                <li className="hover:text-emerald-400 cursor-pointer transition-colors">Privacy Policy</li>
                                <li className="hover:text-emerald-400 cursor-pointer transition-colors">Terms of Service</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-slate-600 font-mono uppercase tracking-wider">
                        <p>&copy; 2024 Binortrade Technologies. All systems nominal.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
                            <span className="hover:text-white cursor-pointer transition-colors">GitHub</span>
                            <span className="hover:text-white cursor-pointer transition-colors">Discord</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

// --- Subcomponents ---

const NavItem = ({ label, href, active }: { label: string, href?: string, active?: boolean }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (href?.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    return (
        <Link
            href={href || '#'}
            onClick={handleClick}
            className={`cursor-pointer px-4 py-2 rounded text-[10px] font-bold tracking-wider transition-all duration-300 ${active
                ? 'bg-white/10 text-white shadow-sm'
                : 'hover:text-white hover:bg-white/5 hover:scale-105'
                }`}
        >
            {label}
        </Link>
    );
};

const FeatureCard = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => (
    <div className="feature-card p-8 rounded-xl group relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-500/10 transition-colors duration-500"></div>
        <div className="relative z-10">
            <div className="w-12 h-12 rounded-lg bg-[#0f121a] border border-white/10 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-mono">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-white/5 rounded bg-[#0a0c14] overflow-hidden transition-all duration-300 hover:border-white/10">
            <button
                className="w-full px-6 py-5 text-left flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-white font-bold font-mono text-sm">{question}</span>
                <span className={`text-emerald-500 transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                </span>
            </button>
            <div className={`px-6 text-slate-400 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                {answer}
            </div>
        </div>
    );
};

const TickerBar = () => {
    const items = [
        "BTC $64,230 +2.4%", "ETH $3,450 +1.8%", "SOL $145 -0.5%",
        "NDX 18,250 +0.4%", "SPX 5,200 -0.1%", "GOLD 2,350 +0.5%",
        "EUR/USD 1.08 +0.1%", "GBP/USD 1.26 -0.1%", "XRP $0.62 +5.0%"
    ];

    return (
        <div className="w-full bg-[#0a0f1e] border-b border-white/5 overflow-hidden py-2 flex relative z-50">
            <div className="flex animate-scroll whitespace-nowrap min-w-full">
                {[...items, ...items, ...items, ...items].map((item, i) => {
                    const isPos = item.includes('+');
                    return (
                        <div key={i} className="mx-8 text-[10px] font-mono font-bold flex items-center gap-2">
                            <span className="text-slate-500">{item.split(' ')[0]}</span>
                            <span className={isPos ? 'text-emerald-400' : 'text-rose-400'}>{item.split(' ').slice(1).join(' ')}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
