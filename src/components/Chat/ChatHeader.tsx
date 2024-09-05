import BackButton from '@/components/BackButton';

const ChatHeader = () => (
    <div className="bg-blue-500 text-white p-4 rounded-t-lg flex gap-2 items-center">
        <BackButton />
        <h1 className="text-xl font-bold text-black">Chat</h1>
    </div>
);

export default ChatHeader;
