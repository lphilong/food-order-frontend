import { useGetMyOrders } from '@/api/OrderApi';
import BackButton from '@/components/BackButton';
import OrderStatusDetail from '@/components/OrderStatusDetail';
import OrderStatusHeader from '@/components/OrderStatusHeader';
import PaginationSelector from '@/components/PaginationSelector';
import OrderStatusLoader from '@/components/SkeletonLoader/OrderStatusLoader';
import usePagination from '@/hooks/usePagination';

const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrders();
    const pageSize = 5;
    const {
        currentPage: currentPage,
        totalPages: totalPages,
        visibleItems: visibleOrders,
        handlePageChange: handleRestaurantChange,
    } = usePagination(orders || [], pageSize);

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
            {visibleOrders.map((order) => (
                <div key={order._id} className="space-y-5 bg-gray-100 p-10 rounded-lg">
                    <OrderStatusHeader order={order} />
                    <div className="grid gap-5">
                        <OrderStatusDetail order={order} />
                    </div>
                </div>
            ))}
            {!isLoading && <PaginationSelector page={currentPage} pages={totalPages} onPageChange={handleRestaurantChange} />}
        </div>
    );
};

export default OrderStatusPage;
