import { useGetRestaurantById } from '@/api/SearchApi';
import MenuItem from '@/components/MenuItem';
import OrderSummary from '@/components/Order/OrderSummary';
import RestaurantInfo from '@/components/Restaurant/RestaurantInfo';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardFooter } from '@/components/ui/card';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartItem, MenuItem as MenuItemType } from '../types';
import CheckoutButton from '@/components/CheckoutButton';
import { UserFormData } from '@/form/UserProfileForm';
import { useCreateCheckoutSession } from '@/api/OrderApi';

const DetailPage = () => {
    const { restaurantId } = useParams();
    const { restaurant, isLoading } = useGetRestaurantById(restaurantId);
    const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();

    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });
    useEffect(() => {
        sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(cartItems));
    }, [cartItems, restaurantId]);

    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);

            if (existingCartItem) {
                return prevCartItems.map((cartItem) => (cartItem._id === menuItem._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem));
            } else {
                return [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1,
                    },
                ];
            }
        });
    };

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => prevCartItems.filter((item) => cartItem._id !== item._id));
    };

    const onCheckout = useCallback(
        async (userFormData: UserFormData) => {
            if (!restaurant) {
                return;
            }

            const checkoutData = {
                cartItems: cartItems.map((cartItem) => ({
                    menuItemId: cartItem._id,
                    name: cartItem.name,
                    quantity: cartItem.quantity.toString(),
                })),
                restaurantId: restaurant._id,
                deliveryDetails: {
                    name: userFormData.name,
                    addressLine1: userFormData.addressLine1,
                    city: userFormData.city,
                    country: userFormData.country,
                    email: userFormData.email as string,
                },
            };

            const data = await createCheckoutSession(checkoutData);
            window.location.href = data.url;
        },
        [cartItems, restaurant, createCheckoutSession],
    );

    if (isLoading || !restaurant) {
        return 'Loading...';
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItem menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
                    ))}
                </div>

                <div>
                    <Card>
                        <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
                        <CardFooter>
                            <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckout} isLoading={isCheckoutLoading} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
