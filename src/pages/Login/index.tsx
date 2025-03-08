import { memo, useMemo } from 'react';

import { LoginForm, RegisterForm } from './components';
import { LoginTabKeys, loginTabKeys } from '@/stores/slices';

import { Tabs, theme } from 'antd';

import './index.less';
import { useAppStore } from '@/stores';

const LoginPage = () => {
  const { useToken } = theme;
  const {
    token: { colorBgContainer, borderRadius, paddingContentHorizontal },
  } = useToken();

  const { loginTabKey, setLoginTabKey } = useAppStore();

  const tabsItems = useMemo(
    () => [
      { key: loginTabKeys.login, label: '登录', children: <LoginForm /> },
      { key: loginTabKeys.register, label: '注册', children: <RegisterForm /> },
    ],
    []
  );

  return (
    <div className="login-container">
      <video
        className="login-bg"
        src="https://yysls.fp.ps.netease.com/file/66e40968aeeb27f4de3d0a7aQvImN3JM05"
        controls={false}
        autoPlay
        muted
        loop
      />
      <div className="form-area">
        <Tabs
          activeKey={loginTabKey}
          onChange={(key) => setLoginTabKey({ key: key as LoginTabKeys })}
          items={tabsItems}
          style={{
            backgroundColor: colorBgContainer,
            padding: paddingContentHorizontal,
            borderRadius: borderRadius,
          }}
        />
      </div>
    </div>
  );
};
export default memo(LoginPage);
