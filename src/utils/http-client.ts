interface RequestOptions {
	params?: Record<string, string | number>;
}

class HttpClient {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async get<T>(
		endpoint: string,
		options?: RequestOptions
	): Promise<IBaseResponse<T>> {
		const fullUrl = `${this.baseUrl}${endpoint}`;
		const url = new URL(fullUrl);

		if (options?.params) {
			Object.entries(options.params).forEach(([key, value]) => {
				url.searchParams.append(key, String(value));
			});
		}

		try {
			const response = await fetch(url.toString(), {
				method: 'GET',
				mode: 'cors',
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({
					message: response.statusText,
				}));

				return {
					success: false,
					message:
						errorData.message ||
						`API Error: ${response.status} ${response.statusText}`,
				};
			}

			const data = await response.json();

			return {
				success: true,
				data,
			};
		} catch (error) {
			return {
				success: false,
				message:
					error instanceof Error
						? error.message
						: 'Unknown error occurred',
			};
		}
	}
}

export default HttpClient;
