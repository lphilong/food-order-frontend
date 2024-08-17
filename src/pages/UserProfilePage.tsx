import { useGetMyUser, useUpdateMyUser } from '@/api/UserApi';
import BackButton from '@/components/BackButton';
import UserProfileLoader from '@/components/SkeletonLoader/UserProfileLoader';
import UserProfileForm from '@/form/UserProfileForm';

const UserProfilePage = () => {
    const { currentUser, isLoading: isGetLoading } = useGetMyUser();
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

    if (isGetLoading || isUpdateLoading) {
        return <UserProfileLoader />;
    }

    if (!currentUser) {
        return <span>Unable to load user profile</span>;
    }

    return (
        <div>
            <BackButton />
            <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />
        </div>
    );
};

export default UserProfilePage;
