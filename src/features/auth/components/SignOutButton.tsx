'use client';

import { useRouter } from 'next/navigation';
import { useHydrated } from '@/lib/use-hydrated';
import { pl } from '@/messages/pl';
import { useAuthStore } from '../store';

export const SignOutButton = () => {
  const router = useRouter();
  const hydrated = useHydrated();
  const { loggedIn, signOut } = useAuthStore();

  if (!hydrated || !loggedIn) return null;

  return (
    <button
      onClick={() => {
        signOut();
        router.replace('/login');
      }}
      className="text-xs text-zinc-400 underline"
    >
      {pl.auth.signOut}
    </button>
  );
};
