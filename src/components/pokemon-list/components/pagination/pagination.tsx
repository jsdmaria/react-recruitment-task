import { memo } from 'react';

import PaginationButton from '@/components/pokemon-list/components/pagination-button/pagination-button';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination = memo(
	({ currentPage, totalPages, onPageChange }: PaginationProps) => {
		if (totalPages <= 1) return null;

		return (
			<nav className="flex justify-center mt-8" aria-label="Pagination">
				<ul className="flex gap-2">
					{/* Previous */}
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
					<>...</>
					{/* Pages */}
					{Array.from({ length: totalPages }, (_, i) => {
						const page = i + 1;
						const isActive = page === currentPage;

						return (
							<li key={page}>
								<PaginationButton
									type="button"
									onClick={() => onPageChange(page)}
									aria-current={isActive ? 'page' : undefined}
									aria-label={`Page ${page}`}
									isActive={isActive}
								>
									{page}
								</PaginationButton>
							</li>
						);
					})}
					<>...</>
					{/* Next */}
					<li>
						<PaginationButton
							onClick={() => onPageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							aria-disabled={currentPage === totalPages}
							aria-label="Next page"
						>
							&gt;
						</PaginationButton>
					</li>
				</ul>
			</nav>
		);
	}
);

Pagination.displayName = 'Pagination';

export default Pagination;
