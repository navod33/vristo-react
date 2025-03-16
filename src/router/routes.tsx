import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const UserTable = lazy(() => import('../pages/users/userTable'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));
import ProtectedRoute from '../components/ProtectedRoute';

const routes = [
    // dashboard
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Index />
            </ProtectedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/users/user-table',
        element: (
            <ProtectedRoute>
                <UserTable />
            </ProtectedRoute>
        ),
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
