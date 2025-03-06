import type { GlobalSliceInfo, GlobalState } from './types';

const initialState: GlobalState = { test: '' };

export const createGlobalSlice = (set: any): GlobalSliceInfo => ({
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
