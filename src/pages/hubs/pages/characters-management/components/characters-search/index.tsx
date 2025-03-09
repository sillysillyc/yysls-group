import { memo, useCallback, useState } from 'react';

import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import { useHandleError } from '@/hooks';
import { useAppStore } from '@/stores';

import './index.less';

export const CharactersSearch = memo(() => {
  const { queryCharactersList, setCharactersOperInfo, setCharactersOperModalOpen } = useAppStore();
  const handleError = useHandleError();
  const [isLoading, setIsLoading] = useState(false);

  const onRefreshCharacterList = useCallback(async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      await queryCharactersList();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, handleError, queryCharactersList]);

  const onCreateCharacter = useCallback(() => {
    setCharactersOperInfo(null);
    setCharactersOperModalOpen({ open: true });
  }, [setCharactersOperInfo, setCharactersOperModalOpen]);

  return (
    <div className="characters-search-container">
      <Button onClick={onRefreshCharacterList}>{isLoading ? <LoadingOutlined /> : <ReloadOutlined />}</Button>
      <Button type="primary" onClick={onCreateCharacter}>
        创建角色
      </Button>
    </div>
  );
});
