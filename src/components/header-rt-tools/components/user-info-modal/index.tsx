import { memo } from 'react';

import { Form, Modal, type ModalProps } from 'antd';

import { IUserInfo } from '@/helpers/services';

interface IUserInfoModalProps extends ModalProps {
  userInfo: IUserInfo | null;
}

const { Item: FormItem } = Form;

export const UserInfoModal = memo((props: IUserInfoModalProps) => {
  const { open, userInfo, ...restProps } = props;

  return (
    <Modal centered width={800} open={open} {...restProps}>
      <Form>
        <FormItem label="ID">
          <div>{userInfo?.accountId}</div>
        </FormItem>
        <FormItem label="名称">
          <div>{userInfo?.accountName}</div>
        </FormItem>
        <FormItem label="创建时间">
          <div>{userInfo?.createdAt}</div>
        </FormItem>
        <FormItem label="性别">
          <div>{userInfo?.accountGender}</div>
        </FormItem>
      </Form>
    </Modal>
  );
});
