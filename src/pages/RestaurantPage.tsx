import React, { useCallback, useMemo, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllRestaurants } from '@/api/RestaurantApi';
import SearchBar, { SearchForm } from '@/components/Search/SearchBar';
import PaginationSelector from '@/components/PaginationSelector';
import RestaurantPageLoader from '@/components/SkeletonLoader/RestaurantPageLoader';
import usePagination from '@/hooks/usePagination';
import { Restaurant } from '@/types';
import BackButton from '@/components/BackButton';

const SearchResultCard = lazy(() => import('@/components/Search/SearchResultCard'));

const RestaurantPage: React.FC = React.memo(() => {
    const navigate = useNavigate();

    const handleSearchSubmit = useCallback(
        (searchFormValues: SearchForm) => {
            navigate({
                pathname: `/search/${searchFormValues.searchQuery}`,
            });
        },
        [navigate],
    );

    const { restaurant, isLoading } = useGetAllRestaurants();
    const pageSize = 5;

    const { currentPage, totalPages, visibleItems: visibleRestaurants, handlePageChange } = usePagination<Restaurant>(restaurant || [], pageSize);

    const renderRestaurants = useMemo(() => {
        return visibleRestaurants.map((r) => (
            <Suspense fallback={<RestaurantPageLoader />}>
                <SearchResultCard key={r._id} restaurant={r} link={`/detail/${r._id}`} />
            </Suspense>
        ));
    }, [visibleRestaurants]);

    if (!visibleRestaurants || visibleRestaurants.length === 0) {
        return (
            <div className="flex">
                <BackButton />
                <span className="pl-5 text-2xl font-bold">No restaurant available</span>
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex mb-10 justify-between items-center max-md:flex-col max-md:gap-5">
                    <h2 className="text-5xl font-bold">Restaurants</h2>
                    <SearchBar placeHolder="Search by City or Town" onSubmit={handleSearchSubmit} />
                </div>
                <ul className="space-y-4">
                    {!isLoading && <PaginationSelector page={currentPage} pages={totalPages} onPageChange={handlePageChange} />}
                    {isLoading ? Array.from({ length: pageSize }).map((_, index) => <RestaurantPageLoader key={index} />) : renderRestaurants}
                    {!isLoading && <PaginationSelector page={currentPage} pages={totalPages} onPageChange={handlePageChange} />}
                </ul>
            </div>
        </div>
    );
});

export default RestaurantPage;
