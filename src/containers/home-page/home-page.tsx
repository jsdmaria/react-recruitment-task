import Heading from '@/components/heading/heading';
import PokemonList from '@/containers/home-page/components/pokemon-list/pokemon-list';

const HomePage = () => {
	return (
		<div className="flex flex-col items-center py-4 px-6 lg:p-4 flex-1 overflow-hidden">
			<div className="w-full lg:max-w-[1232px] flex flex-col gap-6 flex-1 overflow-hidden">
				<Heading>Pokedex</Heading>

				<PokemonList />
			</div>
		</div>
	);
};

export default HomePage;
