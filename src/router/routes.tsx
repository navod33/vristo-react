import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const UserTable = lazy(() => import('../pages/users/userTable'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/users/user-table',
        element: <UserTable />,
    },
    {
        path: '/auth/signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/signup',
        element: <RegisterBoxed />,
        layout: 'blank',
    },
];

export { routes };
