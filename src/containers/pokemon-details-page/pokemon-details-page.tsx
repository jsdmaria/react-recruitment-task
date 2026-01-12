import { Link } from 'react-router-dom';

import Heading from '@/components/heading/heading';

const PokemonDetailsPage = () => {
	return (
		<div className="flex flex-col items-center py-4 px-6 lg:p-4 flex-1">
			<div className="w-full lg:max-w-[1232px] flex flex-col gap-6 flex-1">
				<Heading>
					<Link
						to="/"
						className="hover:text-green-500 transition-colors duration-300"
					>
						Home
					</Link>{' '}
					/ <span>Pokemon Details</span>
				</Heading>

				<p>Details page coming soon...</p>
			</div>
		</div>
	);
};

export default PokemonDetailsPage;
