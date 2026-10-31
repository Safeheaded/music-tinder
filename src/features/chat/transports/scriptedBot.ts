import { createMessage } from '../createMessage';
import type { ChatEvent, ChatTransport } from './types';

const REPLIES = [
  'Cześć! Super, że się trafiliśmy. Od jak dawna grasz?',
  'Brzmi świetnie. Masz jakieś nagrania, które możesz podesłać?',
  'Chętnie się spotkam na próbie. Pasuje Ci weekend?',
  'Mam kilka pomysłów na wspólny kawałek, daj znać, kiedy możesz pogadać.',
  'Dzięki za rozmowę! Odezwę się, jak tylko ustalę termin.',
];

type ScriptedBotOptions = {
  typingDelayMs?: number;
  replyDelayMs?: number;
};

export const createScriptedBotTransport = ({
  typingDelayMs = 500,
  replyDelayMs = 1800,
}: ScriptedBotOptions = {}): ChatTransport => {
  const listeners = new Set<(event: ChatEvent) => void>();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  let sentCount = 0;

  const emit = (event: ChatEvent) =>
    listeners.forEach((listener) => listener(event));

  const later = (callback: () => void, delayMs: number) => {
    const timer = setTimeout(() => {
      timers.delete(timer);
      callback();
    }, delayMs);
    timers.add(timer);
  };

  return {
    send: () => {
      const reply = REPLIES[sentCount++ % REPLIES.length];
      later(() => emit({ type: 'typing', typing: true }), typingDelayMs);
      later(() => {
        emit({ type: 'typing', typing: false });
        emit({ type: 'message', message: createMessage('them', reply) });
      }, replyDelayMs);
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    close: () => {
      timers.forEach(clearTimeout);
      timers.clear();
      listeners.clear();
    },
  };
};
