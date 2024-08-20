import { Message } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//get message between user and restaurant
export const useGetMessage = (restaurantId: string) => {
    const { getAccessTokenSilently } = useAuth0();

    const getMessageRequest = async (): Promise<Message[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/chat/${restaurantId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get chat messages');
        }
        return response.json();
    };

    const { data: messages = [], isLoading } = useQuery(['fetchChatMessages', restaurantId], getMessageRequest);

    return { messages, isLoading };
};

export const useGetUsersWithLastMessage = (restaurantId: string) => {
    const { getAccessTokenSilently } = useAuth0();

    const getUsersWithLastMessageRequest = async (): Promise<Message[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/chat/last/${restaurantId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get users and last messages');
        }

        return response.json();
    };

    const {
        data: messages = [],
        isLoading,
        error,
    } = useQuery(['fetchUsersWithLastMessage', restaurantId], getUsersWithLastMessageRequest, {
        onError: (err) => {
            console.error('Error fetching messages:', err);
        },
    });

    return { messages, isLoading, error };
};
//add message
export const useAddChat = () => {
    const { getAccessTokenSilently } = useAuth0();

    const addChatRequest = async (chatData: { restaurantId: string; content: string; senderId: string }): Promise<Message> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chatData),
        });

        if (!response.ok) {
            throw new Error('Failed to send message');
        }

        return response.json();
    };

    const { mutate: addChat, isLoading } = useMutation(addChatRequest);

    return { addChat, isLoading };
};
