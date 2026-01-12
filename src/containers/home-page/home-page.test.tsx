import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import HomePage from './home-page';
import pokemonReducer from '@/store/pokemon-slice';

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

		expect(screen.getByRole('heading', { name: 'Pokedex' })).toBeInTheDocument();
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

		const loadingSection = screen.getByLabelText('Pokemon list');
		expect(loadingSection).toHaveAttribute('aria-busy', 'true');
	});
});
