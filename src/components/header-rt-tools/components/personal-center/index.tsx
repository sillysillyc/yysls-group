import { memo, useCallback, useMemo } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Dropdown, DropdownProps } from 'antd';
import { useHandleError } from '@/hooks';

import './index.less';
import { useAppStore } from '@/stores';
import { UserInfoModal } from '../user-info-modal';
import { localStorageKeysMap } from '@/helpers/constants';
import { handleStorage } from '@/helpers';

export const PersonalCenter = memo(() => {
  const { userInfo, setUserInfoModalOpen, userInfoModalOpen } = useAppStore();

  const onLogout = useCallback(async () => {
    handleStorage.local.remove(localStorageKeysMap.token);
  }, []);

  const dropdownMenu = useMemo(() => {
    return {
      items: [
        {
          key: 'personal-center',
          label: '个人中心',
          onClick: () => setUserInfoModalOpen({ open: true }),
        },
        {
          key: 'logout',
          label: '退出登录',
          onClick: onLogout,
        },
      ],
    } as DropdownProps['menu'];
  }, [onLogout]);

  return (
    <div className="user-info-container">
      <Dropdown menu={dropdownMenu}>
        <UserOutlined style={{ fontSize: 20, margin: '0 4px' }} />
      </Dropdown>
      <UserInfoModal
        userInfo={userInfo}
        open={userInfoModalOpen}
        onCancel={() => setUserInfoModalOpen({ open: false })}
        footer={null}
      />
    </div>
  );
});
