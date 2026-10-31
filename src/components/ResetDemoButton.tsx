'use client';

import { useChatStore } from '@/features/chat';
import { useDiscoverStore } from '@/features/discover';
import { pl } from '@/messages/pl';

export const ResetDemoButton = () => {
  const resetDiscover = useDiscoverStore((state) => state.reset);
  const resetChat = useChatStore((state) => state.reset);

  return (
    <button
      onClick={() => {
        resetDiscover();
        resetChat();
      }}
      className="text-xs text-zinc-400 underline"
    >
      {pl.common.reset}
    </button>
  );
};
