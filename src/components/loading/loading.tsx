const Loading = () => {
	return (
		<div className="flex items-center justify-center h-full fixed inset-0 bg-secondary-bg/60 flex items-center justify-center z-50">
			<div className="flex flex-col items-center gap-2">
				{/* Animated Logo */}
				<div className="relative w-16 h-16 flex items-center justify-center">
					<span className="text-xs font-semibold">Pokedex</span>
					{/* Spinning ring around logo */}
					<div className="absolute inset-0 w-full h-full border-2 border-transparent border-t-neutral-300 rounded-full animate-spin"></div>
				</div>
			</div>
		</div>
	);
};

export default Loading;
