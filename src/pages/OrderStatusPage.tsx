import { lazy, Suspense } from 'react';
import { useGetMyOrders } from '@/api/OrderApi';
import BackButton from '@/components/BackButton';
import PaginationSelector from '@/components/PaginationSelector';
import OrderStatusLoader from '@/components/SkeletonLoader/OrderStatusLoader';
import usePagination from '@/hooks/usePagination';
import { useNavigate } from 'react-router-dom';

const OrderStatusDetail = lazy(() => import('@/components/OrderStatusDetail'));
const OrderStatusHeader = lazy(() => import('@/components/OrderStatusHeader'));

const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrders();
    const pageSize = 5;
    const { currentPage, totalPages, visibleItems: visibleOrders, handlePageChange } = usePagination(orders || [], pageSize);
    const navigate = useNavigate();

    const handleChatNavigation = (restaurantId: string) => {
        navigate(`/chat/${restaurantId}`);
    };
    if (isLoading) {
        return (
            <div className="space-y-10">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="space-y-5 bg-gray-100 p-10 rounded-lg">
                        <OrderStatusLoader />
                    </div>
                ))}
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="flex">
                <BackButton />
                <span className="pl-5 text-2xl font-bold">No order found</span>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {!isLoading && <PaginationSelector page={currentPage} pages={totalPages} onPageChange={handlePageChange} />}
            {visibleOrders.map((order) => (
                <div key={order._id} className="space-y-5 bg-gray-100 p-10 rounded-lg">
                    <Suspense fallback={<OrderStatusLoader />}>
                        <OrderStatusHeader order={order} />
                        <div className="grid gap-5">
                            <OrderStatusDetail order={order} />
                        </div>
                    </Suspense>
                    <button onClick={() => handleChatNavigation(order.restaurant._id)} className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg">
                        Chat with Restaurant
                    </button>
                </div>
            ))}
            {!isLoading && <PaginationSelector page={currentPage} pages={totalPages} onPageChange={handlePageChange} />}
        </div>
    );
};

export default OrderStatusPage;
