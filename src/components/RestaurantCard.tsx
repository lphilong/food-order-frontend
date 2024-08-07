import { Restaurant } from '@/types';
import { Link } from 'react-router-dom';
import { AspectRatio } from './ui/aspect-ratio';

type Props = {
    restaurant?: Restaurant;
};

const RestaurantCard = ({ restaurant }: Props) => {
    if (!restaurant) {
        return <div>No restaurant data available.</div>;
    }
    return (
        <div className="group bg-gray-200 p-10 ">
            <Link to={`/order/${restaurant._id}`} className="w-full h-full gap-5 flex flex-col ">
                <AspectRatio ratio={16 / 9}>
                    <img src={restaurant.imageUrl} className="rounded-md w-full h-full object-cover" />
                </AspectRatio>
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline text-center">{restaurant.restaurantName}</h3>
            </Link>
        </div>
    );
};

export default RestaurantCard;
