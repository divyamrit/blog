<script context="module">
//    import {cards} from '../../store.js'
    import supabase from '$lib/db'

    export async function load(ctx) {
        let slug = ctx.page.params.slug;
    //    let data = getD()
        return { props: { slug} };
    }
</script>

<script>
    export let slug;
    export function getD () {
  		return supabase
  			.from('Blogs')
  			.select('*')
        .eq('id',slug)
  	}
    // console.log(D.then((doc)=> console.log(doc.data)))
</script>

<div class="select-none dark">
  <section class="flex flex-col items-center w-full py-5 bg-gray-900 font-jetMono dark:bg-white">
    <div class="w-11/12">
      <article class="flex flex-col w-full p-1 shadow-lg from-green-400 via-emerald-400 to-teal-400 dark:sw bg-gradient-to-tr dark:from-cyan-400 dark:to-teal-200 rounded-3xl">
        {#await getD()}
          <p class="px-1.5 py-0.5 text-white dark:text-gray-800 m-2 w-max opacity-80 text-base sm:text-lg ml-auto sm:rounded-lg rounded-md">DD/MM/YYYY</p>
          <h1 class="p-3 pl-1 mb-2 ml-1 text-3xl font-thin text-gray-900 border shadow-xl sm:text-5xl md:text-7xl sm:ml-3 rounded-xl max-w-max dark:text-cyan-900">topic</h1>
          <p class="p-3 mb-3 text-base text-white sm:text-xl">content</p>
        {:then data }
          {#each data.data as x}
          <p class="px-1.5 py-0.5 text-white dark:text-gray-800 m-2 w-max opacity-80 text-base sm:text-lg ml-auto sm:rounded-lg rounded-md">{x.date}</p>
          <h1 class="p-3 pl-1 mb-2 ml-1 text-3xl font-thin text-gray-900 border shadow-xl sm:text-5xl md:text-7xl sm:ml-3 rounded-xl max-w-max dark:text-cyan-900">{x.topic}</h1>
          <p class="p-3 mb-3 text-base text-white sm:text-xl">{x.content}</p>
          {/each}
        {/await}
      </article>
    </div>
  </section>
</div>
