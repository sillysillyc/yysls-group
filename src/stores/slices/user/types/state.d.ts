import { type IUserInfo } from '@/helpers/services';

export type LoginTabKeys = 'login' | 'register';

export type UserState = {
  userInfo: IUserInfo | null;
  userInfoModalOpen: boolean;
  loginTabKey: LoginTabKeys;
};
