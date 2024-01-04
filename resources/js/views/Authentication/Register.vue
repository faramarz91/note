<template>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" @submit.prevent="register" method="POST">
            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                <div class="mt-2">
                    <input id="name" name="name" type="text" v-model="registerForm.name" autocomplete="name" required="" class="block w-full rounded-md border-0
                    py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                    <input id="email" name="email" type="email" autocomplete="email" v-model="registerForm.email" required="" class="block w-full rounded-md border-0
                    py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                </div>
                <div class="mt-2">
                    <input id="password" name="password" type="password" v-model="registerForm.password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">Password again</label>
                </div>
                <div class="mt-2">
                    <input id="password_confirmation" name="password_confirmation" type="password"
                           autocomplete="current-password" v-model="registerForm.password_confirmation" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900
                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-300 sm:text-sm sm:leading-6" />
                </div>
            </div>

            <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-amber-400 px-3 py-1.5 text-sm font-semibold leading-6
                    text-black shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                    <div v-if="loader.isLoad" class="flex items-center">
                        <span class="font-medium"> Creating Account</span>
                        <span class="loader w-5 h-5 mx-3"></span>
                    </div>
                    <div v-else>
                        Sign Up
                    </div>
                </button>
            </div>
        </form>

        <p class="mt-10 text-center text-sm text-gray-500">
            Have Account?
            {{ ' ' }}
            <router-link :to="{name: 'login'}" class="font-semibold leading-6 text-amber-600 hover:text-amber-500">SignIn here</router-link>
        </p>
    </div>
</template>
<script setup>
import {ref} from "vue";
import {useLoaderStore} from "@js/stores/Loader.js";

const loader = useLoaderStore();
import Api from '@js/axios/User'
const registerForm = ref({name: '', email: '', password: '', password_confirmation:''});

const register = () => {
    loader.toLoading();
    Api.register(registerForm.value)
        .then((res)=> console.log(res.data))
        .catch((err) => console.log(err))
        .finally(() => loader.resetLoading());
}



</script>

<style scoped>
.loader {
    aspect-ratio: 1;
    display: grid;
    border-radius: 50%;
    background:
        linear-gradient(0deg ,rgb(0 0 0/50%) 30%,#0000 0 70%,rgb(0 0 0/100%) 0) 50%/8% 100%,
        linear-gradient(90deg,rgb(0 0 0/25%) 30%,#0000 0 70%,rgb(0 0 0/75% ) 0) 50%/100% 8%;
    background-repeat: no-repeat;
    animation: l23 1s infinite steps(12);
}
.loader::before,
.loader::after {
    content: "";
    grid-area: 1/1;
    border-radius: 50%;
    background: inherit;
    opacity: 0.915;
    transform: rotate(30deg);
}
.loader::after {
    opacity: 0.83;
    transform: rotate(60deg);
}
@keyframes l23 {
    100% {transform: rotate(1turn)}
}

</style>
