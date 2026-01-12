import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

import PaginationButton, {
	PAGINATION_BUTTON_STYLES,
} from '@/components/pokemon-list/components/pagination-button/pagination-button';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination = memo(
	({ currentPage, totalPages, onPageChange }: PaginationProps) => {
		const isLastPage = currentPage === totalPages;
		if (totalPages <= 1) return null;

		return (
			<nav className="flex justify-center mt-8" aria-label="Pagination">
				<ul className="flex gap-2">
					{/* First page */}
					<li>
						<PaginationButton
							onClick={() => onPageChange(1)}
							disabled={currentPage === 1}
							aria-disabled={currentPage === 1}
							aria-label="Previous page"
						>
							&lt;&lt;
						</PaginationButton>
					</li>

					{/* Previous page */}
					<li>
						<PaginationButton
							onClick={() => onPageChange(currentPage - 1)}
							disabled={currentPage === 1}
							aria-disabled={currentPage === 1}
							aria-label="Previous page"
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
					>
						<span className="text-xs md:text-sm">
							{currentPage} of {totalPages}
						</span>
					</li>

					{/* Next page */}
					<li>
						<PaginationButton
							disabled={isLastPage}
							onClick={() => onPageChange(currentPage + 1)}
						>
							&gt;
						</PaginationButton>
					</li>

					{/* Last page */}
					<li>
						<PaginationButton
							disabled={isLastPage}
							onClick={() => onPageChange(totalPages)}
						>
							&gt;&gt;
						</PaginationButton>
					</li>
				</ul>
			</nav>
		);
	}
);

Pagination.displayName = 'Pagination';

export default Pagination;
