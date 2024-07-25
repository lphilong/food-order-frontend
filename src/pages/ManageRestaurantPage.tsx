import {
    useCreateMyRestaurant,
    useGetRestaurantsByUser,
    useGetMyRestaurantOrders,
} from '@/api/RestaurantApi';
import OrderItemCard from '@/components/OrderItemCard';
import RestaurantResultCard from '@/components/RestaurantResultCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateRestaurantForm from '@/form/restaurant-form/CreateRestaurantForm';

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { restaurants } = useGetRestaurantsByUser();
    const { orders } = useGetMyRestaurantOrders();

    return (
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="create-restaurant">Create Restaurant</TabsTrigger>
                <TabsTrigger value="restaurant-list">Restaurant List</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-5 bg-gray-50 p-10 rounded-lg">
                <h2 className="text-2xl font-bold">{orders?.length || 0} active orders</h2>
                {orders?.map((order) => <OrderItemCard order={order} />)}
            </TabsContent>
            <TabsContent value="create-restaurant">
                <CreateRestaurantForm onSave={createRestaurant} isLoading={isCreateLoading} />
            </TabsContent>
            <TabsContent value="restaurant-list">
                {!restaurants || restaurants.length === 0 ? (
                    <div className="mt-10">
                        <span className=" text-2xl font-bold">Create your restaurant</span>
                    </div>
                ) : (
                    restaurants.map((restaurant) => (
                        <RestaurantResultCard restaurant={restaurant} />
                    ))
                )}
            </TabsContent>
        </Tabs>
    );
};

export default ManageRestaurantPage;
