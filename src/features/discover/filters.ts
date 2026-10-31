import type { Filters, Profile } from './schemas';

export const filterProfiles = (profiles: Profile[], filters: Filters) =>
  profiles.filter(
    ({ role, genres, city }) =>
      (!filters.role || role === filters.role) &&
      (!filters.genre || genres.includes(filters.genre)) &&
      (!filters.city || city === filters.city),
  );

export const hasActiveFilters = (filters: Filters) =>
  Object.values(filters).some(Boolean);
