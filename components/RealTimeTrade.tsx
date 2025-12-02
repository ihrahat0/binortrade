import React from 'react';

const RealTimeTrade: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col bg-[#050912] relative group select-none overflow-hidden">
            {/* Header Overlay */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-4 pointer-events-none">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">BTC/USD</span>
                    <span className="text-2xl font-mono font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                        $64,230.50
                    </span>
                </div>
            </div>

            {/* Video Container with Glow */}
            <div className="relative flex-1 w-full h-full bg-[#050912] overflow-hidden">
                {/* Outer Glow Animation */}
                <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_50px_rgba(16,185,129,0.1)]"></div>

                {/* Grid Background Overlay */}
                <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-10"></div>

                {/* Desktop Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hidden md:block w-full h-full object-cover opacity-90"
                >
                    <source src="/assets/videos/display.mp4" type="video/mp4" />
                </video>

                {/* Mobile Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="block md:hidden w-full h-full object-cover opacity-90"
                >
                    <source src="/assets/videos/display-mob.mp4" type="video/mp4" />
                </video>

                {/* Bottom Gradient Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#02040a] to-transparent z-10"></div>
            </div>
        </div>
    );
};

export default RealTimeTrade;
