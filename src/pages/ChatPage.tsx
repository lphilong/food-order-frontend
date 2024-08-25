import { useAddChat, useGetMessage } from '@/api/ChatApi';
import { useGetMyUser } from '@/api/UserApi';
import { useDebounce } from '@/hooks/useDebounce';
import { Message } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

const ChatPage = () => {
    const { restaurantId, userId } = useParams<{ restaurantId: string; userId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState('');
    const [typingUser, setTypingUser] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const { messages: fetchedMessages, isLoading: isLoadingMessages } = useGetMessage(restaurantId || '', userId || '');
    const { addChat, isLoading: isSendingMessage } = useAddChat();
    const { currentUser } = useGetMyUser();
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    //socket
    useEffect(() => {
        const SERVER_URL = import.meta.env.VITE_API_BASE_URL;
        if (!restaurantId) return;

        const socket = io(`${SERVER_URL}`);
        socketRef.current = socket;

        socket.emit('joinRoom', { restaurantId, userId });

        socket.on('newMessage', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        socket.on('typing', ({ userId }) => {
            setTypingUser(userId);
            setTimeout(() => setTypingUser(null), 1000);
        });
        return () => {
            socket.disconnect();
        };
    }, [restaurantId, userId]);

    //fetch messages
    useEffect(() => {
        if (fetchedMessages) {
            const reverseMessages = fetchedMessages.slice().reverse();
            setMessages(reverseMessages);
        }
    }, [fetchedMessages]);
    //scroll to bottom
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages, typingUser]);
    //show typing
    useEffect(() => {
        if (restaurantId && userId && content) {
            socketRef.current?.emit('userTyping', { restaurantId, userId });
        }
    }, [content, restaurantId, userId]);

    //prevent user from sending many messages in short time
    const debouncedSendMessage = useDebounce(() => {
        if (restaurantId && content && userId) {
            const newMessage: Message = {
                restaurantId,
                userId,
                content,
                timestamp: new Date(),
                senderId: currentUser?._id || '',
            };

            addChat(
                { userId, restaurantId, content, senderId: currentUser?._id || '' },
                {
                    onSuccess: () => {
                        socketRef.current?.emit('sendMessage', newMessage);
                        socketRef.current?.emit('stopTyping', { restaurantId, userId }); // Clear typing indicator
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
    }, 300);

    const handleSendMessage = useCallback(() => {
        debouncedSendMessage();
    }, [debouncedSendMessage]);

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg flex flex-col h-full">
                {/* Chat Header */}
                <div className="bg-blue-500 text-white p-4 rounded-t-lg">
                    <h1 className="text-xl">Chat</h1>
                </div>
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto relative" ref={chatContainerRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.senderId === currentUser?._id ? 'justify-end' : 'justify-start'} mb-4`}>
                            <div className={`p-4 rounded-lg max-w-xs ${msg.senderId === currentUser?._id ? 'bg-green-200' : 'bg-gray-200'} `}>
                                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    {typingUser && (
                        <div className="p-2 text-gray-500 text-sm">{typingUser === currentUser?._id ? 'Restaurant' : 'User'} is typing...</div>
                    )}
                    {isLoadingMessages && <p>Loading more...</p>}
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
