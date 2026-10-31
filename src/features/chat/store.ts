import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatMessage } from './schemas';

type ChatState = {
  conversations: Record<string, ChatMessage[]>;
  append: (profileId: string, message: ChatMessage) => void;
  reset: () => void;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      conversations: {},
      append: (profileId, message) =>
        set((state) => ({
          conversations: {
            ...state.conversations,
            [profileId]: [...(state.conversations[profileId] ?? []), message],
          },
        })),
      reset: () => set({ conversations: {} }),
    }),
    { name: 'music-tinder-chat' },
  ),
);
