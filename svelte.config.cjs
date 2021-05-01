const preprocess = require("svelte-preprocess");
const path = require("path")

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	preprocess: [
		preprocess({
			postcss: true
		}),
	],
	kit: {
		vite: {
			resolve:{
				alias:{
					$components: path.resolve("src/components/")
				}
			}
		},
		files:{
			assets:'static'
		},
		paths:{
			assets:'src/assets/'
		},
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};
