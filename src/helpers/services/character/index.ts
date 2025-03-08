import request from '@/helpers/request';
import type { IFetchQueryCharacterListData, IFetchQueryCharacterListParams } from './types';

export const fetchQueryCharacterList = async (params: IFetchQueryCharacterListParams) =>
  await request.get<Result<IFetchQueryCharacterListData[]>>({ url: '/character/list', params });
