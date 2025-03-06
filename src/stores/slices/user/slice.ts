import { UserSliceInfo } from './types';

export const createUserSlice = (set: any): UserSliceInfo => ({
  username: localStorage.getItem('username'),
  login: (name) => {
    set({ username: name });
    localStorage.setItem('username', name);
  },
  logout: () => {
    set({ username: null });
    localStorage.removeItem('username');
  },
});
