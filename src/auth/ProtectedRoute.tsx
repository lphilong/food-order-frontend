import { useAuth0 } from '@auth0/auth0-react';
import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [navigate, isLoading, isAuthenticated]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : null;
}
