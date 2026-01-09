import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import HomePage from './HomePage';
import pokemonReducer from '@/store/PokemonSlice';

describe('HomePage', () => {
	const createMockStore = (initialState = {}) => {
		return configureStore({
			reducer: {
				pokemon: pokemonReducer,
			},
			preloadedState: {
				pokemon: {
					pokemons: [],
					currentPage: 1,
					totalPages: 1,
					selectedPokemon: null,
					isLoading: false,
					error: null,
					...initialState,
				},
			},
		});
	};

	it('renders Pokedex title', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<BrowserRouter>
					<HomePage />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText('Pokedex')).toBeInTheDocument();
	});

	it('shows loading state', () => {
		const store = createMockStore({ isLoading: true });
		render(
			<Provider store={store}>
				<BrowserRouter>
					<HomePage />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('shows error message', () => {
		const store = createMockStore({ error: 'Failed to fetch' });
		render(
			<Provider store={store}>
				<BrowserRouter>
					<HomePage />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText(/Error:/)).toBeInTheDocument();
	});
});

