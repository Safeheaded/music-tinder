'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useHydrated } from '@/lib/use-hydrated';
import { useAuthStore } from '../store';

const LOGIN_PATH = '/login';

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const hydrated = useHydrated();
  const router = useRouter();
  const pathname = usePathname();
  const loggedIn = useAuthStore((state) => state.loggedIn);
  const blocked = hydrated && !loggedIn && pathname !== LOGIN_PATH;

  useEffect(() => {
    if (blocked) router.replace(LOGIN_PATH);
  }, [blocked, router]);

  if (!hydrated || blocked) return null;
  return children;
};
