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
