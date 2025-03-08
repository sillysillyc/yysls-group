import type { UserSliceInfo, UserState } from './types';

const initialUserState: UserState = {
  username: null,
  userInfo: null,
  userInfoModalOpen: false,
};

export const createUserSlice = (set: any): UserSliceInfo => ({
  ...initialUserState,
  login: (name) => {
    // set({ username: name });
  },
  logout: () => {
    set({ username: null });
  },
  setUserInfo: ({ userInfo }) => {
    set({ userInfo });
  },
  setUserInfoModalOpen: ({ open }) => set({ userInfoModalOpen: open ?? false }),
});
