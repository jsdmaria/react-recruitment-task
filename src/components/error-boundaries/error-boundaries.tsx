import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
		};
	}

	// Get the error state from the error boundary
	static getDerivedStateFromError(error: Error): State {
		return {
			hasError: true,
			error,
		};
	}

	// Catch the error and log it to the console
	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo);
	}

	// Render the fallback UI if an error occurs
	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex flex-col items-center justify-center min-h-screen p-4">
					<h1 className="text-2xl font-bold mb-4">
						Something went wrong
					</h1>
					{this.state.error && (
						<p className="text-red-600 mb-4">
							{this.state.error.message}
						</p>
					)}
					<button
						onClick={() => window.location.reload()}
						className="px-4 py-2 bg-green-500 text-white hover:bg-green-500"
					>
						Reload the page
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
