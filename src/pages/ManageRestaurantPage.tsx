import { useCreateMyRestaurant, useGetRestaurantsByUser } from '@/api/RestaurantApi';
import RestaurantCard from '@/components/RestaurantCard';
import RestaurantResultCard from '@/components/RestaurantResultCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateRestaurantForm from '@/form/restaurant-form/CreateRestaurantForm';

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { restaurants } = useGetRestaurantsByUser();

    return (
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="create-restaurant">Create Restaurant</TabsTrigger>
                <TabsTrigger value="update-restaurant">Update Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className=" bg-gray-50  rounded-lg grid lg:grid-cols-3 gap-4 ">
                {!restaurants || restaurants.length === 0 ? (
                    <div className="mt-10">
                        <span className=" text-2xl font-bold">Create your restaurant</span>
                    </div>
                ) : (
                    restaurants.map((restaurant) => <RestaurantCard restaurant={restaurant} />)
                )}
            </TabsContent>
            <TabsContent value="create-restaurant">
                <CreateRestaurantForm onSave={createRestaurant} isLoading={isCreateLoading} />
            </TabsContent>
            <TabsContent value="update-restaurant">
                {!restaurants || restaurants.length === 0 ? (
                    <div className="mt-10">
                        <span className=" text-2xl font-bold">Create your restaurant</span>
                    </div>
                ) : (
                    restaurants.map((restaurant) => <RestaurantResultCard restaurant={restaurant} />)
                )}
            </TabsContent>
        </Tabs>
    );
};

export default ManageRestaurantPage;
