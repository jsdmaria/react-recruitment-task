import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import PokemonDataTable from './pokemon-data-table';

describe('PokemonDataTable', () => {
	const mockData = [
		{ name: 'Height', value: 7 },
		{ name: 'Weight', value: 69 },
		{ name: 'Type', value: 'Grass' },
		{ name: 'HP', value: 45 },
	];

	it('renders table element', () => {
		render(<PokemonDataTable data={mockData} />);

		const table = screen.getByRole('table', { name: 'Pokemon details' });
		expect(table).toBeInTheDocument();
	});

	it('has correct aria-label', () => {
		render(<PokemonDataTable data={mockData} />);

		const table = screen.getByRole('table', { name: 'Pokemon details' });
		expect(table).toHaveAttribute('aria-label', 'Pokemon details');
	});

	it('applies correct CSS classes to table', () => {
		render(<PokemonDataTable data={mockData} />);

		const table = screen.getByRole('table');
		expect(table).toHaveClass('w-full', 'md:min-w-[200px]');
	});

	it('renders all data items', () => {
		render(<PokemonDataTable data={mockData} />);

		expect(screen.getByText('Height:')).toBeInTheDocument();
		expect(screen.getByText('7')).toBeInTheDocument();
		expect(screen.getByText('Weight:')).toBeInTheDocument();
		expect(screen.getByText('69')).toBeInTheDocument();
		expect(screen.getByText('Type:')).toBeInTheDocument();
		expect(screen.getByText('Grass')).toBeInTheDocument();
		expect(screen.getByText('HP:')).toBeInTheDocument();
		expect(screen.getByText('45')).toBeInTheDocument();
	});

	it('renders table rows with correct structure', () => {
		const { container } = render(<PokemonDataTable data={mockData} />);

		const rows = container.querySelectorAll('tr');
		expect(rows).toHaveLength(4);

		rows.forEach((row) => {
			const th = row.querySelector('th');
			const td = row.querySelector('td');
			expect(th).toBeInTheDocument();
			expect(td).toBeInTheDocument();
			expect(th).toHaveAttribute('scope', 'row');
		});
	});

	it('applies correct CSS classes to table headers', () => {
		const { container } = render(<PokemonDataTable data={mockData} />);

		const headers = container.querySelectorAll('th');
		headers.forEach((header) => {
			expect(header).toHaveClass('font-normal', 'text-left');
		});
	});

	it('applies correct CSS classes to table cells', () => {
		const { container } = render(<PokemonDataTable data={mockData} />);

		const cells = container.querySelectorAll('td');
		cells.forEach((cell) => {
			expect(cell).toHaveClass('text-right');
		});
	});

	it('renders empty table when data array is empty', () => {
		render(<PokemonDataTable data={[]} />);

		const table = screen.getByRole('table');
		expect(table).toBeInTheDocument();

		const { container } = render(<PokemonDataTable data={[]} />);
		const rows = container.querySelectorAll('tr');
		expect(rows).toHaveLength(0);
	});

	it('handles string and number values correctly', () => {
		const mixedData = [
			{ name: 'Height', value: 7 },
			{ name: 'Type', value: 'Grass' },
		];

		render(<PokemonDataTable data={mixedData} />);

		expect(screen.getByText('7')).toBeInTheDocument();
		expect(screen.getByText('Grass')).toBeInTheDocument();
	});
});

