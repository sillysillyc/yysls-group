import { memo, useMemo } from 'react';

import { Form, Modal, type ModalProps } from 'antd';
import { AndroidOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';

import { genderMap } from '@/helpers/constants';
import { useAppStore } from '@/stores';

interface IUserInfoModalProps extends ModalProps {}

const { Item: FormItem } = Form;

export const UserInfoModal = memo((props: IUserInfoModalProps) => {
  const { ...restProps } = props;

  const { userInfo, setUserInfoModalOpen, userInfoModalOpen } = useAppStore();

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
          <div>{userInfo?.id}</div>
        </FormItem>
        <FormItem label="账户">
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
