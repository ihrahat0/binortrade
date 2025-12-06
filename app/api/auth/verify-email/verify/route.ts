import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
        }

        // Find user by email and include otp fields which are selected: false by default
        const user = await User.findOne({ email }).select('+otp +otpExpiry');

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        if (user.otp !== otp) {
            return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 });
        }

        if (user.otpExpiry < new Date()) {
            return NextResponse.json({ message: 'OTP expired' }, { status: 400 });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });

    } catch (error) {
        console.error('Verify OTP error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
