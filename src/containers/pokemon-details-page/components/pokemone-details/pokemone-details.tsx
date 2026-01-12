import { useMemo } from 'react';

import PokemonDataTable from '@/containers/pokemon-details-page/components/pokemon-data-table/pokemon-data-table';
import NoImage from '@/components/no-image/no-image';

import { getPokemonData } from '@/containers/pokemon-details-page/pokemon-details-page.helper';

const PokemoneDetails = ({
	selectedPokemon,
}: {
	selectedPokemon: IPokemonWithImage;
}) => {
	const pokemonData = useMemo(
		() => getPokemonData(selectedPokemon as IPokemonWithImage),
		[selectedPokemon]
	);

	return (
		<div className="flex flex-col sm:flex-row gap-4 md:gap-6">
			<div
				className="w-full md:size-64 flex items-center justify-center border-2 border-black"
				aria-label={`${selectedPokemon.name} image`}
			>
				{selectedPokemon.image ? (
					<img
						src={selectedPokemon.image}
						alt={`${selectedPokemon.name} official artwork`}
						className="w-full object-contain"
						loading="lazy"
						onError={(e) => {
							console.error(
								`Failed to load image for ${selectedPokemon.name}`
							);
							e.currentTarget.style.display = 'none';
						}}
					/>
				) : (
					<NoImage />
				)}
			</div>

			<section className="flex flex-col gap-2 w-full md:w-[200px]">
				<h2 className="text-lg font-bold capitalize">
					{selectedPokemon.name}
				</h2>
				<PokemonDataTable data={pokemonData} />
			</section>
		</div>
	);
};

export default PokemoneDetails;
