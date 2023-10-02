import { create } from 'zustand';

interface useAuthenticationStore {
	loggedIn: boolean | null;

  setLoggedIn: (loggedIn: boolean | null) => void;
}

export const useAuthentication = create<useAuthenticationStore>((set) => ({
  loggedIn: null,

  setLoggedIn: (loggedIn) => set({ loggedIn }),
}));
