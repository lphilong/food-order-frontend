import { ChangeEventHandler } from 'react';

type ChatInputProps = {
    content: string;
    isSendingMessage: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    onSubmit: () => void;
};
const ChatInput = ({ content, isSendingMessage, onChange, onSubmit }: ChatInputProps) => (
    <div className="p-4 bg-gray-200 rounded-b-lg">
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-2 rounded-lg border border-gray-300"
                value={content}
                onChange={onChange}
                aria-label="Type your message"
            />
            <button type="submit" className="mt-2 w-full bg-blue-500 text-white p-2 rounded-lg" aria-label="Send message" disabled={isSendingMessage}>
                {isSendingMessage ? 'Sending...' : 'Send'}
            </button>
        </form>
    </div>
);

export default ChatInput;
