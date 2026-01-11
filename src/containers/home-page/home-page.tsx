import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPokemons } from '@/store/pokemon-thunks';
import { setCurrentPage } from '@/store/pokemon-slice';
import PokemonCard from '@/components/pokemon-card/pokemon-card';
import Pagination from '@/components/pagination/pagination';
import { handleApiError } from '@/utils/error-handler';

const HomePage = () => {
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

	const handlePageChange = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	return (
		<div className="flex flex-col items-center min-h-screen p-6">
			<div className="w-full lg:max-w-[1232px] flex flex-col gap-6">
				<h1 className="text-lg font-bold">Pokedex</h1>

				{isLoading ? (
					<div className="flex justify-center items-center min-h-[400px]">
						<p className="text-lg">Loading...</p>
					</div>
				) : (
					<>
						<div className="flex flex-wrap justify-between gap-6 lg:gap-x-6 xl:gap-y-5">
							{pokemons.map((pokemon) => (
								<PokemonCard key={pokemon.id} {...pokemon} />
							))}
						</div>

						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default HomePage;
