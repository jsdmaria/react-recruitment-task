import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import Heading from '@/components/heading/heading';
import Loading from '@/components/loading/loading';
import PokemonDataTable from '@/containers/pokemon-details-page/components/pokemon-data-table/pokemon-data-table';

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
			const pokemonId = parseInt(id, 10);
			if (!isNaN(pokemonId)) {
				dispatch(fetchPokemonDetails(pokemonId));
			}
		}
	}, [id, dispatch]);

	useApiError(error);

	const getPokemonStatName = (statName: string) => {
		return selectedPokemon?.stats.find(({ stat }) => stat.name === statName)
			?.base_stat;
	};

	const pokemonData = useMemo(() => {
		const pokemonDataArr = [
			{
				name: 'Types',
				value:
					selectedPokemon?.types
						.map(
							({ type }) =>
								type.name.charAt(0).toUpperCase() +
								type.name.slice(1)
						)
						.join(', ') || '',
			},
			{
				name: 'Height',
				value: selectedPokemon?.height ?? 0,
			},
			{
				name: 'Weight',
				value: selectedPokemon?.weight ?? 0,
			},
			{
				name: 'HP',
				value: getPokemonStatName('hp') ?? 0,
			},
			{
				name: 'Attack',
				value: getPokemonStatName('attack') ?? 0,
			},
			{
				name: 'Defense',
				value: getPokemonStatName('defense') ?? 0,
			},
		];
		return pokemonDataArr;
	}, [selectedPokemon]);

	return (
		<div className="flex flex-col items-center py-4 px-6 lg:p-4 flex-1">
			<div className="w-full lg:max-w-[1232px] flex flex-col gap-6 flex-1">
				<Heading>
					<Link
						to="/"
						className="hover:text-green-500 transition-colors duration-300"
					>
						Home
					</Link>{' '}
					/{' '}
					<span className="capitalize">{selectedPokemon?.name}</span>
				</Heading>

				{isLoading ? (
					<Loading />
				) : selectedPokemon ? (
					<div className="flex flex-col sm:flex-row gap-4 md:gap-6 ">
						{selectedPokemon.image ? (
							<div className="w-full md:size-[256px] flex items-center justify-center border-2 border-black">
								<img
									src={selectedPokemon.image}
									alt={selectedPokemon.name}
									className="w-full object-contain"
									loading="lazy"
									onError={(e) => {
										console.error(
											`Failed to load image for ${selectedPokemon.name} (ID: ${id})`
										);
										e.currentTarget.style.display = 'none';
									}}
								/>
							</div>
						) : (
							<div className="w-full md:size-[256px] flex items-center justify-center bg-gray-100">
								<span className="text-gray-400">
									No image provided
								</span>
							</div>
						)}

						<div className="flex flex-col gap-2 w-full md:w-[200px]">
							<h2 className="text-lg font-bold capitalize">
								{selectedPokemon?.name}
							</h2>
							<PokemonDataTable data={pokemonData} />
						</div>
					</div>
				) : (
					<p>Pokemon not found</p>
				)}
			</div>
		</div>
	);
};

export default PokemonDetailsPage;
