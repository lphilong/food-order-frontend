import { Navigate } from 'react-router-dom';
import Layout from './layouts/layout';
import AuthCallbackPage from './pages/AuthCallbackPage';
import UserProfilePage from './pages/UserProfilePage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import OrderStatusPage from './pages/OrderStatusPage';
import ManageRestaurantPage from './pages/ManageRestaurantPage';
import UpdateRestaurant from './pages/UpdateRestaurant';
import TestPage from './pages/TestPage';
import LandingPage from './pages/LandingPage';
import RestaurantPage from './pages/RestaurantPage';

const mRoute = [
    {
        path: '/test',
        element: (
            <Layout>
                <TestPage />
            </Layout>
        ),
    },
    {
        path: '/restaurant',
        element: (
            <Layout>
                <RestaurantPage />
            </Layout>
        ),
    },
    {
        path: '/',
        element: (
            <Layout>
                <LandingPage />
            </Layout>
        ),
    },
    {
        path: '/user-profile',
        element: (
            <Layout>
                <UserProfilePage />
            </Layout>
        ),
        protected: true,
    },
    {
        path: '/auth-callback',
        element: <AuthCallbackPage />,
    },
    {
        path: '/search/:city',
        element: (
            <Layout>
                <SearchPage />
            </Layout>
        ),
    },
    {
        path: '/detail/:restaurantId',
        element: (
            <Layout>
                <DetailPage />
            </Layout>
        ),
    },
    {
        path: '/order-status',
        element: (
            <Layout>
                <OrderStatusPage />
            </Layout>
        ),
        protected: true,
    },
    {
        path: '/manage-restaurant',
        element: (
            <Layout>
                <ManageRestaurantPage />
            </Layout>
        ),
        protected: true,
    },
    {
        path: '/update/:restaurantId',
        element: (
            <Layout>
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
