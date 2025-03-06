declare type ValueOf<T extends object | Array<any>> = T extends object
  ? T[keyof T]
  : T extends Array<any>
  ? T[number]
  : never;
