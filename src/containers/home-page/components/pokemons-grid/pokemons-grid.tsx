import { memo } from 'react';

import PokemonCard from '@/containers/home-page/components/pokemon-card/pokemon-card';

interface PokemonGridProps {
	pokemons: IPokemonListItem[];
}

const PokemonGrid = memo(({ pokemons }: PokemonGridProps) => {
	return (
		<div className="grid pokemon-grid gap-x-11 gap-y-5">
			{pokemons.map((pokemon) => (
				<PokemonCard key={pokemon.id} {...pokemon} />
			))}
		</div>
	);
});

PokemonGrid.displayName = 'PokemonGrid';

export default PokemonGrid;
