const c = [
	() => import("..\\..\\..\\src\\routes\\$layout.svelte"),
	() => import("..\\components\\error.svelte"),
	() => import("..\\..\\..\\src\\routes\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\Blogs\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\Blogs\\[slug].svelte"),
	() => import("..\\..\\..\\src\\routes\\Self\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\How\\index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/Blogs/index.svelte
	[/^\/Blogs\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/Blogs/[slug].svelte
	[/^\/Blogs\/([^/]+?)\/?$/, [c[0], c[4]], [c[1]], (m) => ({ slug: d(m[1])})],

	// src/routes/Self/index.svelte
	[/^\/Self\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/How/index.svelte
	[/^\/How\/?$/, [c[0], c[6]], [c[1]]]
];

export const fallback = [c[0](), c[1]()];