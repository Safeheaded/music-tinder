'use client';

import { selectProfile } from '@/features/discover';
import { useModerationStore } from '@/features/moderation';
import { useHydrated } from '@/lib/use-hydrated';
import { pl } from '@/messages/pl';
import { SEED_REPORTS } from '../seedReports';

export const AdminScreen = () => {
  const hydrated = useHydrated();
  const { reports, bannedIds, toggleBan } = useModerationStore();

  if (!hydrated) return null;

  const allReports = [...SEED_REPORTS, ...reports];

  return (
    <section className="flex h-full flex-col gap-3 overflow-y-auto p-4">
      <h1 className="text-xl font-bold text-white">{pl.admin.title}</h1>
      <p className="text-xs text-zinc-500">{pl.admin.note}</p>
      <ul className="flex flex-col gap-2">
        {allReports.map(({ id, profileId, reason, createdAt }) => {
          const profile = selectProfile(profileId);
          const banned = bannedIds.includes(profileId);
          return (
            <li
              key={id}
              className="flex items-center justify-between gap-3 rounded-xl bg-zinc-900 p-3"
            >
              <div className="min-w-0">
                <p className="font-medium text-white">
                  {profile?.name ?? profileId}
                </p>
                <p className="text-sm text-zinc-400">{reason}</p>
                <p className="text-xs text-zinc-500">
                  {new Date(createdAt).toLocaleDateString('pl-PL')}
                </p>
              </div>
              <button
                onClick={() => toggleBan(profileId)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  banned ? 'bg-zinc-700 text-zinc-200' : 'bg-red-600 text-white'
                }`}
              >
                {banned ? pl.admin.unban : pl.admin.ban}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
