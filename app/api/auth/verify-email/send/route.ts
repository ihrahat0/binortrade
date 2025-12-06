import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { sendOTP } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        const emailSent = await sendOTP(email, otp);

        if (!emailSent) {
            return NextResponse.json({ message: 'Failed to send OTP email' }, { status: 500 });
        }

        return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Send OTP error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
