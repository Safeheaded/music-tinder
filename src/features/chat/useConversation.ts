import { useEffect, useRef, useState } from 'react';
import { createMessage } from './createMessage';
import { conversationKey } from './roomCode';
import type { ChatMessage } from './schemas';
import { useChatStore } from './store';
import { createChatTransport } from './transports';
import type { ChatTransport, ChatTransportFactory } from './transports/types';

const NO_MESSAGES: ChatMessage[] = [];

type UseConversationOptions = {
  profileId: string;
  roomCode: string | null;
  transportFactory?: ChatTransportFactory;
};

export const useConversation = ({
  profileId,
  roomCode,
  transportFactory = createChatTransport,
}: UseConversationOptions) => {
  const key = conversationKey(profileId, roomCode);
  const messages = useChatStore(
    (state) => state.conversations[key] ?? NO_MESSAGES,
  );
  const append = useChatStore((state) => state.append);
  const [peerTyping, setPeerTyping] = useState(false);
  const transportRef = useRef<ChatTransport | null>(null);

  useEffect(() => {
    const transport = transportFactory({ profileId, roomCode });
    transportRef.current = transport;
    const unsubscribe = transport.subscribe((event) => {
      if (event.type === 'typing') setPeerTyping(event.typing);
      else append(key, event.message);
    });
    return () => {
      unsubscribe();
      transport.close();
      transportRef.current = null;
      setPeerTyping(false);
    };
  }, [profileId, roomCode, key, transportFactory, append]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    append(key, createMessage('me', trimmed));
    transportRef.current?.send(trimmed);
  };

  return { messages, peerTyping, send };
};
