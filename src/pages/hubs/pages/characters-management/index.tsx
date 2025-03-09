import { memo } from 'react';

import { Modal, ModalProps, Table } from 'antd';

import './index.less';
import { CharactersList } from './components';

interface ICharactersManagementProps extends ModalProps {}

const CharactersManagementPage = memo((props: ICharactersManagementProps) => {
  return (
    <div className="characters-management-container">
      <CharactersList />
    </div>
  );
});
export default CharactersManagementPage;
