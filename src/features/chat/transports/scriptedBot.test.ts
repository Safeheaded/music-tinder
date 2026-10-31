import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createScriptedBotTransport } from './scriptedBot';
import type { ChatEvent } from './types';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const collect = () => {
  const transport = createScriptedBotTransport({
    typingDelayMs: 100,
    replyDelayMs: 300,
  });
  const events: ChatEvent[] = [];
  transport.subscribe((event) => events.push(event));
  return { transport, events };
};

describe('scripted bot transport', () => {
  it('shows typing and then replies', () => {
    const { transport, events } = collect();
    transport.send('Hej');

    vi.advanceTimersByTime(100);
    expect(events).toEqual([{ type: 'typing', typing: true }]);

    vi.advanceTimersByTime(200);
    expect(events.map(({ type }) => type)).toEqual([
      'typing',
      'typing',
      'message',
    ]);
  });

  it('cycles through different replies', () => {
    const { transport, events } = collect();
    transport.send('Hej');
    transport.send('Jak leci?');
    vi.advanceTimersByTime(300);

    const texts = events.flatMap((event) =>
      event.type === 'message' ? [event.message.text] : [],
    );
    expect(new Set(texts).size).toBe(2);
  });

  it('stops emitting after close', () => {
    const { transport, events } = collect();
    transport.send('Hej');
    transport.close();
    vi.advanceTimersByTime(1000);

    expect(events).toEqual([]);
  });
});
