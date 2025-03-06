import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ConfigProvider } from 'antd';
import '@ant-design/v5-patch-for-react-19';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={
        {
          // token: {
          //   colorPrimary: '#fafa',
          // },
        }
      }
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>
);
