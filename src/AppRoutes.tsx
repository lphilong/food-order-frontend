import { Routes, Route } from 'react-router-dom';
import { mRoute } from './routes';

const AppRoutes = () => {
    return (
        <Routes>
            {mRoute.map((route, index) => {
                const Page = route.element;
                return <Route key={index} path={route.path} element={Page} />;
            })}
        </Routes>
    );
};
export default AppRoutes;
