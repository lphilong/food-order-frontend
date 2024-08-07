import { useGetMyOrders } from '@/api/OrderApi';
import BackButton from '@/components/BackButton';
import OrderStatusDetail from '@/components/OrderStatusDetail';
import OrderStatusHeader from '@/components/OrderStatusHeader';

const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrders();

    if (isLoading) {
        return 'Loading...';
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
                <div className="space-y-5 bg-gray-100 p-10 rounded-lg">
                    <OrderStatusHeader order={order} />
                    <div className="grid gap-5 ">
                        <OrderStatusDetail order={order} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderStatusPage;
