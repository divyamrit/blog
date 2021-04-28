<script>
	let isOpen = false;
    let menuitems = [{id:1,name:'Home'},{id:2,name:'Blog'},{id:3,name:'Self'},{id:4,name:'How?'}]
	let logo = 'src/assets/logo.png'
</script>

<nav
	class="relative flex items-center justify-between px-4 py-3 group"
	style="
      background-image: url('https://images.pexels.com/photos/5338522/pexels-photo-5338522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
      background-repeat: no-repeat;
      background-size: cover;
    "
>
	<div class="flex items-center transition-opacity opacity-90 group-hover:opacity-100">
    <!--Logo-->
		<img
      src={logo}
			class="object-contain w-auto h-14 p-1 sm:p-0.5 bg-white rounded-full"
			alt=""
		/>
		<div>
      <!--Divyamrit-->
			<svg
				class="w-auto h-12 pt-2 pl-2 sm:pt-3 sm:h-14"
				width="281"
				height="68"
				viewBox="0 0 281 68"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g filter="url(#filter0_dii)">
					<path
						d="M4.25 48.5V2.875L7.5625 1.3125H19.4062C24.1562 1.3125 28.0104 2.82292 30.9688 5.84375C33.7812 8.69792 35.1875 12.3958 35.1875 16.9375V32.875C35.1875 37.3958 33.7812 41.0938 30.9688 43.9688C28.0104 46.9896 24.1562 48.5 19.4062 48.5H4.25ZM10.5 42.875H19.4062C22.4062 42.875 24.8333 41.8021 26.6875 39.6562C28.1875 37.9271 28.9375 35.6667 28.9375 32.875V16.9375C28.9375 14.1458 28.1875 11.8854 26.6875 10.1562C24.8333 8.01042 22.4062 6.9375 19.4062 6.9375H10.5V42.875ZM48.1562 7.21875C47.4271 6.46875 47.0625 5.57292 47.0625 4.53125C47.0625 3.46875 47.4271 2.5625 48.1562 1.8125C48.8854 1.0625 49.7708 0.6875 50.8125 0.6875C51.8542 0.6875 52.7396 1.0625 53.4688 1.8125C54.1979 2.5625 54.5625 3.46875 54.5625 4.53125C54.5625 5.57292 54.1979 6.46875 53.4688 7.21875C52.7396 7.96875 51.8542 8.34375 50.8125 8.34375C49.7708 8.34375 48.8854 7.96875 48.1562 7.21875ZM47.6875 49.75V15.6875L53.625 12.875H53.9375V46.9375L48 49.75H47.6875ZM73.8125 49.75L61.75 15.4375L67.1562 12.875H67.4688L76.3125 38.9375L84.9688 12.875H85.2812L90.6875 15.4375L79.5312 47.1875L74.125 49.75H73.8125ZM95.375 36.625V15.6875L101.312 12.875H101.625V36.625C101.625 39.0208 102.271 40.7812 103.562 41.9062C104.875 43.0104 106.469 43.5625 108.344 43.5625C110.219 43.5625 111.802 43.0104 113.094 41.9062C114.406 40.7812 115.062 39.0208 115.062 36.625V15.6875L121 12.875H121.312V49.4375C121.312 52.875 120.021 55.8646 117.438 58.4062C115.021 60.7604 111.99 61.9375 108.344 61.9375H98.7188V61.625L101.219 56.375H108.344C110.219 56.375 111.812 55.8125 113.125 54.6875C114.417 53.5625 115.062 51.8125 115.062 49.4375V46.4688C113.521 48.2396 111.281 49.125 108.344 49.125C104.781 49.125 101.75 47.9479 99.25 45.5938C96.6667 43.1354 95.375 40.1458 95.375 36.625ZM156 46.9375L150.062 49.75H149.75V46.4688C148.083 48.2396 145.844 49.125 143.031 49.125C139.135 49.125 136.104 47.9479 133.938 45.5938C131.771 43.2396 130.688 40.4583 130.688 37.25C130.688 33.9167 131.865 31.0833 134.219 28.75C136.49 26.5 139.427 25.375 143.031 25.375C145.594 25.375 147.833 26.2604 149.75 28.0312C149.75 24.3438 149.104 21.9167 147.812 20.75C146.562 19.625 144.969 19.0625 143.031 19.0625H135.438V18.75L137.938 13.5H143.031C146.677 13.5 149.708 14.6771 152.125 17.0312C154.708 19.5521 156 22.5417 156 26V46.9375ZM136.812 37.25C136.812 39.1042 137.375 40.6354 138.5 41.8438C139.583 43.0104 141.104 43.5938 143.062 43.5938C145.104 43.5938 146.688 43 147.812 41.8125C149.062 40.4792 149.688 38.9792 149.688 37.3125C149.688 35.4375 149.042 33.9167 147.75 32.75C146.458 31.5833 144.906 31 143.094 31C141.198 31 139.677 31.6146 138.531 32.8438C137.385 34.0729 136.812 35.5417 136.812 37.25ZM165.375 49.75V26C165.375 22.5625 166.667 19.5729 169.25 17.0312C171.667 14.6771 174.698 13.5 178.344 13.5C181.656 13.5 184.521 14.7083 186.938 17.125C187.396 17.5833 187.812 18.125 188.188 18.75C188.562 18.1458 188.979 17.6146 189.438 17.1562C192.042 14.7188 194.906 13.5 198.031 13.5C201.635 13.5 204.667 14.6771 207.125 17.0312C209.708 19.5312 211 22.5208 211 26V46.9375L205.062 49.75H204.75V26C204.75 23.6042 204.094 21.8542 202.781 20.75C201.49 19.625 199.906 19.0625 198.031 19.0625C196.156 19.0625 194.562 19.625 193.25 20.75C191.958 21.8542 191.312 23.6042 191.312 26V46.9375L185.375 49.75H185.062V26C185.062 23.6042 184.406 21.8542 183.094 20.75C181.802 19.625 180.219 19.0625 178.344 19.0625C176.469 19.0625 174.875 19.625 173.562 20.75C172.271 21.8542 171.625 23.6042 171.625 26V46.9375L165.688 49.75H165.375ZM220.375 49.75V26C220.375 22.5625 221.667 19.5729 224.25 17.0312C226.667 14.6771 229.698 13.5 233.344 13.5H237.562V13.8125L235.062 19.0625H233.344C231.469 19.0625 229.875 19.625 228.562 20.75C227.271 21.8542 226.625 23.6042 226.625 26C226.625 26 226.625 32.9792 226.625 46.9375L220.688 49.75H220.375ZM244.906 7.21875C244.177 6.46875 243.812 5.57292 243.812 4.53125C243.812 3.46875 244.177 2.5625 244.906 1.8125C245.635 1.0625 246.521 0.6875 247.562 0.6875C248.604 0.6875 249.49 1.0625 250.219 1.8125C250.948 2.5625 251.312 3.46875 251.312 4.53125C251.312 5.57292 250.948 6.46875 250.219 7.21875C249.49 7.96875 248.604 8.34375 247.562 8.34375C246.521 8.34375 245.635 7.96875 244.906 7.21875ZM244.438 49.75V15.6875L250.375 12.875H250.688V46.9375L244.75 49.75H244.438ZM265.75 49.75V19.8125H257.719V19.5L260.25 14.125H265.75V2.875L271.688 0.0625H272V14.125H280.031V14.4375L277.5 19.8125H272V46.9375L266.062 49.75H265.75Z"
						fill="#00FFE0"
					/>
				</g>
				<defs>
					<filter
						id="filter0_dii"
						x="0.25"
						y="0.0625"
						width="283.781"
						height="69.875"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB"
					>
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="2" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="2" dy="2" />
						<feGaussianBlur stdDeviation="2" />
						<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
						<feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="4" />
						<feGaussianBlur stdDeviation="2" />
						<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
						<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.46 0 0 0 0 1 0 0 0 0.28 0" />
						<feBlend mode="normal" in2="effect2_innerShadow" result="effect3_innerShadow" />
					</filter>
				</defs>
			</svg>
		</div>
  </div>
		<div>
			<button
				on:click={()=>{isOpen = !isOpen}}
				type="button"
				class="text-gray-700 rounded-full sm:hidden hover:text-white focus:text-white"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-10 h-10 fill-current"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
        {#if !isOpen}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
          {:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
        {/if}
				</svg>
			</button>
		</div>
      <div class="flex-row hidden w-auto sm:flex h-14 place-items-center justify-items-center">
    <div class="flex flex-row mx-8 ml-auto place-content-between">
		{#each menuitems as menuitem (menuitem.id)}
		<div class="px-3 shadow-inner sm:mx-1 py-0.5 group flex flex-row place-items-center justify-items-center hover:bg-gray-100 hover:bg-opacity-5 rounded-md">
 	       <p class="text-xl font-semibold text-transparent cursor-pointer select-none md:text-2xl bg-clip-text bg-gradient-to-br from-cyan-400 to-white opacity-70 group-hover:opacity-100">{menuitem.name}</p>
		</div>
		{/each}
    </div>
  </div>
</nav>
<div class="absolute flex justify-around w-full to-white sm:hidden">
  <div class=" {isOpen ? '!opacity-100' : 'opacity-0'} transition-opacity ease-out delay-150 absolute grid w-full h-[60vh] grid-cols-1 pt-5 text-2xl place-content-around bg-gradient-to-br from-teal-400 rounded-b-xl justify-items-center pb-7">
	{#each menuitems as menuitem (menuitem.id)}
    <a on:click={()=>{isOpen = !isOpen}} href='./space.html' to="/How" class="block px-2 py-1 mt-1 font-bold text-teal-900 rounded-xl opacity-90 hover:opacity-100 font-jetMono">
      <h1 class="flex items-center text-2xl group">
        {menuitem.name}
        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block w-6 h-auto text-transparent transition-colors ease-in-out delay-100 fill-current group-hover:text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </h1>
    </a>
	{/each}
  </div>
</div>
