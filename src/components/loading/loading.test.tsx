import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Loading from './loading';

describe('Loading', () => {
	it('renders Pokedex text', () => {
		render(<Loading />);

		expect(screen.getByText('Pokedex')).toBeInTheDocument();
	});

	it('renders spinner element', () => {
		const { container } = render(<Loading />);

		const spinner = container.querySelector('.animate-spin');
		expect(spinner).toBeInTheDocument();
	});

	it('applies correct CSS classes to main container', () => {
		const { container } = render(<Loading />);

		const mainDiv = container.firstChild as HTMLElement;
		expect(mainDiv).toHaveClass(
			'flex',
			'items-center',
			'justify-center',
			'h-full',
			'fixed',
			'inset-0',
			'z-50'
		);
	});

	it('renders spinner with correct classes', () => {
		const { container } = render(<Loading />);

		const spinner = container.querySelector('.animate-spin');
		expect(spinner).toHaveClass(
			'absolute',
			'inset-0',
			'w-full',
			'h-full',
			'border-2',
			'border-transparent',
			'border-t-neutral-300',
			'rounded-full',
			'animate-spin'
		);
	});

	it('renders logo container with correct structure', () => {
		const { container } = render(<Loading />);

		const logoContainer = container.querySelector('.relative.w-16.h-16');
		expect(logoContainer).toBeInTheDocument();
		expect(logoContainer?.querySelector('span')).toHaveTextContent('Pokedex');
	});
});

