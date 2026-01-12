import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import PokemonList from './pokemon-list';
import pokemonReducer from '@/store/pokemon-slice';
import pokemonService from '@/api/pokemon-service';

vi.mock('@/hooks/use-api-error', () => ({
	useApiError: vi.fn(),
}));

vi.mock('@/api/pokemon-service', () => ({
	default: {
		fetchPokemonList: vi.fn(),
		fetchPokemonDetails: vi.fn(),
	},
}));

describe('PokemonList', () => {
	const createMockStore = (initialState = {}) => {
		return configureStore({
			reducer: {
				pokemon: pokemonReducer,
			},
			preloadedState: {
				pokemon: {
					pokemons: [],
					currentPage: 1,
					totalPages: 8,
					selectedPokemon: null,
					isLoading: false,
					error: null,
					...initialState,
				},
			},
		});
	};

	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(pokemonService.fetchPokemonList).mockResolvedValue({
			success: true,
			data: {
				results: [
					{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
					{ name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
				],
			},
		});
	});

	it('renders pokemon list section', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<BrowserRouter>
					<PokemonList />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByLabelText('Pokemon list')).toBeInTheDocument();
	});

	it('dispatches fetchPokemons on mount', async () => {
		const store = createMockStore();
		const dispatchSpy = vi.spyOn(store, 'dispatch');

		render(
			<Provider store={store}>
				<BrowserRouter>
					<PokemonList />
				</BrowserRouter>
			</Provider>
		);

		await waitFor(() => {
			expect(dispatchSpy).toHaveBeenCalled();
		});

		expect(pokemonService.fetchPokemonList).toHaveBeenCalled();
	});

	it('shows loading state when isLoading is true', () => {
		const store = createMockStore({ isLoading: true });
		render(
			<Provider store={store}>
				<BrowserRouter>
					<PokemonList />
				</BrowserRouter>
			</Provider>
		);

		const section = screen.getByLabelText('Pokemon list');
		expect(section).toHaveAttribute('aria-busy', 'true');
		expect(screen.getByText('Pokedex')).toBeInTheDocument();
	});

	it('shows pokemons grid when isLoading is false', async () => {
		const mockPokemons: IPokemonListItem[] = [
			{ id: 1, name: 'bulbasaur', image: '/src/assets/1.png' },
			{ id: 2, name: 'ivysaur', image: '/src/assets/2.png' },
		];

		const store = createMockStore({
			pokemons: mockPokemons,
			isLoading: false,
		});

		render(
			<Provider store={store}>
				<BrowserRouter>
					<PokemonList />
				</BrowserRouter>
			</Provider>
		);

		await waitFor(() => {
			const section = screen.getByLabelText('Pokemon list');
			expect(section).toHaveAttribute('aria-busy', 'false');
		});

		expect(screen.getByText('bulbasaur')).toBeInTheDocument();
		expect(screen.getByText('ivysaur')).toBeInTheDocument();
	});

	it('renders pagination component', () => {
		const store = createMockStore({ totalPages: 8 });
		render(
			<Provider store={store}>
				<BrowserRouter>
					<PokemonList />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
	});

	it('dispatches fetchPokemons when currentPage changes', async () => {
		const store = createMockStore({ currentPage: 1 });
		const dispatchSpy = vi.spyOn(store, 'dispatch');

		const { rerender } = render(
			<Provider store={store}>
				<BrowserRouter>
					<PokemonList />
				</BrowserRouter>
			</Provider>
		);

		// Update store with new currentPage
		const newStore = createMockStore({ currentPage: 2 });
		rerender(
			<Provider store={newStore}>
				<BrowserRouter>
					<PokemonList />
				</BrowserRouter>
			</Provider>
		);

		await waitFor(() => {
			expect(dispatchSpy).toHaveBeenCalled();
		});
	});

	it('renders footer with pagination', () => {
		const store = createMockStore();
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<PokemonList />
				</BrowserRouter>
			</Provider>
		);

		const footer = container.querySelector('footer');
		expect(footer).toBeInTheDocument();
	});
});

