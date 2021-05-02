<script context="module">
	import { cards } from '../../store.js';
</script>

<div class="dark">
	<section
		class="w-full font-jetMono bg-gray-900 py-5 dark:bg-light-blue-500 grid grid-cols-1 gap-3 justify-items-center items-center"
	>
		{#each cards as x (x.id)}
    <a href={"/Blogs/"+x.id} class="w-10/12">
			<article
				class="flex from-blueGray-400 via-blueGray-600 to-blueGray-800 bg-gradient-to-tr dark:from-cyan-400 dark:to-white w-full p-1 rounded-t-3xl rounded-br-3xl group shadow-lg flex-col"
			>
				<div class="flex mb-1">
					<p
						class="px-1.5 py-0.5 text-white dark:text-blue-500 relative top-2 -left-2 w-max bg-teal-600 dark:bg-white opacity-70 dark:bg-opacity-100 group-hover:opacity-100 text-xs sm:text-base ml-auto sm:rounded-lg rounded-md"
					>
						{x.date}
					</p>
				</div>
				<h1
					class="ml-2 font-thin mb-2 text-white opacity-90 group-hover:opacity-100 border-l-2 pl-1 border-gray-900 dark:border-gray-200 dark:text-cyan-900 text-4xl sm:text-5xl"
				>
					{x.topic}
				</h1>
				<p
					class="ml-3 text-green-100 dark:text-gray-900 sm:text-base truncate text-sm opacity-60 group-hover:opacity-80 mb-3"
				>
					{x.content}
				</p>
			</article>
		</a>
        {/each}
	</section>
</div>
