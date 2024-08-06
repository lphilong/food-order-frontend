import { Routes, Route } from 'react-router-dom';
import { mRoute } from './routes';
import ProtectedRoute from './auth/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            {mRoute.map((route, index) => {
                const Page = route.element;
                return <Route key={index} path={route.path} element={route.protected ? <ProtectedRoute>{Page}</ProtectedRoute> : Page} />;
            })}
        </Routes>
    );
};
export default AppRoutes;
