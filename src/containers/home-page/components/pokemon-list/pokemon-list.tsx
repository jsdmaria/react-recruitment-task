import { useEffect } from 'react';

import Loading from '@/components/loading/loading';
import PokemonsGrid from '@/containers/home-page/components/pokemons-grid/pokemons-grid';
import Pagination from '@/containers/home-page/components/pagination/pagination';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPokemons } from '@/store/pokemon-thunks';

import { useApiError } from '@/hooks/use-api-error';

const PokemonList = () => {
	const dispatch = useAppDispatch();

	const { pokemons, currentPage, totalPages, isLoading, error } =
		useAppSelector((state) => state.pokemon);

	useEffect(() => {
		dispatch(fetchPokemons(currentPage));
	}, [dispatch, currentPage]);

	useApiError(error);

	return (
		<div className="flex flex-col flex-1 min-h-0">
			<section
				className="flex-1 overflow-y-auto relative custom-scroll"
				aria-label="Pokemon list"
				aria-busy={isLoading}
			>
				{isLoading ? <Loading /> : <PokemonsGrid pokemons={pokemons} />}
			</section>
			<footer className="flex-shrink-0 mb-1">
				<Pagination currentPage={currentPage} totalPages={totalPages} />
			</footer>
		</div>
	);
};

export default PokemonList;
