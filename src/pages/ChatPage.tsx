import { useAddChat, useGetMessage } from '@/api/ChatApi';
import { useGetMyUser } from '@/api/UserApi';
import { Message } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

const ChatPage = () => {
    const { restaurantId, userId } = useParams<{ restaurantId: string; userId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState('');
    const socketRef = useRef<Socket | null>(null);
    const { messages: fetchedMessages, isLoading: isLoadingMessages } = useGetMessage(restaurantId || '', userId || '');
    const { addChat, isLoading: isSendingMessage } = useAddChat();
    const { currentUser } = useGetMyUser();
    useEffect(() => {
        const SERVER_URL = import.meta.env.VITE_API_BASE_URL;
        if (!restaurantId) return;

        const socket = io(`${SERVER_URL}`);
        socketRef.current = socket;

        socket.emit('joinRoom', { restaurantId, userId });

        socket.on('newMessage', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [restaurantId, userId]);

    useEffect(() => {
        if (fetchedMessages) {
            setMessages(fetchedMessages);
        }
    }, [fetchedMessages]);

    const handleSendMessage = useCallback(async () => {
        if (restaurantId && content && userId) {
            const newMessage: Message = {
                restaurantId,
                userId,
                content,
                timestamp: new Date(),
                senderId: currentUser?._id || '',
                lastMessage: { content: '', createdAt: '' },
            };

            addChat(
                { userId, restaurantId, content, senderId: currentUser?._id || '' },
                {
                    onSuccess: () => {
                        socketRef.current?.emit('sendMessage', newMessage);
                        setContent('');
                    },
                    onError: (error) => {
                        console.error('Failed to send message:', error);
                    },
                },
            );
        } else {
            console.error('Missing restaurantId, or message');
        }
    }, [restaurantId, content, userId, currentUser?._id, addChat]);
    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg flex flex-col h-full">
                {/* Chat Header */}
                <div className="bg-blue-500 text-white p-4 rounded-t-lg">
                    <h1 className="text-xl">Chat with Restaurant</h1>
                </div>
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto" id="messages">
                    {isLoadingMessages ? (
                        <p>Loading messages...</p>
                    ) : (
                        messages.map((msg, index) => {
                            return (
                                <div key={index} className={`flex ${msg.senderId === currentUser?._id ? 'justify-end' : 'justify-start'} mb-4`}>
                                    <div className={`p-4 rounded-lg max-w-xs ${msg.senderId === currentUser?._id ? 'bg-green-200' : 'bg-gray-200'}`}>
                                        <p>{msg.content}</p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
                {/* Chat Input */}
                <div className="p-4 bg-gray-200 rounded-b-lg">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full p-2 rounded-lg border border-gray-300"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            aria-label="Type your message"
                        />
                        <button
                            type="submit"
                            className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg"
                            aria-label="Send message"
                            disabled={isSendingMessage}
                        >
                            {isSendingMessage ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
