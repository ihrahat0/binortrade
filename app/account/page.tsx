'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowDownToLine, ArrowUpFromLine, History, Lock, Mail, TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import BottomNav from '@/components/game/BottomNav';

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

    // Email verification
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('user@example.com');
    const [balance] = useState(10000);

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
        { id: 'email', icon: Mail, label: 'Email', color: 'pink' },
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
        console.log('Deposit:', depositAmount, selectedPaymentMethod, selectedPaymentType, selectedChain);
        setDepositAmount('');
        setSelectedPaymentMethod(null);
        setSelectedPaymentType(null);
        setSelectedChain(null);
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

    const handlePasswordChange = () => {
        console.log('Password change');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleEmailUpdate = () => {
        console.log('Email update:', email);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0f172a] to-[#0a0f1e] flex flex-col pb-24 lg:pb-0">
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
                    </nav>
                </aside>

                {/* Content Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {activeSection === 'deposit' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-5xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Deposit Funds</h2>

                            {!selectedPaymentMethod ? (
                                <>
                                    {/* E-Payment Methods */}
                                    <div className="mb-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-1.5 h-6 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full shadow-lg shadow-emerald-500/50"></div>
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
                                                    onClick={() => handlePaymentMethodSelect(method.name, 'epayment')}
                                                    className={`
                                                        group relative bg-gradient-to-br ${method.gradient}
                                                        backdrop-blur-sm
                                                        border-2 border-white/10 hover:border-emerald-400/50
                                                        rounded-2xl p-5 transition-all duration-300
                                                        hover:shadow-2xl hover:shadow-emerald-500/20
                                                        overflow-hidden
                                                    `}
                                                >
                                                    {/* Glow effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/10 group-hover:via-emerald-500/5 group-hover:to-transparent transition-all duration-300"></div>

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
                                                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500/20 flex items-center justify-center transition-colors">
                                                                <ArrowDownToLine className="w-3.5 h-3.5 text-emerald-400" />
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
                                            <div className="w-1.5 h-6 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
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
                                                    onClick={() => handlePaymentMethodSelect(crypto.name, 'crypto')}
                                                    className={`
                                                        group relative bg-gradient-to-br ${crypto.gradient}
                                                        backdrop-blur-sm
                                                        border-2 border-white/10 hover:border-yellow-400/50
                                                        rounded-2xl p-5 transition-all duration-300
                                                        hover:shadow-2xl hover:shadow-yellow-500/20
                                                        overflow-hidden
                                                    `}
                                                >
                                                    {/* Glow effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/10 group-hover:via-yellow-500/5 group-hover:to-transparent transition-all duration-300"></div>

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
                                                            <div className="w-6 h-6 rounded-full bg-yellow-500/10 group-hover:bg-yellow-500/20 flex items-center justify-center transition-colors">
                                                                <ArrowDownToLine className="w-3.5 h-3.5 text-yellow-400" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : selectedPaymentType === 'crypto' && !selectedChain ? (
                                /* Chain Selection Screen */
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="max-w-2xl mx-auto"
                                >
                                    <button
                                        onClick={handleBackToMethods}
                                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
                                    >
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                        <span className="text-sm font-medium">Back to methods</span>
                                    </button>

                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold text-white mb-2">Select Network</h3>
                                        <p className="text-slate-400">Choose the network for your {selectedPaymentMethod} deposit</p>
                                    </div>

                                    <div className="grid gap-4">
                                        {cryptoChains[selectedPaymentMethod]?.map((chain) => (
                                            <motion.button
                                                key={chain}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleChainSelect(chain)}
                                                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/50 rounded-xl p-6 flex items-center justify-between group transition-all"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                                                    </div>
                                                    <div className="text-left">
                                                        <span className="text-lg font-bold text-white block">{chain}</span>
                                                        <span className="text-sm text-slate-400">Estimated arrival: 2-5 mins</span>
                                                    </div>
                                                </div>
                                                <ArrowDownToLine className="w-5 h-5 text-slate-500 group-hover:text-yellow-400 transition-colors" />
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
                                    {/* Back Button */}
                                    <button
                                        onClick={selectedPaymentType === 'crypto' ? handleBackToChains : handleBackToMethods}
                                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors group"
                                    >
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                        <span className="text-sm font-medium">Back to {selectedPaymentType === 'crypto' ? 'networks' : 'methods'}</span>
                                    </button>

                                    {/* Selected Method Display */}
                                    <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 mb-6 backdrop-blur-sm overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                                        <div className="flex items-center gap-6 relative z-10">
                                            <div className="w-24 aspect-[2/1] bg-white/10 rounded-lg flex items-center justify-center p-2 border border-white/10">
                                                <Image
                                                    src={`/assets/deposit/${selectedPaymentMethod?.toLowerCase()}.png`}
                                                    alt={selectedPaymentMethod || ''}
                                                    width={80}
                                                    height={40}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-400 mb-1">Depositing via</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-2xl font-bold text-white">{selectedPaymentMethod}</p>
                                                    {selectedChain && (
                                                        <span className="text-xs font-bold bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded border border-yellow-500/20">
                                                            {selectedChain}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500 mt-1">{selectedPaymentType === 'epayment' ? 'E-Payment' : 'Cryptocurrency'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Amount Input */}
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6">
                                        <label className="text-sm text-slate-400 mb-4 block font-medium">
                                            Enter Amount ({selectedPaymentType === 'epayment' ? 'BDT' : 'USD'})
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-slate-500">
                                                {selectedPaymentType === 'epayment' ? '৳' : '$'}
                                            </span>
                                            <input
                                                type="number"
                                                value={depositAmount}
                                                onChange={(e) => setDepositAmount(e.target.value)}
                                                placeholder="0.00"
                                                className="w-full bg-slate-900/50 border-2 border-slate-700 focus:border-emerald-500 rounded-xl pl-14 pr-4 py-4 text-white text-3xl font-bold font-mono focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all"
                                            />
                                        </div>

                                        {/* Quick Amount Buttons */}
                                        <div className="grid grid-cols-4 gap-2 mt-4">
                                            {selectedPaymentType === 'epayment'
                                                ? [100, 500, 1000, 5000].map((amount) => (
                                                    <button
                                                        key={amount}
                                                        onClick={() => setDepositAmount(amount.toString())}
                                                        className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 rounded-lg py-2.5 text-emerald-400 text-sm font-bold transition-all hover:scale-105"
                                                    >
                                                        ৳{amount}
                                                    </button>
                                                ))
                                                : [10, 50, 100, 500].map((amount) => (
                                                    <button
                                                        key={amount}
                                                        onClick={() => setDepositAmount(amount.toString())}
                                                        className="bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 hover:border-yellow-500/50 rounded-lg py-2.5 text-yellow-400 text-sm font-bold transition-all hover:scale-105"
                                                    >
                                                        ${amount}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    {/* Confirm Button */}
                                    <button
                                        onClick={handleDeposit}
                                        disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold py-4 rounded-xl transition-all hover:shadow-2xl hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Confirm Deposit
                                    </button>
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
                            <h2 className="text-2xl font-bold text-white mb-6">Trade History</h2>
                            <div className="space-y-2">
                                {tradeHistory.map((trade) => (
                                    <div
                                        key={trade.id}
                                        className={`
                                            bg-white/5 border rounded-lg p-4 flex items-center justify-between
                                            ${trade.type === 'WIN' ? 'border-emerald-500/20' : 'border-red-500/20'}
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg ${trade.type === 'WIN' ? 'bg-emerald-500/10' : 'bg-red-500/10'} flex items-center justify-center`}>
                                                {trade.type === 'WIN' ? (
                                                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                                                ) : (
                                                    <TrendingDown className="w-5 h-5 text-red-400" />
                                                )}
                                            </div>
                                            <div>
                                                <p className={`font-semibold text-sm ${trade.type === 'WIN' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                    {trade.type}
                                                </p>
                                                <p className="text-xs text-slate-500">{trade.date}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={`font-bold font-mono ${trade.type === 'WIN' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {trade.profit > 0 ? '+' : ''}${trade.profit.toFixed(2)}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                Bet: ${trade.amount} ({trade.percentage > 0 ? '+' : ''}{trade.percentage.toFixed(1)}%)
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {activeSection === 'password' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-2xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                                <div>
                                    <label className="text-sm text-slate-400 mb-2 block font-medium">Current Password</label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Enter current password"
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-400 mb-2 block font-medium">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-400 mb-2 block font-medium">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                                    />
                                </div>
                                <button
                                    onClick={handlePasswordChange}
                                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-2.5 rounded-lg transition-all"
                                >
                                    Update Password
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeSection === 'email' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-2xl"
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">Email & Notifications</h2>

                            {/* Email Verification Alert */}
                            {!isEmailVerified && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border-2 border-yellow-500/30 rounded-2xl p-6 mb-6 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-6 h-6 text-yellow-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-white mb-2">Verify Your Email</h3>
                                                <p className="text-sm text-slate-300 mb-4">
                                                    Your email address is not verified. Please verify your email to unlock all features and ensure account security.
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        console.log('Send verification email');
                                                        // In real app, this would send verification email
                                                    }}
                                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold px-6 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-yellow-500/30"
                                                >
                                                    Send Verification Email
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm text-slate-400 font-medium">Email Address</label>
                                        {isEmailVerified && (
                                            <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400 mb-3 font-medium">Preferences</p>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-pink-500 focus:ring-pink-500 cursor-pointer" />
                                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Trade notifications</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-pink-500 focus:ring-pink-500 cursor-pointer" />
                                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Promotional emails</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-pink-500 focus:ring-pink-500 cursor-pointer" />
                                            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Weekly reports</span>
                                        </label>
                                    </div>
                                </div>
                                <button
                                    onClick={handleEmailUpdate}
                                    className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 text-white font-semibold py-2.5 rounded-lg transition-all"
                                >
                                    Save Settings
                                </button>
                            </div>
                        </motion.div>
                    )}
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
