import request from '@/helpers/request';
import type {
  IFetchQueryCharacterListData,
  IFetchQueryCharacterListParams,
  IFetchUpdateCharacterParams,
  IFetchCreateCharacterData,
} from './types';

export const fetchQueryCharacterList = async (params?: IFetchQueryCharacterListParams) =>
  await request.get<Result<IFetchQueryCharacterListData[]>>({ url: '/character/list', params });

export const fetchUpdateCharacter = async (params: IFetchUpdateCharacterParams) =>
  await request.put<PResult>({ url: '/character/update', params });

export const fetchCreateCharacter = async (params: Omit<Required<IFetchUpdateCharacterParams>, 'characterId'>) =>
  await request.post<Result<IFetchCreateCharacterData>>({ url: '/character/create', params });

export const fetchDeleteCharacter = async (characterId: number) =>
  await request.delete<PResult>({ url: `/character/delete/${characterId}` });
