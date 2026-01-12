import { Link } from 'react-router-dom';

import NoImage from '@/components/no-image/no-image';

interface PokemonCardProps {
	id: number;
	name: string;
	image: string;
}

const PokemonCard = ({ id, name, image }: PokemonCardProps) => {
	const displayName = name || `Pokemon #${id}`;

	return (
		<Link
			to={`/pokemon/${id}`}
			className="group block w-full border-2 border-black p-3 hover:border-green-500/80 transition-colors duration-100 hover:shadow-lg focus:outline focus:outline-2 focus:outline-green-500"
			aria-label={`View details for ${displayName}`}
		>
			<div className="flex flex-col items-center justify-between h-full gap-3">
				{image ? (
					<img
						src={image}
						alt={`${displayName} image`}
						className="size-[100px] object-contain group-hover:scale-105 transition-transform duration-100"
						loading="lazy"
						onError={(e) => {
							console.error(`Failed to load image for ${name}`);
							e.currentTarget.style.display = 'none';
						}}
					/>
				) : (
					<div
						className="w-full h-48 flex items-center justify-center bg-gray-100 mb-4 rounded"
						aria-hidden="true"
					>
						<NoImage />
					</div>
				)}
				<div className="w-fit px-1 pb-0.5 flex items-center justify-center bg-primary-100 group-hover:bg-green-500/40 rounded transition-colors duration-100">
					<span className="text-sm font-semibold capitalize text-center text-primary-400 m-0">
						{displayName}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default PokemonCard;
