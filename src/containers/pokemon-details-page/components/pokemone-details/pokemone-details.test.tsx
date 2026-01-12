import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import PokemoneDetails from './pokemone-details';

vi.mock('@/containers/pokemon-details-page/pokemon-details-page.helper', () => ({
	getPokemonData: vi.fn((pokemon) => [
		{ name: 'Types', value: 'Grass, Poison' },
		{ name: 'Height', value: 7 },
		{ name: 'Weight', value: 69 },
		{ name: 'HP', value: 45 },
		{ name: 'Attack', value: 49 },
		{ name: 'Defense', value: 49 },
	]),
}));

describe('PokemoneDetails', () => {
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

	it('renders pokemon name', () => {
		render(<PokemoneDetails selectedPokemon={mockPokemon} />);

		const heading = screen.getByRole('heading', { level: 2 });
		expect(heading).toHaveTextContent('bulbasaur');
	});

	it('renders pokemon image when image is provided', () => {
		render(<PokemoneDetails selectedPokemon={mockPokemon} />);

		const image = screen.getByAltText('bulbasaur official artwork');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', '/src/assets/1.png');
	});

	it('renders NoImage component when image is not provided', () => {
		const pokemonWithoutImage = { ...mockPokemon, image: '' };

		render(<PokemoneDetails selectedPokemon={pokemonWithoutImage} />);

		expect(screen.getByText('No image provided')).toBeInTheDocument();
		expect(screen.queryByAltText('bulbasaur official artwork')).not.toBeInTheDocument();
	});

	it('has correct aria-label for image container', () => {
		render(<PokemoneDetails selectedPokemon={mockPokemon} />);

		const imageContainer = screen.getByLabelText('bulbasaur image');
		expect(imageContainer).toBeInTheDocument();
	});

	it('applies correct CSS classes to main container', () => {
		const { container } = render(<PokemoneDetails selectedPokemon={mockPokemon} />);

		const mainDiv = container.firstChild as HTMLElement;
		expect(mainDiv).toHaveClass('flex', 'flex-col', 'sm:flex-row', 'gap-4', 'md:gap-6');
	});

	it('applies correct CSS classes to image container', () => {
		const { container } = render(<PokemoneDetails selectedPokemon={mockPokemon} />);

		const imageContainer = container.querySelector('[aria-label="bulbasaur image"]');
		expect(imageContainer).toHaveClass(
			'w-full',
			'md:size-64',
			'flex',
			'items-center',
			'justify-center',
			'border-2',
			'border-black'
		);
	});

	it('applies correct CSS classes to image', () => {
		render(<PokemoneDetails selectedPokemon={mockPokemon} />);

		const image = screen.getByAltText('bulbasaur official artwork');
		expect(image).toHaveClass('w-full', 'object-contain');
		expect(image).toHaveAttribute('loading', 'lazy');
	});

	it('renders PokemonDataTable with correct data', () => {
		render(<PokemoneDetails selectedPokemon={mockPokemon} />);

		const table = screen.getByRole('table', { name: 'Pokemon details' });
		expect(table).toBeInTheDocument();
	});

	it('applies correct CSS classes to section', () => {
		const { container } = render(<PokemoneDetails selectedPokemon={mockPokemon} />);

		const section = container.querySelector('section');
		expect(section).toHaveClass('flex', 'flex-col', 'gap-2', 'w-full', 'md:w-[200px]');
	});

	it('applies correct CSS classes to heading', () => {
		render(<PokemoneDetails selectedPokemon={mockPokemon} />);

		const heading = screen.getByRole('heading', { level: 2 });
		expect(heading).toHaveClass('text-lg', 'font-bold', 'capitalize');
	});

	it('handles image error correctly', () => {
		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
		render(<PokemoneDetails selectedPokemon={mockPokemon} />);

		const image = screen.getByAltText('bulbasaur official artwork');
		const errorEvent = new Event('error');
		Object.defineProperty(errorEvent, 'currentTarget', {
			value: { style: { display: '' } },
			writable: true,
		});

		image.dispatchEvent(errorEvent);

		expect(consoleErrorSpy).toHaveBeenCalledWith(
			'Failed to load image for bulbasaur'
		);

		consoleErrorSpy.mockRestore();
	});
});

