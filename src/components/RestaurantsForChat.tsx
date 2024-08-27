import { Restaurant } from '@/types';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
type Props = {
    restaurant: Restaurant;
    link: string;
};
const RestaurantsForChat = ({ restaurant, link }: Props) => {
    const [imageSrc, setImageSrc] = useState(restaurant?.imageUrl || 'placeholder-image-url');

    useEffect(() => {
        if (restaurant?.imageUrl) {
            setImageSrc(restaurant.imageUrl);
        }
    }, [restaurant]);

    if (!restaurant) {
        return <div>No restaurant data available.</div>;
    }

    return (
        <div className="group bg-gray-100 p-10 relative ">
            <Link to={link} className="w-full h-full gap-5 flex flex-col ">
                <AspectRatio ratio={16 / 9}>
                    <img src={imageSrc} className="rounded-md w-full h-full object-cover" />
                </AspectRatio>
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline text-center">{restaurant.restaurantName}</h3>
            </Link>
        </div>
    );
};

export default RestaurantsForChat;
