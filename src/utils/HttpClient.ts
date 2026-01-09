interface RequestOptions {
	params?: Record<string, string | number>;
}

class HttpClient {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	private buildUrl(
		endpoint: string,
		params?: Record<string, string | number>
	): string {
		const fullUrl = `${this.baseUrl}${endpoint}`;
		const url = new URL(fullUrl);

		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				url.searchParams.append(key, String(value));
			});
		}

		return url.toString();
	}

	private async request<T>(
		endpoint: string,
		options?: RequestOptions
	): Promise<IBaseResponse<T>> {
		const { params } = options || {};
		const url = this.buildUrl(endpoint, params);

		try {
			const response = await fetch(url, {
				method: 'GET',
				mode: 'cors',
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({
					message: response.statusText,
				}));

				throw new Error(
					errorData.message ||
						`API Error: ${response.status} ${response.statusText}`
				);
			}

			const data = await response.json();

			return {
				success: true,
				data,
			};
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: 'Unknown error occurred';

			return {
				success: false,
				message,
			};
		}
	}

	async get<T>(
		endpoint: string,
		options?: RequestOptions
	): Promise<IBaseResponse<T>> {
		return this.request<T>(endpoint, options);
	}
}

export default HttpClient;
