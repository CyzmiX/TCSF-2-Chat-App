<script lang="ts">
    export let type: "me" | "other" = "me";
    export let msg: string = "";
    export let userName: string = ""
    export let dark = true
</script>

{#if type === "me"}
    <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
            <span class="text-xs text-gray-500 leading-none">{ userName }</span>
            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                <p class="text-sm">{ msg }</p>
            </div>
            
        </div>
        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
    </div>
{:else}
    <div class="flex w-full mt-2 space-x-3 max-w-xs">
        <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
        <div>
            <span  class="text-xs text-gray-500 leading-none">{ userName }</span>
            <div class="bg-{dark ? "transparent" : "gray-300"} p-3 rounded-r-lg rounded-bl-lg">
                <p style="color: {dark ? "black" : "white"}" class=" text-sm" id="{dark ? "outline" : ""}" >{ msg }</p>
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

    }
</style>