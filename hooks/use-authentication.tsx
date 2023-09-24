import { IProvider } from '@web3auth/base';
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { create } from 'zustand';

interface useAuthenticationStore {
	web3auth: Web3AuthNoModal | null;
	provider: IProvider | null;
	loggedIn: boolean | null;

	setWeb3auth: (web3Auth: Web3AuthNoModal) => void;
  setProvider: (provider: IProvider | null) => void;
  setLoggedIn: (loggedIn: boolean | null) => void;
}

export const useAuthentication = create<useAuthenticationStore>((set) => ({
	web3auth: null,
  provider: null,
  loggedIn: null,

	setWeb3auth: (web3auth: Web3AuthNoModal) => set({ web3auth }),
  setProvider: (provider: IProvider | null) => set({ provider }),
  setLoggedIn: (loggedIn) => set({ loggedIn }),
}));
