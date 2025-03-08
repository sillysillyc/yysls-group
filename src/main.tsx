import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ConfigProvider, App as AntApp } from 'antd';
import 'antd/dist/reset.css';
import '@ant-design/v5-patch-for-react-19';
import zhCN from 'antd/locale/zh_CN';
// for date-picker i18n
import 'dayjs/locale/zh-cn';
import './index.less';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={{ cssVar: true }} locale={zhCN}>
      <AntApp>
        <RouterProvider router={router} />
      </AntApp>
    </ConfigProvider>
  </StrictMode>
);
