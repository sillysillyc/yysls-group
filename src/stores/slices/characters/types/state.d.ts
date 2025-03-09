import { type ICharacterInfo } from '@/helpers/services';

export type CharactersState = {
  charactersList: ICharacterInfo[] | null;
  /**
   * 新增 / 编辑 角色信息弹框是否打开
   */
  charactersOperModalOpen: boolean;
  charactersOperInfo: ICharacterInfo | null;
};
