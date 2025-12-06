import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default_secret_please_change_in_production'
);

export async function POST(req: Request) {
    try {
        const { currentPassword, newPassword } = await req.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json(
                { message: 'Current and new password are required' },
                { status: 400 }
            );
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { message: 'New password must be at least 6 characters' },
                { status: 400 }
            );
        }

        const cookieStore = await cookies();
        const token = cookieStore.get('token');

        if (!token) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }

        const { payload } = await jwtVerify(token.value, JWT_SECRET);

        await dbConnect();
        const user = await User.findById(payload.id);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return NextResponse.json({ message: 'Incorrect current password' }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });

    } catch (error) {
        console.error('Change password error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
