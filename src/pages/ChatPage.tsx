import { useAddChat } from '@/api/ChatApi';
import { useGetMyUser } from '@/api/UserApi';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetMessages } from '@/api/ChatApi';
import { Message } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import BackButton from '@/components/BackButton';

const ChatPage = () => {
    const { restaurantId, userId } = useParams<{ restaurantId: string; userId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState('');
    const [typingUser, setTypingUser] = useState<string | null>(null);
    const [showScrollDown, setShowScrollDown] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [pagination, setPagination] = useState<{ before?: string }>({ before: undefined });
    const [hasMore, setHasMore] = useState(true);

    const socketRef = useRef<Socket | null>(null);
    const { messages: initialMessages, isLoading: initialLoading, getMessagesRequest } = useGetMessages(restaurantId || '', userId || '');
    const { addChat, isLoading: isSendingMessage } = useAddChat();
    const { currentUser } = useGetMyUser();
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    // Initialize chat messages
    useEffect(() => {
        setMessages(initialMessages.slice().reverse());
    }, [initialMessages]);

    // Initialize socket connection
    useEffect(() => {
        const SERVER_URL = import.meta.env.VITE_API_BASE_URL;
        if (!restaurantId) return;

        const socket = io(SERVER_URL);
        socketRef.current = socket;

        socket.emit('joinRoom', { restaurantId, userId });

        socket.on('newMessage', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            const chatContainer = chatContainerRef.current;
            if (chatContainer && chatContainer.scrollTop + chatContainer.clientHeight >= chatContainer.scrollHeight) {
                setIsAtBottom(true);
            } else {
                setShowScrollDown(true);
            }
        });

        socket.on('typing', ({ userId }) => {
            setTypingUser(userId);
            setTimeout(() => setTypingUser(null), 1000);
        });

        return () => {
            socket.disconnect();
        };
    }, [restaurantId, userId]);

    // Load more messages on scroll
    useEffect(() => {
        const handleScroll = async () => {
            if (chatContainerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;

                // Calculate if user is at the bottom
                const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

                setIsAtBottom(atBottom);
                setShowScrollDown(!atBottom);

                if (scrollTop === 0 && hasMore && !initialLoading) {
                    const newMessages = await getMessagesRequest(pagination.before);
                    if (newMessages.length > 0) {
                        const lastMessageTimestamp = newMessages[newMessages.length - 1].createdAt;
                        setPagination({ before: lastMessageTimestamp });
                        setMessages((prevMessages) => [...newMessages, ...prevMessages]);
                        setHasMore(newMessages.length === 20);
                    } else {
                        setHasMore(false);
                    }
                }
            }
        };

        const container = chatContainerRef.current;
        container?.addEventListener('scroll', handleScroll);
        return () => container?.removeEventListener('scroll', handleScroll);
    }, [getMessagesRequest, hasMore, pagination.before, initialLoading, isAtBottom, messages, currentUser?._id]);

    // Scroll to bottom when messages or typingUser change, only if user is at the bottom
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer && isAtBottom) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
            setShowScrollDown(false);
        }
    }, [messages, typingUser, isAtBottom]);

    // Emit typing event when content changes
    useEffect(() => {
        if (restaurantId && userId && content) {
            socketRef.current?.emit('userTyping', { restaurantId, userId });
        }
    }, [content, restaurantId, userId]);

    // Debounced send message
    const debouncedSendMessage = useDebounce(() => {
        if (restaurantId && content && userId) {
            const newMessage: Message = {
                _id: '',
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
                        socketRef.current?.emit('stopTyping', { restaurantId, userId });
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

    // Scroll to bottom when scroll down arrow is clicked
    const scrollToBottom = () => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
            setShowScrollDown(false);
            setIsAtBottom(true);
        }
    };

    return (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg flex flex-col h-full">
                {/* Chat Header */}
                <div className="bg-blue-500 text-white p-4 rounded-t-lg flex gap-2 items-center">
                    <BackButton />
                    <h1 className="text-xl font-bold text-black">Chat</h1>
                </div>
                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto relative" ref={chatContainerRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.senderId === currentUser?._id ? 'justify-end' : 'justify-start'} mb-4`}>
                            <div className={`p-4 rounded-lg max-w-xs ${msg.senderId === currentUser?._id ? 'bg-green-200' : 'bg-gray-200'} `}>
                                <p className="whitespace-pre-wrap break-words">{msg.content}</p>{' '}
                            </div>
                        </div>
                    ))}
                    {typingUser && (
                        <div className="p-2 text-gray-500 text-sm">{typingUser === currentUser?._id ? 'Restaurant' : 'User'} is typing...</div>
                    )}
                    {initialLoading && <p>Loading...</p>}
                    {!hasMore && <div className="absolute top-4 left-0 right-0 text-center text-gray-500">No more messages</div>}{' '}
                    {/* Scroll Down Arrow */}
                    {showScrollDown && (
                        <button
                            onClick={scrollToBottom}
                            className="fixed bottom-4 left-1/2 transform -translate-y-[350%] bg-blue-500 text-white py-2 px-5 rounded-full text-xl"
                            aria-label="Scroll to bottom"
                        >
                            ↓
                        </button>
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
