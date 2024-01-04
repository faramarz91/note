<script setup>

import {
    Dialog,
    DialogPanel, Disclosure, DisclosureButton, DisclosurePanel,
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions, TransitionChild,
    TransitionRoot
} from "@headlessui/vue";
import {
    CheckIcon,
    ChevronUpDownIcon,
    ListBulletIcon,
    MagnifyingGlassIcon, MinusIcon,
    PlusIcon
} from "@heroicons/vue/20/solid/index.js";
import {XMarkIcon} from "@heroicons/vue/24/outline/index.js";
</script>

<template>
    <!-- Mobile filter dialog -->
    <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100"
                             leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 z-40 flex">
                <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="translate-x-full">
                    <DialogPanel class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                        <div class="flex items-center justify-between px-4">
                            <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                            <button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400" @click="mobileFiltersOpen = false">
                                <span class="sr-only">Close menu</span>
                                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        <!-- Filters -->
                        <div class="mt-4 border-t border-gray-200">
                            <h3 class="sr-only">List of all notes</h3>
                            <ul role="list" class="px-2 py-3 font-medium text-gray-900">
                                <li class="relative mt-2 rounded-md shadow-sm">
                                    <div class="absolute z-0 inset-y-0 left-1 top-0 flex items-center">
                                        <div class="top-1 w-fit">
                                            <Listbox v-model="searchType">
                                                <div class="relative">
                                                    <ListboxButton
                                                        class="relative cursor-default rounded bg-transparent border py-2 pl-3 pr-10 text-left shadow-sm
                                                                    focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2
                                                                    focus-visible:ring-offset-orange-300 sm:text-sm"
                                                    >
                                                        <span class="block truncate">{{ searchType.name }}</span>
                                                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                                                </span>
                                                    </ListboxButton>

                                                    <transition
                                                        leave-active-class="transition duration-100 ease-in"
                                                        leave-from-class="opacity-100"
                                                        leave-to-class="opacity-0"
                                                    >
                                                        <ListboxOptions
                                                            class="absolute mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5
                                                                    focus:outline-none sm:text-sm"
                                                        >
                                                            <ListboxOption
                                                                v-slot="{ active, selected }"
                                                                v-for="searchMode in searchTypes"
                                                                :key="searchMode.name"
                                                                :value="searchMode"
                                                                as="template"
                                                            >
                                                                <li
                                                                    :class="[
                                                                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                                                                                'relative cursor-default select-none py-2 pl-10 pr-4', ]"
                                                                >
                                                                            <span :class="[ selected ? 'font-medium' : 'font-normal',
                                                                            'block truncate', ]">
                                                                                {{ searchMode.name }}
                                                                            </span>
                                                                    <span
                                                                        v-if="selected"
                                                                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                                                                    >
                                                                                <CheckIcon class="h-5 w-5" aria-hidden="true"/>
                                                                            </span>
                                                                </li>
                                                            </ListboxOption>
                                                        </ListboxOptions>
                                                    </transition>
                                                </div>
                                            </Listbox>
                                        </div>
                                    </div>
                                    <input type="text" name="search"
                                           class="block z-10 w-full rounded-md border-0 h-12 py-1.5 pl-40 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300
                                           placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                           placeholder="Search ..."/>
                                    <button
                                        class="cursor-pointer absolute inset-y-0 right-3 flex items-center pl-3">
                                        <MagnifyingGlassIcon class="text-gray-600 right-0 w-5"/>
                                    </button>
                                </li>
                                <li class="flex justify-center text-lime-800 items-center border-2 rounded-t-md mt-4 px-4 py-2 border-amber-400 bg-amber-100">
                                    <span class="text-lg mr-4">Note List</span>
                                    <list-bullet-icon class="w-7 h-7"/>
                                </li>
                            </ul>

                            <Disclosure as="div" v-for="section in filters" :key="section.id" class="border-t border-gray-200 px-4 py-6" v-slot="{ open }">
                                <h3 class="-mx-2 -my-3 flow-root">
                                    <DisclosureButton class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                        <span class="font-medium text-gray-900">{{ section.name }}</span>
                                        <span class="ml-6 flex items-center">
                          <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true" />
                          <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                        </span>
                                    </DisclosureButton>
                                </h3>
                                <DisclosurePanel class="pt-6">
                                    <div class="space-y-6">
                                        <div v-for="(option, optionIdx) in section.options" :key="option.value" class="flex items-center">
                                            <input :id="`filter-mobile-${section.id}-${optionIdx}`" :name="`${section.id}[]`" :value="option.value" type="checkbox" :checked="option.checked" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                            <label :for="`filter-mobile-${section.id}-${optionIdx}`" class="ml-3 min-w-0 flex-1 text-gray-500">{{ option.label }}</label>
                                        </div>
                                    </div>
                                </DisclosurePanel>
                            </Disclosure>
                        </div>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<style scoped>

</style>
