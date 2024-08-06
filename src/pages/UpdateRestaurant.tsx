import { useGetRestaurantById } from '@/api/SearchApi';
import { useParams } from 'react-router-dom';
import ManageRestaurantForm from '@/form/restaurant-form/ManageRestaurantForm';
import { useDeleteRestaurant, useUpdateMyRestaurant } from '@/api/RestaurantApi';
import BackButton from '@/components/BackButton';

const UpdateRestaurant = () => {
    const { restaurantId } = useParams();
    const { restaurant } = useGetRestaurantById(restaurantId);
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant(restaurantId);
    const { deleteRestaurant, isLoading } = useDeleteRestaurant(restaurantId);
    const handleDelete = async () => {
        try {
            const confirmed = confirm('Are you sure you want to delete restaurant?');
            if (confirmed) {
                deleteRestaurant();
            }
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    };
    return (
        <div>
            <BackButton />
            <ManageRestaurantForm restaurant={restaurant} onSave={updateRestaurant} isLoading={isUpdateLoading} />
            <div className="flex justify-end">
                <button className="bg-red-500 text-white px-4 py-2 rounded " onClick={handleDelete} disabled={isLoading}>
                    Delete Restaurant
                </button>
            </div>
        </div>
    );
};

export default UpdateRestaurant;
