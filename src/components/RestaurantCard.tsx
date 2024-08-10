import { Restaurant } from '@/types';
import { Link } from 'react-router-dom';
import { AspectRatio } from './ui/aspect-ratio';
import { useGetOrdersByRestaurant } from '@/api/OrderApi';

type Props = {
    restaurant?: Restaurant;
    link: string;
};

const RestaurantCard = ({ restaurant, link }: Props) => {
    const { orders } = useGetOrdersByRestaurant(restaurant?._id);

    if (!restaurant) {
        return <div>No restaurant data available.</div>;
    }
    return (
        <div className="group bg-gray-100 p-10 ">
            <Link to={link} className="w-full h-full gap-5 flex flex-col ">
                <AspectRatio ratio={16 / 9}>
                    <img src={restaurant.imageUrl} className="rounded-md w-full h-full object-cover" />
                </AspectRatio>
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline text-center">{restaurant.restaurantName}</h3>{' '}
                <div className="flex justify-center">
                    <span className="text-xl font-bold">Active Order(s): {orders?.length} </span>
                </div>
            </Link>
        </div>
    );
};

export default RestaurantCard;
