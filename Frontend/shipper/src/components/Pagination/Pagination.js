import React from 'react'
import { useMemo } from "react";

const Pagination = ({ table }) => {
    const pageCount = table.getPageCount();
    const currentPage = table.getState().pagination.pageIndex;


    const visiblePages = useMemo(() => {
        if (pageCount <= 6) {
            return Array.from({ length: pageCount }, (_, i) => i);
        } else {
            const startPages = [0, 1, 2];
            const endPages = [pageCount - 3, pageCount - 2, pageCount - 1];
            const middlePages = [
                currentPage - 1,
                currentPage,
                currentPage + 1,
            ].filter(page => page >= 0 && page < pageCount);

            if (currentPage < 3) {
                return [...startPages, "...", ...endPages];
            } else if (currentPage > pageCount - 4) {
                return [...startPages, "...", ...endPages];
            } else {
                return [...middlePages, "...", ...endPages];
            }
        }
    }, [pageCount, currentPage]);

    return (
        <nav aria-label="...">
            <ul class="pagination">
                <li class={`page-item`}>
                    <button class="page-link" href="#" tabindex="-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >Previous</button>
                </li>
                {visiblePages.map((page, index) => (
                    <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                        {typeof page === 'number' ? (
                            <button
                                className="page-link"
                                onClick={() => table.setPageIndex(page)}
                            >
                                {page + 1}
                            </button>
                        ) : (
                            <span className="page-link">...</span>
                        )}
                    </li>
                ))}
                <li class={`page-item`}>
                    <button class="page-link"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >Next</button>
                </li>
            </ul>
        </nav>

    );
}

export default Pagination;
