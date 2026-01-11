import { Link } from 'react-router-dom';

interface PokemonCardProps {
	id: number;
	name: string;
	image: string;
}

const PokemonCard = ({ id, name, image }: PokemonCardProps) => {
	return (
		<Link
			to={`/pokemon/${id}`}
			className="block w-full border-2 border-black p-3 hover:scale-105 transition-transform duration-300 hover:shadow-lg
              sm:w-[46%] md:w-[30%] lg:w-[210px] h-[162px] flex-shrink-0"
		>
			<div className="flex flex-col items-center justify-between h-full">
				{image ? (
					<img
						src={image}
						alt={name}
						className="size-[100px] object-contain"
						loading="lazy"
						onError={(e) => {
							console.error(
								`Failed to load image for ${name} (ID: ${id})`
							);
							e.currentTarget.style.display = 'none';
						}}
					/>
				) : (
					<div className="w-full h-48 flex items-center justify-center bg-gray-100 mb-4 rounded">
						<span className="text-gray-400">No image provided</span>
					</div>
				)}
				<div className="w-fit px-1 pb-0.5 flex items-center justify-center bg-primary-100 rounded">
					<h2 className="text-sm font-semibold capitalize text-center text-primary-400 m-0">
						{name || `Pokemon #${id}`}
					</h2>
				</div>
			</div>
		</Link>
	);
};

export default PokemonCard;
