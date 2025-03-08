import { message } from 'antd';

export const handleError = (error: any) => {
  message.error(error.message);
};

export const handleStorage = {
  local: {
    set: (key: string, value: string) => {
      localStorage.setItem(key, value);
    },
    get: (key: string) => {
      return localStorage.getItem(key);
    },
    remove: (key: string) => {
      localStorage.removeItem(key);
    },
  },
  session: {
    set: (key: string, value: string) => {
      sessionStorage.setItem(key, value);
    },
    get: (key: string) => {
      return sessionStorage.getItem(key);
    },
    remove: (key: string) => {
      sessionStorage.removeItem(key);
    },
  },
};

export const randomString = (len = 32) => {
  let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let a = t.length;
  let str = '';
  for (let i = 0; i < len; i++) {
    str += t.charAt(Math.floor(Math.random() * a));
  }
  return str;
};

export const randomBase64Encode = (str: string) => randomString(5) + window.btoa(str);

export const randomBase64Decode = (str: string) => {
  if (str !== undefined) {
    return decodeURI(window.atob(str.substring(5)));
  }
  return '';
};
