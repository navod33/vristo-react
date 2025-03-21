import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const UserTable = lazy(() => import('../pages/users/view/userTable'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const ResetPasswordLink = lazy(() => import('../pages/Authentication/RecoverIdBox'));
const ResetPasswordBox = lazy(() => import('../pages/Authentication/passwordReset'));
const UserRole = lazy(() => import('../pages/users/view/createUserRole'));
const RolesView = lazy(() => import('../pages/users/view/rolesView'));

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
    {
        path: '/auth/reset-password',
        element: <ResetPasswordLink />,
        layout: 'blank',
    },
    {
        path: '/auth/reset-password/:token',
        element: <ResetPasswordBox />,
        layout: 'blank',
    },
    {
        path: '/users/user-roles/create',
        element: (
            <ProtectedRoute>
                <UserRole />
            </ProtectedRoute>
        ),
        layout: 'default',
    },
    {
        path: '/users/user-roles',
        element: (
            <ProtectedRoute>
                <RolesView />
            </ProtectedRoute>
        ),
        layout: 'default',
    },
];

export { routes };
