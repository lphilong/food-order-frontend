import { Order, Restaurant } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAllRestaurants = () => {
    const getAllRestaurantsRequest = async (): Promise<Restaurant[]> => {
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to get restaurant');
        }
        return response.json();
    };

    const { data: restaurant, isLoading } = useQuery('fetchMyRestaurant', getAllRestaurantsRequest);

    return { restaurant, isLoading };
};

export const useGetRestaurantsByUser = () => {
    const { getAccessTokenSilently } = useAuth0();
    const getRestaurantsByUser = async (): Promise<Restaurant[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get restaurant');
        }

        return response.json();
    };

    const { data: restaurants, isLoading } = useQuery('fetchAllRestaurant', getRestaurantsByUser);

    return { restaurants, isLoading };
};

export const useDeleteRestaurant = (restaurantId?: string) => {
    const { getAccessTokenSilently } = useAuth0();

    const deleteRestaurantRequest = async (): Promise<string> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/${restaurantId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete restaurant');
        }

        return response.json();
    };
    const { mutate: deleteRestaurant, isLoading, isSuccess, error } = useMutation(deleteRestaurantRequest);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Restaurant deleted!', {
                duration: 2000,
            });
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            toast.error('Unable to delete restaurant');
        }
    }, [error]);

    return { deleteRestaurant, isLoading };
};

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        });

        if (!response.ok) {
            throw new Error('Failed to create restaurant');
        }

        return response.json();
    };

    const { mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(createMyRestaurantRequest);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Restaurant created!', {
                duration: 2000,
            });
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            toast.error('Unable to create restaurant');
        }
    }, [error]);

    return { createRestaurant, isLoading };
};

export const useUpdateMyRestaurant = (restaurantId?: string) => {
    const { getAccessTokenSilently } = useAuth0();

    const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/${restaurantId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        });

        if (!response) {
            throw new Error('Failed to update restaurant');
        }

        return response.json();
    };

    const { mutate: updateRestaurant, isLoading, error, isSuccess } = useMutation(updateRestaurantRequest);

    if (isSuccess) {
        toast.success('Restaurant Updated');
    }

    if (error) {
        toast.error('Unable to update restaurant');
    }

    return { updateRestaurant, isLoading };
};

export const useGetMyRestaurantOrders = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        return response.json();
    };

    const { data: orders, isLoading } = useQuery('fetchMyRestaurantOrders', getMyRestaurantOrdersRequest);

    return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
    orderId: string;
    status: string;
};

export const useUpdateMyRestaurantOrder = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateMyRestaurantOrder = async (updateStatusOrderRequest: UpdateOrderStatusRequest) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: updateStatusOrderRequest.status }),
        });

        if (!response.ok) {
            throw new Error('Failed to update status');
        }

        return response.json();
    };

    const { mutateAsync: updateRestaurantStatus, isLoading, isError, isSuccess, reset } = useMutation(updateMyRestaurantOrder);

    if (isSuccess) {
        toast.success('Order updated');
    }

    if (isError) {
        toast.error('Unable to update order');
        reset();
    }

    return { updateRestaurantStatus, isLoading };
};
