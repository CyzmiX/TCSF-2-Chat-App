<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { slide } from "svelte/transition";

    export let dark = true
    let dispatch = createEventDispatcher()
    let msg = ''
    let msgs: HTMLDivElement;
    interface Reply {
        userName: string,
        msg: string,
    }
    export let replying: undefined | Reply;
    let input: HTMLInputElement;
    export let feild
    
    export function focus() {
        input.focus()
    }
    
    onMount(() => {
        input.focus()
        
        var observer = new MutationObserver(() => {
            msgs.scrollTop = msgs.scrollHeight;
        });

        var config = {childList: true};
        observer.observe(msgs, config);
    })
    function sendMsg() {
        if (replying !== undefined) {
            dispatch('replyToMsg', {
                msg,
                replyedMsg: replying.msg,
                userName: replying.userName
            })
            replying = undefined
        } else {
            dispatch('send', {
                msg,
            })
        }
        msg = ''

    }
    function checkEnter(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            sendMsg()
        }
    }
</script>

<div id="main" class:light={!dark} class:dark={dark} class="flex flex-col flex-grow w-full max-w-xl shadow-2xl  rounded-lg ">
    
    <div bind:this={msgs} class="flex flex-col flex-grow h-0 p-4  overflow-auto">

        <slot />

    </div>

    
    {#if replying !== undefined}
        <div transition:slide class="text-center text-white mr-6 bg-gray-900 w-full rounded p-1 text-base">
            <p>{`Replying to ${replying.userName}: ${replying.msg}`}</p>
        </div>
        
    {/if}
    <hr  class:line={dark} class:wline={!dark} />

    <div class="bg-{dark ? "gray-400" : "transparent"} p-4 flex">

        
        <input bind:this={input} on:keypress={checkEnter} bind:value={msg} id="msg" class="flex   text-white mr-6 items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="{replying ? `Repling to ${replying.userName}` : "Type your message…"}">
        <button on:click={sendMsg}  type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </div>
</div>

<style>
    .line {
        border-top: 1px solid rgb(67, 129, 235);
    }
    .wline {
        border-top: 1px solid rgba(200, 200, 200, 0.8);
    }
    #main {
        height: 600px;
        border: 2px solid rgba(67, 129, 235, 0.5);
        padding: 8px;
        
    }

    .dark {
        background-color: rgba(5, 5, 20, 0.7);
    }

    .light {
        background-color: rgba(67, 89, 135, 0.85)
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