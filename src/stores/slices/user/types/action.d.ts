import { type IUserInfo } from '@/helpers/services';

export interface UserAction {
  login: (name: string) => void;
  logout: () => void;
  setUserInfo: (payload: { userInfo: IUserInfo }) => void;
  setUserInfoModalOpen: (payload: { open: boolean }) => void;
}
