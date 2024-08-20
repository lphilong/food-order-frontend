import { useMemo } from 'react';

type ChatMessageProps = {
    message: string;
    isCurrentUser: boolean;
};

const ChatMessage = ({ message, isCurrentUser }: ChatMessageProps) => {
    const memoizedChatMessage = useMemo(() => {
        return (
            <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`p-4 rounded-lg max-w-xs ${isCurrentUser ? 'bg-green-200' : 'bg-gray-200'}`}>
                    <p>{message}</p>
                </div>
            </div>
        );
    }, [message, isCurrentUser]);

    return memoizedChatMessage;
};

export default ChatMessage;
