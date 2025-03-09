export type Genders = 'male' | 'female';
export interface IFetchRegisterParams {
  name: string;
  password: string;
  gender: Genders;
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
  id: number;

  /**
   * 账户名称
   */
  name: string;

  /**
   * 账户性别
   */
  gender: Genders;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 更新时间
   */
  updatedTime: string;
}

export interface IFetchLoginData {
  token: string;
  accountInfo: IUserInfo;
}

export interface IFetchEditUserInfoParams {
  newName?: string;

  oldPassword?: string;

  newPassword?: string;

  /**
 性别(male/female)
 * 
 */
  gender?: string;
}

export interface IFetchQueryUserInfoData {
  accountId: number;
  accountName: string;
  accountGender: string;
  createTime: string;
  updateTime: string;
}
