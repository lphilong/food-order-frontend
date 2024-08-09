import { useGetMyOrders } from '@/api/OrderApi';
import BackButton from '@/components/BackButton';
import OrderStatusDetail from '@/components/OrderStatusDetail';
import OrderStatusHeader from '@/components/OrderStatusHeader';
import OrderStatusLoader from '@/components/SkeletonLoader/OrderStatusLoader';

const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrders();

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
            {orders.map((order) => (
                <div key={order._id} className="space-y-5 bg-gray-100 p-10 rounded-lg">
                    <OrderStatusHeader order={order} />
                    <div className="grid gap-5">
                        <OrderStatusDetail order={order} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderStatusPage;
