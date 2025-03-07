import { createElement, useMemo, useState, type CSSProperties } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import yyslsHorizontalLgPNG from '@/assets/images/app/yysls_horizontal_lg.png';
import yyslsIconJPG from '@/assets/images/app/yysls_icon_sm.jpg';
// import { Header } from '@/components';

import { Layout, Menu, MenuProps, theme } from 'antd';
import classnames from 'classnames';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import './App.less';

const { Sider, Content, Footer, Header } = Layout;

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

const items: MenuProps['items'] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: createElement(icon),
  label: `nav ${index + 1}`,
}));

function App() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const location = useLocation();

  const menuFolderIcon = useMemo(() => {
    const onTriggerMenuCollapsed = () => setSiderCollapsed((prev) => !prev);
    return siderCollapsed ? (
      <MenuUnfoldOutlined onClick={onTriggerMenuCollapsed} />
    ) : (
      <MenuFoldOutlined onClick={onTriggerMenuCollapsed} />
    );
  }, [siderCollapsed]);

  return (
    // <div className="app-container">
    //   <Header />
    //   <Tabs
    //     activeKey={location.pathname}
    //     centered
    //     items={[
    //       // {
    //       //   label: <Link to="/guild">百业大厅</Link>,
    //       //   key: '/guild',
    //       // },
    //       {
    //         label: <Link to="/team">组队大厅</Link>,
    //         key: '/team',
    //       },
    //     ]}
    //   />
    //   <div className="content-wrapper">
    //     <Outlet />
    //   </div>
    // </div>
    <Layout hasSider className="app-container">
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
          defaultSelectedKeys={['4']}
          items={items}
          style={{
            height: 'calc(100% - 60px)',
          }}
        />
      </Sider>
      <Layout
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Header
          style={{
            padding: 0,
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            background: colorBgContainer,
          }}
        >
          {menuFolderIcon}
          <div style={{ height: '100%' }}>asdad</div>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
