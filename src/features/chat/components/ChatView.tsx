'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { selectProfile } from '@/features/discover';
import { useHydrated } from '@/lib/use-hydrated';
import { pl } from '@/messages/pl';
import { useConversation } from '../useConversation';
import type { ChatTransportFactory } from '../transports/types';

type ChatViewProps = {
  profileId: string;
  transportFactory?: ChatTransportFactory;
};

export const ChatView = ({ profileId, transportFactory }: ChatViewProps) => {
  const hydrated = useHydrated();
  const profile = selectProfile(profileId);
  const { messages, peerTyping, send } = useConversation(
    profileId,
    transportFactory,
  );
  const [draft, setDraft] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView?.({ behavior: 'smooth' });
  }, [messages.length, peerTyping]);

  if (!hydrated) return null;
  if (!profile) return <p className="p-4 text-zinc-400">{pl.chat.notFound}</p>;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    send(draft);
    setDraft('');
  };

  return (
    <section className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-white/10 p-3">
        <Link href="/chats" aria-label={pl.chat.back} className="px-2 text-xl">
          ←
        </Link>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.avatar}
          alt=""
          className="size-10 rounded-full object-cover"
        />
        <div>
          <h1 className="font-semibold text-white">{profile.name}</h1>
          <p className="text-xs text-zinc-400">{profile.role}</p>
        </div>
      </header>
      <ol
        aria-label={pl.chat.messages}
        className="flex flex-1 flex-col gap-2 overflow-y-auto p-4"
      >
        {messages.length === 0 && (
          <li className="m-auto text-sm text-zinc-500">
            {pl.chat.startHint(profile.name)}
          </li>
        )}
        {messages.map((message) => (
          <li
            key={message.id}
            className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
              message.sender === 'me'
                ? 'self-end bg-fuchsia-600 text-white'
                : 'self-start bg-zinc-800 text-zinc-100'
            }`}
          >
            {message.text}
          </li>
        ))}
        {peerTyping && (
          <li className="self-start text-xs text-zinc-400" role="status">
            {pl.chat.typing(profile.name)}
          </li>
        )}
        <div ref={endRef} />
      </ol>
      <form onSubmit={handleSubmit} className="flex gap-2 p-3">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={pl.chat.placeholder}
          aria-label={pl.chat.placeholder}
          className="min-w-0 flex-1 rounded-full bg-zinc-800 px-4 py-3 text-sm text-white"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="rounded-full bg-fuchsia-600 px-5 text-sm font-medium text-white disabled:opacity-40"
        >
          {pl.chat.send}
        </button>
      </form>
    </section>
  );
};
