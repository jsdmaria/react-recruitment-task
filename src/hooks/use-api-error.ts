import { useEffect } from 'react';

import { toast } from 'react-toastify';

export const useApiError = (error: string | null) => {
	useEffect(() => {
		if (error) {
			toast.error(error, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
	}, [error]);
};
