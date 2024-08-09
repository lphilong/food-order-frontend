const OrderStatusLoader = () => {
    return (
        <div className="animate-pulse">
            <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between max-sm:text-2xl">
                <span className="bg-gray-300 h-8 w-1/2 rounded"></span>
                <span className="bg-gray-300 h-8 w-1/3 rounded"></span>
            </h1>
            <div className="h-4 bg-gray-300 rounded w-full mt-4"></div>

            <div className="grid lg:grid-cols-[2fr_3fr] gap-5 mb-10 mt-5 bg-gray-50 p-5">
                <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded-md"></div>
                <div>
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="gap-2">
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-5">
                                <span className="h-4 bg-gray-300 rounded w-1/4"></span>
                                <span className="h-4 bg-gray-300 rounded w-1/2"></span>
                                <span className="h-4 bg-gray-300 rounded w-1/3"></span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="h-4 bg-gray-300 rounded w-1/4"></span>
                                <ul className="space-y-2">
                                    <li className="h-4 bg-gray-300 rounded w-3/4"></li>
                                    <li className="h-4 bg-gray-300 rounded w-2/3"></li>
                                    <li className="h-4 bg-gray-300 rounded w-1/2"></li>
                                </ul>
                            </div>
                            <div className="flex gap-2">
                                <span className="h-4 bg-gray-300 rounded w-1/4"></span>
                                <span className="h-4 bg-gray-300 rounded w-1/4"></span>
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
            </div>
        </div>
    );
};

export default OrderStatusLoader;
