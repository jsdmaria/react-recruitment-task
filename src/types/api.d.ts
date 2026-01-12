export {};

declare global {
	interface IBaseResponse<T = any> {
		success: boolean;
		message?: string;
		data?: T;
	}
}
