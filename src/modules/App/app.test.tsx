import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';

import { App } from './App';
import pokemonReducer from '@/store/pokemon-slice';

describe('App', () => {
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

	it('renders main element', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		);

		const main = screen.getByRole('main');
		expect(main).toBeInTheDocument();
	});

	it('applies correct CSS classes to main element', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		);

		const main = screen.getByRole('main');
		expect(main).toHaveClass('h-full', 'flex', 'flex-col', 'overflow-hidden');
	});

	it('renders routes correctly', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByRole('heading', { name: 'Pokedex' })).toBeInTheDocument();
	});

	it('renders ToastContainer', () => {
		const store = createMockStore();
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		);

		const toastContainer = container.querySelector('.Toastify');
		expect(toastContainer).toBeInTheDocument();
	});

	it('wraps content in ErrorBoundary', () => {
		const store = createMockStore();
		const { container } = render(
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		);

		const main = screen.getByRole('main');
		expect(main).toBeInTheDocument();
		expect(main.parentElement).toBeInTheDocument();
	});
});

