import { GlobalAction } from './action';
import { GlobalState } from './state';

export * from './action';
export * from './state';
export type GlobalSliceInfo = GlobalAction & GlobalState;
