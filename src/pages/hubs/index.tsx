import { Suspense, useMemo, useState, useEffect, type CSSProperties, memo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import yyslsHorizontalLgPNG from '@/assets/images/app/yysls_horizontal_lg.png';
import yyslsIconJPG from '@/assets/images/app/yysls_icon_sm.jpg';

import { Layout, Menu, MenuProps, theme } from 'antd';
import classnames from 'classnames';
import { MenuFoldOutlined, MenuUnfoldOutlined, RobotOutlined, TeamOutlined } from '@ant-design/icons';
import { PersonalCenter } from '@/components';
import './index.less';

const { Sider, Content, Header } = Layout;

const siderStyle: CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const HubsPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const [siderCollapsed, setSiderCollapsed] = useState(false);

  const items = useMemo<MenuProps['items']>(
    () => [
      {
        key: 'group',
        label: '组队大厅',
        icon: <TeamOutlined />,
        onClick: () => {
          navigate({ pathname: '/hubs/team' });
        },
      },
      {
        key: 'guild',
        label: '百业',
        icon: <RobotOutlined />,
        onClick: () => {
          navigate({ pathname: '/hubs/guild' });
        },
      },
    ],
    [navigate]
  );

  const menuFolderIcon = useMemo(() => {
    const onTriggerMenuCollapsed = () => setSiderCollapsed((prev) => !prev);
    const style: CSSProperties = {
      fontSize: '24px',
    };
    return siderCollapsed ? (
      <MenuUnfoldOutlined onClick={onTriggerMenuCollapsed} style={style} />
    ) : (
      <MenuFoldOutlined onClick={onTriggerMenuCollapsed} style={style} />
    );
  }, [siderCollapsed]);

  return (
    <Layout hasSider className="hubs-container">
      <Sider collapsed={siderCollapsed} style={{ ...siderStyle, background: colorBgContainer }}>
        <div className="sider-top-area-container">
          <div className="sider-top-icon-container">
            <img className={classnames(['sider-top-icon', 'sm', { show: siderCollapsed }])} src={yyslsIconJPG} />
            <img
              className={classnames(['sider-top-icon', 'lg', { show: !siderCollapsed }])}
              src={yyslsHorizontalLgPNG}
            />
          </div>
        </div>
        <Menu mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}>
        <Header>
          {menuFolderIcon}
          <PersonalCenter />
        </Header>
        <Content>
          <Suspense fallback={<div>加载中...</div>}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(HubsPage);
