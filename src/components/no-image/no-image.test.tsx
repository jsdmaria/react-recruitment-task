import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import NoImage from './no-image';

describe('NoImage', () => {
	it('renders correct text', () => {
		render(<NoImage />);

		expect(screen.getByText('No image provided')).toBeInTheDocument();
	});

	it('renders as span element', () => {
		const { container } = render(<NoImage />);

		const span = container.querySelector('span');
		expect(span).toBeInTheDocument();
		expect(span?.tagName).toBe('SPAN');
	});

	it('applies correct CSS classes', () => {
		render(<NoImage />);

		const span = screen.getByText('No image provided');
		expect(span).toHaveClass('text-gray-400');
	});
});

