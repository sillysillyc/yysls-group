declare type ValueOf<T extends object | Array<any>> = T extends object
  ? T[keyof T]
  : T extends Array<any>
  ? T[number]
  : never;

declare const PORT: '3000';
declare const PUBLIC_PATH: 'yysls-group';
declare const API_PREFIX: 'yysls-group-api';
declare const APP_NAME: 'yysls-group';
