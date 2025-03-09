import { type Mutate, type StoreApi } from 'zustand';
import type { CharactersSliceInfo, CharactersState } from './types';
import { type ZustandMiddleWares } from '@/stores/types';

const initialCharactersState: CharactersState = {
  charactersList: null,
};

export const createCharactersStateSlice = (
  set: Get<Mutate<StoreApi<CharactersSliceInfo>, ZustandMiddleWares>, 'setState', never>
): CharactersSliceInfo => ({
  ...initialCharactersState,
  setCharactersList: ({ list }) => {
    set({ charactersList: [...list] });
  },
});
