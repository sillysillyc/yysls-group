import { memo, useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { App as AntApp } from 'antd';

import { handleStorage } from '@/helpers';
import { localStorageKeysMap } from '@/helpers/constants';

import './index.less';

const AppPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = handleStorage.local.get(localStorageKeysMap.token);
    if (!token) {
      navigate('/login');
    } else {
      navigate('/hubs/team');
    }
  }, []);

  return (
    <div className="router-container">
      <Outlet />
    </div>
  );
};

export default memo(() => (
  <AntApp>
    <AppPage />
  </AntApp>
));
