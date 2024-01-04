<template>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="handleLogin">
            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                    <input id="email" name="email" type="email" autocomplete="email" required="" v-model="loginForm.email" class="block w-full rounded-md border-0
                    py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="text-sm">
                        <a href="#"  class="pointer-events-none  opacity-80 line-through decoration-black  font-semibold text-amber-600 hover:text-amber-500">Forgot password?</a>
                    </div>
                </div>
                <div class="relative mt-2 w-full">
                    <input id="password" name="password" :type="showPass?'text':'password'" autocomplete="current-password" required="" v-model="loginForm.password"
                           class="block w-full rounded-md border-0 py-1.5 text-gray-900
                            shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600
                            sm:text-sm sm:leading-6" />
                    <div class="absolute inset-y-0 right-0 flex items-center px-2">
                        <EyeIcon v-if="!showPass" @click="toggleShowPass" class="w-5 text-gray-600"/>
                        <EyeSlashIcon v-if="showPass" @click="toggleShowPass" class="w-5 text-gray-600"/>
                    </div>
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <div class="flex">
                        <input id="remember" name="remember" v-model="loginForm.remember" type="checkbox"
                               class="shrink-0 mt-0.5 border-amber-200 bg-amber-600 rounded text-amber-700 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none"
                        >
                        <label for="remember" class="text-sm text-gray-700 ms-3">Remember Me</label>
                    </div>
                </div>
            </div>

            <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6
                    text-black shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >Sign In</button>
            </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
            Not a member?
            {{ ' ' }}
            <router-link to="register" class="font-semibold leading-6 text-amber-600 hover:text-amber-500">Register Here for FREE</router-link>
        </p>
    </div>
    <button @click="getMyUser">Get User</button>
</template>


<script setup>
import {EyeIcon} from "@heroicons/vue/16/solid/index.js";
import {EyeSlashIcon} from "@heroicons/vue/16/solid/index.js"

import {ref} from "vue";
import {useAuthStore} from "@js/stores/auth.js";
import router from "@js/router/index.js";

const authStore = useAuthStore();
const showPass = ref(false);
const loginForm = ref({
    email: '',
    password: '',
    remember: false
});

const toggleShowPass = () => {
    showPass.value = !showPass.value;
}
const handleLogin = async () => {
    await authStore.loginUser(loginForm.value);
    if (authStore.isAuthenticated){
         await router.push({name: 'home'})
    }
}

</script>
