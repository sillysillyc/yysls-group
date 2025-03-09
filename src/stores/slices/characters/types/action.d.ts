import { IFetchQueryCharacterListParams, type IFetchQueryCharacterListData } from '@/helpers/services';

export interface CharactersAction {
  setCharactersList: (payload: { list: IFetchQueryCharacterListData[] }) => void;
}
