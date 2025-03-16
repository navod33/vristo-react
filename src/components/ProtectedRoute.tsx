import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token');
    console.log('token ******************************', token);

    if (!token) {
        console.log('no token', token);
        return <Navigate to="/auth/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;
