<script>
    import { createEventDispatcher } from "svelte";

    export let dark = true
    let dispatch = createEventDispatcher()
    let msg = ''
</script>

<div id="main"  class="flex flex-col flex-grow w-full max-w-xl bg-{dark ? "gray-800" : "white"} shadow-2xl  rounded-lg overflow-hidden">
    <div class="flex flex-col flex-grow h-0 p-4  overflow-auto">
        
        <slot />

    </div>
    {#if dark}
        <hr class='line' />
    {/if}
    <div class="bg-gray-{dark ? "400" : "300"} p-4 flex">
        <input bind:value={msg} id="msg" class="flex  {dark ? "text-white" : "" } mr-6 items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…">
        <button on:click={() => {
            dispatch('send', {
                msg,
            })
            msg = ''
        }}  type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </div>
</div>

<style>
    .line {
        border-top: 1px solid rgb(67, 129, 235);
    }

    #main {
        height: 500px;
        
    }
    #main:hover {
        border: inset 2px solid rgb(67, 129, 235);
    }
    #msg {
        background-color: transparent;
        border: 2px solid rgb(37 99 235);
        transition: all 0.2s ease;
    }
    #msg:focus {
        border: 2px solid rgb(67 129 235);
        box-shadow: 0px 2px 15px rgba(67, 129, 235, 0.4);
    }
    input:focus{
        outline: none;
    }
</style>