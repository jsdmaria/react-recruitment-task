const getPokemonStatName = (selectedPokemon: IPokemon, statName: string) => {
	return selectedPokemon?.stats.find(({ stat }) => stat.name === statName)
		?.base_stat;
};

export const getPokemonData = (selectedPokemon: IPokemon) => {
	return [
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
			value: getPokemonStatName(selectedPokemon, 'hp') ?? 0,
		},
		{
			name: 'Attack',
			value: getPokemonStatName(selectedPokemon, 'attack') ?? 0,
		},
		{
			name: 'Defense',
			value: getPokemonStatName(selectedPokemon, 'defense') ?? 0,
		},
	];
};
