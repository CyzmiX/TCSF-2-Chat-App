<script lang="ts">
    import { createEventDispatcher } from "svelte";
    let dispath = createEventDispatcher();
    let userName = ''
    let avatarUrl = ''
    function avatar(e: Event) {
        if (["jpg", 'png', 'gif'].includes(e.target?.files?.[0].name.split('.')[1])) {

            avatarUrl = e.target?.files?.[0]
 
        } else {
            console.log('invalid fiel')
        }
    }
</script>

<section class="bg-gray-50 dark:bg-gray-900">
    <div class="d">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Type a username and let's chat! 
                </h1>
                <div class="space-y-4 md:space-y-6" >
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input bind:value={userName}  name="email" id="email" class="transition-all bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="my hero academia mid" >
                    </div>

                    

                </div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Avatar</label>
                <div  class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>

                
                        <input on:input={avatar} id="dropzone-file" type="file" class="hidden" />
                    </label>
                </div> 
                <br/>
                <button on:click={() => dispath('login', {userName, avatarUrl})} type="submit" class=" w-full transition-all text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Get in!</button>
            </div>
        </div>
      
    </div>

  </section>

<style>
    input:focus{
        outline: none;
    }

    .d {
        margin-top: 20%;
    }
</style>