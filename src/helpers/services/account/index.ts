import request from '@/helpers/request';
import type { IFetchLoginData, IFetchLoginParams, IFetchRegisterData, IFetchRegisterParams } from './types';

export const fetchRegister = async (params: IFetchRegisterParams) =>
  await request.post<Result<IFetchRegisterData>>({ url: '/account/register', params });

export const fetchLogin = async (params: IFetchLoginParams) =>
  await request.post<Result<IFetchLoginData>>({ url: '/account/login', params });

export const fetchLogout = async () => {};
// export const fetchLogout = async () => await request.post({ url: '/account/logout' });

export const fetchQueryUserInfo = async () => await request.get({ url: '/account/get' });
// export const fetchQueryUserInfo = async () => await request.get({ url: '/account/get/:id' });

export const fetchQueryUserInfoList = async () => await request.get({ url: '/account/list' });

export const fetchEditUserInfo = async () => await request.post({ url: '/account/edit' });

export const fetchDeleteUser = async () => await request.delete({ url: '/account/delete' });
// export const fetchDeleteUser = async () => await request.delete({ url: '/account/delete/:id' });
