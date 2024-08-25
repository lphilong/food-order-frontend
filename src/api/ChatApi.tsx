import { LastMessage, Message, NewMessage } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//get message between user and restaurant
export const useGetMessages = (restaurantId: string, userId: string) => {
    const { getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(false);

    const getMessagesRequest = useCallback(
        async (before?: string) => {
            setLoading(true);
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await fetch(`${API_BASE_URL}/api/chat/${restaurantId}/${userId}?limit=20${before ? `&before=${before}` : ''}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to get chat messages');
                }

                const messages = await response.json();
                return messages;
            } catch (error) {
                console.error('Error fetching messages:', error);
                return [];
            } finally {
                setLoading(false);
            }
        },
        [restaurantId, userId, getAccessTokenSilently],
    );

    const { data: initialMessages = [], isLoading: initialLoading } = useQuery(
        ['fetchChatMessages', restaurantId, userId],
        () => getMessagesRequest(),
        {
            initialData: [],
        },
    );

    return {
        messages: initialMessages,
        isLoading: initialLoading || loading,
        getMessagesRequest,
    };
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
