import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

import {
  createUserSlice,
  createGlobalSlice,
  createCharactersStateSlice,
  type GlobalSliceInfo,
  type UserSliceInfo,
  type CharactersSliceInfo,
} from './slices';
import { ZustandMiddleWares } from './types';

export type StoreState = GlobalSliceInfo & UserSliceInfo & CharactersSliceInfo;

export * from './slices';

export const useAppStore = create<StoreState, ZustandMiddleWares>(
  devtools(
    persist(
      (set, get) => ({
        ...createGlobalSlice(set), // 组合全局分片
        ...createUserSlice(set), // 组合用户分片
        ...createCharactersStateSlice(set), // 组合用户分片
        getState: get,
      }),
      {
        name: 'yysls-storage', // 存储的键名
        storage: createJSONStorage(() => localStorage), // 使用 localStorage 作为存储
        partialize: (state) => ({
          // 只持久化需要的状态
          userInfo: state.userInfo,
        }),
      }
    )
  )
);

useAppStore.subscribe((state) => {
  console.log('[Zustabd]: ', state);
});
