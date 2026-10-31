import type { Report } from '@/features/moderation';

export const SEED_REPORTS: Report[] = [
  {
    id: 'seed-1',
    profileId: 'p03',
    reason: 'Spam',
    createdAt: Date.UTC(2026, 9, 28),
  },
  {
    id: 'seed-2',
    profileId: 'p08',
    reason: 'Fałszywy profil',
    createdAt: Date.UTC(2026, 9, 29),
  },
  {
    id: 'seed-3',
    profileId: 'p11',
    reason: 'Niewłaściwe treści',
    createdAt: Date.UTC(2026, 9, 30),
  },
];
