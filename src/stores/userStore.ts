import { create } from 'zustand';

type UserState = {
  username: string | null;
  login: (name: string) => void;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  username: localStorage.getItem('username'),
  login: (name) => {
    set({ username: name });
    localStorage.setItem('username', name);
  },
  logout: () => {
    set({ username: null });
    localStorage.removeItem('username');
  }
}));