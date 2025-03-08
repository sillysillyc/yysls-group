import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import yyslsIconJPG from '@/assets/images/app/yysls_icon_sm.jpg';

const App = lazy(() => import('./pages/app'));
const Login = lazy(() => import('./pages/login'));
const Guild = lazy(() => import('./pages/guild'));
const Team = lazy(() => import('./pages/team'));
const Hubs = lazy(() => import('./pages/hubs'));

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/login',
          element: (
            <Suspense
              name="login-suspense"
              fallback={
                <Spin className="fallback-spin" indicator={<img className="fallback-indicator" src={yyslsIconJPG} />} />
              }
            >
              <Login />
            </Suspense>
          ),
        },
        {
          path: '/hubs',
          element: <Hubs />,
          children: [
            { path: '/hubs/team', element: <Team /> },
            { path: '/hubs/guild', element: <Guild /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <div>404</div>,
    },
  ],
  {
    basename: `/${APP_NAME}`,
  }
);

export default router;
