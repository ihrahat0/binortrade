'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface OtpModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    onVerified: () => void;
}

export default function OtpModal({ isOpen, onClose, email, onVerified }: OtpModalProps) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const hasFetched = useRef(false);

    useEffect(() => {
        // Auto-send OTP on mount, prevent double send in strict mode
        if (!hasFetched.current) {
            sendOtp();
            hasFetched.current = true;
        }
    }, []);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setInterval(() => setResendTimer(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [resendTimer]);

    const sendOtp = async () => {
        try {
            const res = await fetch('/api/auth/verify-email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            if (!res.ok) throw new Error('Failed to send OTP');
            setResendTimer(60);
        } catch (err) {
            setError('Failed to send verification code');
        }
    };

    const handleVerify = async () => {
        const code = otp.join('');
        if (code.length !== 6) return;

        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/verify-email/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: code })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Verification failed');

            setSuccess(true);
            setTimeout(() => {
                onVerified();
                onClose();
            }, 1500);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#1e1b2e] border border-white/10 rounded-2xl p-6 relative shadow-2xl"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                        <Mail className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Verify Your Email</h3>
                    <p className="text-slate-400 text-sm">
                        Enter the 6-digit code sent to <br />
                        <span className="text-white font-medium">{email}</span>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-3 mb-6">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {success ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 flex flex-col items-center gap-2 mb-6 animate-pulse">
                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                        <p className="text-emerald-400 font-bold">Verification Successful!</p>
                    </div>
                ) : (
                    <div className="flex justify-center gap-2 mb-8">
                        {otp.map((digit, i) => (
                            <input
                                key={i}
                                ref={el => inputRefs.current[i] = el}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                className="w-12 h-12 bg-[#13111c] border border-white/10 rounded-xl text-center text-xl font-bold text-white focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        ))}
                    </div>
                )}

                <button
                    onClick={handleVerify}
                    disabled={loading || success || otp.some(d => !d)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {loading ? 'Verifying...' : 'Verify Email'}
                </button>

                <div className="text-center mt-6">
                    <p className="text-slate-500 text-sm">
                        Didn't receive code?{' '}
                        {resendTimer > 0 ? (
                            <span className="text-slate-400">Resend in {resendTimer}s</span>
                        ) : (
                            <button
                                onClick={sendOtp}
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                            >
                                Resend
                            </button>
                        )}
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
