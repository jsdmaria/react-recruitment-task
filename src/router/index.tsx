import { Navigate } from 'react-router-dom';

import HomePage from '@/containers/HomePage/HomePage';
import PokemonDetailsPage from '@/containers/PokemonDetailsPage/PokemonDetailsPage';

export const routes = [
	{
		path: '/',
		element: <Navigate to="/home" replace />,
	},
	{
		path: '/home',
		element: <HomePage />,
	},
	{
		path: '/pokemon/:id',
		element: <PokemonDetailsPage />,
	},
	{
		path: '*',
		element: <Navigate to="/home" replace />,
	},
];
