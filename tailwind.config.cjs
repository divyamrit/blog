const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");

const colors = require('tailwindcss/colors')
module.exports = {
	mode: "jit",
	darkMode:'class',
	purge: {
		content: [
			"./src/**/*.{html,js,svelte,ts}",
		],
		options: {
			defaultExtractor: (content) => [
				// If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_match, group, ..._rest]) => group),
			],
		},
		safelist: [/^svelte-[\d\w]+$/],
	},
	theme: {
		extend: {
			      colors: {
						'light-blue': colors.lightBlue,
						cyan: colors.cyan,
						rose:colors.rose,
						emerald:colors.emerald,
						teal:colors.teal,
						blueGray:colors.blueGray
					},
					fontFamily:{
						'jetMono':['JetBrains Mono', 'monospace'],
					},
					boxShadow:{
						'sw':'box-shadow: 0px 0px 10px 5px #000;',
					},
			},
	},
	variants: {
			lineClamp: ['responsive', 'hover','group-hover']
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
