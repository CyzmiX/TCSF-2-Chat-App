<script lang="ts">
    import MsgBox from "$lib/msg-box.svelte";
    import MsgsContainer from "$lib/msgs-container.svelte";
    import { onMount } from "svelte";
    let dark: boolean | undefined = undefined;
    onMount(() => {
        dark = window.matchMedia('(prefers-color-scheme: dark)').matches

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            dark = event.matches ;
        });
    })

</script>

{#if dark !== undefined}
    <MsgsContainer {dark}>
        <MsgBox userName="CyzmiX" msg="Hello" type="me"/>
        <MsgBox userName="CyzmiX" msg="Hello" type="other"/>
    </MsgsContainer>
{:else}
    <h1>Loading..</h1>
{/if}

<style>
:global(body) {
  max-width: 500px;

  margin: auto;
  margin-top: 10vh;


}
</style>