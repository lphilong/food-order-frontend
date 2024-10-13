import { useGetNewOrders } from '@/api/OrderApi';
import { useCreateMyRestaurant, useGetRestaurantsByUser } from '@/api/RestaurantApi';
import PaginationSelector from '@/components/PaginationSelector';
import RestaurantCard from '@/components/Restaurant/RestaurantCard';
import RestaurantResultCard from '@/components/Restaurant/RestaurantResultCard';
import OrderRestaurantLoader from '@/components/SkeletonLoader/OrderRestaurantLoader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateRestaurantForm from '@/form/restaurant-form/CreateRestaurantForm';
import usePagination from '@/hooks/usePagination';
import { Order } from '@/types';
import { useEffect, useState } from 'react';
import RestaurantsForChat from '../components/Restaurant/RestaurantsForChat';

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { restaurants, isLoading } = useGetRestaurantsByUser();
    const { orders } = useGetNewOrders();
    const [newOrders, setNewOrders] = useState<Order[]>([]);
    const [tabList] = useState([
        { value: 'orders', label: 'Orders' },
        { value: 'messages', label: 'Messages' },
        { value: 'create-restaurant', label: 'Create Restaurant' },
        { value: 'update-restaurant', label: 'Update Restaurant' },
    ]);
    const pageSize = 6;
    const {
        currentPage: currentOrderPage,
        totalPages: totalOrderPages,
        visibleItems: visibleOrders,
        handlePageChange: handleOrderChange,
    } = usePagination(restaurants || [], pageSize);
    const {
        currentPage: currentRestaurantPage,
        totalPages: totalRestaurantPages,
        visibleItems: visibleRestaurants,
        handlePageChange: handleRestaurantChange,
    } = usePagination(restaurants || [], pageSize);
    const {
        currentPage: currentConversationPage,
        totalPages: totalConversationPages,
        visibleItems: visibleConversations,
        handlePageChange: handleConversationChange,
    } = usePagination(restaurants || [], pageSize);

    useEffect(() => {
        setNewOrders(orders || []);
    }, [orders]);

    return (
        <Tabs defaultValue="orders">
            <TabsList className="flex max-md:flex-wrap justify-between lg:w-[33%]">
                <div className="flex max-md:overflow-x-auto max-md:space-x-4 ">
                    {tabList.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value} className="max-md:min-w-[50%] max-md:shrink-0">
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </div>
            </TabsList>

            {/*ORDERS*/}
            <TabsContent value="orders" className="rounded-lg grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10 relative">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => <OrderRestaurantLoader key={index} />)
                ) : !restaurants || restaurants.length === 0 ? (
                    <div className="mt-10 text-center">
                        <span className="text-2xl font-bold">Create your restaurant first</span>
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
                        <PaginationSelector page={currentOrderPage} pages={totalOrderPages} onPageChange={handleOrderChange} />
                    </div>
                )}
            </TabsContent>

            {/*MESSAGES*/}
            <TabsContent value="messages" className="rounded-lg grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => <OrderRestaurantLoader key={index} />)
                ) : !restaurants || restaurants.length === 0 ? (
                    <div className="mt-10 text-center">
                        <span className="text-2xl font-bold">Create your restaurant first</span>
                    </div>
                ) : (
                    visibleConversations.map((restaurant) => (
                        <RestaurantsForChat key={restaurant._id} restaurant={restaurant} link={`/conversations/${restaurant._id}`} />
                    ))
                )}
                {!isLoading && (
                    <div className="flex justify-center w-full my-4 col-span-full">
                        <PaginationSelector page={currentConversationPage} pages={totalConversationPages} onPageChange={handleConversationChange} />
                    </div>
                )}
            </TabsContent>

            {/*CREATE-RESTAURANT*/}
            <TabsContent value="create-restaurant">
                <CreateRestaurantForm onSave={createRestaurant} isLoading={isCreateLoading} />
            </TabsContent>

            {/*UPDATE-RESTAURANT*/}
            <TabsContent value="update-restaurant" className="bg-white rounded-lg shadow-md p-4 space-y-4">
                {!isLoading && <PaginationSelector page={currentRestaurantPage} pages={totalRestaurantPages} onPageChange={handleRestaurantChange} />}
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => <OrderRestaurantLoader key={index} />)
                ) : !restaurants || restaurants.length === 0 ? (
                    <div className="mt-10 text-center">
                        <span className="text-2xl font-bold">Create your restaurant</span>
                    </div>
                ) : (
                    visibleRestaurants.map((restaurant) => (
                        <RestaurantResultCard key={restaurant._id} restaurant={restaurant} link={`/update/${restaurant._id}`} />
                    ))
                )}
                {!isLoading && <PaginationSelector page={currentRestaurantPage} pages={totalRestaurantPages} onPageChange={handleRestaurantChange} />}
            </TabsContent>
        </Tabs>
    );
};

export default ManageRestaurantPage;
