import { getProfiles } from './api/profiles';
import { filterProfiles } from './filters';
import type { Filters, Profile, SwipeDirection } from './schemas';

export const selectDeck = (
  decisions: Record<string, SwipeDirection>,
  filters: Filters,
): Profile[] =>
  filterProfiles(getProfiles(), filters).filter(({ id }) => !decisions[id]);

export const selectMatches = (matchIds: string[]): Profile[] =>
  getProfiles().filter(({ id }) => matchIds.includes(id));

export const selectProfile = (profileId: string): Profile | undefined =>
  getProfiles().find(({ id }) => id === profileId);
