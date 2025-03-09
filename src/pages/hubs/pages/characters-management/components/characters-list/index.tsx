import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Table, TableColumnType } from 'antd';
import { AndroidOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';

import { IFetchQueryCharacterListData, CharacterClass, Genders, fetchQueryCharacterList } from '@/helpers/services';
import { charaterClassNameMap, genderMap } from '@/helpers/constants';
import { useHandleError } from '@/hooks';
import { useAppStore } from '@/stores';

interface ICharactersListProps {}
type DataType = IFetchQueryCharacterListData;

export const CharactersList = memo((props: ICharactersListProps) => {
  const handleError = useHandleError();
  const { setCharactersList } = useAppStore();

  const [isLoading, setIsLoading] = useState(false);

  const onQueryCharacterList = useCallback(
    async (options?: IPaginationOptions) => {
      try {
        setIsLoading(true);
        const result = await fetchQueryCharacterList(options);
        setCharactersList({ list: result.data ?? [] });
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [handleError, setCharactersList]
  );

  useEffect(() => {
    onQueryCharacterList();
  }, []);

  const columns = useMemo(
    () =>
      [
        {
          title: '角色名称',
          dataIndex: 'characterName',
          key: 'characterName',
        },
        {
          title: '角色职业',
          dataIndex: 'characterRole',
          key: 'characterRole',
          render: (value: CharacterClass) => charaterClassNameMap[value],
        },
        {
          title: '角色性别',
          dataIndex: 'characterGender',
          key: 'characterGender',
          render(value: Genders) {
            switch (value) {
              case genderMap.male:
                return <ManOutlined />;
              case genderMap.female:
                return <WomanOutlined />;
              default:
                return <AndroidOutlined />;
            }
          },
        },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
        { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
      ] as TableColumnType<DataType>[],
    []
  );

  return <Table loading={isLoading} rowKey="characterId" columns={columns} />;
});
