import { describe, expect, it, vi } from 'vitest';
import { createSupabaseBroadcastTransport } from './supabaseBroadcast';
import type { ChatEvent } from './types';

type BroadcastHandler = (message: { payload: unknown }) => void;

const createFakeClient = () => {
  let onBroadcast: BroadcastHandler = () => {};
  let presence: Record<string, unknown> = {};
  const channel = {
    on: vi.fn((_type: string, _filter: unknown, handler: BroadcastHandler) => {
      onBroadcast = handler;
      return channel;
    }),
    subscribe: vi.fn(() => channel),
    track: vi.fn(),
    send: vi.fn(),
    presenceState: () => presence,
  };
  const client = {
    channel: vi.fn(() => channel),
    removeChannel: vi.fn(),
  };
  return {
    client: client as unknown as Parameters<
      typeof createSupabaseBroadcastTransport
    >[0],
    channel,
    receive: (payload: unknown) => onBroadcast({ payload }),
    setPresence: (keys: string[]) =>
      (presence = Object.fromEntries(keys.map((key) => [key, []]))),
  };
};

describe('supabase broadcast transport', () => {
  it('joins a room named after the profile', () => {
    const { client } = createFakeClient();
    createSupabaseBroadcastTransport(client, 'p01');

    expect(client.channel).toHaveBeenCalledWith('chat:p01', expect.anything());
  });

  it('broadcasts sent messages', () => {
    const { client, channel } = createFakeClient();
    createSupabaseBroadcastTransport(client, 'p01').send('Hej');

    expect(channel.send).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'broadcast',
        payload: expect.objectContaining({ text: 'Hej' }),
      }),
    );
  });

  it('delivers received broadcasts as messages from the peer', () => {
    const { client, receive } = createFakeClient();
    const transport = createSupabaseBroadcastTransport(client, 'p01');
    const events: ChatEvent[] = [];
    transport.subscribe((event) => events.push(event));

    receive({ id: 'm1', text: 'Cześć', sentAt: 1 });

    expect(events).toEqual([
      {
        type: 'message',
        message: { id: 'm1', text: 'Cześć', sentAt: 1, sender: 'them' },
      },
    ]);
  });

  it('reports a peer only when someone else is present', () => {
    const { client, setPresence } = createFakeClient();
    const transport = createSupabaseBroadcastTransport(client, 'p01');

    setPresence([]);
    expect(transport.hasPeer()).toBe(false);

    setPresence(['someone-else']);
    expect(transport.hasPeer()).toBe(true);
  });

  it('leaves the channel on close', () => {
    const { client, channel } = createFakeClient();
    createSupabaseBroadcastTransport(client, 'p01').close();

    expect(client.removeChannel).toHaveBeenCalledWith(channel);
  });
});
