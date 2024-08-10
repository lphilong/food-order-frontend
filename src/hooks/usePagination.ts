// usePagination.ts
import { useState, useMemo } from 'react';

type PaginationResult<T> = {
    currentPage: number;
    totalPages: number;
    visibleItems: T[];
    handlePageChange: (newPage: number) => void;
};

const usePagination = <T>(items: T[], pageSize: number): PaginationResult<T> => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = items.length;
    const totalPages = useMemo(() => Math.ceil(totalItems / pageSize), [totalItems, pageSize]);
    const startIndex = useMemo(() => (currentPage - 1) * pageSize, [currentPage, pageSize]);
    const endIndex = useMemo(() => startIndex + pageSize, [startIndex, pageSize]);
    const visibleItems = useMemo(() => items.slice(startIndex, endIndex), [items, startIndex, endIndex]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return {
        currentPage,
        totalPages,
        visibleItems,
        handlePageChange,
    };
};

export default usePagination;
