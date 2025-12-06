'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Chrome, Globe, Eye, EyeOff, CheckCircle, ShieldCheck } from 'lucide-react';

type AuthMode = 'LOGIN' | 'SIGNUP';

export default function AuthForm() {
    const [mode, setMode] = useState<AuthMode>('SIGNUP');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        referralCode: ''
    });

    // Password Validation State
    const [passwordCriteria, setPasswordCriteria] = useState({
        length: false,
        upperLower: false,
        number: false
    });

    useEffect(() => {
        const { password } = formData;
        setPasswordCriteria({
            length: password.length >= 6,
            upperLower: /[a-z]/.test(password) && /[A-Z]/.test(password),
            number: /\d/.test(password)
        });
    }, [formData.password]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const toggleMode = () => {
        setMode(prev => prev === 'LOGIN' ? 'SIGNUP' : 'LOGIN');
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            country: '',
            referralCode: ''
        });
        setError('');
    };

    const handleSignup = async () => {
        setError('');
        setLoading(true);

        // Basic validation
        if (!passwordCriteria.length || !passwordCriteria.upperLower || !passwordCriteria.number || formData.password !== formData.confirmPassword) {
            setError("Please fix password issues before proceeding");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    country: formData.country,
                    referralCode: formData.referralCode
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            router.push('/account');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            router.push('/account');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const isPasswordValid = passwordCriteria.length && passwordCriteria.upperLower && passwordCriteria.number;

    return (
        <div className="w-full max-w-md relative z-10">
            <div className="bg-[#0a0f1e]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_20px_rgba(16,185,129,0.5)]"></div>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white font-mono tracking-tight mb-2">
                            {mode === 'LOGIN' ? 'WELCOME BACK' : 'INITIATE ACCESS'}
                        </h2>
                        <p className="text-slate-400 text-sm">
                            {mode === 'LOGIN'
                                ? 'Enter your credentials to access the terminal.'
                                : 'Create your institutional account.'}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-xs text-center font-mono">
                            {error}
                        </div>
                    )}

                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {mode === 'LOGIN' && (
                                <motion.div
                                    key="login"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                                        <InputGroup label="Email" icon={<Mail className="w-4 h-4" />}>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="input-field"
                                                placeholder="trader@evotrade.com"
                                                required
                                            />
                                        </InputGroup>
                                        <InputGroup label="Password" icon={<Lock className="w-4 h-4" />}>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="input-field pr-10"
                                                placeholder="••••••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </InputGroup>
                                        <div className="flex justify-end">
                                            <a href="#" className="text-xs text-emerald-500 hover:text-emerald-400 transition-colors">Forgot Password?</a>
                                        </div>
                                        <button
                                            disabled={loading}
                                            className="primary-button w-full flex items-center justify-center gap-2"
                                        >
                                            {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {mode === 'SIGNUP' && (
                                <motion.div
                                    key="signup"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputGroup label="Country" icon={<Globe className="w-4 h-4" />}>
                                                <select
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleInputChange}
                                                    className="input-field appearance-none"
                                                >
                                                    <option value="">Select Country</option>
                                                    <option value="United States">United States</option>
                                                    <option value="United Kingdom">United Kingdom</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="Australia">Australia</option>
                                                    <option value="Germany">Germany</option>
                                                    <option value="France">France</option>
                                                    <option value="Japan">Japan</option>
                                                    <option value="China">China</option>
                                                    <option value="India">India</option>
                                                    <option value="Brazile">Brazil</option>
                                                </select>
                                            </InputGroup>
                                            <InputGroup label="Full Name" icon={<User className="w-4 h-4" />}>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="input-field"
                                                    placeholder="John Doe"
                                                    required
                                                />
                                            </InputGroup>
                                        </div>

                                        <InputGroup label="Email" icon={<Mail className="w-4 h-4" />}>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="input-field"
                                                placeholder="trader@evotrade.com"
                                                required
                                            />
                                        </InputGroup>

                                        <div className="grid grid-cols-2 gap-4">
                                            <InputGroup label="Password" icon={<Lock className="w-4 h-4" />}>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="input-field pr-8"
                                                    placeholder="••••••"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                                </button>
                                            </InputGroup>
                                            <InputGroup label="Confirm" icon={<Lock className="w-4 h-4" />}>
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                    className="input-field pr-8"
                                                    placeholder="••••••"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                                >
                                                    {showConfirmPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                                </button>
                                            </InputGroup>
                                        </div>

                                        <div className="flex gap-3 text-[10px] font-mono">
                                            <Requirement label="6+ Chars" met={passwordCriteria.length} />
                                            <Requirement label="Upper & Lower" met={passwordCriteria.upperLower} />
                                            <Requirement label="Number" met={passwordCriteria.number} />
                                        </div>

                                        <InputGroup label="Referral Code (Optional)" icon={<ShieldCheck className="w-4 h-4" />}>
                                            <input
                                                type="text"
                                                name="referralCode"
                                                value={formData.referralCode}
                                                onChange={handleInputChange}
                                                className="input-field"
                                                placeholder="REF-123456"
                                            />
                                        </InputGroup>

                                        <button
                                            disabled={loading || !isPasswordValid || formData.password !== formData.confirmPassword}
                                            className={`w-full py-3 rounded-lg transition-all shadow-lg font-mono text-sm tracking-wide
                                                ${isPasswordValid && formData.password === formData.confirmPassword
                                                    ? 'primary-button'
                                                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'}
                                            `}
                                        >
                                            {loading ? 'INITIALIZING...' : 'INITIALIZE ACCOUNT'}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-[#0a0f1e] text-slate-500 uppercase tracking-wider">Or continue with</span>
                        </div>
                    </div>

                    <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-3 font-mono text-sm">
                        <Chrome className="w-5 h-5" />
                        GOOGLE
                    </button>

                    <div className="mt-8 text-center">
                        <p className="text-slate-400 text-sm">
                            {mode === 'LOGIN' ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={toggleMode}
                                className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors ml-1"
                            >
                                {mode === 'LOGIN' ? 'Sign Up' : 'Log In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const InputGroup = ({ label, icon, children }: { label: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">{label}</label>
        <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors pointer-events-none">
                {icon}
            </div>
            {children}
        </div>
    </div>
);

const Requirement = ({ label, met }: { label: string, met: boolean }) => (
    <div className={`flex items-center gap-1 transition-colors ${met ? 'text-emerald-400' : 'text-slate-600'}`}>
        <CheckCircle className={`w-3 h-3 ${met ? 'opacity-100' : 'opacity-0'}`} />
        <span>{label}</span>
    </div>
);
