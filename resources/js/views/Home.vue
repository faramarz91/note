<template>
    <div class="min-h-full">
        <NavBar/>

        <main class="h-full">
            <div class="mx-auto w-full py-2 sm:px-6 lg:px-0">
                <div class="bg-white">
                    <div>
                        <!-- Mobile filter dialog -->
                        <TransitionRoot as="template" :show="mobileFiltersOpen">
                            <Dialog as="div" class="relative z-40 lg:hidden" @close="mobileFiltersOpen = false">
                                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                                                 enter-from="opacity-0" enter-to="opacity-100"
                                                 leave="transition-opacity ease-linear duration-300"
                                                 leave-from="opacity-100" leave-to="opacity-0">
                                    <div class="fixed inset-0 bg-black bg-opacity-25"/>
                                </TransitionChild>

                                <div class="fixed inset-0 z-40 flex">
                                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                                                     enter-from="translate-x-full" enter-to="translate-x-0"
                                                     leave="transition ease-in-out duration-300 transform"
                                                     leave-from="translate-x-0" leave-to="translate-x-full">
                                        <DialogPanel
                                            class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                            <div class="flex items-center justify-between px-4">
                                                <h2 class="text-lg font-medium text-gray-900">Notes</h2>
                                                <button type="button"
                                                        class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                                        @click="mobileFiltersOpen = false">
                                                    <span class="sr-only">Close menu</span>
                                                    <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
                                                </button>
                                            </div>

                                            <!-- Filters -->
                                            <form class="mt-4 border-t border-gray-200">
                                                <h3 class="sr-only">Note List</h3>
                                                <div class="w-fit m-2">
                                                    <div class="relative mt-2 rounded-md shadow-sm">
                                                        <div class="absolute z-0 inset-y-0 left-1 top-0 flex items-center">
                                                            <div class="top-1 w-fit">
                                                                <Listbox v-model="selectedPerson">
                                                                    <div class="relative">
                                                                        <ListboxButton
                                                                            class="relative cursor-default rounded bg-transparent border py-2 pl-3 pr-10 text-left shadow-sm
                                                            focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2
                                                            focus-visible:ring-offset-orange-300 sm:text-sm"
                                                                        >
                                                            <span class="block truncate">{{
                                                                    selectedPerson.name
                                                                }}</span>
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
                                                                                class="absolute mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                                                                            >
                                                                                <ListboxOption
                                                                                    v-slot="{ active, selected }"
                                                                                    v-for="person in people"
                                                                                    :key="person.name"
                                                                                    :value="person"
                                                                                    as="template"
                                                                                >
                                                                                    <li
                                                                                        :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
                                                                                    >
                <span
                    :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >{{ person.name }}</span
                >
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
                                                    </div>
                                                </div>

                                                <Disclosure as="div" v-for="section in filters" :key="section.id"
                                                            class="border-t border-gray-200 px-4 py-6"
                                                            v-slot="{ open }">
                                                    <h3 class="-mx-2 -my-3 flow-root">
                                                        <DisclosureButton
                                                            class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                            <span class="font-medium text-gray-900">{{ section.name }}</span>
                                                            <span class="ml-6 flex items-center">
                                                                <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true"/>
                                                                <MinusIcon v-else class="h-5 w-5" aria-hidden="true"/>
                                                            </span>
                                                        </DisclosureButton>
                                                    </h3>
                                                    <DisclosurePanel class="pt-6">
                                                        <div class="space-y-6">
                                                            <div v-for="(option, optionIdx) in section.options"
                                                                 :key="option.value" class="flex items-center">
                                                                <input :id="`filter-mobile-${section.id}-${optionIdx}`"
                                                                       :name="`${section.id}[]`" :value="option.value"
                                                                       type="checkbox" :checked="option.checked"
                                                                       class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                                                <label :for="`filter-mobile-${section.id}-${optionIdx}`"
                                                                       class="ml-3 min-w-0 flex-1 text-gray-500">{{
                                                                        option.label
                                                                    }}</label>
                                                            </div>
                                                        </div>
                                                    </DisclosurePanel>
                                                </Disclosure>
                                            </form>
                                        </DialogPanel>
                                    </TransitionChild>
                                </div>
                            </Dialog>
                        </TransitionRoot>

                        <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4">
                                <h1 class="text-4xl font-bold tracking-tight text-gray-700">Notes</h1>
                                <div class="basis-2/5 hidden lg:block">
                                    <div class="relative mt-2 rounded-md shadow-sm">
                                        <div class="absolute z-0 inset-y-0 left-1 top-0 flex items-center">
                                            <div class="top-1 w-fit">
                                                <Listbox v-model="selectedPerson">
                                                    <div class="relative">
                                                        <ListboxButton
                                                            class="relative cursor-default rounded bg-transparent border py-2 pl-3 pr-10 text-left shadow-sm
                                                            focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2
                                                            focus-visible:ring-offset-orange-300 sm:text-sm"
                                                        >
                                                            <span class="block truncate">{{
                                                                    selectedPerson.name
                                                                }}</span>
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
                                                                class="absolute mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                                                            >
                                                                <ListboxOption
                                                                    v-slot="{ active, selected }"
                                                                    v-for="person in people"
                                                                    :key="person.name"
                                                                    :value="person"
                                                                    as="template"
                                                                >
                                                                    <li
                                                                        :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
                                                                    >
                <span
                    :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >{{ person.name }}</span
                >
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
                                        <div
                                            class="pointer-events-none absolute inset-y-0 right-3 flex items-center pl-3">
                                            <MagnifyingGlassIcon class="text-gray-600 right-0 w-5"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <button type="button"
                                            class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                            @click="mobileFiltersOpen = true">
                                        <span class="sr-only">Filters</span>
                                        <FunnelIcon class="h-5 w-5" aria-hidden="true"/>
                                    </button>
                                </div>
                            </div>

                            <section aria-labelledby="products-heading" class="pb-24 pt-6">
                                <h2 id="products-heading" class="sr-only">Products</h2>

                                <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                    <!-- Filters -->
                                    <form class="hidden lg:block">
                                        <h3 class="sr-only">Categories</h3>
                                        <ul role="list"
                                            class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                                            <li v-for="category in subCategories" :key="category.name">
                                                <a :href="category.href">{{ category.name }}</a>
                                            </li>
                                        </ul>

                                        <Disclosure as="div" v-for="section in filters" :key="section.id"
                                                    class="border-b border-gray-200 py-6" v-slot="{ open }">
                                            <h3 class="-my-3 flow-root">
                                                <DisclosureButton
                                                    class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span class="font-medium text-gray-900">{{ section.name }}</span>
                                                    <span class="ml-6 flex items-center">
                      <PlusIcon v-if="!open" class="h-5 w-5" aria-hidden="true"/>
                      <MinusIcon v-else class="h-5 w-5" aria-hidden="true"/>
                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel class="pt-6">
                                                <div class="space-y-4">
                                                    <div v-for="(option, optionIdx) in section.options"
                                                         :key="option.value" class="flex items-center">
                                                        <input :id="`filter-${section.id}-${optionIdx}`"
                                                               :name="`${section.id}[]`" :value="option.value"
                                                               type="checkbox" :checked="option.checked"
                                                               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                                                        <label :for="`filter-${section.id}-${optionIdx}`"
                                                               class="ml-3 text-sm text-gray-600">{{
                                                                option.label
                                                            }}</label>
                                                    </div>
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    </form>

                                    <!-- Product grid -->
                                    <div class="lg:col-span-3">
                                        <!-- Your content -->
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild, TransitionRoot
} from '@headlessui/vue'

import {XMarkIcon} from '@heroicons/vue/24/outline'
import {
    ChevronDownIcon,
    FunnelIcon,
    MinusIcon,
    PlusIcon,
    Squares2X2Icon,
    MagnifyingGlassIcon
} from '@heroicons/vue/20/solid'
import {ref} from "vue";
import NavBar from "@components/NavBar.vue";
import {useAuthStore} from "@js/stores/auth.js";
import {useRouter} from "vue-router";
import {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/vue/20/solid'

const sortOptions = [
    {name: 'Most Popular', href: '#', current: true},
    {name: 'Best Rating', href: '#', current: false},
    {name: 'Newest', href: '#', current: false},
    {name: 'Price: Low to High', href: '#', current: false},
    {name: 'Price: High to Low', href: '#', current: false},
]
const subCategories = [
    {name: 'Totes', href: '#'},
    {name: 'Backpacks', href: '#'},
    {name: 'Travel Bags', href: '#'},
    {name: 'Hip Bags', href: '#'},
    {name: 'Laptop Sleeves', href: '#'},
]
const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            {value: 'white', label: 'White', checked: false},
            {value: 'beige', label: 'Beige', checked: false},
            {value: 'blue', label: 'Blue', checked: true},
            {value: 'brown', label: 'Brown', checked: false},
            {value: 'green', label: 'Green', checked: false},
            {value: 'purple', label: 'Purple', checked: false},
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            {value: 'new-arrivals', label: 'New Arrivals', checked: false},
            {value: 'sale', label: 'Sale', checked: false},
            {value: 'travel', label: 'Travel', checked: true},
            {value: 'organization', label: 'Organization', checked: false},
            {value: 'accessories', label: 'Accessories', checked: false},
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            {value: '2l', label: '2L', checked: false},
            {value: '6l', label: '6L', checked: false},
            {value: '12l', label: '12L', checked: false},
            {value: '18l', label: '18L', checked: false},
            {value: '20l', label: '20L', checked: false},
            {value: '40l', label: '40L', checked: true},
        ],
    },
]

const mobileFiltersOpen = ref(false)
const people = [
    {name: 'Text'},
    {name: 'Date & Time'},
]
const selectedPerson = ref(people[0])


</script>
