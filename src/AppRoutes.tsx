import { mRoute, privateRoute } from './routes';
import ProtectedRoute from './auth/ProtectedRoute';
import { Routes, Route } from 'react-router-dom';

const AppRoutes = () => {
    return (
        <Routes>
            {mRoute.map((route, index) => {
                const Page = route.element;
                return <Route key={index} path={route.path} element={Page} />;
            })}
            {privateRoute.map((route, index) => {
                const Page = route.element;
                return <Route key={index} path={route.path} element={<ProtectedRoute>{Page}</ProtectedRoute>} />;
            })}
        </Routes>
    );
};

export default AppRoutes;
