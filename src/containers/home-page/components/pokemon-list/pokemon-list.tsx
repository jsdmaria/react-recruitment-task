import { useEffect, useCallback, useMemo } from 'react';

import PokemonsGrid from '@/containers/home-page/components/pokemons-grid/pokemons-grid';
import Pagination from '@/components/pagination/pagination';
import Loading from '@/components/loading/loading';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPokemons } from '@/store/pokemon-thunks';
import { setCurrentPage } from '@/store/pokemon-slice';

import { useApiError } from '@/hooks/use-api-error';

const PokemonList = () => {
	const dispatch = useAppDispatch();

	const { pokemons, currentPage, totalPages, isLoading, error } =
		useAppSelector((state) => state.pokemon);

	useEffect(() => {
		dispatch(fetchPokemons(currentPage));
	}, [dispatch, currentPage]);

	useApiError(error);

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
		<div className="flex flex-col flex-1 min-h-0">
			<div className="flex-1 overflow-y-auto relative custom-scroll">
				{isLoading ? <Loading /> : <PokemonsGrid pokemons={pokemons} />}
			</div>
			<div className="flex-shrink-0 mb-1">
				<Pagination {...paginationProps} />
			</div>
		</div>
	);
};

export default PokemonList;
