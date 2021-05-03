<script>
	import Card from '$lib/components/card.svelte';
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>
<div class="pb-40">
	<div
		class="p-8 mx-4 my-20 text-left bg-gradient-to-br from-teal-300 via-cyan-400 to-green-300 rounded-xl"
	>
		<h1 class="text-4xl text-gray-100 sm:text-5xl">This site named Divyamrit just for fun!</h1>
		<h1 class="ml-1 text-xl text-indigo-900 sm:text-2xl">
			Also whatever you see here, is just a action
		</h1>
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-1 font-jetMono place-items-center">
		<section class="grid w-11/12 grid-cols-1 gap-20 my-10 md:gap-10 lg:gap-20 sm:grid-cols-3">
			<article class="grid grid-cols-1 group">
				<div class="p-4 bg-black ">
					<h1
						class="w-full text-2xl text-transparent rounded-lg bg-clip-text bg-gradient-to-br from-cyan-500 via-teal-400 to-gray-500"
					>
						You are a miracle,
					</h1>
				</div>
				<div class="px-4 py-2 bg-gray-100 shadow-sm ">
					<!--h1 class='text-lg text-cyan-700'>Way to attain peace is Way to become <p class='inline-block underline'>NOTHING.</p></h1-->
					<h1 class="text-lg line-clamp-4 text-cyan-700">
						Believe me! You Gonna win One day, When you really understand What I meant by this.
					</h1>
				</div>
				<a href='./space.html' class="px-2 py-1 bg-black cursor-pointer opacity-90 group-hover:opacity-100 w-max">
					<h1 class="text-sm text-yellow-300">Click For More!</h1>
				</a>
			</article>

			<article class="grid grid-cols-1 group">
				<div class="p-4 bg-gray-900 ">
					<h1
						class="text-2xl text-transparent bg-gradient-to-br from-gray-400 to-white bg-clip-text"
					>
						For Me,
					</h1>
				</div>
				<div class="p-3 px-4 bg-rose-600">
					<h1 class="text-lg text-white line-clamp-4">
						Whole World is like a game where You can Enter play,replay,change or exit. But There is
						a Hack!
					</h1>
				</div>
				<div class="px-2 py-1 bg-black cursor-pointer opacity-90 group-hover:opacity-100 w-max">
					<h1 class="text-sm text-yellow-300">Click For More!</h1>
				</div>
			</article>

			<article class="grid grid-cols-1 group">
				<div class="p-4 bg-yellow-400 ">
					<h1
						class="w-full text-2xl text-transparent rounded-lg bg-clip-text bg-gradient-to-tr from-yellow-800 via-red-900 to-green-900"
					>
						Advice for you,
					</h1>
				</div>
				<div class="px-4 py-2 bg-green-100 shadow-sm ">
					<!--h1 class='text-lg text-cyan-700'>Way to attain peace is Way to become <p class='inline-block underline'>NOTHING.</p></h1-->
					<h1 class="text-lg line-clamp-4 text-cyan-700">
						There are certain rules of this world Also!, So never forget that What you think is What
						you going to become.
					</h1>
				</div>
				<div class="px-2 py-1 bg-black cursor-pointer opacity-90 group-hover:opacity-100 w-max">
					<h1 class="text-sm text-yellow-300">Click For More!</h1>
				</div>
			</article>
		</section>

		<div class="grid grid-cols-1 mt-20 mb-10 justify-items-center">
			<h1 class="text-base text-blue-500 sm:text-2xl">Some of my free time Blogs</h1>
		</div>
		<Card />
	</div>
</div>
