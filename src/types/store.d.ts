export {};

declare global {
	interface IBaseState {
		isLoading: boolean;
		error: string | null;
	}
}

