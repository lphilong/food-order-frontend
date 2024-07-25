import { Navigate } from 'react-router-dom';
import Layout from './layouts/layout';
import AuthCallbackPage from './pages/AuthCallbackPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './auth/ProtectedRoute';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import OrderStatusPage from './pages/OrderStatusPage';
import ManageRestaurantPage from './pages/ManageRestaurantPage';
import HomePage from './pages/HomePage';
import UpdateRestaurant from './pages/UpdateRestaurant';

const mRoute = [
    {
        path: '/',
        element: (
            <Layout showHero={false}>
                <HomePage></HomePage>
            </Layout>
        ),
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
        path: '/update/:restaurantId',
        element: (
            <Layout showHero={false}>
                <UpdateRestaurant />
            </Layout>
        ),
    },

    {
        path: '*',
        element: <Navigate to="/" />,
    },
];

export { mRoute };
