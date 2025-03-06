import { UserAction } from './action';
import { UserState } from './state';

export * from './action';
export * from './state';
export type UserSliceInfo = UserAction & UserState;
