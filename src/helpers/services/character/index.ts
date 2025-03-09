import request from '@/helpers/request';
import { transformUTCDate } from '@/helpers/tools';

import type {
  IFetchQueryCharacterListData,
  IFetchQueryCharacterListParams,
  IFetchUpdateCharacterParams,
  IFetchCreateCharacterData,
} from './types';

export const fetchQueryCharacterList = async (params?: IFetchQueryCharacterListParams) => {
  try {
    const result = await request.get<Result<IFetchQueryCharacterListData>>({ url: '/character/list', params });
    const cs = result.data.characters.map((c) => ({
      ...c,
      updateTime: transformUTCDate(c.updateTime),
      createTime: transformUTCDate(c.createTime),
    }));
    return Promise.resolve({ ...result, data: { ...result.data, characters: [...cs, ...cs, ...cs, ...cs, ...cs] } });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchUpdateCharacter = async (params: IFetchUpdateCharacterParams) =>
  await request.put<PResult>({ url: '/character/update', params });

export const fetchCreateCharacter = async (params: Omit<Required<IFetchUpdateCharacterParams>, 'characterId'>) =>
  await request.post<Result<IFetchCreateCharacterData>>({ url: '/character/create', params });

export const fetchDeleteCharacter = async (characterId: number) =>
  await request.delete<PResult>({ url: `/character/delete/${characterId}` });
