<script setup>
import {useLoaderStore} from "@js/stores/Loader.js";
const loaderStore = useLoaderStore();
</script>

<template>
    <div v-show="loaderStore.isLoad">
        <div class="absolute top-0 start-0 w-full h-full bg-white/[.5] rounded-lg dark:bg-gray-800/[.4]"/>

        <div class="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>

