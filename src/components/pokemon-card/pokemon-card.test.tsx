import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import PokemonCard from '@/components/pokemon-card/pokemon-card';

describe('PokemonCard', () => {
	const mockPokemon: IPokemonListItem = {
		id: 1,
		name: 'bulbasaur',
		image: '/src/assets/1.png',
	};

	it('renders pokemon name and image', () => {
		render(
			<BrowserRouter>
				<PokemonCard {...mockPokemon} />
			</BrowserRouter>
		);

		expect(screen.getByText('bulbasaur')).toBeInTheDocument();
		expect(screen.getByAltText('bulbasaur')).toBeInTheDocument();
	});

	it('has correct link to pokemon details', () => {
		render(
			<BrowserRouter>
				<PokemonCard {...mockPokemon} />
			</BrowserRouter>
		);

		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', '/pokemon/1');
	});
});
