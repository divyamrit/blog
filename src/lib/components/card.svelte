<script>
	import supabase from '$lib/db';

	function getD() {
		return supabase.from('Blogs').select('*');
	}
</script>

{#await getD()}
	<section
		class="grid grid-cols-2 gap-3 py-3 mx-6 bg-green-100 shadow sm:mx-10 font-jetMono sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 dark:bg-cyan-200 sm:py-5 md:py-8 lg:py-10 xl:py-14 rounded-3xl justify-items-center"
	>
		{#each Array(6) as _, i (i)}
			<div class="flex flex-col items-center w-11/12 cursor-pointer">
				<div
					class="flex items-center w-11/12 p-3 shadow sm:p-5 hover:bg-opacity-100 bg-gradient-to-r bg-opacity-70 bg-emerald-300 dark:from-cyan-400 dark:to-light-blue-400 rounded-xl"
				>
					<div class="flex flex-col w-full group">
						<h1
							class="px-1 ml-auto -mt-1 -mr-1 text-xs bg-white rounded-sm sm:mb-1 opacity-80 w-max -sm:mt-2 sm:text-xs md:text-sm lg:text-lg"
						>
							date
						</h1>
						<h1 class="text-xl sm:text-[1.8rem] md:text-4xl text-emerald-900 dark:text-white">
							<!-- Title -->
							topic
						</h1>
						<p
							class="sm:mt-2 sm:ml-0.5 text-blueGray-800 sm:text-lg md:text-lg text-xs group-hover:line-clamp-4 line-clamp-2 md:line-clamp-4"
						>
							<!-- Content -->
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus similique repellendus saepe, nisi quaerat sint porro. Porro non neque aspernatur!
						</p>
					</div>
				</div>
			</div>
		{/each}
	</section>
{:then response}
	<section
		class="grid grid-cols-2 gap-3 py-3 mx-6 bg-green-100 shadow sm:mx-10 font-jetMono sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 dark:bg-cyan-200 sm:py-5 md:py-8 lg:py-10 xl:py-14 rounded-3xl justify-items-center"
	>
		{#each response.data as card (card.id)}
			<a href={'/Blogs/' + card.id} class="flex flex-col items-center w-11/12 cursor-pointer">
				<div
					class="flex items-center w-11/12 p-3 shadow sm:p-5 hover:bg-opacity-100 bg-gradient-to-r bg-opacity-70 bg-emerald-300 dark:from-cyan-400 dark:to-light-blue-400 rounded-xl"
				>
					<div class="flex flex-col w-full group">
						<h1
							class="px-1 ml-auto -mt-1 -mr-1 text-xs bg-white rounded-sm sm:mb-1 opacity-80 w-max -sm:mt-2 sm:text-xs md:text-sm lg:text-lg"
						>
							{card.date}
						</h1>
						<h1 class="text-xl sm:text-[1.8rem] md:text-4xl text-emerald-900 dark:text-white">
							<!-- Title -->
							{card.topic}
						</h1>
						<p
							class="sm:mt-2 sm:ml-0.5 text-blueGray-800 sm:text-lg md:text-lg text-xs group-hover:line-clamp-4 line-clamp-2 md:line-clamp-4"
						>
							<!-- Content -->
							{card.content}
						</p>
					</div>
				</div>
			</a>
		{/each}
	</section>
{/await}
