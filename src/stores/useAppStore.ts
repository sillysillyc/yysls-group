import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { createUserSlice, createGlobalSlice } from './slices';

type StoreState = ReturnType<typeof createGlobalSlice> & ReturnType<typeof createUserSlice>; // 合并所有分片的类型

export const useAppStore = create<StoreState, [['zustand/persist', unknown]]>(
  persist(
    (set) => ({
      ...createGlobalSlice(set), // 组合全局分片
      ...createUserSlice(set), // 组合用户分片
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
);
useAppStore.subscribe((state) => {
  console.log('[Zustabd]: ', state);
});
