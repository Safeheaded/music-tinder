import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { BottomNav } from '@/components/BottomNav';
import { ResetDemoButton } from '@/components/ResetDemoButton';
import { pl } from '@/messages/pl';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: pl.appName,
  description: 'Networking dla muzyków - swipe, match i czat',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <div className="mx-auto flex h-dvh max-w-md flex-col">
          <header className="flex items-center justify-between px-4 pt-4">
            <span className="text-xl font-bold text-white">{pl.appName}</span>
            <span className="flex items-center gap-3">
              <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] tracking-wide text-zinc-300 uppercase">
                {pl.common.mockup}
              </span>
              <ResetDemoButton />
            </span>
          </header>
          <div className="min-h-0 flex-1">{children}</div>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
