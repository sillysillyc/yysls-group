import { memo, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { App as AntApp } from 'antd';

import './index.less';

const AppPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
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
