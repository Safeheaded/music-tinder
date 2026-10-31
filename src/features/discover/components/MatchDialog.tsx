import Link from 'next/link';
import { pl } from '@/messages/pl';
import type { Profile } from '../schemas';

type MatchDialogProps = {
  profile: Profile;
  onClose: () => void;
};

export const MatchDialog = ({ profile, onClose }: MatchDialogProps) => (
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="match-title"
    className="fixed inset-0 z-10 flex items-center justify-center bg-black/80 p-6"
  >
    <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-zinc-900 p-8 text-center ring-1 ring-white/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={profile.avatar}
        alt=""
        className="size-28 rounded-full object-cover ring-4 ring-fuchsia-500"
      />
      <h2 id="match-title" className="text-3xl font-bold text-white">
        {pl.discover.match.title}
      </h2>
      <p className="text-zinc-300">
        {pl.discover.match.description(profile.name)}
      </p>
      <Link
        href={`/chats/${profile.id}`}
        autoFocus
        className="w-full rounded-full bg-fuchsia-600 py-3 font-medium text-white"
      >
        {pl.discover.match.message}
      </Link>
      <button onClick={onClose} className="text-sm text-zinc-400 underline">
        {pl.discover.match.continue}
      </button>
    </div>
  </div>
);
