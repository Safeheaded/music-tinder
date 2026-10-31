import { beforeEach, describe, expect, it } from 'vitest';
import { useModerationStore } from './store';

const { getState } = useModerationStore;

beforeEach(() => getState().reset());

describe('moderation store', () => {
  it('blocks a profile only once', () => {
    getState().block('p01');
    getState().block('p01');
    expect(getState().blockedIds).toEqual(['p01']);
  });

  it('records reports with their reason', () => {
    getState().report('p02', 'Spam');
    expect(getState().reports).toMatchObject([
      { profileId: 'p02', reason: 'Spam' },
    ]);
  });

  it('toggles a ban on and off', () => {
    getState().toggleBan('p03');
    expect(getState().bannedIds).toEqual(['p03']);
    getState().toggleBan('p03');
    expect(getState().bannedIds).toEqual([]);
  });
});
