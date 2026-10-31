import type { SupabaseClient } from '@supabase/supabase-js';
import type { ChatMessage } from '../schemas';
import { createMessage } from '../createMessage';
import type { ChatEvent, PeerAwareTransport } from './types';

const MESSAGE_EVENT = 'message';

type MessagePayload = Pick<ChatMessage, 'id' | 'text' | 'sentAt'>;

export const createSupabaseBroadcastTransport = (
  client: Pick<SupabaseClient, 'channel' | 'removeChannel'>,
  roomId: string,
): PeerAwareTransport => {
  const listeners = new Set<(event: ChatEvent) => void>();
  const presenceKey = crypto.randomUUID();
  const channel = client.channel(`chat:${roomId}`, {
    config: { broadcast: { self: false }, presence: { key: presenceKey } },
  });

  const hasPeer = () =>
    Object.keys(channel.presenceState()).some((key) => key !== presenceKey);

  channel
    .on('broadcast', { event: MESSAGE_EVENT }, ({ payload }) => {
      const { id, text, sentAt } = payload as MessagePayload;
      const message: ChatMessage = { id, text, sentAt, sender: 'them' };
      listeners.forEach((listener) => listener({ type: 'message', message }));
    })
    .subscribe((status) => {
      if (status === 'SUBSCRIBED') void channel.track({});
    });

  return {
    send: (text) => {
      const { id, sentAt } = createMessage('me', text);
      const payload: MessagePayload = { id, text, sentAt };
      void channel.send({ type: 'broadcast', event: MESSAGE_EVENT, payload });
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    hasPeer,
    close: () => {
      listeners.clear();
      void client.removeChannel(channel);
    },
  };
};
