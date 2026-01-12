import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({
	render: mockRender,
}));

vi.mock('react-dom/client', () => ({
	default: {
		createRoot: mockCreateRoot,
	},
}));

vi.mock('@/modules/app/app', () => ({
	App: () => <div data-testid="app">App Component</div>,
}));

vi.mock('@/store/index', () => ({
	store: {
		dispatch: vi.fn(),
		getState: vi.fn(),
		subscribe: vi.fn(),
		replaceReducer: vi.fn(),
	},
}));

describe('index.tsx', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		document.body.innerHTML = '<div id="root"></div>';
	});

	afterEach(() => {
		vi.clearAllMocks();
		document.body.innerHTML = '';
		// Clear module cache to allow re-import
		vi.resetModules();
	});

	it('creates root element with correct id', async () => {
		await import('./index');

		expect(mockCreateRoot).toHaveBeenCalled();
		const rootElement = mockCreateRoot.mock.calls[0][0];
		expect(rootElement).toBeInstanceOf(HTMLElement);
		expect(rootElement.id).toBe('root');
	});

	it('calls render on root', async () => {
		await import('./index');

		expect(mockRender).toHaveBeenCalled();
	});

	it('renders with React.StrictMode', async () => {
		const React = await import('react');
		await import('./index');

		expect(mockRender).toHaveBeenCalled();
		const renderCall = mockRender.mock.calls[0][0];
		expect(renderCall.type).toBe(React.StrictMode);
	});
});

