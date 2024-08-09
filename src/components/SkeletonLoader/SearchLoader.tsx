const SearchLoader = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 animate-pulse">
            <div id="cuisines-list">
                <div className="h-10 bg-gray-300 rounded mb-4"></div>
                <div className="h-10 bg-gray-300 rounded mb-4"></div>
                <div className="h-10 bg-gray-300 rounded mb-4"></div>
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <div className="h-10 bg-gray-300 rounded mb-4"></div>
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <div className="h-10 bg-gray-300 rounded mb-4 lg:w-1/2"></div>
                    <div className="h-10 bg-gray-300 rounded mb-4 lg:w-1/2"></div>
                </div>
                <div className="space-y-4">
                    <div className="h-20 bg-gray-300 rounded mb-4"></div>
                    <div className="h-20 bg-gray-300 rounded mb-4"></div>
                    <div className="h-20 bg-gray-300 rounded mb-4"></div>
                </div>
                <div className="h-10 bg-gray-300 rounded mb-4"></div>
            </div>
        </div>
    );
};
export default SearchLoader;
