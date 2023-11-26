<script lang="ts">
    import Login from "$lib/login.svelte";
    import MsgBox from "$lib/msg-box.svelte";
    import MsgsContainer from "$lib/msgs-container.svelte";
    import { onMount } from "svelte";
    
    let logged = false

    interface Msg {
        userName: string,
        msg: string,
        type: "me" | "other"
    }

    let msgs:  Msg[] = []

    let dark: boolean | undefined = undefined;
    onMount(() => {
        if (localStorage.getItem('tcsf-login') !== null) {
            login(localStorage['tcsf-login']!)
        }


        dark = window.matchMedia('(prefers-color-scheme: dark)').matches

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            dark = event.matches;
        });
        
    })

    function newMsg(e: CustomEvent<any>) {
        msgs.push({
            userName: 'You',
            type: 'other',
            msg: e.detail.msg
        })
        msgs = msgs
    }
    let userName = ''
    function login(e: CustomEvent<any> | string) {
        if (typeof e === "string") {

            logged = true;
            localStorage.setItem('tcsf-login', e)
        } else {
            logged = true;
            userName = e.detail.userName
            localStorage.setItem('tcsf-login', userName)
        }

    }
</script>

{#if dark !== undefined}
    {#if logged}
        <MsgsContainer {dark} on:send={newMsg}>
            {#each msgs as msg}
                <MsgBox type={msg.type} userName={msg.userName} msg={msg.msg} />
            {/each}
        </MsgsContainer>
    {:else}
        <Login on:login={login}/>
    {/if}
{:else}
    <h1 style="color: {dark ? "white" : "black"}">Loading..</h1>
{/if}

<style>
    :global(body) {
    margin: 0;
    margin-top: 6%;
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