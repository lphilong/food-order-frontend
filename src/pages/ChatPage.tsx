import { useGetMyUser } from '@/api/UserApi';
import { useDebounce } from '@/hooks/useDebounce';
import { useGetMessages } from '@/api/ChatApi';
import { Message } from '@/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import ChatContent from '@/components/Chat/ChatContent';
import ChatHeader from '@/components/Chat/ChatHeader';
import ChatInput from '@/components/Chat/ChatInput';

const ChatPage = () => {
    const { restaurantId, userId } = useParams<{ restaurantId: string; userId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [content, setContent] = useState('');
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const [typingUser, setTypingUser] = useState<string | null>(null);
    const [showScrollDown, setShowScrollDown] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [pagination, setPagination] = useState<{ before?: string }>({ before: undefined });
    const [hasMore, setHasMore] = useState(true);
    const [lastSentMessageId, setLastSentMessageId] = useState<string | null>(null);
    const [sendError, setSendError] = useState<string | null>(null);

    const socketRef = useRef<Socket | null>(null);
    const { messages: initialMessages, isLoading: initialLoading, getMessagesRequest } = useGetMessages(restaurantId || '', userId || '');
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
            setMessages((prevMessages) => {
                // Avoid duplicating messages
                if (!prevMessages.some((msg) => msg._id === message._id)) {
                    return [...prevMessages, { ...message, isSent: false }];
                }
                return prevMessages;
            });
            const chatContainer = chatContainerRef.current;
            if (chatContainer && chatContainer.scrollTop + chatContainer.clientHeight >= chatContainer.scrollHeight) {
                setIsAtBottom(true);
            } else {
                setShowScrollDown(true);
            }
        });
        socket.on('messageSent', ({ messageId }) => {
            setLastSentMessageId(messageId);
            setIsSendingMessage(false);
            setSendError(null);
        });

        socket.on('sendMessageError', ({ error }) => {
            setIsSendingMessage(false);
            setSendError(`Failed to send message: ${error}`);
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

                const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
                setIsAtBottom(atBottom);
                setShowScrollDown(!atBottom);

                if (scrollTop === 0 && hasMore && !initialLoading) {
                    const newMessages: Message[] = await getMessagesRequest(pagination.before);
                    if (newMessages.length > 0) {
                        const lastMessageTimestamp = newMessages[newMessages.length - 1].createdAt;
                        setPagination({ before: lastMessageTimestamp });

                        setMessages((prevMessages) => {
                            const prevMessageIds = new Set(prevMessages.map((msg) => msg._id));
                            const filteredNewMessages = newMessages
                                .filter((msg) => !prevMessageIds.has(msg._id))
                                .slice()
                                .reverse();
                            return [...filteredNewMessages, ...prevMessages];
                        });
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
    }, [getMessagesRequest, hasMore, pagination.before, initialLoading]);

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
        if (restaurantId && content.trim() && userId) {
            setIsSendingMessage(true);
            setLastSentMessageId(null);
            setSendError(null);
            socketRef.current?.emit('sendMessage', {
                userId,
                restaurantId,
                content,
                createdAt: new Date(),
                senderId: currentUser?._id || '',
            });

            socketRef.current?.emit('stopTyping', { restaurantId, userId });
            setContent('');
        } else {
            console.error('Missing restaurantId, content, or userId');
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
                <ChatHeader />
                {/* Chat Messages */}
                <ChatContent
                    messages={messages}
                    currentUserId={currentUser?._id || ''}
                    chatContainerRef={chatContainerRef}
                    typingUser={typingUser}
                    showScrollDown={showScrollDown}
                    scrollToBottom={scrollToBottom}
                    initialLoading={initialLoading}
                    hasMore={hasMore}
                    lastSentMessageId={lastSentMessageId}
                    sendError={sendError}
                />
                {/* Chat Input */}
                <ChatInput
                    content={content}
                    isSendingMessage={isSendingMessage}
                    onChange={(e) => setContent(e.target.value)}
                    onSubmit={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default ChatPage;
