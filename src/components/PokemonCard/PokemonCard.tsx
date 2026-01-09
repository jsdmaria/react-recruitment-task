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
			className="block bg-white border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow"
		>
			<div className="flex flex-col items-center">
				{image ? (
					<img
						src={image}
						alt={name}
						className="w-full h-48 object-contain mb-4"
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
				<h3 className="text-lg font-semibold capitalize text-center text-gray-700 mt-2">
					{name || `Pokemon #${id}`}
				</h3>
			</div>
		</Link>
	);
};

export default PokemonCard;

