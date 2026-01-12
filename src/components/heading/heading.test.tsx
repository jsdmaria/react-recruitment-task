import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Heading from './heading';

describe('Heading', () => {
	it('renders children correctly', () => {
		render(<Heading>Test Heading</Heading>);

		expect(screen.getByText('Test Heading')).toBeInTheDocument();
	});

	it('renders as h1 element', () => {
		render(<Heading>Pokedex</Heading>);

		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toBeInTheDocument();
		expect(heading.tagName).toBe('H1');
	});

	it('applies correct CSS classes', () => {
		render(<Heading>Test</Heading>);

		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toHaveClass('text-lg', 'font-bold');
	});

	it('renders complex children', () => {
		render(
			<Heading>
				<span>Complex</span> <strong>Content</strong>
			</Heading>
		);

		expect(screen.getByText('Complex')).toBeInTheDocument();
		expect(screen.getByText('Content')).toBeInTheDocument();
	});
});

