'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { pl } from '@/messages/pl';

const ITEMS = [
  { href: '/', label: pl.nav.discover },
  { href: '/chats', label: pl.nav.chats },
  { href: '/admin', label: pl.nav.admin },
] as const;

export const BottomNav = () => {
  const pathname = usePathname();

  if (pathname === '/login') return null;

  return (
    <nav
      aria-label={pl.nav.label}
      className="flex border-t border-white/10 bg-zinc-950 pb-[env(safe-area-inset-bottom)]"
    >
      {ITEMS.map(({ href, label }) => {
        const active =
          href === '/' ? pathname === '/' : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`flex-1 py-3 text-center text-sm ${
              active ? 'font-semibold text-fuchsia-400' : 'text-zinc-400'
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
};
