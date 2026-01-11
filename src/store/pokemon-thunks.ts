import { createAsyncThunk } from '@reduxjs/toolkit';

import pokemonService from '@/api/pokemon-service';

import { getPokemonImageUrl } from '@/utils/pokemon-image';

import {
	POKEMONS_PER_PAGE,
	FIRST_GENERATION_POKEMON_COUNT,
} from '@/constants/pokemon.consts';

export const fetchPokemons = createAsyncThunk(
	'pokemon/fetchPokemons',
	async (page: number, { rejectWithValue }) => {
		const offset = (page - 1) * POKEMONS_PER_PAGE;

		const remainingPokemons = FIRST_GENERATION_POKEMON_COUNT - offset;
		if (remainingPokemons <= 0) {
			return { pokemons: [], page };
		}

		const limit = Math.min(POKEMONS_PER_PAGE, remainingPokemons);

		const response = await pokemonService.fetchPokemonList(offset, limit);

		if (!response.success || !response.data) {
			return rejectWithValue(
				response.message || 'Failed to fetch pokemons'
			);
		}

		const pokemons: IPokemonListItem[] = [];

		for (let i = 0; i < response.data.results.length; i++) {
			const pokemonId = offset + i + 1;

			if (pokemonId > FIRST_GENERATION_POKEMON_COUNT) {
				break;
			}

			const pokemonData = response.data.results[i];
			if (!pokemonData) break;

			pokemons.push({
				id: pokemonId,
				name: pokemonData.name,
				image: getPokemonImageUrl(pokemonId),
			});
		}

		return { pokemons, page };
	}
);

export const fetchPokemonDetails = createAsyncThunk(
	'pokemon/fetchPokemonDetails',
	async (id: number, { rejectWithValue }) => {
		if (id > FIRST_GENERATION_POKEMON_COUNT || id < 1) {
			return rejectWithValue('Pokemon ID must be between 1 and 151');
		}

		const response = await pokemonService.fetchPokemonDetails(id);

		if (!response.success || !response.data) {
			return rejectWithValue(
				response.message || 'Failed to fetch pokemon details'
			);
		}

		return response.data;
	}
);
