import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import PokemonsGrid from './pokemons-grid';

describe('PokemonsGrid', () => {
	const mockPokemons: IPokemonListItem[] = [
		{ id: 1, name: 'bulbasaur', image: '/src/assets/1.png' },
		{ id: 2, name: 'ivysaur', image: '/src/assets/2.png' },
		{ id: 3, name: 'venusaur', image: '/src/assets/3.png' },
	];

	it('renders grid container', () => {
		const { container } = render(
			<BrowserRouter>
				<PokemonsGrid pokemons={mockPokemons} />
			</BrowserRouter>
		);

		const grid = container.querySelector('.grid');
		expect(grid).toBeInTheDocument();
	});

	it('applies correct CSS classes', () => {
		const { container } = render(
			<BrowserRouter>
				<PokemonsGrid pokemons={mockPokemons} />
			</BrowserRouter>
		);

		const grid = container.querySelector('.grid');
		expect(grid).toHaveClass('grid', 'pokemon-grid', 'gap-x-11', 'gap-y-5');
	});

	it('renders all pokemon cards', () => {
		render(
			<BrowserRouter>
				<PokemonsGrid pokemons={mockPokemons} />
			</BrowserRouter>
		);

		expect(screen.getByText('bulbasaur')).toBeInTheDocument();
		expect(screen.getByText('ivysaur')).toBeInTheDocument();
		expect(screen.getByText('venusaur')).toBeInTheDocument();
	});

	it('renders correct number of pokemon cards', () => {
		render(
			<BrowserRouter>
				<PokemonsGrid pokemons={mockPokemons} />
			</BrowserRouter>
		);

		const links = screen.getAllByRole('link');
		expect(links).toHaveLength(3);
	});

	it('renders empty grid when pokemons array is empty', () => {
		const { container } = render(
			<BrowserRouter>
				<PokemonsGrid pokemons={[]} />
			</BrowserRouter>
		);

		const grid = container.querySelector('.grid');
		expect(grid).toBeInTheDocument();
		expect(screen.queryByRole('link')).not.toBeInTheDocument();
	});

	it('passes correct props to PokemonCard', () => {
		render(
			<BrowserRouter>
				<PokemonsGrid pokemons={mockPokemons} />
			</BrowserRouter>
		);

		const bulbasaurLink = screen.getByRole('link', { name: /bulbasaur/i });
		expect(bulbasaurLink).toHaveAttribute('href', '/pokemon/1');

		const ivysaurLink = screen.getByRole('link', { name: /ivysaur/i });
		expect(ivysaurLink).toHaveAttribute('href', '/pokemon/2');
	});
});
