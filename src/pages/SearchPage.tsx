import { useSearchRestaurants } from '@/api/SearchApi';
import BackButton from '@/components/BackButton';
import CuisineFilter from '@/components/CuisineFilter';
import PaginationSelector from '@/components/PaginationSelector';
import SearchBar, { SearchForm } from '@/components/Search/SearchBar';
import SearchResultCard from '@/components/Search/SearchResultCard';
import SearchResultInfo from '@/components/Search/SearchResultInfo';
import SearchLoader from '@/components/SkeletonLoader/SearchLoader';
import SortOptionDropdown from '@/components/SortOptionDropdown';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[];
    sortOption: string;
};

const SearchPage = () => {
    const { city } = useParams();
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: '',
        page: 1,
        selectedCuisines: [],
        sortOption: 'bestMatch',
    });

    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const { results, isLoading } = useSearchRestaurants(searchState, city);

    const setSortOption = useCallback((sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1,
        }));
    }, []);

    const setSelectedCuisines = useCallback((selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1,
        }));
    }, []);

    const setPage = useCallback((page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page,
        }));
    }, []);

    const setSearchQuery = useCallback((searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1,
        }));
    }, []);

    const resetSearch = useCallback(() => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: '',
            page: 1,
        }));
    }, []);

    if (isLoading) {
        <SearchLoader />;
    }

    if (!results?.data || !city) {
        return (
            <div className="flex">
                <BackButton />
                <span className="pl-5 text-2xl font-bold">No result found</span>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter
                    selectedCuisines={searchState.selectedCuisines}
                    onChange={setSelectedCuisines}
                    isExpanded={isExpanded}
                    onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
                />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar
                    searchQuery={searchState.searchQuery}
                    onSubmit={setSearchQuery}
                    placeHolder="Search by Cuisine or Restaurant Name"
                    onReset={resetSearch}
                />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo total={results.pagination.total} city={city} />
                    <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
                </div>

                {results.data.map((restaurant) => (
                    <SearchResultCard key={restaurant._id} restaurant={restaurant} link={`/detail/${restaurant._id}`} />
                ))}
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            </div>
        </div>
    );
};

export default SearchPage;
