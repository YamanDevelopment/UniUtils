/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./components/**/*.{js,vue,ts}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./app.vue',
		'./error.vue',
	],
	theme: {
		extend: {
			colors: {
				title: '#deddf4',
				subheading: '#a19eb8',
				text: '#deddf4',
				base: '#201d2f',
				base2: '#22212e',
				base2hover: '#2b2839',
				primary: '#6ca6b7',
				secondary: '#dcb4b2',
				accent: '#eb98a8',
			},
		},
	},
	plugins: [],
};

