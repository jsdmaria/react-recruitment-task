import { useEffect, useCallback, useMemo } from 'react';

import Pagination from '@/components/pokemon-list/components/pagination/pagination';
import PokemonGrid from './components/pokemon-grid/pokemon-grid';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPokemons } from '@/store/pokemon-thunks';
import { setCurrentPage } from '@/store/pokemon-slice';

import { handleApiError } from '@/utils/error-handler';

const PokemonList = () => {
	const dispatch = useAppDispatch();

	const { pokemons, currentPage, totalPages, isLoading, error } =
		useAppSelector((state) => state.pokemon);

	useEffect(() => {
		dispatch(fetchPokemons(currentPage));
	}, [dispatch, currentPage]);

	useEffect(() => {
		if (error) {
			handleApiError(error);
		}
	}, [error]);

	const handlePageChange = useCallback(
		(page: number) => {
			dispatch(setCurrentPage(page));
		},
		[dispatch]
	);

	const paginationProps = useMemo(
		() => ({
			currentPage,
			totalPages,
			onPageChange: handlePageChange,
		}),
		[currentPage, totalPages, handlePageChange]
	);

	return (
		<div className="flex flex-col flex-1 min-h-0 ">
			<div className="flex-1 overflow-y-auto overflow-x-hidden relative custom-scroll">
				{isLoading ? (
					<div className="absolute inset-0 flex justify-center items-center z-10">
						<p className="text-lg">Loading...</p>
					</div>
				) : (
					<PokemonGrid pokemons={pokemons} />
				)}
			</div>
			<div className="flex-shrink-0">
				<Pagination {...paginationProps} />
			</div>
		</div>
	);
};

export default PokemonList;
