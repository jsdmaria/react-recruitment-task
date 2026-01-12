import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import PokemonDetailsPage from './pokemon-details-page';
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

describe('PokemonDetailsPage', () => {
	const mockPokemon: IPokemonWithImage = {
		id: 1,
		name: 'bulbasaur',
		height: 7,
		weight: 69,
		image: '/src/assets/1.png',
		types: [
			{ type: { name: 'grass' } },
			{ type: { name: 'poison' } },
		],
		stats: [
			{ base_stat: 45, stat: { name: 'hp' } },
			{ base_stat: 49, stat: { name: 'attack' } },
			{ base_stat: 49, stat: { name: 'defense' } },
		],
	};

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
		vi.mocked(pokemonService.fetchPokemonDetails).mockResolvedValue({
			success: true,
			data: {
				id: 1,
				name: 'bulbasaur',
				height: 7,
				weight: 69,
				types: [
					{ type: { name: 'grass' } },
					{ type: { name: 'poison' } },
				],
				stats: [
					{ base_stat: 45, stat: { name: 'hp' } },
					{ base_stat: 49, stat: { name: 'attack' } },
					{ base_stat: 49, stat: { name: 'defense' } },
				],
			},
		});
	});

	it('renders breadcrumb navigation', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/pokemon/1']}>
					<PokemonDetailsPage />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
		expect(screen.getByText('Home')).toBeInTheDocument();
	});

	it('displays default text when pokemon is not loaded', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/pokemon/1']}>
					<PokemonDetailsPage />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText('Pokemon Details')).toBeInTheDocument();
	});

	it('displays pokemon name in breadcrumb when loaded', () => {
		const store = createMockStore({ selectedPokemon: mockPokemon });
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/pokemon/1']}>
					<PokemonDetailsPage />
				</MemoryRouter>
			</Provider>
		);

		const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
		expect(breadcrumb).toHaveTextContent('bulbasaur');
	});

	it('has correct link to home page', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/pokemon/1']}>
					<PokemonDetailsPage />
				</MemoryRouter>
			</Provider>
		);

		const homeLink = screen.getByRole('link', { name: 'Go to home page' });
		expect(homeLink).toHaveAttribute('href', '/');
	});

	it('renders page with pokemon id from url', () => {
		const store = createMockStore();

		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/pokemon/1']}>
					<PokemonDetailsPage />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
	});

	it('shows loading state when isLoading is true', () => {
		const store = createMockStore({ isLoading: true });
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/pokemon/1']}>
					<PokemonDetailsPage />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText('Pokedex')).toBeInTheDocument();
	});

	it('renders PokemoneDetails when pokemon is loaded', () => {
		const store = createMockStore({ selectedPokemon: mockPokemon });
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/pokemon/1']}>
					<PokemonDetailsPage />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByRole('heading', { level: 2, name: 'bulbasaur' })).toBeInTheDocument();
		expect(screen.getByRole('table', { name: 'Pokemon details' })).toBeInTheDocument();
	});

	it('displays "Pokemon not found" when selectedPokemon is null and not loading', () => {
		const store = createMockStore({ selectedPokemon: null, isLoading: false });
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/pokemon/1']}>
					<PokemonDetailsPage />
				</MemoryRouter>
			</Provider>
		);

		const alert = screen.getByRole('alert');
		expect(alert).toHaveTextContent('Pokemon not found');
	});

	it('renders page correctly for different pokemon ids', () => {
		const store = createMockStore();

		const { rerender } = render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/pokemon/1']}>
					<PokemonDetailsPage />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();

		rerender(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/pokemon/2']}>
					<PokemonDetailsPage />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
	});

	it('applies correct CSS classes to main container', () => {
		const store = createMockStore();
		const { container } = render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/pokemon/1']}>
					<PokemonDetailsPage />
				</MemoryRouter>
			</Provider>
		);

		const mainDiv = container.firstChild as HTMLElement;
		expect(mainDiv).toHaveClass(
			'flex',
			'flex-col',
			'items-center',
			'py-4',
			'px-6',
			'lg:p-4',
			'flex-1'
		);
	});
});

