import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getSupabaseClient } from '@/lib/supabase/client';
import { createChatTransport } from './index';

vi.mock('@/lib/supabase/client', () => ({ getSupabaseClient: vi.fn() }));

const createFakeClient = () => {
  const channel = {
    on: vi.fn(() => channel),
    subscribe: vi.fn(() => channel),
    track: vi.fn(),
    send: vi.fn(),
    presenceState: () => ({}),
  };
  return { channel: vi.fn(() => channel), removeChannel: vi.fn() };
};

beforeEach(() => vi.mocked(getSupabaseClient).mockReset());

describe('createChatTransport', () => {
  it('stays with the bot without a room code', () => {
    const client = createFakeClient();
    vi.mocked(getSupabaseClient).mockReturnValue(client as never);

    createChatTransport({ profileId: 'p01', roomCode: null });

    expect(client.channel).not.toHaveBeenCalled();
  });

  it('stays with the bot when Supabase is not configured', () => {
    vi.mocked(getSupabaseClient).mockReturnValue(null);

    expect(() =>
      createChatTransport({ profileId: 'p01', roomCode: 'abc123' }),
    ).not.toThrow();
  });

  it('joins a private room named after the code and profile', () => {
    const client = createFakeClient();
    vi.mocked(getSupabaseClient).mockReturnValue(client as never);

    createChatTransport({ profileId: 'p01', roomCode: 'abc123' });

    expect(client.channel).toHaveBeenCalledWith(
      'chat:abc123:p01',
      expect.anything(),
    );
  });
});
