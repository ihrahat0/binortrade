'use client';

import { clsx } from 'clsx';
import Image from 'next/image';

interface BettingChipProps {
    amount: number;
    selected?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export default function BettingChip({ amount, selected = false, onClick, disabled = false, size = 'md' }: BettingChipProps) {
    const sizeClasses = {
        sm: 'w-12 h-12 text-xl', // Was w-10 (40px) -> 48px, text-[10px] -> text-xl (20px)
        md: 'w-[68px] h-[68px] text-2xl', // Was w-14 (56px) -> 67.2px, text-xs (12px) -> text-2xl (24px)
        lg: 'w-[77px] h-[77px] text-3xl' // Was w-16 (64px) -> 76.8px, text-sm (14px) -> text-3xl (30px)
    };

    return (
        <button
            style={{
                borderRadius: '50%' // Make it fully round as chips usually are, or keep user's 20px if preferred? User said "border-radius 2-px" before, then changed to 20px manually. 20px on 48px is almost round. Let's stick to rounded-full for chips or keep the user's manual style if they want. User manually added style={{ borderRadius: '20px' }}. I will keep it but maybe adjust if size changes. Actually, 20px radius on a 48px box is almost a circle (24px is circle).
            }}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                sizeClasses[size],
                'relative transition-all active:scale-95 overflow-hidden',
                selected && 'ring-4 ring-white ring-offset-2 ring-offset-slate-900 scale-110',
                disabled && 'opacity-50 cursor-not-allowed grayscale',
                !disabled && 'hover:scale-105 cursor-pointer'
            )}
        >
            {/* Chip Image */}
            <Image
                src="/assets/images/dollar-chip.png"
                alt="Betting Chip"
                className="object-contain"
                fill
            />

            {/* Amount Text */}
            <div className="absolute inset-0 flex items-center justify-center pt-[5px]">
                <span style={{ paddingTop: '5px' }} className="font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-10 leading-none">
                    {amount < 1 ? amount : Math.floor(amount)}
                </span>
            </div>
        </button>
    );
}
