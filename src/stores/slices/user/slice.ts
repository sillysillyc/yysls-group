import type { UserSliceInfo, UserState } from './types';

export const loginTabKeys = {
  login: 'login',
  register: 'register',
} as const;

const initialUserState: UserState = {
  userInfo: null,
  userInfoModalOpen: false,
  loginTabKey: loginTabKeys.login,
};

export const createUserSlice = (set: any): UserSliceInfo => ({
  ...initialUserState,
  setUserInfo: ({ userInfo }) => {
    set({ userInfo });
  },
  setUserInfoModalOpen: ({ open }) => set({ userInfoModalOpen: open ?? false }),
  setLoginTabKey: ({ key }) => set({ loginTabKey: key }),
});
