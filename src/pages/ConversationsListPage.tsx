import { useGetUsersWithLastMessage } from '@/api/ChatApi';
import BackButton from '@/components/BackButton';
import UserCard from '@/components/UserCard';
import { Message } from '@/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ConversationsListPage = () => {
    const { restaurantId } = useParams();
    const [conversations, setConversations] = useState<Message[]>([]);
    const { messages } = useGetUsersWithLastMessage(restaurantId || '');
    useEffect(() => {
        if (messages) {
            setConversations(messages);
        }
    }, [messages]);
    return (
        <>
            <BackButton />
            {messages.length === 0 ? (
                <div className="mt-5">
                    <span className="text-2xl font-bold">No conversation</span>
                </div>
            ) : (
                <div className="bg-gray-50 p-10 rounded-lg mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                        {conversations.map((conversation, i) => (
                            <UserCard key={i} message={conversation} link={`/chat/${restaurantId}`} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ConversationsListPage;
