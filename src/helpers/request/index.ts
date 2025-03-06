import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

export interface InitOptions {}

const currentApiVersion = 'v1';

// 创建 axios 实例
const createAxiosInstance = (options: InitOptions = {}): AxiosInstance => {
  const instance = axios.create({
    baseURL: `/${API_PREFIX}/${currentApiVersion}`,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // 添加 token 到请求头
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // 直接返回数据部分
      return response.data;
    },
    (error) => {
      // 统一错误处理
      const { response } = error;
      if (response) {
        // 根据状态码处理不同错误
        switch (response.status) {
          case 401:
            // 未授权处理
            console.error('未授权，请重新登录');
            // 可以在这里处理登出逻辑
            break;
          case 403:
            console.error('拒绝访问');
            break;
          case 404:
            console.error('请求的资源不存在');
            break;
          case 500:
            console.error('服务器错误');
            break;
          default:
            console.error(`请求错误: ${response.status}`);
        }
      } else if (error.request) {
        console.error('网络错误，请检查您的网络连接');
      } else {
        console.error('请求配置错误', error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// 创建默认实例
const axiosInstance = createAxiosInstance();

type ReuqstOptions = {
  url: string;
  config?: AxiosRequestConfig;
};

// 请求方法封装
const request = {
  get: <T = any>(options: { params?: any } & ReuqstOptions): Promise<T> => {
    const { url, params, config } = options;
    return axiosInstance.get(url, { params, ...config });
  },

  post: <T = any>(options: { data?: any } & ReuqstOptions): Promise<T> => {
    const { url, data, config } = options;
    return axiosInstance.post(url, data, config);
  },

  put: <T = any>(optinos: { data?: any } & ReuqstOptions): Promise<T> => {
    const { url, data, config } = optinos;
    return axiosInstance.put(url, data, config);
  },

  delete: <T = any>(options: ReuqstOptions): Promise<T> => {
    const { url, config } = options;
    return axiosInstance.delete(url, config);
  },

  // // 创建新实例的方法
  // create: (options: InitOptions) => {
  //   return createAxiosInstance(options);
  // },
};

export default request;
