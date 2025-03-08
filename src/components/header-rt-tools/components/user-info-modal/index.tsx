import { memo, useMemo } from 'react';

import { Form, Modal, type ModalProps } from 'antd';
import { AndroidOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';

import { IUserInfo } from '@/helpers/services';
import { genderMap } from '@/helpers/constants';

interface IUserInfoModalProps extends ModalProps {
  userInfo: IUserInfo | null;
}

const { Item: FormItem } = Form;

export const UserInfoModal = memo((props: IUserInfoModalProps) => {
  const { open, userInfo, ...restProps } = props;

  const genderRenderer = useMemo(() => {
    switch (userInfo?.gender) {
      case genderMap.male:
        return <ManOutlined />;
      case genderMap.female:
        return <WomanOutlined />;
      default:
        return <AndroidOutlined />;
    }
  }, [userInfo?.gender]);

  return (
    <Modal title="个人信息" centered width={800} open={open} {...restProps}>
      <Form>
        <FormItem label="ID">
          <div>{userInfo?.id}</div>
        </FormItem>
        <FormItem label="名称">
          <div>{userInfo?.name}</div>
        </FormItem>
        <FormItem label="创建时间">
          <div>{userInfo?.createTime}</div>
        </FormItem>
        <FormItem label="性别">
          <div>{genderRenderer}</div>
        </FormItem>
      </Form>
    </Modal>
  );
});
