import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchPokemons, fetchPokemonDetails } from '@/store/pokemon-thunks';

import {
	POKEMONS_PER_PAGE,
	FIRST_GENERATION_POKEMON_COUNT,
} from '@/constants/pokemon.consts';

interface PokemonState extends IBaseState {
	pokemons: IPokemonListItem[];
	currentPage: number;
	totalPages: number;
	selectedPokemon: IPokemon | null;
}

const initialState: PokemonState = {
	pokemons: [],
	currentPage: 1,
	totalPages: Math.ceil(FIRST_GENERATION_POKEMON_COUNT / POKEMONS_PER_PAGE),
	selectedPokemon: null,
	isLoading: false,
	error: null,
};

const pokemonSlice = createSlice({
	name: 'pokemon',
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<number>) => {
			const page = action.payload;
			if (page >= 1 && page <= state.totalPages) {
				state.currentPage = page;
			}
		},
		clearSelectedPokemon: (state) => {
			state.selectedPokemon = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch Pokemons status handlers
			.addCase(fetchPokemons.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchPokemons.fulfilled, (state, action) => {
				state.isLoading = false;
				state.pokemons = action.payload.pokemons;
				state.currentPage = action.payload.page;
			})
			.addCase(fetchPokemons.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			})
			// Fetch Pokemon Details status handlers
			.addCase(fetchPokemonDetails.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchPokemonDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.selectedPokemon = action.payload as IPokemon;
			})
			.addCase(fetchPokemonDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setCurrentPage, clearSelectedPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
