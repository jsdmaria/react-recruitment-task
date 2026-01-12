import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Pagination from './pagination';
import pokemonReducer from '@/store/pokemon-slice';

describe('Pagination', () => {
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

	it('returns null when totalPages is 1 or less', () => {
		const store = createMockStore({ totalPages: 1 });
		const { container } = render(
			<Provider store={store}>
				<Pagination currentPage={1} totalPages={1} />
			</Provider>
		);

		expect(container.firstChild).toBeNull();
	});

	it('renders pagination navigation', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<Pagination currentPage={1} totalPages={8} />
			</Provider>
		);

		expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
	});

	it('displays current page information', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<Pagination currentPage={3} totalPages={8} />
			</Provider>
		);

		expect(screen.getByText('3 of 8')).toBeInTheDocument();
	});

	it('renders all navigation buttons', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<Pagination currentPage={4} totalPages={8} />
			</Provider>
		);

		expect(screen.getByLabelText('Go to the first page')).toBeInTheDocument();
		expect(screen.getByLabelText('Go to the previous page')).toBeInTheDocument();
		expect(screen.getByLabelText('Go to the next page')).toBeInTheDocument();
		expect(screen.getByLabelText('Go to the last page')).toBeInTheDocument();
	});

	it('disables first and previous buttons on first page', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<Pagination currentPage={1} totalPages={8} />
			</Provider>
		);

		const firstButton = screen.getByLabelText('Go to the first page');
		const previousButton = screen.getByLabelText('Go to the previous page');

		expect(firstButton).toBeDisabled();
		expect(previousButton).toBeDisabled();
		expect(firstButton).toHaveAttribute('aria-disabled', 'true');
		expect(previousButton).toHaveAttribute('aria-disabled', 'true');
	});

	it('disables next and last buttons on last page', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<Pagination currentPage={8} totalPages={8} />
			</Provider>
		);

		const nextButton = screen.getByLabelText('Go to the next page');
		const lastButton = screen.getByLabelText('Go to the last page');

		expect(nextButton).toBeDisabled();
		expect(lastButton).toBeDisabled();
		expect(nextButton).toHaveAttribute('aria-disabled', 'true');
		expect(lastButton).toHaveAttribute('aria-disabled', 'true');
	});

	it('enables all buttons on middle page', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<Pagination currentPage={4} totalPages={8} />
			</Provider>
		);

		const firstButton = screen.getByLabelText('Go to the first page');
		const previousButton = screen.getByLabelText('Go to the previous page');
		const nextButton = screen.getByLabelText('Go to the next page');
		const lastButton = screen.getByLabelText('Go to the last page');

		expect(firstButton).not.toBeDisabled();
		expect(previousButton).not.toBeDisabled();
		expect(nextButton).not.toBeDisabled();
		expect(lastButton).not.toBeDisabled();
	});

	it('dispatches setCurrentPage when clicking first page button', async () => {
		const user = userEvent.setup();
		const store = createMockStore();
		const dispatchSpy = vi.spyOn(store, 'dispatch');

		render(
			<Provider store={store}>
				<Pagination currentPage={4} totalPages={8} />
			</Provider>
		);

		const firstButton = screen.getByLabelText('Go to the first page');
		await user.click(firstButton);

		expect(dispatchSpy).toHaveBeenCalled();
	});

	it('dispatches setCurrentPage when clicking next page button', async () => {
		const user = userEvent.setup();
		const store = createMockStore();
		const dispatchSpy = vi.spyOn(store, 'dispatch');

		render(
			<Provider store={store}>
				<Pagination currentPage={4} totalPages={8} />
			</Provider>
		);

		const nextButton = screen.getByLabelText('Go to the next page');
		await user.click(nextButton);

		expect(dispatchSpy).toHaveBeenCalled();
	});

	it('dispatches setCurrentPage when clicking previous page button', async () => {
		const user = userEvent.setup();
		const store = createMockStore();
		const dispatchSpy = vi.spyOn(store, 'dispatch');

		render(
			<Provider store={store}>
				<Pagination currentPage={4} totalPages={8} />
			</Provider>
		);

		const previousButton = screen.getByLabelText('Go to the previous page');
		await user.click(previousButton);

		expect(dispatchSpy).toHaveBeenCalled();
	});

	it('dispatches setCurrentPage when clicking last page button', async () => {
		const user = userEvent.setup();
		const store = createMockStore();
		const dispatchSpy = vi.spyOn(store, 'dispatch');

		render(
			<Provider store={store}>
				<Pagination currentPage={4} totalPages={8} />
			</Provider>
		);

		const lastButton = screen.getByLabelText('Go to the last page');
		await user.click(lastButton);

		expect(dispatchSpy).toHaveBeenCalled();
	});

	it('marks current page with aria-current', () => {
		const store = createMockStore();
		render(
			<Provider store={store}>
				<Pagination currentPage={4} totalPages={8} />
			</Provider>
		);

		const currentPageElement = screen.getByText('4 of 8').closest('li');
		expect(currentPageElement).toHaveAttribute('aria-current', 'page');
	});
});

