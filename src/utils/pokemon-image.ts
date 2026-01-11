const imageModules = import.meta.glob<{ default: string }>('../assets/*.png', {
	eager: true,
});

const pokemonImages = new Map<number, string>();

Object.entries(imageModules).forEach(([path, module]) => {
	const match = path.match(/(\d+)\.png$/);
	if (match) {
		const id = parseInt(match[1], 10);
		if (module.default) {
			pokemonImages.set(id, module.default);
		}
	}
});

export const getPokemonImageUrl = (id: number): string => {
	return pokemonImages.get(id) || '';
};

export const pokemonImagesCollection = pokemonImages;

