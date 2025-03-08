import request from '@/helpers/request';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import type { IFetchLoginData, IFetchLoginParams, IFetchRegisterData, IFetchRegisterParams } from './types';

dayjs.extend(utc);

export const fetchRegister = async (params: IFetchRegisterParams) =>
  await request.post<Result<IFetchRegisterData>>({ url: '/account/register', params });

export const fetchLogin = async (params: IFetchLoginParams) => {
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
          createTime: dayjs.utc(createTime).local().format('YYYY-MM-DD HH:mm:ss'),
          updatedTime: dayjs.utc(updatedTime).local().format('YYYY-MM-DD HH:mm:ss'),
        },
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchQueryUserInfo = async () => await request.get({ url: '/account/get' });
// export const fetchQueryUserInfo = async () => await request.get({ url: '/account/get/:id' });

export const fetchQueryUserInfoList = async () => await request.get({ url: '/account/list' });

export const fetchEditUserInfo = async () => await request.post({ url: '/account/edit' });

export const fetchDeleteUser = async () => await request.delete({ url: '/account/delete' });
// export const fetchDeleteUser = async () => await request.delete({ url: '/account/delete/:id' });
