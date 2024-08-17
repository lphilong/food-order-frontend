import { useGetOrdersByRestaurant } from '@/api/OrderApi';
import BackButton from '@/components/BackButton';
import OrderItemCard from '@/components/OrderItemCard';
import { useMemo, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetailPage = () => {
    const { restaurantId } = useParams();
    const { orders, isLoading, error } = useGetOrdersByRestaurant(restaurantId);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isFiltered, setIsFiltered] = useState(false);

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return orderDate.toDateString() === selectedDate.toDateString();
        });
    }, [orders, selectedDate]);

    const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(new Date(e.target.value));
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading orders</div>;

    const displayedOrders = isFiltered ? filteredOrders : orders;

    return (
        <>
            <BackButton />
            {orders?.length === 0 ? (
                <div className="mt-5">
                    <span className="text-2xl font-bold">No order</span>
                </div>
            ) : (
                <div className="bg-gray-50 p-10 rounded-lg mt-4">
                    <div className="flex max-sm:flex-col items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-white shadow-md rounded-lg w-full sm:w-[50%] md:w-[30%] ml-auto">
                        <input
                            type="date"
                            className="border border-gray-300 rounded px-3 py-2"
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={handleDateChange}
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsFiltered(true)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                            >
                                Filter
                            </button>
                            <button
                                onClick={() => setIsFiltered(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {displayedOrders.map((order) => (
                            <OrderItemCard key={order._id} order={order} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderDetailPage;
