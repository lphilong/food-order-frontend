import { Routes, Route } from 'react-router-dom';
import { mRoute } from './routes';

const AppRoutes = () => {
    return (
        <div className="App">
            <Routes>
                {mRoute.map((route, index) => {
                    const Page = route.element;
                    return <Route key={index} path={route.path} element={Page} />;
                })}
            </Routes>
        </div>
    );
};
export default AppRoutes;
