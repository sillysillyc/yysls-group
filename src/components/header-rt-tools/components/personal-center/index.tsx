import { memo, useCallback, useMemo } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Dropdown, DropdownProps } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useAppStore } from '@/stores';
import { UserInfoModal } from '../user-info-modal';
import { EditUserInfoModal } from '../edit-user-info-modal';
import { localStorageKeysMap } from '@/helpers/constants';
import { handleStorage } from '@/helpers';

import './index.less';

export const PersonalCenter = memo(() => {
  const navigate = useNavigate();
  const { setUserInfoModalOpen, setEditUserInfoModalOpen } = useAppStore();

  const onLogout = useCallback(async () => {
    handleStorage.local.remove(localStorageKeysMap.token);
    navigate('/login');
  }, [navigate]);

  const dropdownMenu = useMemo(() => {
    return {
      items: [
        {
          key: 'personal-center',
          label: '个人信息',
          onClick: () => setUserInfoModalOpen({ open: true }),
        },
        {
          key: 'edit-user',
          label: '修改信息',
          onClick: () => setEditUserInfoModalOpen({ open: true }),
        },
        {
          key: 'logout',
          label: '退出登录',
          onClick: onLogout,
        },
      ],
    } as DropdownProps['menu'];
  }, [onLogout, setUserInfoModalOpen, setEditUserInfoModalOpen]);

  return (
    <div className="user-info-container">
      <Dropdown menu={dropdownMenu}>
        <UserOutlined />
      </Dropdown>
      <UserInfoModal footer={null} />
      <EditUserInfoModal />
    </div>
  );
});
