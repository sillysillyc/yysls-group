import { lazy, Suspense, type LazyExoticComponent, type ComponentType } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
const Login = lazy(() => import('./pages/Login'));
const Guild = lazy(() => import('./pages/Guild'));
const Team = lazy(() => import('./pages/Team'));

const lazyLoad = (Component: LazyExoticComponent<ComponentType>) => (
  <Suspense fallback={<div>加载中...</div>}>
    <Component />
  </Suspense>
);

const routesConfig = [
  { path: '/login', component: Login },
  { path: '/team', component: Team },
  { path: '/guild', component: Guild },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/team" replace /> },
      ...routesConfig.map(({ path, component }) => ({
        path,
        element: lazyLoad(component),
      })),
    ],
  },
  {
    path: '/login',
    element: lazyLoad(Login),
  },
]);

export default router;
