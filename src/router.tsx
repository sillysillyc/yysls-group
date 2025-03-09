import { Spin } from 'antd';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, NonIndexRouteObject, RouteObject } from 'react-router-dom';
import yyslsIconJPG from '@/assets/images/app/yysls_icon_sm.jpg';

const App = lazy(() => import('./pages/app'));
const Login = lazy(() => import('./pages/login'));
const Guild = lazy(() => import('./pages/guild'));
const Team = lazy(() => import('./pages/team'));
const Hubs = lazy(() => import('./pages/hubs'));
const CharactersManagement = lazy(() => import('./pages/characters-management'));

type MergedRouteObject = Omit<NonIndexRouteObject, 'children'> & {
  hideOnMenu?: boolean;
  children?: MergedRouteObject[];
};

export const hubsRoute: MergedRouteObject = {
  path: '/hubs',
  element: <Hubs />,
  children: [
    { path: '/hubs/team', element: <Team /> },
    { path: '/hubs/guild', element: <Guild />, hideOnMenu: true },
    { path: '/hubs/characters-management', element: <CharactersManagement /> },
  ],
};

export const loginRoute: RouteObject = {
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
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [loginRoute, hubsRoute],
  },
  {
    path: '*',
    element: <div>404</div>,
  },
];

const router = createBrowserRouter(routes, {
  basename: `/${APP_NAME}`,
});

export default router;
