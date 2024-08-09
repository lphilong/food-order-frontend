import { useCreateMyRestaurant, useGetRestaurantsByUser } from '@/api/RestaurantApi';
import PaginationSelector from '@/components/PaginationSelector';
import RestaurantCard from '@/components/RestaurantCard';
import RestaurantResultCard from '@/components/RestaurantResultCard';
import OrderRestaurantLoader from '@/components/SkeletonLoader/OrderRestaurantLoader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateRestaurantForm from '@/form/restaurant-form/CreateRestaurantForm';
import { useState } from 'react';

const ManageRestaurantPage = () => {
    const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant();
    const { restaurants, isLoading } = useGetRestaurantsByUser();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const totalRestaurants = restaurants?.length || 0;
    const totalPages = Math.ceil(totalRestaurants / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const visibleRestaurants = restaurants?.slice(startIndex, endIndex) || [];
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };
    return (
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="create-restaurant">Create Restaurant</TabsTrigger>
                <TabsTrigger value="update-restaurant">Update Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className=" bg-gray-50 rounded-lg grid lg:grid-cols-3 gap-4 ">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, index) => <OrderRestaurantLoader key={index} />)
                ) : !restaurants || restaurants.length === 0 ? (
                    <div className="mt-10">
                        <span className=" text-2xl font-bold">Create your restaurant first</span>
                    </div>
                ) : (
                    restaurants.map((restaurant) => <RestaurantCard restaurant={restaurant} />)
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
                    visibleRestaurants.map((restaurant) => <RestaurantResultCard restaurant={restaurant} />)
                )}
                {!isLoading && <PaginationSelector page={currentPage} pages={totalPages} onPageChange={handlePageChange} />}
            </TabsContent>
        </Tabs>
    );
};

export default ManageRestaurantPage;
