'use client';

import { useChatStore } from '@/features/chat';
import { useDiscoverStore } from '@/features/discover';
import { useModerationStore } from '@/features/moderation';
import { pl } from '@/messages/pl';

export const ResetDemoButton = () => {
  const resetDiscover = useDiscoverStore((state) => state.reset);
  const resetChat = useChatStore((state) => state.reset);
  const resetModeration = useModerationStore((state) => state.reset);

  return (
    <button
      onClick={() => {
        resetDiscover();
        resetChat();
        resetModeration();
      }}
      className="text-xs text-zinc-400 underline"
    >
      {pl.common.reset}
    </button>
  );
};
