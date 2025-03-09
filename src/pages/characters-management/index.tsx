import { memo } from 'react';

import { Modal, ModalProps } from 'antd';

interface ICharactersManagementProps extends ModalProps {}

const CharactersManagementPage = memo((props: ICharactersManagementProps) => {
  return <Modal {...props}></Modal>;
});
export default CharactersManagementPage;
