import { Restaurant } from '@/types';
import { Link } from 'react-router-dom';
import { AspectRatio } from './ui/aspect-ratio';
import { useEffect, useState } from 'react';

type Props = {
    restaurant?: Restaurant;
    link: string;
    hasNewMessage: boolean;
};

const ConversationCard = ({ restaurant, link, hasNewMessage }: Props) => {
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
        <div className="group bg-gray-100 p-10 relative">
            <Link to={link} className="w-full h-full gap-5 flex flex-col ">
                <AspectRatio ratio={16 / 9}>
                    <img src={imageSrc} className="rounded-md w-full h-full object-cover" />
                </AspectRatio>
                <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline text-center">{restaurant.restaurantName}</h3>{' '}
                {hasNewMessage && (
                    <div className="absolute top-2 right-2">
                        <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg animate-scaleUp">
                            <h1 className="text-md font-extrabold text-center text-white ">New</h1>
                        </div>
                    </div>
                )}
            </Link>
        </div>
    );
};

export default ConversationCard;