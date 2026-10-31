import type { ChatMessage } from './schemas';

export const createMessage = (
  sender: ChatMessage['sender'],
  text: string,
): ChatMessage => ({
  id: crypto.randomUUID(),
  sender,
  text,
  sentAt: Date.now(),
});
