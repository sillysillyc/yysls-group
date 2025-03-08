export interface IFetchRegisterParams {
  name: string;
  password: string;
  gender: 'male' | 'female';
}
export interface IFetchRegisterData {}

export interface IFetchLoginParams {
  name: string;
  password: string;
}

export interface IUserInfo {
  /**
   * 账户ID
   */
  accountId: number;

  /**
   * 账户名称
   */
  accountName: string;

  /**
   * 账户性别
   */
  accountGender: string;

  /**
   * 创建时间
   */
  createdAt: string;

  /**
   * 更新时间
   */
  updatedAt: string;
}

export interface IFetchLoginData {
  token: string;
  userInfo: IUserInfo;
}
