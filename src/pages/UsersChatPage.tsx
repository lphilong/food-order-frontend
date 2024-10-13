import { useState, useEffect } from 'react';
import { useGetLastMessagesWithUserInfo } from '../api/ChatApi';
import { Link, useParams } from 'react-router-dom';
import BackButton from '@/components/BackButton';
import { LastMessage } from '@/types';
import PaginationSelector from '@/components/PaginationSelector';
import usePagination from '@/hooks/usePagination';
import { formatDate } from '@/utils/formatDate';

const UsersChatPage = () => {
    const { restaurantId } = useParams<{ restaurantId: string }>();
    const [users, setUsers] = useState<LastMessage[]>([]);
    const { users: fetchUsers, isLoading } = useGetLastMessagesWithUserInfo(restaurantId || '');

    const pageSize = 9;
    const {
        currentPage: currentUsersPage,
        totalPages: totalUsersPages,
        visibleItems: visibleUsers,
        handlePageChange: handleUsersChange,
    } = usePagination(users || [], pageSize);

    useEffect(() => {
        if (fetchUsers) {
            const sortedUsers = fetchUsers.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setUsers(sortedUsers);
        }
    }, [fetchUsers]);

    if (!users || users.length === 0) {
        return (
            <div className="flex">
                <BackButton />
                <span className="pl-5 text-2xl font-bold">No messages</span>
            </div>
        );
    }
    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 flex gap-2 max-md:text-2xl">
                <BackButton />
                Users Chat List
            </h2>
            <div className="bg-white shadow-lg rounded-lg ">
                {users.length === 0 ? (
                    <p className="text-center text-gray-600 py-6">No messages found.</p>
                ) : (
                    <ul className="rounded-lg grid lg:grid-cols-3 gap-4">
                        {!isLoading && (
                            <div className="flex justify-center w-full my-4 col-span-full">
                                <PaginationSelector page={currentUsersPage} pages={totalUsersPages} onPageChange={handleUsersChange} />
                            </div>
                        )}
                        {visibleUsers.map((user) => (
                            <Link to={`/chat/${restaurantId}/${user.userInfo._id}`} key={user._id}>
                                <li className="flex bg-gray-100 rounded-lg overflow-hidden m-2 p-4">
                                    <div className="flex gap-5 items-start w-full">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-medium flex-shrink-0"></div>
                                        <div className="flex flex-col flex-grow w-full">
                                            <p className="text-md text-black mb-2">{user.userInfo.email}</p>
                                            <div className="flex items-center flex-row gap-3 overflow-hidden w-[80%]">
                                                <p className="text-black flex-1 whitespace-nowrap overflow-hidden text-ellipsis ">
                                                    {user.senderId === user.userInfo._id ? user.content : `Bạn: ${user.content}`}
                                                </p>
                                                <p className="text-sm text-black whitespace-nowrap">{formatDate(user.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))}
                        {!isLoading && (
                            <div className="flex justify-center w-full my-4 col-span-full">
                                <PaginationSelector page={currentUsersPage} pages={totalUsersPages} onPageChange={handleUsersChange} />
                            </div>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UsersChatPage;
