import { useAuth0 } from '@auth0/auth0-react';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isAuthenticated = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [navigate, isAuthenticated]);

    return children;
}
