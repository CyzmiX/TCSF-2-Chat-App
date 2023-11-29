<script lang='ts'>
    import { goto, invalidateAll } from "$app/navigation";
    import { createEventDispatcher } from "svelte";
    import { scale, slide } from "svelte/transition";
    let dispath = createEventDispatcher()
    export let show = false
    let files = []
    let userName: string = '';
    let avatarUrl = ''

    function avatar(e: Event) {
        if (["jpg", 'png', 'gif'].includes(e.target?.files?.[0].name.split('.')[1])) {
            avatarUrl = e.target?.files?.[0]
        } else {
            console.log('invalid file')
        }
    }

    async function change() {
        if (userName)
            localStorage.setItem('tcsf-login', userName)
        
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            localStorage.setItem('tcsf-avatar', reader.result)
            console.log(reader.result)
        }, false)
        reader.readAsDataURL(avatarUrl)
        location.reload()
    }
</script>


{#if show}
    <div in:slide out:scale class="max-w-2xl absolute p-4 m-auto rounded-2xl shadow-2xl border-2 border-slate-700 bg-slate-800 w-[400px] h-[385px]">
        <div>
            <label for="email" class="inline mb-2 text-sm font-medium text-gray-900 dark:text-white">Change username
                <button on:click={() => dispath('closing')} type="button" class="ml-[90%] bg-white text-gray-400 hover:text-gray-900 rounded-lg  p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </label>
            <input bind:value={userName} name="email" id="email" class="transition-all bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="my hero academia mid" >
        </div>
        <br/>
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Change your Avatar</label>
        <div class="flex items-center justify-center w-full">
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
        <button on:click={change} type="submit" class=" w-full transition-all text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>

    </div>
{/if}