'use client';

import Link from 'next/link';
import { selectMatches, useDiscoverStore } from '@/features/discover';
import { useHydrated } from '@/lib/use-hydrated';
import { pl } from '@/messages/pl';
import { useChatStore } from '../store';

export const ChatList = () => {
  const hydrated = useHydrated();
  const matchIds = useDiscoverStore((state) => state.matchIds);
  const conversations = useChatStore((state) => state.conversations);

  if (!hydrated) return null;

  const matches = selectMatches(matchIds);

  return (
    <section className="flex h-full flex-col gap-2 p-4">
      <h1 className="text-xl font-bold text-white">{pl.chat.listTitle}</h1>
      {matches.length === 0 ? (
        <p className="m-auto max-w-xs text-center text-sm text-zinc-400">
          {pl.chat.listEmpty}
        </p>
      ) : (
        <ul className="flex flex-col">
          {matches.map((profile) => {
            const last = conversations[profile.id]?.at(-1);
            return (
              <li key={profile.id}>
                <Link
                  href={`/chats/${profile.id}`}
                  className="flex items-center gap-3 rounded-xl p-2 hover:bg-white/5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={profile.avatar}
                    alt=""
                    className="size-12 rounded-full object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block font-medium text-white">
                      {profile.name}
                    </span>
                    <span className="block truncate text-sm text-zinc-400">
                      {last?.text ?? pl.chat.noMessagesYet}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
