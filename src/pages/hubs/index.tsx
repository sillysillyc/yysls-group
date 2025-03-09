import { Suspense, useMemo, useState, type CSSProperties, memo, ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import yyslsHorizontalLgPNG from '@/assets/images/app/yysls_horizontal_lg.png';
import yyslsIconJPG from '@/assets/images/app/yysls_icon_sm.jpg';
import { HeaderRTTools } from '@/components';
import { hubsRoute } from '@/router';

import { Layout, Menu, MenuProps, theme } from 'antd';
import classnames from 'classnames';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RobotOutlined,
  TeamOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';

import { type MenuItemType } from 'antd/es/menu/interface';
import './index.less';

const { Sider, Content, Header } = Layout;

const siderStyle: CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'none',
  scrollbarGutter: 'stable',
};

type RouteConfig = { icon: ReactNode; name: string };

const routesConfigMap: Record<string, RouteConfig> = {
  '/hubs/team': { icon: <TeamOutlined />, name: '组队大厅' },
  '/hubs/guild': { icon: <RobotOutlined />, name: '百业大厅' },
  '/hubs/characters-management': { icon: <UserSwitchOutlined />, name: '角色管理' },
};

const HubsPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const [siderCollapsed, setSiderCollapsed] = useState(false);

  const items = useMemo<MenuProps['items']>(() => {
    const menuItems: MenuItemType[] = [];
    hubsRoute.children?.forEach((r) => {
      if (!r.hideOnMenu) {
        menuItems.push({
          key: r.path,
          label: routesConfigMap[r.path!].name,
          icon: routesConfigMap[r.path!].icon,
        } as MenuItemType);
      }
    });
    return menuItems;
  }, [navigate]);

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
        <Menu
          mode="inline"
          items={items}
          onSelect={(e) => {
            navigate(e.key);
            console.log(e);
          }}
        />
      </Sider>
      <Layout style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}>
        <Header>
          {menuFolderIcon}
          <HeaderRTTools />
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
