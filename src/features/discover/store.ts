import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getProfiles } from './api/profiles';
import { EMPTY_FILTERS, type Filters, type SwipeDirection } from './schemas';

type DiscoverState = {
  decisions: Record<string, SwipeDirection>;
  matchIds: string[];
  filters: Filters;
  swipe: (profileId: string, direction: SwipeDirection) => boolean;
  setFilters: (filters: Filters) => void;
  reset: () => void;
};

const initialState = { decisions: {}, matchIds: [], filters: EMPTY_FILTERS };

export const useDiscoverStore = create<DiscoverState>()(
  persist(
    (set) => ({
      ...initialState,
      swipe: (profileId, direction) => {
        const profile = getProfiles().find(({ id }) => id === profileId);
        const isMatch = direction === 'like' && !!profile?.likesYouBack;
        set((state) => ({
          decisions: { ...state.decisions, [profileId]: direction },
          matchIds: isMatch ? [...state.matchIds, profileId] : state.matchIds,
        }));
        return isMatch;
      },
      setFilters: (filters) => set({ filters }),
      reset: () => set(initialState),
    }),
    { name: 'music-tinder-discover' },
  ),
);
