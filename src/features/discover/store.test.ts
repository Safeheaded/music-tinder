import { beforeEach, describe, expect, it } from 'vitest';
import { useDiscoverStore } from './store';

const { getState } = useDiscoverStore;

beforeEach(() => getState().reset());

describe('discover store', () => {
  it('reports a match when a profile that likes you back is liked', () => {
    expect(getState().swipe('p01', 'like')).toBe(true);
    expect(getState().matchIds).toEqual(['p01']);
  });

  it('does not match when the profile does not like you back', () => {
    expect(getState().swipe('p03', 'like')).toBe(false);
    expect(getState().matchIds).toEqual([]);
  });

  it('does not match on pass', () => {
    expect(getState().swipe('p01', 'pass')).toBe(false);
    expect(getState().decisions).toEqual({ p01: 'pass' });
  });

  it('reset restores the initial state', () => {
    getState().swipe('p01', 'like');
    getState().reset();
    expect(getState().decisions).toEqual({});
    expect(getState().matchIds).toEqual([]);
  });
});
