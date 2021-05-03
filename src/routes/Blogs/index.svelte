<script context="module">
	import { cards } from '../../store.js';
</script>

<div class="dark">
	<section
		class="grid items-center w-full grid-cols-1 gap-3 py-5 bg-gray-900 font-jetMono dark:bg-light-blue-500 justify-items-center"
	>
		{#each cards as x (x.id)}
	<a href={"/Blogs/"+x.id} class="w-10/12">
			<article
				class="flex flex-col w-full p-1 shadow-lg from-blueGray-400 via-blueGray-600 to-blueGray-800 bg-gradient-to-tr dark:from-cyan-400 dark:to-white rounded-t-3xl rounded-br-3xl group"
			>
				<div class="flex mb-1">
					<p
						class="px-1.5 py-0.5 text-white dark:text-blue-500 relative top-2 -left-2 w-max bg-teal-600 dark:bg-white opacity-70 dark:bg-opacity-100 group-hover:opacity-100 text-xs sm:text-base ml-auto sm:rounded-lg rounded-md"
					>
						{x.date}
					</p>
				</div>
				<h1
					class="pl-1 mb-2 ml-2 text-4xl font-thin text-white border-l-2 border-gray-900 opacity-90 group-hover:opacity-100 dark:border-gray-200 dark:text-cyan-900 sm:text-5xl"
				>
					{x.topic}
				</h1>
				<p
					class="mb-3 ml-3 text-sm text-green-100 truncate dark:text-gray-900 sm:text-base opacity-60 group-hover:opacity-80"
				>
					{x.content}
				</p>
			</article>
		</a>
		{/each}
	</section>
	<section
		class="grid items-center w-full grid-cols-1 gap-3 py-5 bg-gray-900 font-jetMono dark:bg-light-blue-500 justify-items-center"
	>
		{#each cards as x (x.id)}
    <a href={"/Blogs/"+x.id} class="w-10/12">
			<article
				class="flex flex-col w-full p-1 shadow-lg from-blueGray-400 via-blueGray-600 to-blueGray-800 bg-gradient-to-tr dark:from-cyan-400 dark:to-white rounded-t-3xl rounded-br-3xl group"
			>
				<div class="flex mb-1">
					<p
						class="px-1.5 py-0.5 text-white dark:text-blue-500 relative top-2 -left-2 w-max bg-teal-600 dark:bg-white opacity-70 dark:bg-opacity-100 group-hover:opacity-100 text-xs sm:text-base ml-auto sm:rounded-lg rounded-md"
					>
						{x.date}
					</p>
				</div>
				<h1
					class="pl-1 mb-2 ml-2 text-4xl font-thin text-white border-l-2 border-gray-900 opacity-90 group-hover:opacity-100 dark:border-gray-200 dark:text-cyan-900 sm:text-5xl"
				>
					{x.topic}
				</h1>
				<p
					class="mb-3 ml-3 text-sm text-green-100 truncate dark:text-gray-900 sm:text-base opacity-60 group-hover:opacity-80"
				>
					{x.content}
				</p>
			</article>
		</a>
        {/each}
	</section>
</div>
