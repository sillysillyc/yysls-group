import { type LoginTabKeys } from './state';
import { type IUserInfo } from '@/helpers/services';

export interface UserAction {
  setUserInfo: (payload: { userInfo: IUserInfo }) => void;
  setUserInfoModalOpen: (payload: { open: boolean }) => void;
  setLoginTabKey: (payload: { key: LoginTabKeys }) => void;
}
