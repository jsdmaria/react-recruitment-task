import { useRoutes } from 'react-router-dom';
import { routes } from '@/router';
import ErrorBoundary from '@/components/error-boundaries/error-boundaries';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
	const element = useRoutes(routes);

	return (
		<ErrorBoundary>
			<div className="app h-full flex flex-col overflow-hidden">
				{element}
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</div>
		</ErrorBoundary>
	);
};
