import { getProfiles } from './api/profiles';
import { filterProfiles } from './filters';
import type { Filters, Profile, SwipeDirection } from './schemas';

export const selectDeck = (
  decisions: Record<string, SwipeDirection>,
  filters: Filters,
  blockedIds: string[],
): Profile[] =>
  filterProfiles(getProfiles(), filters).filter(
    ({ id }) => !decisions[id] && !blockedIds.includes(id),
  );

export const selectMatches = (
  matchIds: string[],
  blockedIds: string[],
): Profile[] =>
  getProfiles().filter(
    ({ id }) => matchIds.includes(id) && !blockedIds.includes(id),
  );

export const selectProfile = (profileId: string): Profile | undefined =>
  getProfiles().find(({ id }) => id === profileId);
