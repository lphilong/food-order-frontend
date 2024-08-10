import { useGetNewOrders } from '@/api/OrderApi';
import { useCreateMyRestaurant, useGetRestaurantsByUser } from '@/api/RestaurantApi';
import PaginationSelector from '@/components/PaginationSelector';
import RestaurantCard from '@/components/RestaurantCard';
import RestaurantResultCard from '@/components/RestaurantResultCard';
import OrderRestaurantLoader from '@/components/SkeletonLoader/OrderRestaurantLoader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateRestaurantForm from '@/form/restaurant-form/CreateRestaurantForm';
import { Order } from '@/types';
import { useEffect, useState } from 'react';

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { restaurants, isLoading } = useGetRestaurantsByUser();
    const { orders } = useGetNewOrders();
    const [currentRestaurantPage, setCurrentRestaurantPage] = useState(1);
    const [currentOrderPage, setCurrentOrderPage] = useState(1);
    const [newOrders, setNewOrders] = useState<Order[]>([]);
    const pageSize = 6;
    const totalRestaurants = restaurants?.length || 0;
    const totalPages = Math.ceil(totalRestaurants / pageSize);
    const startOrder = (currentOrderPage - 1) * pageSize;
    const endOrder = startOrder + pageSize;
    const startRestaurant = (currentRestaurantPage - 1) * pageSize;
    const endRestaurant = startRestaurant + pageSize;
    const visibleRestaurants = restaurants?.slice(startRestaurant, endRestaurant) || [];
    const visibleOrders = restaurants?.slice(startOrder, endOrder) || [];

    useEffect(() => {
        setNewOrders(orders || []); // Ensure newOrders is always an array
    }, [orders]);

    const handleOrderChange = (newPage: number) => {
        setCurrentOrderPage(newPage);
    };

    const handleRestaurantChange = (newPage: number) => {
        setCurrentRestaurantPage(newPage);
    };

    return (
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="create-restaurant">Create Restaurant</TabsTrigger>
                <TabsTrigger value="update-restaurant">Update Restaurant</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="  rounded-lg grid lg:grid-cols-3 gap-4 mt-10  relative ">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => <OrderRestaurantLoader key={index} />)
                ) : !restaurants || restaurants.length === 0 ? (
                    <div className="mt-10">
                        <span className=" text-2xl font-bold">Create your restaurant first</span>
                    </div>
                ) : (
                    visibleOrders.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant._id}
                            restaurant={restaurant}
                            link={`/order/${restaurant._id}`}
                            hasNewOrder={newOrders.some((order) => order.restaurant._id === restaurant._id)}
                        />
                    ))
                )}

                {!isLoading && (
                    <div className="flex justify-center w-full my-4 col-span-full">
                        <PaginationSelector page={currentOrderPage} pages={totalPages} onPageChange={handleOrderChange} />
                    </div>
                )}
            </TabsContent>

            <TabsContent value="create-restaurant">
                <CreateRestaurantForm onSave={createRestaurant} isLoading={isCreateLoading} />
            </TabsContent>
            <TabsContent value="update-restaurant" className="bg-white rounded-lg shadow-md p-4 space-y-4">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => <OrderRestaurantLoader key={index} />)
                ) : !restaurants || restaurants.length === 0 ? (
                    <div className="mt-10">
                        <span className=" text-2xl font-bold">Create your restaurant</span>
                    </div>
                ) : (
                    visibleRestaurants.map((restaurant) => <RestaurantResultCard key={restaurant._id} restaurant={restaurant} link={`/update/${restaurant._id}`} />)
                )}
                {!isLoading && <PaginationSelector page={currentRestaurantPage} pages={totalPages} onPageChange={handleRestaurantChange} />}
            </TabsContent>
        </Tabs>
    );
};

export default ManageRestaurantPage;
