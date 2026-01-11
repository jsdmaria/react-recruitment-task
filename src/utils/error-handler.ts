import { toast } from 'react-toastify';

export const handleApiError = (error: string | null) => {
	if (!error) return;

	toast.error(error, {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	});
};

export const handleApiSuccess = (message: string) => {
	toast.success(message, {
		position: 'top-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	});
};

