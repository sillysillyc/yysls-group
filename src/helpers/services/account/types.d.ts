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
export interface IFetchLoginData {
  token: string;
}
