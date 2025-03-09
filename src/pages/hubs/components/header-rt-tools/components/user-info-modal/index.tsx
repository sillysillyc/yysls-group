import { memo } from 'react';

import { Form, Modal, type ModalProps } from 'antd';

import { useAppStore } from '@/stores';
import { GenderIcon } from '@/components';

interface IUserInfoModalProps extends ModalProps {}

const { Item: FormItem } = Form;

export const UserInfoModal = memo((props: IUserInfoModalProps) => {
  const { ...restProps } = props;

  const { userInfo, setUserInfoModalOpen, userInfoModalOpen } = useAppStore();

  return (
    <Modal
      title="个人信息"
      centered
      width={800}
      open={userInfoModalOpen}
      onCancel={() => setUserInfoModalOpen({ open: false })}
      {...restProps}
    >
      <Form>
        <FormItem label="ID">
          <div>{userInfo?.accountId}</div>
        </FormItem>
        <FormItem label="账户">
          <div>{userInfo?.accountName}</div>
        </FormItem>
        <FormItem label="创建时间">
          <div>{userInfo?.createTime}</div>
        </FormItem>
        <FormItem label="性别">
          <GenderIcon gender={userInfo?.accountGender} />
        </FormItem>
      </Form>
    </Modal>
  );
});
