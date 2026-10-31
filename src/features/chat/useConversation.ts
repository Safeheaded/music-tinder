import { useEffect, useRef, useState } from 'react';
import { createMessage } from './createMessage';
import type { ChatMessage } from './schemas';
import { useChatStore } from './store';
import { createChatTransport } from './transports';
import type { ChatTransport, ChatTransportFactory } from './transports/types';

const NO_MESSAGES: ChatMessage[] = [];

export const useConversation = (
  profileId: string,
  transportFactory: ChatTransportFactory = createChatTransport,
) => {
  const messages = useChatStore(
    (state) => state.conversations[profileId] ?? NO_MESSAGES,
  );
  const append = useChatStore((state) => state.append);
  const [peerTyping, setPeerTyping] = useState(false);
  const transportRef = useRef<ChatTransport | null>(null);

  useEffect(() => {
    const transport = transportFactory(profileId);
    transportRef.current = transport;
    const unsubscribe = transport.subscribe((event) => {
      if (event.type === 'typing') setPeerTyping(event.typing);
      else append(profileId, event.message);
    });
    return () => {
      unsubscribe();
      transport.close();
      transportRef.current = null;
      setPeerTyping(false);
    };
  }, [profileId, transportFactory, append]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    append(profileId, createMessage('me', trimmed));
    transportRef.current?.send(trimmed);
  };

  return { messages, peerTyping, send };
};
