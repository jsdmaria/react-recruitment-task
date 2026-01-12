import { useEffect } from 'react';

import { handleApiError } from '@/utils/error-handler';

export const useApiError = (error: string | null) => {
	useEffect(() => {
		if (error) {
			handleApiError(error);
		}
	}, [error]);
};

