import { create } from 'zustand';
import { createUserSlice, createGlobalSlice } from './slices';

type StoreState = ReturnType<typeof createGlobalSlice> & ReturnType<typeof createUserSlice>; // 合并所有分片的类型

export const useAppStore = create<StoreState>((set) => ({
  ...createGlobalSlice(set), // 组合全局分片
  ...createUserSlice(set), // 组合用户分片
}));
