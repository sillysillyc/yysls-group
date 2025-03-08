import type { UserSliceInfo, UserState } from './types';

const initialUserState: UserState = {
  username: null,
};

export const createUserSlice = (set: any): UserSliceInfo => ({
  ...initialUserState,
  login: (name) => {
    // set({ username: name });
    // localStorage.setItem('username', name);
  },
  logout: () => {
    set({ username: null });
    localStorage.removeItem('username');
  },
});
