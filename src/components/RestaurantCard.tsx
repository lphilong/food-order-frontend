import { Restaurant } from '@/types';
import { Link } from 'react-router-dom';
import { AspectRatio } from './ui/aspect-ratio';
import { useGetOrdersByRestaurant } from '@/api/OrderApi';
import { useEffect, useState } from 'react';

type Props = {
    restaurant?: Restaurant;
    link: string;
    hasNewOrder: boolean;
};

const RestaurantCard = ({ restaurant, link, hasNewOrder }: Props) => {
    const { orders, error } = useGetOrdersByRestaurant(restaurant?._id);
    const [imageSrc, setImageSrc] = useState(restaurant?.imageUrl || 'placeholder-image-url');

    useEffect(() => {
        if (restaurant?.imageUrl) {
            setImageSrc(restaurant.imageUrl);
        }
    }, [restaurant]);

    if (!restaurant) {
        return <div>No restaurant data available.</div>;
    }

    if (error) {
        return <div>Error loading orders.</div>;
    }
    return (
        <div className="group bg-gray-100 p-10 ">
            <Link to={link} className="w-full h-full gap-5 flex flex-col ">
                <AspectRatio ratio={16 / 9}>
                    <img src={imageSrc} className="rounded-md w-full h-full object-cover" />
                </AspectRatio>
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline text-center">{restaurant.restaurantName}</h3>{' '}
                <div className="flex justify-center relative">
                    {hasNewOrder && (
                        <div className="absolute right-0">
                            <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg animate-scaleUp">
                                <h1 className="text-md font-extrabold text-center text-white ">New</h1>
                            </div>
                        </div>
                    )}
                    <span className="text-xl font-bold">Active Order(s): {orders?.length} </span>
                </div>
            </Link>
        </div>
    );
};

export default RestaurantCard;
