import { type Mutate, type StoreApi } from 'zustand';
import type { GlobalSliceInfo, GlobalState } from './types';
import { type ZustandMiddleWares } from '@/stores/types';

const initialState: GlobalState = { test: '' };

export const createGlobalSlice = (
  set: Get<Mutate<StoreApi<GlobalSliceInfo>, ZustandMiddleWares>, 'setState', never>
): GlobalSliceInfo => ({
  ...initialState,
  setGlobal: (state) => {
    set(state);
  },
  updateGlobal: (state) => {
    set({ ...state });
  },
  resetGlobal() {
    set({ test: '' });
  },
});
