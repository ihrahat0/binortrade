'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ArrowDownToLine, ArrowUpFromLine, History, Lock, Mail, X, User, TrendingUp, TrendingDown } from 'lucide-react';

interface UserPanelProps {
    balance: number;
    onClose: () => void;
}

export default function UserPanel({ balance, onClose }: UserPanelProps) {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [depositAmount, setDepositAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('user@example.com');

    // Mock trade history data
    const tradeHistory = [
        { id: 1, type: 'WIN', amount: 50, profit: 25, date: '2025-12-03 20:15', percentage: 12.5 },
        { id: 2, type: 'LOSS', amount: 30, profit: -15, date: '2025-12-03 19:45', percentage: -8.3 },
        { id: 3, type: 'WIN', amount: 100, profit: 80, date: '2025-12-03 18:30', percentage: 18.2 },
        { id: 4, type: 'WIN', amount: 20, profit: 15, date: '2025-12-03 17:20', percentage: 15.0 },
        { id: 5, type: 'LOSS', amount: 75, profit: -40, date: '2025-12-03 16:10', percentage: -12.1 },
    ];

    const menuItems = [
        { id: 'deposit', icon: ArrowDownToLine, label: 'Deposit', color: 'emerald', description: 'Add funds to your account' },
        { id: 'withdraw', icon: ArrowUpFromLine, label: 'Withdraw', color: 'blue', description: 'Withdraw your earnings' },
        { id: 'history', icon: History, label: 'Trade History', color: 'purple', description: 'View your trading activity' },
        { id: 'password', icon: Lock, label: 'Change Password', color: 'orange', description: 'Update your password' },
        { id: 'email', icon: Mail, label: 'Email Settings', color: 'pink', description: 'Manage email preferences' },
    ];

    const handleDeposit = () => {
        console.log('Deposit:', depositAmount);
        setActiveModal(null);
        setDepositAmount('');
    };

    const handleWithdraw = () => {
        console.log('Withdraw:', withdrawAmount);
        setActiveModal(null);
        setWithdrawAmount('');
    };

    const handlePasswordChange = () => {
        console.log('Password change');
        setActiveModal(null);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleEmailUpdate = () => {
        console.log('Email update:', email);
        setActiveModal(null);
    };

    return (
        <>
            {/* Main Panel */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#0a0f1e] border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-b border-white/10 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Account</h2>
                                    <p className="text-sm text-slate-400">Manage your profile</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Balance Card */}
                        <div className="mt-6 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-4 shadow-lg shadow-emerald-500/20">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-emerald-200 text-xs font-medium uppercase tracking-wider">Total Balance</p>
                                    <p className="text-white text-3xl font-bold font-mono mt-1">${balance.toFixed(2)}</p>
                                </div>
                                <Wallet className="w-10 h-10 text-emerald-200" />
                            </div>
                        </div>
                    </div>

                    {/* Menu Grid */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveModal(item.id)}
                                        className={`
                                            group relative bg-gradient-to-br from-${item.color}-500/5 to-${item.color}-600/5 
                                            hover:from-${item.color}-500/10 hover:to-${item.color}-600/10
                                            border border-${item.color}-500/20 hover:border-${item.color}-500/40
                                            rounded-xl p-4 transition-all duration-200
                                            hover:shadow-lg hover:shadow-${item.color}-500/10
                                            hover:-translate-y-1
                                        `}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-12 h-12 rounded-lg bg-${item.color}-500/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                                <Icon className={`w-6 h-6 text-${item.color}-400`} />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h3 className="text-white font-semibold">{item.label}</h3>
                                                <p className="text-slate-400 text-xs mt-1">{item.description}</p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Modals */}
            <AnimatePresence>
                {/* Deposit Modal */}
                {activeModal === 'deposit' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0f1e] border border-emerald-500/20 rounded-2xl p-6 max-w-md w-full"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Deposit Funds</h3>
                                <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-slate-400 mb-2 block">Amount</label>
                                    <input
                                        type="number"
                                        value={depositAmount}
                                        onChange={(e) => setDepositAmount(e.target.value)}
                                        placeholder="Enter amount"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                                    />
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {[10, 50, 100, 500].map((amount) => (
                                        <button
                                            key={amount}
                                            onClick={() => setDepositAmount(amount.toString())}
                                            className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg py-2 text-emerald-400 text-sm font-medium transition-all"
                                        >
                                            ${amount}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={handleDeposit}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold py-3 rounded-lg transition-all"
                                >
                                    Confirm Deposit
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Withdraw Modal */}
                {activeModal === 'withdraw' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0f1e] border border-blue-500/20 rounded-2xl p-6 max-w-md w-full"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Withdraw Funds</h3>
                                <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                                    <p className="text-xs text-blue-400">Available Balance</p>
                                    <p className="text-xl font-bold text-white font-mono">${balance.toFixed(2)}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-slate-400 mb-2 block">Amount</label>
                                    <input
                                        type="number"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        placeholder="Enter amount"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    onClick={handleWithdraw}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all"
                                >
                                    Confirm Withdrawal
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Trade History Modal */}
                {activeModal === 'history' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0f1e] border border-purple-500/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Trade History</h3>
                                <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-2 overflow-y-auto max-h-[60vh]">
                                {tradeHistory.map((trade) => (
                                    <div
                                        key={trade.id}
                                        className={`
                                            bg-gradient-to-r ${trade.type === 'WIN' ? 'from-emerald-500/5 to-emerald-600/5 border-emerald-500/20' : 'from-red-500/5 to-red-600/5 border-red-500/20'}
                                            border rounded-lg p-4 flex items-center justify-between
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
                                                <p className={`font-semibold ${trade.type === 'WIN' ? 'text-emerald-400' : 'text-red-400'}`}>
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
                    </motion.div>
                )}

                {/* Change Password Modal */}
                {activeModal === 'password' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0f1e] border border-orange-500/20 rounded-2xl p-6 max-w-md w-full"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Change Password</h3>
                                <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-slate-400 mb-2 block">Current Password</label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Enter current password"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-400 mb-2 block">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-slate-400 mb-2 block">Confirm Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <button
                                    onClick={handlePasswordChange}
                                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all"
                                >
                                    Update Password
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Email Settings Modal */}
                {activeModal === 'email' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setActiveModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0a0f1e] border border-pink-500/20 rounded-2xl p-6 max-w-md w-full"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Email Settings</h3>
                                <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-slate-400 mb-2 block">Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-pink-500 focus:ring-pink-500" />
                                        <span className="text-sm text-slate-300">Trade notifications</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-pink-500 focus:ring-pink-500" />
                                        <span className="text-sm text-slate-300">Promotional emails</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-pink-500 focus:ring-pink-500" />
                                        <span className="text-sm text-slate-300">Weekly reports</span>
                                    </label>
                                </div>
                                <button
                                    onClick={handleEmailUpdate}
                                    className="w-full bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-500 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all"
                                >
                                    Save Settings
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
