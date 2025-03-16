import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    console.log('token', token);

    useEffect(() => {
        if (!token) {
            navigate('/auth/signin');
        }
    }, [token, navigate]);

    return children;
};

export default ProtectedRoute;
