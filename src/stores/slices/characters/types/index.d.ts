import { CharactersAction } from './action';
import { CharactersState } from './state';

export * from './action';
export * from './state';
export type CharactersSliceInfo = CharactersAction & CharactersState;
