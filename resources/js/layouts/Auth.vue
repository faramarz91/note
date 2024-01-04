<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-20 w-auto" src="../assets/Daco_5904449.png" alt="Notes" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{{ $router.currentRoute.value.meta.title }} to your account</h2>
        </div>

        <router-view/>
    </div>
</template>
<script setup>
</script>
