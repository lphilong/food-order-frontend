import { Message } from '@/types';

type ChatContentProps = {
    messages: Message[];
    currentUserId: string;
    chatContainerRef: React.RefObject<HTMLDivElement>;
    typingUser: string | null;
    showScrollDown: boolean;
    scrollToBottom: () => void;
    initialLoading: boolean;
    hasMore: boolean;
    lastSentMessageId: string | null;
    sendError: string | null; // Add this prop
};

const ChatContent = ({
    messages,
    currentUserId,
    chatContainerRef,
    typingUser,
    showScrollDown,
    scrollToBottom,
    initialLoading,
    hasMore,
    lastSentMessageId,
    sendError,
}: ChatContentProps) => (
    <div className="flex-1 p-4 overflow-y-auto relative" ref={chatContainerRef}>
        {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'} mb-4 `}>
                <div>
                    <div className={`p-4 rounded-lg max-w-xs ${msg.senderId === currentUserId ? 'bg-green-200' : 'bg-gray-200'}`}>
                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                    {msg.senderId === currentUserId && msg._id === lastSentMessageId && (
                        <div className="flex justify-end text-gray-500 text-sm right-0 ">Sent</div>
                    )}
                </div>
            </div>
        ))}
        {typingUser && <div className="p-2 text-gray-500 text-sm">{typingUser === currentUserId ? 'Restaurant' : 'User'} is typing...</div>}
        {initialLoading && <div className="absolute top-4 left-0 right-0 text-center text-gray-500">Loading</div>}
        {!hasMore && <div className="absolute top-4 left-0 right-0 text-center text-gray-500">No more messages</div>}
        {showScrollDown && (
            <button
                onClick={scrollToBottom}
                className="fixed bottom-4 left-1/2 transform -translate-y-[350%] bg-blue-500 text-white py-2 px-5 rounded-full text-xl"
                aria-label="Scroll to bottom"
            >
                ↓
            </button>
        )}
        {sendError && <div className="absolute right-0 text-center text-red-500 bg-white p-2">{sendError}</div>}
    </div>
);

export default ChatContent;
