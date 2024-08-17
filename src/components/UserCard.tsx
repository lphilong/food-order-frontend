import { Message } from '@/types';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Link } from 'react-router-dom';

type Props = {
    message: Message;
    link: string;
};

const UserCard = ({ message, link }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-col gap-4 mb-3">
                    <Link to={link}>
                        <div>
                            Username:
                            <span className="ml-2 font-normal">{message.user.name}</span>
                        </div>
                        <div>
                            <span className="ml-2 font-normal">{message.content}</span>
                        </div>
                    </Link>
                </CardTitle>
                <Separator />
            </CardHeader>
        </Card>
    );
};

export default UserCard;
