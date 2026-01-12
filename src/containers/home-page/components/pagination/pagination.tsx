import { memo, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

import PaginationButton, {
	PAGINATION_BUTTON_STYLES,
} from '@/containers/home-page/components/pagination-button/pagination-button';

import { useAppDispatch } from '@/store/hooks';
import { setCurrentPage } from '@/store/pokemon-slice';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
}

const Pagination = memo(({ currentPage, totalPages }: PaginationProps) => {
	if (totalPages <= 1) return null;

	const dispatch = useAppDispatch();
	const isLastPage = currentPage === totalPages;

	const handlePageChange = useCallback(
		(page: number) => {
			dispatch(setCurrentPage(page));
		},
		[dispatch]
	);

	return (
		<nav className="flex justify-center mt-8" aria-label="Pagination">
			<ul className="flex gap-2">
				{/* First page */}
				<li>
					<PaginationButton
						onClick={() => handlePageChange(1)}
						disabled={currentPage === 1}
						aria-disabled={currentPage === 1}
						aria-label="Go to the first page"
					>
						&lt;&lt;
					</PaginationButton>
				</li>

				{/* Previous page */}
				<li>
					<PaginationButton
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
						aria-disabled={currentPage === 1}
						aria-label="Go to the previous page"
					>
						&lt;
					</PaginationButton>
				</li>

				{/* Current page */}
				<li
					className={twMerge(
						PAGINATION_BUTTON_STYLES,
						'font-bold bg-primary-400 text-white'
					)}
					aria-current="page"
				>
					<span className="text-xs md:text-sm">
						{currentPage} of {totalPages}
					</span>
				</li>

				{/* Next page */}
				<li>
					<PaginationButton
						disabled={isLastPage}
						onClick={() => handlePageChange(currentPage + 1)}
						aria-disabled={isLastPage}
						aria-label="Go to the next page"
					>
						&gt;
					</PaginationButton>
				</li>

				{/* Last page */}
				<li>
					<PaginationButton
						disabled={isLastPage}
						onClick={() => handlePageChange(totalPages)}
						aria-disabled={isLastPage}
						aria-label="Go to the last page"
					>
						&gt;&gt;
					</PaginationButton>
				</li>
			</ul>
		</nav>
	);
});

Pagination.displayName = 'Pagination';

export default Pagination;
