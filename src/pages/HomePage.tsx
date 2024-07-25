import landingImage from '../assets/landing.png';
import appDownloadImage from '../assets/appDownload.png';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGetAllRestaurants } from '@/api/RestaurantApi';
import PaginationSelector from '@/components/PaginationSelector';
import SearchResultCard from '@/components/SearchResultCard';

const HomePage = () => {
    const navigate = useNavigate();
    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        });
    };
    const { restaurant } = useGetAllRestaurants();
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
                <div className="flex mb-10 justify-between items-center">
                    <h2 className="text-5xl font-bold ">Restaurants</h2>
                    <SearchBar placeHolder="Search by City or Town" onSubmit={handleSearchSubmit} />
                </div>
                <ul className="space-y-4">
                    {visibleRestaurants.map((r) => (
                        <SearchResultCard key={r._id} restaurant={r} />
                    ))}
                    <PaginationSelector
                        page={currentPage}
                        pages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </ul>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} />
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Order takeaway even faster!
                    </span>
                    <span>
                        Download the Demo App for faster ordering and personalized recommendations
                    </span>
                    <img src={appDownloadImage} />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
