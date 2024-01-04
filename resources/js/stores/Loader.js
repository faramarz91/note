import {defineStore} from "pinia";
import {ref} from "vue";

export const useLoaderStore = defineStore('', () => {
    const isLoad = ref(false);
    const notFound = ref(false);
    function toLoading() {
        isLoad.value = true;
    }

    async function resetLoading() {
        setTimeout(() => {
            isLoad.value = false;
        }, 500)
    }

    function toggleLoading() {
        isLoad.value = !isLoad.value;
    }

    async function inChange() {
        notFound.value = true;
        setTimeout(outChange, )
    }

    function isLoading() {
        isLoad.value = true;
    }

    async function isLoaded() {
        setTimeout(function (){
            isLoad.value = false
        }, 400);
    }

    function outChange() {
        setTimeout(function (){
            notFound.value = false
        }, 400);
    }

    return {isLoad, notFound, toLoading, resetLoading, toggleLoading, inChange, outChange, isLoaded, isLoading}
});
/* HTML: <div class="loader"></div> */

