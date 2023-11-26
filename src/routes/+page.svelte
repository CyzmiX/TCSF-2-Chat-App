<script lang="ts">

</script>

<!-- Component Start -->
<div id="main" class="flex flex-col flex-grow w-full max-w-xl bg-white shadow-2xl rounded-lg overflow-hidden">
    <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
        <div class="flex w-full mt-2 space-x-3 max-w-xs">
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
            <div>
                <span class="text-xs text-gray-500 leading-none">CyzmiX</span>
                <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                    <p class="text-sm">Hey l3bou basket</p>
                </div>
                
            </div>
        </div>
        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
            <div>
                <span class="text-xs text-gray-500 leading-none">Ilyass</span>
                <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p class="text-sm">wa sir tkawd</p>
                </div>
                
            </div>
            <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
        </div>
    </div>
    
    <div class="bg-gray-300 p-4">
        <input id="msg" class="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…">
    </div>
</div>
<!-- Component End  -->
<style>
    #main {
        height: 500px;
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