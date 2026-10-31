import type { ChatMessage } from '../schemas';

export type ChatEvent =
  | { type: 'message'; message: ChatMessage }
  | { type: 'typing'; typing: boolean };

/**
 * Connection to the other side of a conversation. Listeners receive only
 * events coming from the peer; the sender renders its own messages locally.
 */
export interface ChatTransport {
  send: (text: string) => void;
  subscribe: (listener: (event: ChatEvent) => void) => () => void;
  close: () => void;
}

export type ChatTransportFactory = (profileId: string) => ChatTransport;
