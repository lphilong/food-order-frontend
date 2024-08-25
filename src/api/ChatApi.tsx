import { LastMessage, Message, NewMessage } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//get message between user and restaurant
export const useGetMessage = (restaurantId: string, userId: string) => {
    const { getAccessTokenSilently } = useAuth0();

    const getMessageRequest = async (): Promise<Message[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/chat/${restaurantId}/${userId}`, {
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

    const { data: messages = [], isLoading } = useQuery(['fetchChatMessages', restaurantId, userId], getMessageRequest);

    return { messages, isLoading };
};

export const useGetNewMessage = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getNewMessageRequest = async (): Promise<NewMessage[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/chat/unread`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get orders');
        }

        return response.json();
    };

    const { data: messages, isLoading } = useQuery('fetchNewMessage', getNewMessageRequest, {
        refetchInterval: 5000,
    });

    return { messages, isLoading };
};
export const useGetLastMessagesWithUserInfo = (restaurantId: string) => {
    const { getAccessTokenSilently } = useAuth0();

    const getLastMessagesWithUserInfoRequest = async (): Promise<LastMessage[]> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/chat//restaurant/${restaurantId}/with-user-info`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get Last Messages With User Info');
        }
        return await response.json();
    };

    const { data: users = [], isLoading } = useQuery(['fetchLastMessagesWithUserInfo', restaurantId], getLastMessagesWithUserInfoRequest);

    return { users, isLoading };
};

//add message
export const useAddChat = () => {
    const { getAccessTokenSilently } = useAuth0();

    const addChatRequest = async (chatData: { userId: string; restaurantId: string; content: string; senderId: string }): Promise<Message> => {
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

        return await response.json();
    };

    const { mutate: addChat, isLoading } = useMutation(addChatRequest);

    return { addChat, isLoading };
};
