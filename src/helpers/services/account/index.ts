import request from '@/helpers/request';
import { transformUTCDate } from '@/helpers/tools';

import type {
  IFetchEditUserInfoParams,
  IFetchLoginData,
  IFetchLoginParams,
  IFetchRegisterData,
  IFetchRegisterParams,
  IFetchQueryUserInfoData,
} from './types';

export const fetchRegister = async (params: IFetchRegisterParams) =>
  await request.post<Result<IFetchRegisterData>>({ url: '/account/register', params });

export const fetchLogin = async (params: IFetchLoginParams): Promise<Result<IFetchLoginData>> => {
  try {
    const result = await request.post<Result<IFetchLoginData>>({ url: '/account/login', params });
    const {
      data: {
        accountInfo: { createTime, updatedTime },
      },
    } = result;

    return Promise.resolve({
      ...result,
      data: {
        ...result.data,
        accountInfo: {
          ...result.data.accountInfo,
          createTime: transformUTCDate(createTime),
          updatedTime: transformUTCDate(updatedTime),
        },
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchQueryUserInfo = async (userId?: number): Promise<Result<IFetchQueryUserInfoData>> => {
  try {
    const url = typeof userId === 'number' ? `/account/info/${userId}` : '/account/info';
    const result = await request.get<Result<IFetchQueryUserInfoData>>({ url });
    return Promise.resolve({
      ...result,
      data: {
        ...result.data,
        createTime: transformUTCDate(result.data.createTime),
        updateTime: transformUTCDate(result.data.updateTime),
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchQueryUserInfoList = async () => await request.get({ url: '/account/list' });

export const fetchEditUserInfo = async (params: IFetchEditUserInfoParams) =>
  await request.post<PResult>({ url: '/account/edit', params });

export const fetchDeleteUser = async () => await request.delete({ url: '/account/delete' });
// export const fetchDeleteUser = async () => await request.delete({ url: '/account/delete/:id' });
