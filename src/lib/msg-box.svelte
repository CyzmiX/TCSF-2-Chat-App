<script lang="ts">

    import { scale, slide } from "svelte/transition";
    import Toast from "./toast.svelte";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher()
    export let type: "me" | "other" = "me";
    export let msg: string = "";
    export let userName: string = ""
    export let dark = true
    export let avatarSrc: Blob

    interface Reply {
        
        userName: string,
        msg: string,
        
    }
    export let isReply: Reply | undefined;
    let contextMenu = false
    let copied = false


    function copy() {
        navigator.clipboard.writeText(msg).then(res => {
            copied = true
            contextMenu = false
            setTimeout(() => {
                copied = false
            }, 1000)
        })
    }

    function reply() {
        dispatch('reply', {msg, userName})
        contextMenu = false
    }
    
</script>


<Toast show={copied} text="Message copied succesfully!" />
{#if type === "me"}
    <div  class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
            <span class="text-xs text-gray-500 leading-none">{ userName }</span>
            <div aria-haspopup="menu" on:contextmenu|preventDefault={() => contextMenu = !contextMenu} class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                {#if isReply} 
                    <p class="text-center text-gray-300 unselectable p-0.5 text-sm">{ `Replied to ${isReply.msg} by ${isReply.userName}`}</p>
                {/if}
                <p class:text-center={contextMenu} class="unselectable p-0.5 text-sm">{ msg }</p>
                {#if contextMenu}
                    <br/>
                    <div in:scale id="dropdown" class="z-10 w-fit">
                        <button on:click={copy} class="text-white border dark:border-none rounded-lg dark:bg-blue-700 hover:bg-blue-800 h-10 w-20 mr-4 p-auto">Copy</button>
                        <button on:click={reply} class="text-white border dark:border-none rounded-lg dark:bg-blue-700 hover:bg-blue-800 h-10 w-20 p-auto">Reply</button>
                    </div>
                {/if}
            </div>
        </div>
        <div class="flex-shrink-0 h-11 w-11 overflow-hidden rounded-full {avatarSrc ? "bg-transparent border-2 border-blue-800" : "bg-gray-300"}"><img src={avatarSrc} alt="pfp" /></div>
    </div>
{:else}
    <div transition:slide class="flex w-full mt-2 space-x-3 max-w-xs">

        <div class="flex-shrink-0 h-11 w-11 overflow-hidden rounded-full {avatarSrc ? "bg-transparent border-2 border-blue-800" : "bg-gray-300"}"><img src={avatarSrc} alt="pfp" /></div>

        <div>
            <span  class="text-xs text-gray-500 leading-none">{ userName }</span>
            <div aria-haspopup="menu" on:contextmenu|preventDefault={() => contextMenu = !contextMenu} class="bg-{dark ? "transparent" : "gray-300"} p-3 rounded-r-lg rounded-bl-lg">
               
                <p class:text-center={contextMenu} class="unselectable text-sm" id="{dark ? "outline" : "no"}" >
                {#if isReply} 
                    <p class="text-center mb-1 text-gray-400 unselectable p-0.5 text-sm">{ `Replied to ${isReply.msg} by ${isReply.userName === "You" ? "theirself" : isReply.userName}`}</p>
                {/if}
                { msg }
                    
                {#if contextMenu}
                    <br/>
                    <br/>
                    <div in:scale id="dropdown" class="z-10 w-fit">
                        <button on:click={copy} class="text-white bg-blue-700 rounded-lg dark:bg-blue-700 hover:bg-blue-800 h-10 w-20 mr-4 p-auto">Copy</button>
                        <button on:click={reply} class="text-white bg-blue-700 rounded-lg dark:bg-blue-700 hover:bg-blue-800 h-10 w-20 p-auto">Reply</button>
                    </div>
                {/if}
                </p>
            </div>
            
        </div>
    </div>
{/if}

<style>
    #outline {
        border: 1.5px solid rgba(67, 129, 235);
        border-top-right-radius: 12px;
        border-bottom-right-radius: 12px;
        border-bottom-left-radius: 12px;
        padding: 12px;
        color: white;
    }

    .unselectable {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>