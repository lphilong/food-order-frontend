const RestaurantPageLoader = () => {
    return (
        <div className="grid lg:grid-cols-[2fr_3fr] gap-5 bg-gray-50 p-5 animate-pulse">
            <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded-md"></div>
            <div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="grid md:grid-cols-2 gap-2">
                    <div className="flex flex-row flex-wrap gap-1">
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantPageLoader;
