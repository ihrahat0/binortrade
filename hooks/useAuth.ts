import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
    _id: string;
    name: string;
    email: string;
    country?: string;
    referralCode?: string;
    role: string;
    balance: number;
    isVerified?: boolean;
    createdAt: string;
    updatedAt: string;
}

interface UseAuthOptions {
    requireAuth?: boolean;
    redirectTo?: string;
}

export function useAuth({ requireAuth = false, redirectTo = '/auth' }: UseAuthOptions = {}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/me');
                if (res.ok) {
                    const data = await res.json();
                    // Handle both wrapped and unwrapped responses to be safe, though API returns unwrapped
                    setUser(data.user || data);
                } else {
                    setUser(null);
                    if (requireAuth) {
                        router.push(redirectTo);
                    }
                }
            } catch (err) {
                console.error('Auth check failed', err);
                setUser(null);
                if (requireAuth) {
                    router.push(redirectTo);
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [requireAuth, redirectTo, router]);

    return { user, loading };
}
