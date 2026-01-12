import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import Heading from '@/components/heading/heading';
import Loading from '@/components/loading/loading';
import PokemoneDetails from '@/containers/pokemon-details-page/components/pokemone-details/pokemone-details';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPokemonDetails } from '@/store/pokemon-thunks';

import { useApiError } from '@/hooks/use-api-error';

const PokemonDetailsPage = () => {
	const { id } = useParams<{ id: string }>();

	const dispatch = useAppDispatch();

	const { selectedPokemon, isLoading, error } = useAppSelector(
		(state) => state.pokemon
	);

	useEffect(() => {
		if (id) {
			dispatch(fetchPokemonDetails(Number(id)));
		}
	}, [id, dispatch]);

	useApiError(error);

	return (
		<div className="flex flex-col items-center py-4 px-6 lg:p-4 flex-1">
			<div className="w-full lg:max-w-[1232px] flex flex-col gap-6 flex-1">
				<nav aria-label="Breadcrumb">
					<Heading>
						<Link
							to="/"
							className="hover:text-green-500 transition-colors duration-300"
							aria-label="Go to home page"
						>
							Home
						</Link>{' '}
						/{' '}
						<span className="capitalize">
							{selectedPokemon?.name || 'Pokemon Details'}
						</span>
					</Heading>
				</nav>

				{isLoading ? (
					<Loading />
				) : selectedPokemon ? (
					<PokemoneDetails selectedPokemon={selectedPokemon} />
				) : (
					<p role="alert">Pokemon not found</p>
				)}
			</div>
		</div>
	);
};

export default PokemonDetailsPage;
