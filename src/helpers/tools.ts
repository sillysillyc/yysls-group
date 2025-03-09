import { message } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const handleError = (error: any) => {
  import.meta.env.MODE === 'development' && console.trace(error);
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

export const randomBase64Encode = (str: string) => {
  let encodedStr = randomString(5);
  let needEncodeURIComponent = false;
  try {
    encodedStr += window.btoa(str);
  } catch {
    needEncodeURIComponent = true;
  }
  if (needEncodeURIComponent) {
    try {
      encodedStr += window.btoa(encodeURIComponent(str));
    } catch (error) {
      handleError(error);
    }
  }
  return encodedStr;
};

export const randomBase64Decode = (str: string) => {
  if (str !== undefined) {
    return decodeURI(window.atob(str.substring(5)));
  }
  return '';
};

export const transformUTCDate = (utcString: string, format = 'YYYY-MM-DD HH:mm:ss') =>
  dayjs.utc(utcString).local().format(format);
