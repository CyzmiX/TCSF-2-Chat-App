<script lang="ts">
    import { io, Socket } from "socket.io-client";
    import Login from "$lib/login.svelte";
    import MsgBox from "$lib/msg-box.svelte";
    import MsgsContainer from "$lib/msgs-container.svelte";
    import { onMount } from "svelte";
    import { scale, slide } from "svelte/transition";
    import Settings from "$lib/settings.svelte";
    
    let logged = false
    let setting = false
    interface Reply {
        userName: string,
            msg: string,
    }
    interface Msg {
        userName: string,
        msg: string,
        type: "me" | "other",
        avatarSrc?: Blob,
        reply?: Reply
    }
    let userName = ''
    let msgs:  Msg[] = []
    let socket: Socket;
    let dark: boolean | undefined = undefined;
    onMount(() => {

        socket = io();

 

        if (localStorage.getItem('tcsf-login') !== null) {
            login(localStorage['tcsf-login']!, localStorage['tcsf-avatar']!)
        }

        socket.emit('loggedin')

        socket.on('msg', ({ msg, userName, type, avatarSrc2 }) => {
            msgs.push({
                userName,
                type,
                msg,
                avatarSrc: avatarSrc2
            })
            msgs = msgs

        })

        socket.on('reply', ({ msg, userName, type, avatarSrc2, reply }) => {
            
            msgs.push({
                userName,
                type,
                msg,
                reply,
                avatarSrc: avatarSrc2
            })
            msgs = msgs
        })
        

        
        dark = window.matchMedia('(prefers-color-scheme: dark)').matches


        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            dark = event.matches;
        });
        
    })
    let replying: Reply | undefined;
    let avatarSrc: Blob;
    async function newMsg(e: CustomEvent<any>) {
        if (replying !== undefined) {
            msgs.push({
                userName: 'You',
                type: 'me',
                msg: e.detail.msg,
                avatarSrc,
                reply: {
                    msg: replying.msg,
                    userName: replying.userName
                }
            })
            msgs = msgs
            socket.emit('reply', {
                userName: localStorage['tcsf-login'],
                type: 'other',
                msg: e.detail.msg,
                avatarSrc: localStorage['tcsf-avatar'],
                reply: {
                    msg: replying.msg,
                    userName: replying.userName
                }
            })

        } else {

            msgs.push({
                userName: 'You',
                type: 'me',
                msg: e.detail.msg,
                avatarSrc
            })
            msgs = msgs
            socket.emit('msg', {
                userName: localStorage['tcsf-login'],
                type: 'other',
                msg: e.detail.msg,
                avatarSrc,
            })
        }

        replying = undefined
    }

    function login(e: CustomEvent<any> | string, pfp?: Blob) {
        if (typeof e === "string" && pfp !== undefined) {
            logged = true;
            localStorage.setItem('tcsf-login', e)
            avatarSrc = localStorage.getItem('tcsf-avatar')
        } else {
            
            logged = true;
            userName = e.detail.userName
            avatarSrc = e.detail?.avatarUrl
            localStorage.setItem('tcsf-login', userName)
            const reader = new FileReader()

            reader.addEventListener('load', () => {
                localStorage.setItem('tcsf-avatar', reader.result)
                avatarSrc = reader.result
            }, false)
            
            reader.readAsDataURL(e.detail?.avatarUrl)

            
        }
    }
    
    let feild;
    function reply(e: CustomEvent<any>) {
        replying = e.detail
        feild.focus()
    }

    function replyToMsg(e: CustomEvent<any>) {
        newMsg(e)
    }
</script>

{#if dark !== undefined}
    <div class='center flex flex-col flex-grow w-full max-w-xl'>
        {#if logged}
            <Settings on:closing={() => setting = false} show={setting}/>
            <div class="flex flex-col flex-grow w-full max-w-xl" transition:slide>
                <button on:click={() => setting = !setting} class="border-2 m-auto w-32 border-gray-800 rounded-lg px-3 py-2 text-{dark ? "gray-400": "black"} cursor-pointer hover:bg-gray-800 hover:text-gray-200">
                    Settings
                </button>
                <MsgsContainer bind:this={feild} {feild}  {replying} {dark} on:replyToMsg={replyToMsg} on:send={newMsg}>
                    {#each msgs as msg}
                        <MsgBox avatarSrc={msg?.avatarSrc} isReply={msg?.reply} on:reply={reply} type={msg.type} userName={msg.userName} msg={msg.msg} />
                    {/each}
                </MsgsContainer>
            </div>
        {:else}
            <Login on:login={login}/>
        {/if}
    </div>
{:else}
    
    <div class="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
        <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    </div>

    
{/if}

<style>
    .loader {
        border-top-color: #3498db;
        -webkit-animation: spinner 1.5s linear infinite;
        animation: spinner 1.5s linear infinite;
    }

    @-webkit-keyframes spinner {
        0% {
            -webkit-transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .center {
        margin: auto;
        margin-top: 1%;
        padding: 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media (prefers-color-scheme: dark) {
        :global(body) {
            background-color: #111827;
        }
    }

    input:focus{
        outline: none;
    }
    :global(::-webkit-scrollbar) {
        width: 10px;
        height: 100px;
    }
    
    /* Track */
    :global(::-webkit-scrollbar-track) {
        background: transparent;
    }
    
    /* Handle */
    :global(::-webkit-scrollbar-thumb) {
        background: rgba(67, 129, 235, 0.3);
        border-radius: 5px;
        transition: all 0.2s ease;
    }
    
    /* Handle on hover */
    :global(::-webkit-scrollbar-thumb:hover) {
        background: rgba(67, 129, 235, 0.5);
    }


</style>