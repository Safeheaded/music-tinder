import { describe, expect, it, vi } from 'vitest';
import type { PeerAwareTransport } from './types';
import { withBotFallback } from './withBotFallback';

const createLive = (hasPeer: boolean): PeerAwareTransport => ({
  send: vi.fn(),
  subscribe: vi.fn(() => vi.fn()),
  close: vi.fn(),
  hasPeer: () => hasPeer,
});

const createBot = () => ({
  send: vi.fn(),
  subscribe: vi.fn(() => vi.fn()),
  close: vi.fn(),
});

describe('withBotFallback', () => {
  it('lets the bot answer when nobody else is in the room', () => {
    const live = createLive(false);
    const bot = createBot();
    withBotFallback(live, bot).send('Hej');

    expect(live.send).toHaveBeenCalledWith('Hej');
    expect(bot.send).toHaveBeenCalledWith('Hej');
  });

  it('keeps the bot silent when a human is present', () => {
    const live = createLive(true);
    const bot = createBot();
    withBotFallback(live, bot).send('Hej');

    expect(live.send).toHaveBeenCalledWith('Hej');
    expect(bot.send).not.toHaveBeenCalled();
  });

  it('closes both transports', () => {
    const live = createLive(false);
    const bot = createBot();
    withBotFallback(live, bot).close();

    expect(live.close).toHaveBeenCalled();
    expect(bot.close).toHaveBeenCalled();
  });
});
