import { Navigate } from 'react-router-dom';

import HomePage from '@/containers/home-page/home-page';
import PokemonDetailsPage from '@/containers/pokemon-details-page/pokemon-details-page';

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
