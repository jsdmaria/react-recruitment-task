import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPokemons } from '@/store/PokemonThunks';
import { setCurrentPage } from '@/store/PokemonSlice';
import PokemonCard from '@/components/PokemonCard/PokemonCard';
import Pagination from '@/components/Pagination/Pagination';
import { handleApiError } from '@/utils/ErrorHandler';

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
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="container mx-auto px-4">
				<h1 className="text-3xl font-bold mb-8">Pokedex</h1>

				{isLoading ? (
					<div className="flex justify-center items-center min-h-[400px]">
						<p className="text-lg">Loading...</p>
					</div>
				) : (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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

