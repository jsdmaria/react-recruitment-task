export {};

declare global {
	interface IPokemonListItem {
		id: number;
		name: string;
		image: string;
	}

	interface IPokemon {
		id: number;
		name: string;
		height: number;
		weight: number;
		types: Array<{
			type: {
				name: string;
			};
		}>;
		stats: Array<{
			base_stat: number;
			stat: {
				name: string;
			};
		}>;
	}

	interface IPokemonWithImage extends IPokemon {
		image: string;
	}
}
