import { memo, useCallback, useMemo } from 'react';

import { UserOutlined } from '@ant-design/icons';
import { Dropdown, DropdownProps } from 'antd';
import { useHandleError } from '@/hooks';
import { fetchLogout, fetchQueryUserInfo } from '@/helpers/services';

export const UserInfo = memo(() => {
  const handleError = useHandleError();
  const onLogout = useCallback(async () => {
    try {
      await fetchLogout();
    } catch (error) {
      handleError(error);
    }
  }, []);

  const dropdownMenu = useMemo(() => {
    return {
      items: [
        {
          key: 'personal-center',
          label: '个人中心',
          onClick: () => {
            fetchQueryUserInfo();
          },
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
    </div>
  );
});
