<script>
	import Nav from '$lib/nav.svelte'
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>
<div class="pb-40">
<Nav />
<div class="p-8 bg-blueGray-900 m-4 rounded-xl">
	<h1 class="sm:text-5xl text-cyan-500 text-4xl">Divya means pure,</h1>
	<h1 class="sm:text-6xl text-black text-5xl">Amrit is related to ultimate power</h1>
</div>
<div class="grid sm:grid-cols-3 grid-cols-1 gap-4 place-items-center">
	<div class="bg-light-blue-500 w-11/12 p-4 sm:h-60 m"></div>
	<div class="bg-light-blue-500 w-11/12 p-4 sm:h-60"></div>
	<div class="bg-light-blue-500 w-11/12 p-4 sm:h-60"></div>
</div>
</div>