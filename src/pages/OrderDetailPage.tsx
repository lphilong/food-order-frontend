import { useGetOrdersByRestaurant } from '@/api/OrderApi';
import BackButton from '@/components/BackButton';
import OrderItemCard from '@/components/OrderItemCard';
import { useParams } from 'react-router-dom';

const OrderDetailPage = () => {
    const { restaurantId } = useParams();
    const { orders, isLoading, error } = useGetOrdersByRestaurant(restaurantId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading orders</div>;
    }
    return (
        <>
            <BackButton />
            {orders?.length == 0 ? (
                <div className="mt-5">
                    <span className=" text-2xl font-bold">No order</span>
                </div>
            ) : (
                <div className=" bg-gray-50 p-10 rounded-lg grid md:grid-cols-3 gap-4 ">{orders?.map((order) => <OrderItemCard order={order} />)}</div>
            )}
        </>
    );
};

export default OrderDetailPage;
