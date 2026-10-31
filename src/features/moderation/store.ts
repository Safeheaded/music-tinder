import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Report, ReportReason } from './schemas';

type ModerationState = {
  blockedIds: string[];
  bannedIds: string[];
  reports: Report[];
  block: (profileId: string) => void;
  report: (profileId: string, reason: ReportReason) => void;
  toggleBan: (profileId: string) => void;
  reset: () => void;
};

const initialState = { blockedIds: [], bannedIds: [], reports: [] };

export const useModerationStore = create<ModerationState>()(
  persist(
    (set) => ({
      ...initialState,
      block: (profileId) =>
        set((state) => ({
          blockedIds: [...new Set([...state.blockedIds, profileId])],
        })),
      report: (profileId, reason) =>
        set((state) => ({
          reports: [
            ...state.reports,
            {
              id: crypto.randomUUID(),
              profileId,
              reason,
              createdAt: Date.now(),
            },
          ],
        })),
      toggleBan: (profileId) =>
        set((state) => ({
          bannedIds: state.bannedIds.includes(profileId)
            ? state.bannedIds.filter((id) => id !== profileId)
            : [...state.bannedIds, profileId],
        })),
      reset: () => set(initialState),
    }),
    { name: 'music-tinder-moderation' },
  ),
);
