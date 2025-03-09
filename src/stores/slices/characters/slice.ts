import { type Mutate, type StoreApi } from 'zustand';
import type { CharactersSliceInfo, CharactersState } from './types';
import { type ZustandMiddleWares } from '@/stores/types';
import { fetchQueryCharacterList } from '@/helpers/services';

const initialCharactersState: CharactersState = {
  charactersList: null,
  charactersOperModalOpen: false,
  charactersOperInfo: null,
};

export const createCharactersStateSlice = (
  set: Get<Mutate<StoreApi<CharactersSliceInfo>, ZustandMiddleWares>, 'setState', never>
): CharactersSliceInfo => ({
  ...initialCharactersState,
  setCharactersList: ({ list }) => {
    set({ charactersList: [...list] });
  },
  queryCharactersList: async (params) => {
    try {
      const result = await fetchQueryCharacterList(params);
      set({ charactersList: [...(result.data.characters ?? [])] });
      return Promise.resolve(result.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  setCharactersOperInfo: (payload: CharactersState['charactersOperInfo']) => {
    set({ charactersOperInfo: payload ? { ...payload } : payload });
  },
});
