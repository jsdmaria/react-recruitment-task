import HttpClient from '@/utils/HttpClient';

import { POKEMON_API_BASE_URL } from '@/constants/Pokemon.consts';

const httpClient = new HttpClient(POKEMON_API_BASE_URL);

const pokemonService = {
	fetchPokemonDetails: async (id: number): Promise<IBaseResponse<IPokemon>> =>
		await httpClient.get<IPokemon>(`/pokemon/${id}`),

	fetchPokemonList: async (
		offset: number,
		limit: number
	): Promise<
		IBaseResponse<{ results: Array<{ name: string; url: string }> }>
	> =>
		await httpClient.get<{ results: Array<{ name: string; url: string }> }>(
			'/pokemon',
			{
				params: {
					offset,
					limit,
				},
			}
		),
};

export default pokemonService;
