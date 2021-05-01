<script>
    import { cards } from "../../store.js";
</script>

<section
	class="grid grid-cols-2 gap-3 py-3 mx-6 bg-green-100 shadow sm:mx-10 font-jetMono sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 dark:bg-cyan-200 lg:gap-28 sm:py-5 md:py-8 lg:py-10 xl:py-14 rounded-3xl justify-items-center"
>
	{#each cards as card (card.id)}
        <a href={'/Blogs/'+card.id} class="flex flex-col items-center w-11/12 cursor-pointer">
            <div
                class="flex items-center w-11/12 p-3 shadow sm:p-5 hover:bg-opacity-100 bg-gradient-to-r bg-opacity-70 bg-emerald-300 dark:from-cyan-400 dark:to-light-blue-400 rounded-xl"
            >
                <div class="flex flex-col w-full group">
                    <h1 class="px-1 mb-1 ml-auto -mt-1 -mr-1 text-xs bg-white rounded-sm opacity-80 w-max -sm:mt-2 sm:text-xs md:text-sm lg:text-xl">
                        {card.date}
                    </h1>
                    <h1 class="text-2xl sm:text-3xl md:text-5xl text-emerald-900 dark:text-white">
                        <!-- Title -->
                        {card.topic}
                    </h1>
                    <p class="sm:mt-2 sm:ml-0.5 text-blueGray-800 sm:text-lg md:text-lg text-xs group-hover:line-clamp-4 line-clamp-2 md:line-clamp-4">
                        <!-- Content -->
                        {card.content}
                    </p>
                </div>
            </div>
        </a>
	{/each}
</section>
