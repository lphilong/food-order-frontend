import { Navigate } from 'react-router-dom';
import Layout from './layouts/layout';
import AuthCallbackPage from './pages/AuthCallbackPage';
import UserProfilePage from './pages/UserProfilePage';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import OrderStatusPage from './pages/OrderStatusPage';
import ManageRestaurantPage from './pages/ManageRestaurantPage';
import UpdateRestaurant from './pages/UpdateRestaurant';
import LandingPage from './pages/LandingPage';
import RestaurantPage from './pages/RestaurantPage';
import OrderDetailPage from './pages/OrderDetailPage';
import ChatPage from './pages/ChatPage';
import UsersChatPage from './pages/UsersChatPage';

const mRoute = [
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
        path: '*',
        element: <Navigate to="/" />,
    },
];
const privateRoute = [
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
        protected: true,
    },
    {
        path: '/chat/:restaurantId/:userId',
        element: (
            <Layout>
                <ChatPage />
            </Layout>
        ),
        protected: true,
    },
    {
        path: '/order/:restaurantId',
        element: (
            <Layout>
                <OrderDetailPage />
            </Layout>
        ),
        protected: true,
    },
    {
        path: '/conversations/:restaurantId',
        element: (
            <Layout>
                <UsersChatPage />
            </Layout>
        ),
        protected: true,
    },
];
export { mRoute, privateRoute };
