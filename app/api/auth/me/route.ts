import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default_secret_please_change_in_production'
);

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');

        if (!token) {
            return NextResponse.json(
                { message: 'Not authenticated' },
                { status: 401 }
            );
        }

        const { payload } = await jwtVerify(token.value, JWT_SECRET);

        await dbConnect();
        const user = await User.findById(payload.id).select('-password');

        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.error('Me error:', error);
        return NextResponse.json(
            { message: 'Not authenticated' },
            { status: 401 }
        );
    }
}
