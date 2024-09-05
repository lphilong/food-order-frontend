import { useGetRestaurantById } from '@/api/SearchApi';
import { useParams } from 'react-router-dom';
import ManageRestaurantForm from '@/form/restaurant-form/ManageRestaurantForm';
import { useDeleteRestaurant, useUpdateMyRestaurant } from '@/api/RestaurantApi';
import BackButton from '@/components/BackButton';
import { useCallback, useMemo } from 'react';

const UpdateRestaurant = () => {
    const { restaurantId } = useParams();
    const { restaurant } = useGetRestaurantById(restaurantId);
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant(restaurantId);
    const { deleteRestaurant, isLoading: isDeleteLoading } = useDeleteRestaurant(restaurantId);

    const handleDelete = useCallback(async () => {
        try {
            const confirmed = confirm('Are you sure you want to delete the restaurant?');
            if (confirmed) {
                deleteRestaurant();
                alert('Restaurant deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting restaurant:', error);
            alert('Failed to delete restaurant');
        }
    }, [deleteRestaurant]);
    const isLoading = useMemo(() => isUpdateLoading || isDeleteLoading, [isUpdateLoading, isDeleteLoading]);
    return (
        <div>
            <BackButton />
            <ManageRestaurantForm restaurant={restaurant} onSave={updateRestaurant} isLoading={isLoading} />
            <div className="flex justify-end">
                <button className="bg-red-500 text-white px-4 py-2 rounded " onClick={handleDelete} disabled={isLoading}>
                    Delete Restaurant
                </button>
            </div>
        </div>
    );
};

export default UpdateRestaurant;
