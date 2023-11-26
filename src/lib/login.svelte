<script>
    import { createEventDispatcher } from "svelte";

    let dispath = createEventDispatcher();
    let userName = '' 
</script>

<section class="bg-gray-50 dark:bg-gray-900">
    <div class="d">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Type a username and let's chat! 
                </h1>
                <form class="space-y-4 md:space-y-6" >
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input bind:value={userName} type="email" name="email" id="email" class="transition-all bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="my hero academia mid" >
                    </div>

                    <button on:click={() => dispath('login', {userName})} type="submit" class=" w-full transition-all text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Get in!</button>

                </form>
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