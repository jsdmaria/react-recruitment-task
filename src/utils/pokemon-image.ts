// Pre-load all Pokemon image URLs from assets folder using Vite's glob import
// This creates a map of all PNG files where the key is the Pokemon ID (from filename)
// eager: true - loads image module metadata (URLs) immediately, not the actual image files
// The actual images are loaded lazily by the browser when they enter viewport (see loading="lazy" in img tag)
const imageModules = import.meta.glob<{ default: string }>('../assets/*.png', {
	eager: true,
});

// Map to store Pokemon images: key = Pokemon ID (number), value = image URL (string)
const pokemonImages = new Map<number, string>();

// Process all imported image modules and extract Pokemon IDs from filenames
// Example: '../assets/1.png' -> ID: 1
Object.entries(imageModules).forEach(([path, module]) => {
	// Extract Pokemon ID from filename
	const match = path.match(/(\d+)\.png$/);

	if (match) {
		// Parse the Pokemon ID from the filename
		const id = Number(match[1]);

		// Set the image URL in the map
		if (module.default) {
			pokemonImages.set(id, module.default);
		}
	}
});

export const getPokemonImageUrl = (id: number): string => {
	return pokemonImages.get(id) || '';
};
