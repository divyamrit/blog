import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\t<head>\r\n\t\t<meta charset=\"utf-8\" />\r\n\t\t<link rel=\"icon\" href=\"/favicon.ico\" />\r\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\r\n\t\t<style>\r\n\t\t\t@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@200&display=swap');\r\n\t\t</style>\r\n\t\t" + head + "\r\n\t</head>\r\n\t<body>\r\n\t\t<div id=\"svelte\">" + body + "</div>\r\n\t</body>\r\n</html>\r\n";

let options = null;

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/./_app/start-743836b7.js",
			css: ["/./_app/assets/start-0826e215.css"],
			js: ["/./_app/start-743836b7.js","/./_app/chunks/vendor-f45f9d29.js"]
		},
		fetched: undefined,
		get_component_path: id => "/./_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: error => {
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		router: true,
		ssr: true,
		target: "#svelte",
		template
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [],
	layout: "src/routes/$layout.svelte",
	error: ".svelte/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/index.svelte"],
						b: [".svelte/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/Blogs\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/Blogs/index.svelte"],
						b: [".svelte/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/Blogs\/([^/]+?)\/?$/,
						params: (m) => ({ slug: d(m[1])}),
						a: ["src/routes/$layout.svelte", "src/routes/Blogs/[slug].svelte"],
						b: [".svelte/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/Self\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/Self/index.svelte"],
						b: [".svelte/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/How\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/How/index.svelte"],
						b: [".svelte/build/components/error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getContext: hooks.getContext || (() => ({})),
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, render }) => render(request))
});

const module_lookup = {
	"src/routes/$layout.svelte": () => import("..\\..\\src\\routes\\$layout.svelte"),".svelte/build/components/error.svelte": () => import("./components\\error.svelte"),"src/routes/index.svelte": () => import("..\\..\\src\\routes\\index.svelte"),"src/routes/Blogs/index.svelte": () => import("..\\..\\src\\routes\\Blogs\\index.svelte"),"src/routes/Blogs/[slug].svelte": () => import("..\\..\\src\\routes\\Blogs\\[slug].svelte"),"src/routes/Self/index.svelte": () => import("..\\..\\src\\routes\\Self\\index.svelte"),"src/routes/How/index.svelte": () => import("..\\..\\src\\routes\\How\\index.svelte")
};

const metadata_lookup = {"src/routes/$layout.svelte":{"entry":"/./_app/pages/$layout.svelte-604349c3.js","css":["/./_app/assets/pages/$layout.svelte-3be0ad00.css"],"js":["/./_app/pages/$layout.svelte-604349c3.js","/./_app/chunks/vendor-f45f9d29.js"],"styles":null},".svelte/build/components/error.svelte":{"entry":"/./_app/error.svelte-1418e1b0.js","css":[],"js":["/./_app/error.svelte-1418e1b0.js","/./_app/chunks/vendor-f45f9d29.js"],"styles":null},"src/routes/index.svelte":{"entry":"/./_app/pages/index.svelte-1474e8d4.js","css":[],"js":["/./_app/pages/index.svelte-1474e8d4.js","/./_app/chunks/vendor-f45f9d29.js","/./_app/chunks/db-73e04827.js"],"styles":null},"src/routes/Blogs/index.svelte":{"entry":"/./_app/pages/Blogs/index.svelte-a50d2f28.js","css":[],"js":["/./_app/pages/Blogs/index.svelte-a50d2f28.js","/./_app/chunks/vendor-f45f9d29.js","/./_app/chunks/db-73e04827.js"],"styles":null},"src/routes/Blogs/[slug].svelte":{"entry":"/./_app/pages/Blogs/[slug].svelte-64a476e5.js","css":[],"js":["/./_app/pages/Blogs/[slug].svelte-64a476e5.js","/./_app/chunks/vendor-f45f9d29.js","/./_app/chunks/db-73e04827.js"],"styles":null},"src/routes/Self/index.svelte":{"entry":"/./_app/pages/Self/index.svelte-78541baf.js","css":[],"js":["/./_app/pages/Self/index.svelte-78541baf.js","/./_app/chunks/vendor-f45f9d29.js"],"styles":null},"src/routes/How/index.svelte":{"entry":"/./_app/pages/How/index.svelte-602d56a4.js","css":[],"js":["/./_app/pages/How/index.svelte-602d56a4.js","/./_app/chunks/vendor-f45f9d29.js"],"styles":null}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

init({ paths: {"base":"","assets":"/."} });

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}