export {};

declare global {
	interface IBaseResponse<T = any> {
		success: boolean;
		message?: string;
		data?: T;
	}

	interface IPokemon {
		id: number;
		name: string;
		base_experience: number;
		height: number;
		weight: number;
		sprites: {
			front_default: string;
			other?: {
				'official-artwork': {
					front_default: string;
				};
			};
		};
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
		abilities: Array<{
			ability: {
				name: string;
			};
		}>;
	}
}

