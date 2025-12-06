import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default_secret_please_change_in_production'
);

export async function POST(req: Request) {
    try {
        await dbConnect();

        const { name, email, password, country, referralCode } = await req.json();

        // Validation
        if (!email || !password || !name) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return NextResponse.json(
                { message: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            country,
            referralCode
        });

        if (user) {
            // Generate token
            const token = await new SignJWT({ id: user._id.toString(), email: user.email })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('30d') // Persistent login
                .sign(JWT_SECRET);

            // Set Cookie
            const cookieStore = await cookies();
            cookieStore.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60, // 30 days
                path: '/',
            });

            return NextResponse.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token
            }, { status: 201 });
        } else {
            return NextResponse.json(
                { message: 'Invalid user data' },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { message: 'Server error' },
            { status: 500 }
        );
    }
}
