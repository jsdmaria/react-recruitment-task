interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) => {
	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const maxVisible = 5;

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 4; i++) {
					pages.push(i);
				}
				pages.push('...');
				pages.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1);
				pages.push('...');
				for (let i = totalPages - 3; i <= totalPages; i++) {
					pages.push(i);
				}
			} else {
				pages.push(1);
				pages.push('...');
				for (let i = currentPage - 1; i <= currentPage + 1; i++) {
					pages.push(i);
				}
				pages.push('...');
				pages.push(totalPages);
			}
		}

		return pages;
	};

	return (
		<div className="flex justify-center items-center gap-2 mt-8">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
			>
				&lt;
			</button>

			{getPageNumbers().map((page, index) => {
				if (page === '...') {
					return (
						<span key={`ellipsis-${index}`} className="px-2">
							...
						</span>
					);
				}

				return (
					<button
						key={page}
						onClick={() => onPageChange(page as number)}
						className={`px-3 py-2 border border-gray-300 rounded ${
							currentPage === page
								? 'bg-blue-500 text-white'
								: 'hover:bg-gray-100'
						}`}
					>
						{page}
					</button>
				);
			})}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
			>
				&gt;
			</button>
		</div>
	);
};

export default Pagination;
