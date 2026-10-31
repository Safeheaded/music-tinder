import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  loggedIn: boolean;
  signInAsDemo: () => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      loggedIn: false,
      signInAsDemo: () => set({ loggedIn: true }),
      signOut: () => set({ loggedIn: false }),
    }),
    { name: 'music-tinder-auth' },
  ),
);
