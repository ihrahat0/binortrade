'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ArrowDownToLine, ArrowUpFromLine, History, Lock, Mail, TrendingUp, TrendingDown, ArrowLeft, User, CheckCircle, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import BottomNav from '@/components/game/BottomNav';
import { useAuth } from '@/hooks/useAuth';
import OtpModal from '@/components/auth/OtpModal';

export default function AccountPage() {
    const [activeSection, setActiveSection] = useState('deposit');
    const [activeTab, setActiveTab] = useState('user');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const [selectedPaymentType, setSelectedPaymentType] = useState<'epayment' | 'crypto' | null>(null);
    const [selectedChain, setSelectedChain] = useState<string | null>(null);
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');

    // Withdrawal states
    const [selectedWithdrawMethod, setSelectedWithdrawMethod] = useState<string | null>(null);
    const [selectedWithdrawType, setSelectedWithdrawType] = useState<'epayment' | 'crypto' | null>(null);
    const [selectedWithdrawChain, setSelectedWithdrawChain] = useState<string | null>(null);

    // Deposit Bonus State
    const [selectedBonus, setSelectedBonus] = useState<string | null>(null);

    // Email verification
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('user@example.com');
    // Auth
    const { user, loading } = useAuth({ requireAuth: true });

    const [balance, setBalance] = useState(0);

    React.useEffect(() => {
        if (user) {
            setBalance(user.balance || 0);
            setEmail(user.email);
            setIsEmailVerified(user.isVerified || false);
        }
    }, [user]);

    const [isVerifyModalOpen, setVerifyModalOpen] = useState(false);

    // Mock trade history data
    const tradeHistory = [
        { id: 1, type: 'WIN', amount: 50, profit: 25, date: '2025-12-03 20:15', percentage: 12.5 },
        { id: 2, type: 'LOSS', amount: 30, profit: -15, date: '2025-12-03 19:45', percentage: -8.3 },
        { id: 3, type: 'WIN', amount: 100, profit: 80, date: '2025-12-03 18:30', percentage: 18.2 },
        { id: 4, type: 'WIN', amount: 20, profit: 15, date: '2025-12-03 17:20', percentage: 15.0 },
        { id: 5, type: 'LOSS', amount: 75, profit: -40, date: '2025-12-03 16:10', percentage: -12.1 },
        { id: 6, type: 'WIN', amount: 60, profit: 35, date: '2025-12-03 15:00', percentage: 14.8 },
    ];

    const menuItems = [
        { id: 'deposit', icon: ArrowDownToLine, label: 'Deposit', color: 'emerald' },
        { id: 'withdraw', icon: ArrowUpFromLine, label: 'Withdraw', color: 'blue' },
        { id: 'history', icon: History, label: 'History', color: 'purple' },
        { id: 'password', icon: Lock, label: 'Security', color: 'orange' },
        { id: 'email', icon: User, label: 'Profile', color: 'pink' },
    ];

    const cryptoChains: Record<string, string[]> = {
        'Tether': ['BEP20 (BSC)', 'ERC20 (ETH)', 'TRC20 (TRX)'],
        'BNB': ['BSC Chain'],
        'Ethereum': ['ERC20'],
        'Bitcoin': ['BTC Chain'],
        'Solana': ['Sol Chain'],
        'Litecoin': ['LTC Chain']
    };

    const handlePaymentMethodSelect = (method: string, type: 'epayment' | 'crypto') => {
        setSelectedPaymentMethod(method);
        setSelectedPaymentType(type);
        setSelectedChain(null);
        setDepositAmount('');
    };

    const handleChainSelect = (chain: string) => {
        setSelectedChain(chain);
    };

    const handleBackToMethods = () => {
        setSelectedPaymentMethod(null);
        setSelectedPaymentType(null);
        setSelectedChain(null);
        setDepositAmount('');
    };

    const handleBackToChains = () => {
        setSelectedChain(null);
    };

    const handleDeposit = () => {
        console.log('Deposit:', {
            amount: depositAmount,
            method: selectedPaymentMethod,
            type: selectedPaymentType,
            chain: selectedChain,
            bonus: selectedBonus
        });
        setDepositAmount('');
        setSelectedPaymentMethod(null);
        setSelectedPaymentType(null);
        setSelectedChain(null);
        setSelectedBonus(null);
    };

    const handleWithdrawMethodSelect = (method: string, type: 'epayment' | 'crypto') => {
        setSelectedWithdrawMethod(method);
        setSelectedWithdrawType(type);
        setSelectedWithdrawChain(null);
        setWithdrawAmount('');
    };

    const handleWithdrawChainSelect = (chain: string) => {
        setSelectedWithdrawChain(chain);
    };

    const handleBackToWithdrawMethods = () => {
        setSelectedWithdrawMethod(null);
        setSelectedWithdrawType(null);
        setSelectedWithdrawChain(null);
        setWithdrawAmount('');
    };

    const handleBackToWithdrawChains = () => {
        setSelectedWithdrawChain(null);
    };

    const handleWithdraw = () => {
        console.log('Withdraw:', withdrawAmount, selectedWithdrawMethod, selectedWithdrawType, selectedWithdrawChain);
        setWithdrawAmount('');
        setSelectedWithdrawMethod(null);
        setSelectedWithdrawType(null);
        setSelectedWithdrawChain(null);
    };

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || 'Failed to update password');
                return;
            }

            alert('Password updated successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.error('Pass change error:', err);
            alert('An error occurred');
        }
    };

    const handleEmailVerified = () => {
        setIsEmailVerified(true);
        // Refresh page or update user context
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0f172a] to-[#0a0f1e] flex flex-col pb-24 lg:pb-0 font-sans">
            {/* Header */}
            <header className="border-b border-white/10 bg-[#0a0f1e]/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center justify-between">
                        <Link href="/play" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-medium">Back</span>
                        </Link>
                        <Link href="/" className="flex items-center gap-2 group">
                            <Image src="/assets/images/logo.png" alt="Binortrade" width={28} height={28} className="group-hover:scale-110 transition-transform" />
                            <span className="text-base font-bold text-white tracking-tight font-mono hidden sm:block">
                                BINOR<span className="text-emerald-500">TRADE</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
                {/* Sidebar */}
                <aside className="lg:w-64 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0a0f1e]/50 p-4">
                    {/* Balance Card */}
                    <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-4 mb-4 shadow-lg shadow-emerald-500/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-emerald-200 text-[10px] font-medium uppercase tracking-wider">Balance</p>
                                <p className="text-white text-2xl font-bold font-mono mt-1">${balance.toFixed(2)}</p>
                            </div>
                            <Wallet className="w-8 h-8 text-emerald-200" />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`
                                        w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm
                                        ${isActive
                                            ? `bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/30`
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }
                                    `}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            );
                        })}
                        <button
                            onClick={async () => {
                                await fetch('/api/auth/logout', { method: 'POST' });
                                window.location.href = '/';
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 mt-4"
                        >
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </nav>
                </aside>

                {/* Content Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {activeSection === 'deposit' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-4xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Deposit Funds</h2>

                            {!selectedPaymentType ? (
                                /* Main Method Selection - Refined Glassy Design */
                                <div className="grid md:grid-cols-2 gap-4">
                                    {/* E-payments Card */}
                                    <motion.button
                                        whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => {
                                            setSelectedPaymentType('epayment');
                                            setSelectedPaymentMethod('E-payments');
                                        }}
                                        className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 text-left transition-all overflow-hidden flex items-center gap-5 hover:border-emerald-500/30"
                                    >
                                        <div className="w-16 h-16 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-white/5 shrink-0 group-hover:scale-110 transition-transform duration-500 relative overflow-hidden p-2">
                                            <Image
                                                src="/assets/deposit/epayments.webp"
                                                alt="E-payments"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">E-payments</h3>
                                                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Recommended</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                {['bkash', 'nagad', 'rocket'].map((img) => (
                                                    <div key={img} className="w-6 h-6 relative grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                                                        <Image src={`/assets/deposit/${img}.png`} alt={img} fill className="object-contain" />
                                                    </div>
                                                ))}
                                                <span className="text-[10px] text-slate-500">+More</span>
                                            </div>
                                        </div>
                                    </motion.button>

                                    {/* Crypto Card */}
                                    <motion.button
                                        whileHover={{ scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => setSelectedPaymentType('crypto')}
                                        className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 text-left transition-all overflow-hidden flex items-center gap-5 hover:border-purple-500/30"
                                    >
                                        <div className="w-16 h-16 rounded-xl bg-purple-500/10 flex items-center justify-center border border-white/5 shrink-0 group-hover:scale-110 transition-transform duration-500 relative p-2">
                                            <Image
                                                src="/assets/deposit/bitcoin.png"
                                                alt="Bitcoin"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">Cryptocurrency</h3>
                                                <span className="bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Fastest</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                {['tether', 'ethereum', 'bnb', 'solana'].map((img) => (
                                                    <div key={img} className="w-6 h-6 relative grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                                                        <Image src={`/assets/deposit/${img}.png`} alt={img} fill className="object-contain" />
                                                    </div>
                                                ))}
                                                <span className="text-[10px] text-slate-500">+More</span>
                                            </div>
                                        </div>
                                    </motion.button>
                                </div>
                            ) : selectedPaymentType === 'epayment' ? (
                                /* E-payment Detail View */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="max-w-xl mx-auto bg-[#1e1b2e]/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    <div className="bg-white/5 p-4 text-center border-b border-white/5 relative">
                                        <button
                                            onClick={() => { setSelectedPaymentType(null); setSelectedPaymentMethod(null); }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                        </button>
                                        <h3 className="text-lg font-bold text-white">Deposit Amount</h3>
                                    </div>

                                    <div className="p-5 space-y-6">
                                        {/* Amount Input */}
                                        <div>
                                            <div className="flex justify-between items-end mb-2">
                                                <label className="text-xs font-bold text-slate-300">Amount (BDT)</label>
                                                <span className="text-[10px] text-slate-500">Min: 500 BDT</span>
                                            </div>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={depositAmount}
                                                    onChange={(e) => setDepositAmount(e.target.value)}
                                                    className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-3 text-white text-lg font-bold focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-600"
                                                    placeholder="Enter amount..."
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">BDT</span>
                                            </div>
                                        </div>

                                        {/* Quick Amounts - Fixed Grid & Overflow */}
                                        <div className="grid grid-cols-4 gap-2">
                                            {[500, 1000, 2000, 4000, 8000, 16000, 20000, 50000].map((amt) => (
                                                <button
                                                    key={amt}
                                                    onClick={() => setDepositAmount(amt.toString())}
                                                    className={`
                                                        py-2 px-1 rounded-lg text-sm font-bold border transition-all truncate
                                                        ${depositAmount === amt.toString()
                                                            ? 'bg-amber-600 border-amber-500 text-white'
                                                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-amber-500/30'
                                                        }
                                                    `}
                                                >
                                                    {amt.toLocaleString()}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Bonuses - Sleek List */}
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Select Bonus</p>
                                            {[
                                                { id: 'first_deposit', title: 'First Deposit Bonus', desc: 'Get 100% extra', min: 500 },
                                                { id: 'first_sports', title: 'Sports Welcome', desc: '100% on sports', min: 1000 },
                                                { id: 'welcome', title: 'Start Bonus', desc: 'For new users', min: 200 },
                                            ].map((bonus) => (
                                                <div
                                                    key={bonus.id}
                                                    className={`
                                                        group relative border rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all
                                                        ${selectedBonus === bonus.id
                                                            ? 'bg-amber-500/10 border-amber-500/50'
                                                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                                        }
                                                    `}
                                                    onClick={() => setSelectedBonus(bonus.id)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors
                                                            ${selectedBonus === bonus.id ? 'border-amber-500 bg-amber-500' : 'border-slate-600'}
                                                        `}>
                                                            {selectedBonus === bonus.id && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                                                        </div>
                                                        <div>
                                                            <p className={`font-bold text-sm ${selectedBonus === bonus.id ? 'text-amber-400' : 'text-slate-200'}`}>{bonus.title}</p>
                                                            <p className="text-slate-500 text-[10px]">{bonus.desc}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-slate-500 font-bold text-[10px] bg-black/20 px-2 py-1 rounded">Min {bonus.min}</span>
                                                </div>
                                            ))}

                                            {/* No Bonus Option */}
                                            <div
                                                className={`
                                                    group relative border rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-all
                                                    ${selectedBonus === 'none'
                                                        ? 'bg-blue-500/10 border-blue-500/50'
                                                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                                    }
                                                `}
                                                onClick={() => setSelectedBonus('none')}
                                            >
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors
                                                    ${selectedBonus === 'none' ? 'border-blue-500 bg-blue-500' : 'border-slate-600'}
                                                `}>
                                                    {selectedBonus === 'none' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                                                </div>
                                                <p className="text-slate-300 font-medium text-xs">No bonus</p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleDeposit}
                                            disabled={!depositAmount}
                                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                        >
                                            Deposit Funds
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                /* Crypto Grid View - Refined */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <button
                                        onClick={() => setSelectedPaymentType(null)}
                                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
                                    >
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                        <span className="text-sm font-medium">Back to methods</span>
                                    </button>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                        {[
                                            { name: 'Tether', image: '/assets/deposit/tether.png', symbol: 'USDT' },
                                            { name: 'Bitcoin', image: '/assets/deposit/bitcoin.png', symbol: 'BTC' },
                                            { name: 'Ethereum', image: '/assets/deposit/ethereum.png', symbol: 'ETH' },
                                            { name: 'BNB', image: '/assets/deposit/bnb.png', symbol: 'BNB' },
                                            { name: 'Solana', image: '/assets/deposit/solana.png', symbol: 'SOL' },
                                            { name: 'Litecoin', image: '/assets/deposit/litecoin.png', symbol: 'LTC' },
                                            // Duplicates for grid demo
                                            { name: 'Tether TRC20', image: '/assets/deposit/tether.png', symbol: 'USDT' },
                                            { name: 'Bitcoin Cash', image: '/assets/deposit/bitcoin.png', symbol: 'BCH' },
                                        ].map((crypto, i) => (
                                            <motion.button
                                                key={i}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    setSelectedPaymentMethod(crypto.name);
                                                    setSelectedChain('Default');
                                                }}
                                                className="bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/30 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 aspect-square group transition-all"
                                            >
                                                <div className="w-10 h-10 relative grayscale group-hover:grayscale-0 transition-all duration-300">
                                                    <Image
                                                        src={crypto.image}
                                                        alt={crypto.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-slate-200 group-hover:text-white text-xs font-bold transition-colors">{crypto.name}</p>
                                                    <p className="text-slate-600 group-hover:text-slate-400 text-[10px] transition-colors">{crypto.symbol}</p>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {activeSection === 'withdraw' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-5xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Withdraw Funds</h2>

                            {!selectedWithdrawMethod ? (
                                <>
                                    {/* Available Balance */}
                                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-6 mb-8">
                                        <p className="text-sm text-blue-400 uppercase tracking-wider mb-2">Available Balance</p>
                                        <p className="text-4xl font-bold text-white font-mono">${balance.toFixed(2)}</p>
                                    </div>

                                    {/* E-Payment Methods */}
                                    <div className="mb-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                                            <h3 className="text-xl font-bold text-white">E-Payment</h3>
                                            <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">BDT</span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {[
                                                { name: 'Bkash', image: '/assets/deposit/bkash.png', gradient: 'from-pink-500/20 via-pink-500/10 to-transparent' },
                                                { name: 'Nagad', image: '/assets/deposit/nagad.png', gradient: 'from-orange-500/20 via-orange-500/10 to-transparent' },
                                                { name: 'Rocket', image: '/assets/deposit/rocket.png', gradient: 'from-purple-500/20 via-purple-500/10 to-transparent' },
                                            ].map((method) => (
                                                <motion.button
                                                    key={method.name}
                                                    whileHover={{ scale: 1.02, y: -4 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleWithdrawMethodSelect(method.name, 'epayment')}
                                                    className={`
                                                        group relative bg-gradient-to-br ${method.gradient}
                                                        backdrop-blur-sm
                                                        border-2 border-white/10 hover:border-blue-400/50
                                                        rounded-2xl p-5 transition-all duration-300
                                                        hover:shadow-2xl hover:shadow-blue-500/20
                                                        overflow-hidden
                                                    `}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-blue-500/5 group-hover:to-transparent transition-all duration-300"></div>

                                                    <div className="relative">
                                                        <div className="w-full aspect-[2.5/1] relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden flex items-center justify-center p-4 mb-3 border border-white/5">
                                                            <Image
                                                                src={method.image}
                                                                alt={method.name}
                                                                width={140}
                                                                height={56}
                                                                className="object-contain group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-white font-bold text-base">{method.name}</span>
                                                            <div className="w-6 h-6 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center transition-colors">
                                                                <ArrowUpFromLine className="w-3.5 h-3.5 text-blue-400" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Cryptocurrency Methods */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-1.5 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
                                            <h3 className="text-xl font-bold text-white">Cryptocurrency</h3>
                                            <span className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">USD</span>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {[
                                                { name: 'Tether', image: '/assets/deposit/tether.png', symbol: 'USDT', gradient: 'from-green-500/20 via-green-500/10 to-transparent' },
                                                { name: 'Bitcoin', image: '/assets/deposit/bitcoin.png', symbol: 'BTC', gradient: 'from-orange-500/20 via-orange-500/10 to-transparent' },
                                                { name: 'Ethereum', image: '/assets/deposit/ethereum.png', symbol: 'ETH', gradient: 'from-blue-500/20 via-blue-500/10 to-transparent' },
                                                { name: 'BNB', image: '/assets/deposit/bnb.png', symbol: 'BNB', gradient: 'from-yellow-500/20 via-yellow-500/10 to-transparent' },
                                                { name: 'Solana', image: '/assets/deposit/solana.png', symbol: 'SOL', gradient: 'from-purple-500/20 via-purple-500/10 to-transparent' },
                                                { name: 'Litecoin', image: '/assets/deposit/litecoin.png', symbol: 'LTC', gradient: 'from-slate-400/20 via-slate-400/10 to-transparent' },
                                            ].map((crypto) => (
                                                <motion.button
                                                    key={crypto.name}
                                                    whileHover={{ scale: 1.02, y: -4 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleWithdrawMethodSelect(crypto.name, 'crypto')}
                                                    className={`
                                                        group relative bg-gradient-to-br ${crypto.gradient}
                                                        backdrop-blur-sm
                                                        border-2 border-white/10 hover:border-cyan-400/50
                                                        rounded-2xl p-5 transition-all duration-300
                                                        hover:shadow-2xl hover:shadow-cyan-500/20
                                                        overflow-hidden
                                                    `}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:via-cyan-500/5 group-hover:to-transparent transition-all duration-300"></div>

                                                    <div className="relative">
                                                        <div className="w-full aspect-[2.5/1] relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden flex items-center justify-center p-4 mb-3 border border-white/5">
                                                            <Image
                                                                src={crypto.image}
                                                                alt={crypto.name}
                                                                width={140}
                                                                height={56}
                                                                className="object-contain group-hover:scale-105 transition-transform duration-300"
                                                            />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <span className="text-white font-bold text-base block">{crypto.name}</span>
                                                                <span className="text-slate-400 text-xs">{crypto.symbol}</span>
                                                            </div>
                                                            <div className="w-6 h-6 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20 flex items-center justify-center transition-colors">
                                                                <ArrowUpFromLine className="w-3.5 h-3.5 text-cyan-400" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : selectedWithdrawType === 'crypto' && !selectedWithdrawChain ? (
                                /* Chain Selection Screen */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="max-w-2xl mx-auto"
                                >
                                    <button
                                        onClick={handleBackToWithdrawMethods}
                                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
                                    >
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                        <span className="text-sm font-medium">Back to methods</span>
                                    </button>

                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold text-white mb-2">Select Network</h3>
                                        <p className="text-slate-400">Choose the network for your {selectedWithdrawMethod} withdrawal</p>
                                    </div>

                                    <div className="grid gap-4">
                                        {cryptoChains[selectedWithdrawMethod]?.map((chain) => (
                                            <motion.button
                                                key={chain}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleWithdrawChainSelect(chain)}
                                                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 rounded-xl p-6 flex items-center justify-between group transition-all"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                                                    </div>
                                                    <div className="text-left">
                                                        <span className="text-lg font-bold text-white block">{chain}</span>
                                                        <span className="text-sm text-slate-400">Estimated processing: 2-5 mins</span>
                                                    </div>
                                                </div>
                                                <ArrowUpFromLine className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                /* Amount Input Screen */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="max-w-2xl mx-auto"
                                >
                                    <button
                                        onClick={selectedWithdrawType === 'crypto' ? handleBackToWithdrawChains : handleBackToWithdrawMethods}
                                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
                                    >
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                        <span className="text-sm font-medium">Back to {selectedWithdrawType === 'crypto' ? 'networks' : 'methods'}</span>
                                    </button>

                                    {/* Selected Method Display */}
                                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 mb-6 backdrop-blur-sm overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                                        <div className="flex items-center gap-6 relative z-10">
                                            <div className="w-24 aspect-[2/1] bg-white/10 rounded-lg flex items-center justify-center p-2 border border-white/10">
                                                <Image
                                                    src={`/assets/deposit/${selectedWithdrawMethod?.toLowerCase()}.png`}
                                                    alt={selectedWithdrawMethod || ''}
                                                    width={80}
                                                    height={40}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-400 mb-1">Withdrawing via</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-2xl font-bold text-white">{selectedWithdrawMethod}</p>
                                                    {selectedWithdrawChain && (
                                                        <span className="text-xs font-bold bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded border border-cyan-500/20">
                                                            {selectedWithdrawChain}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1">{selectedWithdrawType === 'epayment' ? 'E-Payment' : 'Cryptocurrency'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Available Balance */}
                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
                                        <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Available Balance</p>
                                        <p className="text-2xl font-bold text-white font-mono">${balance.toFixed(2)}</p>
                                    </div>

                                    {/* Amount Input */}
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
                                        <label className="text-sm text-slate-400 mb-4 block font-medium">
                                            Enter Amount ({selectedWithdrawType === 'epayment' ? 'BDT' : 'USD'})
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-slate-500">
                                                {selectedWithdrawType === 'epayment' ? '৳' : '$'}
                                            </span>
                                            <input
                                                type="number"
                                                value={withdrawAmount}
                                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                                placeholder="0.00"
                                                className="w-full bg-slate-900/50 border-2 border-slate-700 focus:border-blue-500 rounded-xl pl-14 pr-4 py-4 text-white text-3xl font-bold font-mono focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
                                            />
                                        </div>

                                        {/* Quick Amount Buttons */}
                                        <div className="grid grid-cols-4 gap-2 mt-4">
                                            {selectedWithdrawType === 'epayment'
                                                ? [100, 500, 1000, 5000].map((amount) => (
                                                    <button
                                                        key={amount}
                                                        onClick={() => setWithdrawAmount(amount.toString())}
                                                        className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 hover:border-blue-500/50 rounded-lg py-2.5 text-blue-400 text-sm font-bold transition-all hover:scale-105"
                                                    >
                                                        ৳{amount}
                                                    </button>
                                                ))
                                                : [10, 50, 100, 500].map((amount) => (
                                                    <button
                                                        key={amount}
                                                        onClick={() => setWithdrawAmount(amount.toString())}
                                                        className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg py-2.5 text-cyan-400 text-sm font-bold transition-all hover:scale-105"
                                                    >
                                                        ${amount}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    {/* Confirm Button */}
                                    <button
                                        onClick={handleWithdraw}
                                        disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold py-4 rounded-xl transition-all hover:shadow-2xl hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Confirm Withdrawal
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {activeSection === 'history' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-4xl"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Trade History</h2>
                                <div className="text-slate-400 text-xs">Last 30 days</div>
                            </div>

                            <div className="bg-[#1e1b2e]/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/5">
                                            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                                            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                                            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Profit/Loss</th>
                                            <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {tradeHistory.map((trade) => (
                                            <tr key={trade.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full ${trade.type === 'WIN' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'} flex items-center justify-center`}>
                                                            {trade.type === 'WIN' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                                        </div>
                                                        <span className={`text-sm font-bold ${trade.type === 'WIN' ? 'text-emerald-400' : 'text-red-400'}`}>{trade.type}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-slate-300 font-mono text-sm">${trade.amount.toFixed(2)}</td>
                                                <td className="p-4">
                                                    <div className={`font-mono font-bold text-sm ${trade.profit > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                                        {trade.profit > 0 ? '+' : ''}${trade.profit.toFixed(2)}
                                                        <span className="text-[10px] opacity-70 ml-1 font-normal text-slate-500">
                                                            ({trade.percentage > 0 ? '+' : ''}{trade.percentage.toFixed(1)}%)
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right text-xs text-slate-500 font-medium">{trade.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {activeSection === 'password' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-2xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>

                            <div className="bg-[#1e1b2e]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                                <div className="relative z-10">
                                    <div className="flex items-start gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                                            <Lock className="w-6 h-6 text-orange-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Change Password</h3>
                                            <p className="text-slate-400 text-sm mt-1">Ensure your account uses a long, random password to stay secure.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-5">
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Current Password</label>
                                            <input
                                                type="password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all placeholder:text-slate-600"
                                                placeholder="Enter current password"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">New Password</label>
                                                <input
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all placeholder:text-slate-600"
                                                    placeholder="Enter new password"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="w-full bg-[#13111c] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-all placeholder:text-slate-600"
                                                    placeholder="Confirm new password"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <button
                                                onClick={handlePasswordChange}
                                                disabled={!currentPassword || !newPassword || !confirmPassword}
                                                className="bg-orange-500 hover:bg-orange-600 disabled:bg-slate-700 disabled:text-slate-500 text-black font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
                                            >
                                                <ShieldCheck className="w-4 h-4" />
                                                Update Password
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeSection === 'email' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-2xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">My Profile</h2>

                            <div className="bg-[#1e1b2e]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-1 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent opacity-50"></div>
                                <div className="bg-[#13111c]/80 rounded-xl p-8 relative z-10 h-full">
                                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/5">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-[2px] shadow-2xl shadow-purple-500/20">
                                            <div className="w-full h-full rounded-full bg-[#13111c] flex items-center justify-center overflow-hidden">
                                                <User className="w-8 h-8 text-slate-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">{user?.name || 'User'}</h3>
                                            <p className="text-slate-400 flex items-center gap-2 text-sm mt-1">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                                Active Account
                                            </p>
                                        </div>
                                        {isEmailVerified && (
                                            <div className="ml-auto bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                <span className="text-sm font-bold text-emerald-400 uppercase tracking-wide">Verified</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid gap-6">
                                        <div className="group/field">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Full Name</label>
                                            <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3 text-slate-300">
                                                <User className="w-4 h-4 text-slate-500" />
                                                <span className="font-medium">{user?.name}</span>
                                                <Lock className="w-3 h-3 text-slate-600 ml-auto opacity-50" />
                                            </div>
                                        </div>

                                        <div className="group/field">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Email Address</label>
                                            <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 flex items-center justify-between">
                                                <div className="flex items-center gap-3 text-slate-300">
                                                    <Mail className="w-4 h-4 text-slate-500" />
                                                    <span className="font-medium">{user?.email}</span>
                                                </div>
                                                {!isEmailVerified && (
                                                    <button
                                                        onClick={() => setVerifyModalOpen(true)}
                                                        className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-lg shadow-pink-500/20"
                                                    >
                                                        Verify Now
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="group/field">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Country / Region</label>
                                            <div className="bg-white/5 border border-white/5 rounded-xl px-4 py-3 flex items-center gap-3 text-slate-300">
                                                <span className="text-lg">🌍</span>
                                                <span className="font-medium">{user?.country}</span>
                                                <Lock className="w-3 h-3 text-slate-600 ml-auto opacity-50" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                                        <p className="text-xs text-slate-600">
                                            To update locked information, please contact <span className="text-slate-400 hover:text-white cursor-pointer transition-colors underline decoration-slate-600">Customer Support</span>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* OTP Verification Modal */}
                    <AnimatePresence>
                        {isVerifyModalOpen && (
                            <OtpModal
                                isOpen={isVerifyModalOpen}
                                onClose={() => setVerifyModalOpen(false)}
                                email={user?.email || ''}
                                onVerified={handleEmailVerified}
                            />
                        )}
                    </AnimatePresence>
                </main>
            </div>

            {/* Bottom Navigation */}
            <BottomNav
                activeTab={activeTab}
                onTabChange={(tab) => {
                    setActiveTab(tab);
                    // Navigation is handled by Link in BottomNav
                }}
            />
        </div>
    );
}
