/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: {
					100: '#CFCFCF',
					200: '#303034',
					300: '#666666',
					400: '#1A1A1E',
				},
			},
		},
	},
	plugins: [],
};
