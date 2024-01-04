<script setup>

import {Bars3Icon, XMarkIcon} from "@heroicons/vue/24/outline/index.js";
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {useAuthStore} from "@js/stores/auth.js";
import router from "@js/router/index.js";


const logout = async () => {
    const authStore = useAuthStore();
    const logout = await authStore.logoutUser();
    if (logout){
        await router.push({name: 'login'})
    }
}
const user = {
    name: useAuthStore().userInfo.name,
    email: useAuthStore().userInfo.email,
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const userNavigation = [
    {name: 'Sign out', href: '#'},
]
</script>

<template>
    <Disclosure as="nav" class="bg-amber-500" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <img class="h-10 w-10" src="@js/assets/Daco_5904449.png" alt="Your Company"/>
                    </div>
                    <div class="hidden md:block">
                        <div class="ml-10 flex items-baseline space-x-4">
                            <a href="" @click="reload" class="rounded-md px-3 py-2 text-sm font-medium border-2 border-orange-600 bg-orange-600 hover:border-orange-400 hover:border-2">All notes</a>
                        </div>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="ml-4 flex items-center md:ml-6">
                        <!-- Profile dropdown -->
                        <Menu as="div" class="relative ml-3">
                            <div>
                                <MenuButton
                                    class="relative flex max-w-xs items-center rounded-full bg-amber-800 text-sm
                                        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-800">
                                    <span class="absolute -inset-1.5"/>
                                    <span class="sr-only">Open user menu</span>
                                    <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt=""/>
                                </MenuButton>
                            </div>
                            <transition enter-active-class="transition ease-out duration-100"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <MenuItem v-slot="{ active }">
                                        <button @click.prevent="logout"
                                                    :class="[active ? 'font-semibold underline' : '', 'block px-4 py-2 text-sm text-gray-700']">
                                            Sign Out
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </div>
                <div class="-mr-2 flex md:hidden">
                    <!-- Mobile menu button -->
                    <DisclosureButton
                        class="relative inline-flex items-center justify-center rounded-md bg-amber-400 p-2 text-amber-800 hover:bg-amber-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-amber-800">
                        <span class="absolute -inset-0.5"/>
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true"/>
                        <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true"/>
                    </DisclosureButton>
                </div>
            </div>
        </div>

        <DisclosurePanel class="md:hidden">

            <div class="border-t border-gray-700 pb-3 pt-4">
                <div class="flex items-center px-5">
                    <div class="flex-shrink-0">
                        <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt=""/>
                    </div>
                    <div class="ml-3 mt-2">
                        <div class="text-xl font-medium leading-none text-gray-800">{{ user.name }}</div>
                        <div class="text-sm mt-1 font-medium leading-none text-gray-600">{{ user.email }}</div>
                    </div>
                </div>
                <div class="mt-3 space-y-1 px-2">
                    <DisclosureButton as="a" @click.prevent="logout"
                                      class="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-amber-300 hover:text-white">
                        Sign Out
                    </DisclosureButton>
                </div>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<style scoped>

</style>
