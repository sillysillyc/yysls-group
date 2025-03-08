import { type IUserInfo } from '@/helpers/services';

export type UserState = {
  username: string | null;
  userInfo: IUserInfo | null;
  userInfoModalOpen: boolean;
};
