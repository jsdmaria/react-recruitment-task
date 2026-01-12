import { Component, ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ErrorBoundary from './error-boundaries';

// Component that throws an error for testing
class ThrowError extends Component<{ shouldThrow?: boolean; children?: ReactNode }> {
	componentDidUpdate() {
		if (this.props.shouldThrow) {
			throw new Error('Test error');
		}
	}

	render() {
		if (this.props.shouldThrow) {
			throw new Error('Test error');
		}
		return this.props.children || <div>No error</div>;
	}
}

describe('ErrorBoundary', () => {
	const originalError = console.error;

	beforeEach(() => {
		console.error = vi.fn();
	});

	afterEach(() => {
		console.error = originalError;
	});

	it('renders children when there is no error', () => {
		render(
			<ErrorBoundary>
				<div>Test content</div>
			</ErrorBoundary>
		);

		expect(screen.getByText('Test content')).toBeInTheDocument();
	});

	it('renders fallback UI when error occurs', () => {
		const fallback = <div>Custom error message</div>;

		render(
			<ErrorBoundary fallback={fallback}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>
		);

		expect(screen.getByText('Custom error message')).toBeInTheDocument();
	});

	it('renders default error UI when error occurs and no fallback provided', () => {
		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>
		);

		expect(screen.getByText('Something went wrong')).toBeInTheDocument();
		expect(screen.getByText('Test error')).toBeInTheDocument();
		expect(screen.getByText('Reload the page')).toBeInTheDocument();
	});

	it('displays error message in default UI', () => {
		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>
		);

		expect(screen.getByText('Test error')).toBeInTheDocument();
	});

	it('reloads page when reload button is clicked', async () => {
		const user = userEvent.setup();
		const reloadMock = vi.fn();
		Object.defineProperty(window, 'location', {
			value: { reload: reloadMock },
			writable: true,
		});

		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>
		);

		const reloadButton = screen.getByText('Reload the page');
		await user.click(reloadButton);

		expect(reloadMock).toHaveBeenCalled();
	});
});

