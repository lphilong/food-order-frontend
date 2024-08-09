const UserProfileLoader = () => (
    <div className="space-y-4 bg-gray-50 rounded-lg p-10 max-sm:p-5 animate-pulse">
        <div>
            <div className="h-8 bg-gray-300 rounded-md w-1/3"></div>
            <div className="mt-2 h-4 bg-gray-300 rounded-md w-2/3"></div>
        </div>
        <div className="space-y-4">
            <div className="h-10 bg-gray-300 rounded-md"></div>
            <div className="h-10 bg-gray-300 rounded-md"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 h-10 bg-gray-300 rounded-md"></div>
            <div className="flex-1 h-10 bg-gray-300 rounded-md"></div>
            <div className="flex-1 h-10 bg-gray-300 rounded-md"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded-md"></div>
    </div>
);

export default UserProfileLoader;
