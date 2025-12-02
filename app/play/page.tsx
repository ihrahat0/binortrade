'use client';

import GameContainer from "@/components/game/GameContainer";
import Sidebar from "@/components/Sidebar";

export default function GamePage() {
    return (
        <div className="game-wrapper relative w-screen h-screen overflow-hidden bg-[#0f172a] flex">
            {/* Sidebar */}
            <Sidebar currentPage="trade" />

            {/* Main Game Area */}
            <main className="relative z-10 flex-1 h-full overflow-hidden">
                <GameContainer />
            </main>
        </div>
    );
}
