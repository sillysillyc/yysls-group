import request from '@/helpers/request';

export const fetchLogin = async () => {
  try {
    const res = await request.post({ url: '/user/login' });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const fetchLogout = async () => {
  try {
    const res = await request.post({ url: '/user/logout' });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const fetchQueryUserInfo = async () => {
  try {
    const res = await request.post({ url: '/user/info/query' });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const fetchEditUserInfo = async () => {
  try {
    const res = await request.post({ url: '/user/info/edit' });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
