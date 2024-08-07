import { AspectRatio } from './ui/aspect-ratio';
import { Banknote, Clock } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import { Order } from '@/types';

type Props = {
    order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
    if (!order) {
        return <div>No order available.</div>;
    }
    return (
        <div className="grid lg:grid-cols-[2fr_3fr] gap-5  mb-10 mt-5 bg-gray-50 p-5">
            <AspectRatio ratio={16 / 9}>
                <img src={order.restaurant.imageUrl} className="rounded-md w-full h-full object-cover" />
            </AspectRatio>
            <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2 max-sm:text-xl max-sm:text-center ">{order.restaurant.restaurantName}</h3>
                <div id="card-content" className="gap-2">
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-5">
                            <span className="font-bold">Delivering to:</span>
                            <span>{order.deliveryDetails.name}</span>
                            <span>
                                {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <span className="font-bold">Your Order: </span>
                            <ul>
                                {order.cartItems.map((item) => (
                                    <li>
                                        {item.name} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex gap-2">
                            <span className="font-bold">Total: </span>
                            <span>${order.totalAmount}</span>
                        </div>
                        <div className="flex gap-5 flex-col">
                            <div className="flex items-center gap-1 text-green-600">
                                <Clock className="text-green-600" />
                                {order.restaurant.estimatedDeliveryTime} mins
                            </div>
                            <div className="flex items-center gap-1">
                                <Banknote />
                                Delivery from ${formatCurrency(order.restaurant.deliveryPrice)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatusDetail;
