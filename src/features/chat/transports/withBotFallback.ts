import type { ChatTransport, PeerAwareTransport } from './types';

/**
 * Sends through the live transport and lets the bot answer only when nobody
 * else is present in the room, so the demo never feels empty.
 */
export const withBotFallback = (
  live: PeerAwareTransport,
  bot: ChatTransport,
): ChatTransport => ({
  send: (text) => {
    live.send(text);
    if (!live.hasPeer()) bot.send(text);
  },
  subscribe: (listener) => {
    const unsubscribeLive = live.subscribe(listener);
    const unsubscribeBot = bot.subscribe(listener);
    return () => {
      unsubscribeLive();
      unsubscribeBot();
    };
  },
  close: () => {
    live.close();
    bot.close();
  },
});
