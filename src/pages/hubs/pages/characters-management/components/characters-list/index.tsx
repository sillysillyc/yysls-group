import { memo, useCallback, useEffect, useState } from 'react';

import { Card, List, Tag, Button, Modal, message } from 'antd';

import { ICharacterInfo, fetchDeleteCharacter } from '@/helpers/services';
import { charaterClassNameMap, genderMap, messages } from '@/helpers/constants';
import { useHandleError } from '@/hooks';
import { useAppStore } from '@/stores';
import { GenderIcon } from '@/components';

export const CharactersList = memo(() => {
  const handleError = useHandleError();
  const { charactersList, setCharactersList, setCharactersOperInfo, setCharactersOperModalOpen, queryCharactersList } =
    useAppStore();

  const [isLoading, setIsLoading] = useState(false);

  const onQueryCharacterList = useCallback(
    async (options?: IPaginationOptions) => {
      try {
        setIsLoading(true);
        await queryCharactersList(options);
      } catch (error) {
        handleError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [handleError, setCharactersList]
  );

  const onDeleteCharacter = useCallback(
    (character: ICharacterInfo) => {
      Modal.confirm({
        title: '确认删除？',
        onOk: async () => {
          try {
            await fetchDeleteCharacter(character.characterId);
            message.success(messages.characters.delete.success);
            onQueryCharacterList();
          } catch (error) {
            handleError(error);
          }
        },
      });
    },
    [handleError, onQueryCharacterList]
  );

  const onUpdateCharacter = useCallback(
    (character: ICharacterInfo) => {
      setCharactersOperInfo(character);
      setCharactersOperModalOpen({ open: true });
    },
    [setCharactersOperInfo, setCharactersOperModalOpen]
  );

  useEffect(() => {
    onQueryCharacterList();
  }, []);

  return (
    <List
      loading={isLoading}
      grid={{ gutter: 16, column: 3 }}
      dataSource={charactersList ?? []}
      renderItem={(character) => (
        <List.Item>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', columnGap: '8px' }}>
                <span>{character.characterName}</span>
                <Tag color={character.characterGender === genderMap.male ? 'blue' : 'red'}>
                  <GenderIcon gender={character.characterGender} />
                </Tag>
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span>职业：{charaterClassNameMap[character.characterRole]}</span>
              <span>造诣：{character.characterAttainments ?? '-'}</span>
              <span>等级：{character.characterLevel ?? '-'}</span>
              <span>创建时间：{character.createTime}</span>
              <div style={{ display: 'flex', justifyContent: 'flex-end', flexWrap: 'nowrap', columnGap: '8px' }}>
                <Button type="primary" onClick={() => onUpdateCharacter(character)}>
                  编辑
                </Button>
                <Button danger onClick={() => onDeleteCharacter(character)}>
                  删除
                </Button>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );
});
