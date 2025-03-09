import type { ICharacterInfo, IFetchQueryCharacterListParams, IFetchQueryCharacterListData } from '@/helpers/services';
import type { CharactersState } from './state';

export interface CharactersAction {
  setCharactersList: (payload: { list: ICharacterInfo[] }) => void;
  queryCharactersList: (payload?: IFetchQueryCharacterListParams) => Promise<IFetchQueryCharacterListData>;
  setCharactersOperInfo: (payload: CharactersState['charactersOperInfo']) => void;
  setCharactersOperModalOpen: (payload: { open: CharactersState['charactersOperModalOpen'] }) => void;
}
