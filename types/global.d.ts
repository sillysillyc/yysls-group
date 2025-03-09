declare type ValueOf<T extends object | Array<any>> = T extends object
  ? T[keyof T]
  : T extends Array<any>
  ? T[number]
  : never;

declare const PORT: '3000';
declare const PUBLIC_PATH: 'yysls-group';
declare const API_PREFIX: 'yysls-group-api';
declare const APP_NAME: 'yysls-group';

declare interface Result<T> {
  code: string;
  msg: string;
  info: any;
  data: T & IPaginationData;
}

declare interface PResult<T = any> extends Omit<Result<T>, 'data'> {
  data?: T & IPaginationData;
}

declare type Get<T, K, F> = K extends keyof T ? T[K] : F;

declare interface IPaginationOptions {
  page?: number;
  pageSize?: number;
}

declare interface IPaginationData extends IPaginationOptions {
  total?: Number;

  /**
   * 总页数
   */
  totalPages?: Number;
}
