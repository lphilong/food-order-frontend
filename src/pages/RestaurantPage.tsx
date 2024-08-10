import SearchBar, { SearchForm } from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGetAllRestaurants } from '@/api/RestaurantApi';
import PaginationSelector from '@/components/PaginationSelector';
import SearchResultCard from '@/components/SearchResultCard';
import RestaurantPageLoader from '@/components/SkeletonLoader/RestaurantPageLoader';

const RestaurantPage = () => {
    const navigate = useNavigate();
    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        });
    };
    const { restaurant, isLoading } = useGetAllRestaurants();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalRestaurants = restaurant?.length || 0;
    const totalPages = Math.ceil(totalRestaurants / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const visibleRestaurants = restaurant?.slice(startIndex, endIndex) || [];
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex mb-10 justify-between items-center max-md:flex-col max-md:gap-5">
                    <h2 className="text-5xl font-bold ">Restaurants</h2>
                    <SearchBar placeHolder="Search by City or Town" onSubmit={handleSearchSubmit} />
                </div>
                <ul className="space-y-4">
                    {isLoading
                        ? Array.from({ length: pageSize }).map((_, index) => <RestaurantPageLoader key={index} />)
                        : visibleRestaurants.map((r) => <SearchResultCard key={r._id} restaurant={r} link={`/detail/${r._id}`} />)}
                    {!isLoading && <PaginationSelector page={currentPage} pages={totalPages} onPageChange={handlePageChange} />}
                </ul>
            </div>
        </div>
    );
};

export default RestaurantPage;
