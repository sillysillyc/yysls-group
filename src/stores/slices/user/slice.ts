import { type Mutate, type StoreApi } from 'zustand';
import type { UserSliceInfo, UserState } from './types';
import { type ZustandMiddleWares } from '@/stores/types';

export const loginTabKeys = {
  login: 'login',
  register: 'register',
} as const;

const initialUserState: UserState = {
  userInfo: null,
  userInfoModalOpen: false,
  loginTabKey: loginTabKeys.login,
  editUserInfoModalOpen: false,
};

export const createUserSlice = (
  set: Get<Mutate<StoreApi<UserSliceInfo>, ZustandMiddleWares>, 'setState', never>
): UserSliceInfo => ({
  ...initialUserState,
  setUserInfo: ({ userInfo }) => {
    set({ userInfo: { ...userInfo } });
  },
  setUserInfoModalOpen: ({ open }) => set({ userInfoModalOpen: open ?? false }),
  setLoginTabKey: ({ key }) => set({ loginTabKey: key }),
  setEditUserInfoModalOpen: ({ open }) => set({ editUserInfoModalOpen: open ?? false }),
});
