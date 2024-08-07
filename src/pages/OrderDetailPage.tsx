import { useGetOrdersByRestaurant } from '@/api/OrderApi';
import BackButton from '@/components/BackButton';
import OrderItemCard from '@/components/OrderItemCard';
import { useParams } from 'react-router-dom';

const OrderDetailPage = () => {
    const { restaurantId } = useParams();
    const { orders } = useGetOrdersByRestaurant(restaurantId);

    return (
        <>
            <BackButton />
            <div className=" bg-gray-50 p-10 rounded-lg grid grid-cols-3 gap-4 ">{orders?.map((order) => <OrderItemCard order={order} />)}</div>
        </>
    );
};

export default OrderDetailPage;
