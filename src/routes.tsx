import { Navigate } from 'react-router-dom';
import Layout from './layouts/layout';
import AuthCallbackPage from './pages/AuthCallbackPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './auth/ProtectedRoute';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import OrderStatusPage from './pages/OrderStatusPage';
import ManageRestaurantPage from './pages/ManageRestaurantPage';

const mRoute = [
    {
        path: '/',
        element: <Layout showHero>HomePage</Layout>,
    },
    {
        path: '/user-profile',
        element: (
            <ProtectedRoute>
                <Layout>
                    <UserProfilePage />
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/auth-callback',
        element: <AuthCallbackPage />,
    },
    {
        path: '/search/:city',
        element: (
            <Layout showHero={false}>
                <SearchPage />
            </Layout>
        ),
    },
    {
        path: '/detail/:restaurantId',
        element: (
            <Layout showHero={false}>
                <DetailPage />
            </Layout>
        ),
    },
    {
        path: '/order-status',
        element: (
            <ProtectedRoute>
                <Layout>
                    <OrderStatusPage />
                </Layout>
            </ProtectedRoute>
        ),
    },
    {
        path: '/manage-restaurant',
        element: (
            <Layout>
                <ManageRestaurantPage />
            </Layout>
        ),
    },
    {
        path: '*',
        element: <Navigate to="/" />,
    },
];

export { mRoute };
