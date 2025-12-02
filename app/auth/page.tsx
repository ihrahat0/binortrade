import AuthForm from '../../components/auth/AuthForm';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function AuthPage() {
    return (
        <div className="min-h-screen w-full bg-[#02040a] relative overflow-hidden flex flex-col">

            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="grid-bg w-full h-full opacity-[0.4]"></div>
                <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-[120px] mix-blend-screen animate-pulse duration-[8000ms]"></div>
                <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-emerald-900/10 blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
            </div>

            {/* Navigation */}
            <nav className="w-full p-6 relative z-20">
                <div className="max-w-[1400px] mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold font-mono tracking-widest uppercase">Return to Home</span>
                    </Link>

                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/assets/images/logo.png" alt="Binortrade" width={32} height={32} />
                        <span className="text-xl font-bold text-white tracking-tight font-mono">BINOR<span className="text-emerald-500">TRADE</span></span>
                    </Link>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-6 relative z-10">
                <AuthForm />
            </main>

            {/* Footer Simple */}
            <footer className="w-full p-6 text-center relative z-10">
                <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">
                    Secured by Binortrade Institutional Grade Encryption
                </p>
            </footer>
        </div>
    );
}
