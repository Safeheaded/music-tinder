import { describe, expect, it } from 'vitest';
import { getProfiles } from './api/profiles';
import { filterProfiles, hasActiveFilters } from './filters';
import { EMPTY_FILTERS } from './schemas';

const profiles = getProfiles();

describe('filterProfiles', () => {
  it('returns everyone when no filter is set', () => {
    expect(filterProfiles(profiles, EMPTY_FILTERS)).toHaveLength(
      profiles.length,
    );
  });

  it('filters by role', () => {
    const result = filterProfiles(profiles, {
      ...EMPTY_FILTERS,
      role: 'DJ',
    });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.role === 'DJ')).toBe(true);
  });

  it('matches a genre among several', () => {
    const result = filterProfiles(profiles, {
      ...EMPTY_FILTERS,
      genre: 'Rock',
    });
    expect(result.every((p) => p.genres.includes('Rock'))).toBe(true);
  });

  it('combines filters with AND', () => {
    const result = filterProfiles(profiles, {
      role: 'Wokalista',
      genre: null,
      city: 'Kraków',
    });
    expect(result.map((p) => p.name)).toEqual(['Ola']);
  });

  it('returns nothing when filters exclude all', () => {
    expect(
      filterProfiles(profiles, { role: 'DJ', genre: 'Metal', city: 'Gdańsk' }),
    ).toEqual([]);
  });
});

describe('hasActiveFilters', () => {
  it('detects set filters', () => {
    expect(hasActiveFilters(EMPTY_FILTERS)).toBe(false);
    expect(hasActiveFilters({ ...EMPTY_FILTERS, city: 'Poznań' })).toBe(true);
  });
});
