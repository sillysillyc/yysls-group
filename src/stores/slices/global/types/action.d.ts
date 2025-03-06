import { GlobalState } from './state';
export interface GlobalAction {
  setGlobal: (state: GlobalState) => void;
  updateGlobal: (state: Partial<GlobalState>) => void;
  resetGlobal: () => void;
}
