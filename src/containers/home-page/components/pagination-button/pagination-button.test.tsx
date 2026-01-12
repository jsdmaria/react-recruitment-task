import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PaginationButton from './pagination-button';

describe('PaginationButton', () => {
	it('renders children correctly', () => {
		render(<PaginationButton>Next</PaginationButton>);

		expect(screen.getByText('Next')).toBeInTheDocument();
	});

	it('renders as button element', () => {
		render(<PaginationButton>Test</PaginationButton>);

		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button.tagName).toBe('BUTTON');
	});

	it('has type="button" attribute', () => {
		render(<PaginationButton>Test</PaginationButton>);

		const button = screen.getByRole('button');
		expect(button).toHaveAttribute('type', 'button');
	});

	it('applies base CSS classes', () => {
		render(<PaginationButton>Test</PaginationButton>);

		const button = screen.getByRole('button');
		expect(button).toHaveClass(
			'px-3',
			'py-1',
			'border-2',
			'border-primary-400',
			'focus:outline-2',
			'focus:outline-green-500'
		);
	});

	it('is not disabled by default', () => {
		render(<PaginationButton>Test</PaginationButton>);

		const button = screen.getByRole('button');
		expect(button).not.toBeDisabled();
	});

	it('applies disabled state correctly', () => {
		render(<PaginationButton disabled>Test</PaginationButton>);

		const button = screen.getByRole('button');
		expect(button).toBeDisabled();
	});

	it('applies disabled CSS classes when disabled', () => {
		render(<PaginationButton disabled>Test</PaginationButton>);

		const button = screen.getByRole('button');
		expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
	});

	it('calls onClick handler when clicked', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(<PaginationButton onClick={handleClick}>Test</PaginationButton>);

		const button = screen.getByRole('button');
		await user.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('does not call onClick when disabled', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();

		render(
			<PaginationButton disabled onClick={handleClick}>
				Test
			</PaginationButton>
		);

		const button = screen.getByRole('button');
		await user.click(button);

		expect(handleClick).not.toHaveBeenCalled();
	});

	it('passes through additional props', () => {
		render(
			<PaginationButton aria-label="Test button" data-testid="test-button">
				Test
			</PaginationButton>
		);

		const button = screen.getByRole('button', { name: 'Test button' });
		expect(button).toHaveAttribute('data-testid', 'test-button');
		expect(button).toHaveAttribute('aria-label', 'Test button');
	});
});

