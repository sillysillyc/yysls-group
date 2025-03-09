export type Genders = 'male' | 'female';

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
  accountGender: Genders;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 更新时间
   */
  updateTime: string;
}

export interface IFetchRegisterParams {
  accountName: string;
  password: string;
  accountGender: Genders;
}
export interface IFetchRegisterData extends IUserInfo {}

export interface IFetchLoginParams {
  accountName: string;
  password: string;
}

export interface IFetchLoginData {
  token: string;
  account: IUserInfo;
}

export interface IFetchEditUserInfoParams {
  newName?: string;

  oldPassword?: string;

  newPassword?: string;

  /**
   *   性别(male/female)
   */
  accountGender?: Genders;
}

export interface IFetchQueryUserInfoData extends IUserInfo {}
