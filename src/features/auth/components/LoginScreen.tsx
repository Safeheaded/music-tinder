'use client';

import { useRouter } from 'next/navigation';
import { pl } from '@/messages/pl';
import { safeNextPath } from '../nextPath';
import { useAuthStore } from '../store';

export const LoginScreen = () => {
  const router = useRouter();
  const signInAsDemo = useAuthStore((state) => state.signInAsDemo);

  return (
    <section className="flex h-full flex-col justify-center gap-4 p-6">
      <h1 className="text-3xl font-bold text-white">{pl.auth.title}</h1>
      <p className="text-zinc-400">{pl.auth.subtitle}</p>
      <button
        disabled
        className="rounded-full bg-white py-3 font-medium text-zinc-900 disabled:opacity-40"
      >
        {pl.auth.google}
      </button>
      <button
        disabled
        className="rounded-full bg-zinc-800 py-3 font-medium text-white disabled:opacity-40"
      >
        {pl.auth.email}
      </button>
      <p className="text-center text-xs text-zinc-500">{pl.auth.mockupNote}</p>
      <button
        autoFocus
        onClick={() => {
          signInAsDemo();
          const next = new URLSearchParams(window.location.search).get('next');
          router.replace(safeNextPath(next));
        }}
        className="rounded-full bg-fuchsia-600 py-3 font-medium text-white"
      >
        {pl.auth.demo}
      </button>
    </section>
  );
};
