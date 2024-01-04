<template>
    <div class="max-h-full">
        <NavBar/>

        <div class="bg-amber-50">
            <main class="mx-auto max-w-full max-h-fit lg:mx-32 px-4 sm:px-6 lg:px-8">
                <!--       Header of content         -->
                <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
                    <h1 class="text-4xl font-bold tracking-tight text-gray-700">Notes</h1>
                    <div class="basis-2/5 flex-row w-full">
                        <div id="search" class="relative mt-2 rounded-md shadow-sm">
                            <div class="absolute z-10 inset-y-0 left-1 top-0 flex items-center">
                                <div class="top-1">
                                    <Listbox v-model="searchType">
                                        <div class="relative">
                                            <ListboxButton
                                                class="relative cursor-default min-w-32 rounded bg-transparent border py-2 pl-3 pr-10 text-left shadow-sm
                                                            focus:outline-none focus-visible:border-amber-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2
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
                                                    class="absolute mt-1 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                                                >
                                                    <ListboxOption
                                                        v-slot="{ active, selected }"
                                                        v-for="searchMode in searchTypes"
                                                        :key="searchMode.name"
                                                        :value="searchMode"
                                                        as="template"
                                                    >
                                                        <li
                                                            :class="[ active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                                                             'relative cursor-default select-none py-2 pl-10 pr-4', ]"
                                                        >
                                                            <span :class="[ selected ? 'font-medium' : 'font-normal', 'block truncate', ]">
                                                                {{ searchMode.name }}
                                                            </span>
                                                            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                            <input v-show="searchType.type === 'text'" type="text" key="text" name="search"
                                   v-model="search"
                                   @keydown.enter="handleSearch"
                                   class="block z-20 w-full rounded-md bg-transparent border-0 h-12 py-1.5 pl-36 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300
                                        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                   placeholder="Search ..."/>
                            <Datepicker v-show="searchType.type === 'datetime'"
                                v-model="datePicker"
                                   @keypress.enter.prevent="handleSearch"
                                        :style="vdp_style"
                                        :clearable="false"
                                        class="block z-0 w-full mb-4 rounded-md bg-transparent border-0 h-12 py-1.5 pl-36 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300
                                        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                            />

                            <button
                                v-if="searchType.type === 'datetime' && datePicker"
                                    @click="datePicker = null"
                                    class="z-30 absolute inset-y-0 right-10 flex items-center pl-3">
                                <XMarkIcon class="text-gray-400 right-0 w-5"/>
                            </button>
                            <button
                                v-if="searchType.type === 'text' && search"
                                @click="search = null"
                                class="z-30 absolute inset-y-0 right-10 flex items-center pl-3">
                                <XMarkIcon class="text-gray-400 right-0 w-5"/>
                            </button>

                            <button type="submit" form="#search"
                                    @click="handleSearch"
                                class="z-30 absolute inset-y-0 right-3 flex items-center pl-3">
                                <MagnifyingGlassIcon class="text-gray-600 right-0 w-5"/>
                            </button>
                        </div>

                    </div>

                    <div class="flex items-center">
                        <button type="button"
                                class="-m-2 ml-4 text-lime-500 hover:text-gray-500 sm:ml-6 lg"
                                @click="createNoteMode">
                            <span class="sr-only">New Note</span>
                            <PencilSquareIcon class="h-7 w-7" aria-hidden="true"/>
                        </button>
                    </div>
                </div>
                <section aria-labelledby="products-heading" class="pb-8 pt-6 max-h-svh">
                    <h2 id="products-heading" class="sr-only">Notes</h2>

                    <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                        <!-- List of Notes -->
                        <div class="h-full lg:block lg:col-span-2">
                            <h3 class="sr-only">List Of All Notes</h3>
                            <ul role="list" class="space-y-4 border-b border-gray-200 pb-1 text-sm font-medium text-gray-900">
                                <li class="flex justify-center text-lime-800 items-center border-2 rounded-t-md px-4 py-2 border-amber-400
                                bg-amber-100">
                                    <span class="text-lg mr-4">Note List</span>
                                    <list-bullet-icon class="w-7 h-7"/>
                                </li>
                            </ul>

                            <div class="relative max-h-[72vh] overflow-hidden overflow-y-auto
                            scrollbar-thin scrollbar-thumb-gray-400"
                            >
                                <ul role="list" class="divide-y divide-gray-100">
                                    <li v-for="note in noteStore.notes" :key="note.id" @click="showNote(note)"
                                        :class="{'bg-amber-100': note.id===newNote.id}"
                                        class="py-4 px-2 m-2 hover:bg-amber-100 transition ease-in duration-100 hover:-translate-x-0.5 hover:-translate-y-1">
                                        <div class="p-0 cursor-pointer flex justify-between gap-x-6">
                                            <div class="flex min-w-0 gap-x-4">
                                                <div class="min-w-0 flex-auto">
                                                    <p class="text-sm uppercase truncate font-semibold leading-6 text-gray-900">{{ note.title }}</p>
                                                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ note.body }}</p>
                                                </div>
                                            </div>
                                            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                <p v-if="note.updated_at" class="mt-1 text-xs leading-5 text-gray-500">
                                                    <time :datetime="note.updated_at">{{ note.updated_at }}</time>
                                                </p>
                                                <div v-else class="mt-1 flex items-center gap-x-1.5">
                                                    <div class="flex-none rounded-full bg-emerald-500/20 p-1">
                                                        <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    </div>
                                                    <p class="text-xs leading-5 text-gray-500">Online</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <LoadContent></LoadContent>
                            </div>
                        </div>

                        <!-- Note SHow/Edit -->
                        <div :class="[noteIsShow ? 'border-2 rounded-md' : '', 'relative lg:col-span-3 max-h-[71vh] overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400']">
                            <div class="relative p-2 block h-24" v-show="noteIsShow">
                                <div class="sticky top-0 z-auto w-full flex justify-between border-b pb-3 text-gray-400">
                                    <div class="flex row items-center">
                                        <CalendarIcon v-show="newNote?.creation_date" class="w-5 mr-4"/>
                                        <div class="flex flex-col">
                                            <p class="font-semibold col">{{newNote?.creation_date}}</p>
                                            <span class="text-sm font-normal">last modify ({{newNote?.updated_at}})</span>
                                        </div>
                                    </div>
                                    <div v-show="isSaving" type="button" class="inline-flex items-center font-semibold leading-6 text-sm
                                    transition ease-in-out duration-150">
                                        <span class="loader w-3 text-gray-400 mr-2"></span>
                                        Saving...
                                    </div>
                                    <div  type="button"
                                         :class="['inline-flex items-center font-semibold leading-6 text-sm transition ease-in-out duration-1000',
                                         'transition duration-1000 ease-in', isSaved ? '' : 'text-transparent opacity-0']">
                                        <CheckCircleIcon class="w-4 text-green-400 mr-2"></CheckCircleIcon>
                                        Saved.
                                    </div>

                                    <div class="flex gap-x-4">
<!--                                        <button @click="saveNote" class="flex text-gray-500 row px-3 py-1 bg-amber-300 items-center border border-transparent rounded hover:border hover:border-amber-100">-->
<!--                                            <PencilIcon class="w-4"/>-->
<!--                                            <span class="ml-2">Save</span>-->
<!--                                        </button>-->
                                        <button @click="trashNote" v-if="newNote?.id" class="flex text-white row px-3 py-1 bg-orange-500 items-center border border-transparent rounded hover:border hover:border-amber-400">
                                            <TrashIcon class="w-4"/>
                                            <span class="ml-2">delete</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="flex-col">
                                    <ul class="flex justify-center text-orange-700">
                                        <li v-for="error in noteStore.validationError" class="list-disc text-xs">
                                        <span class="text-orange-700 ">{{error?.message}}</span>
                                        </li>
                                    </ul>
                                    <input @keydown="autoSave"
                                           type="text"
                                           placeholder="Title ..."
                                           v-model="newNote.title"
                                           class="w-full mt-1 bg-transparent focus:ring-0 focus:border-transparent focus:border-b-gray-600 text-2xl font-semibold
                                           border-transparent border-b-gray-600">
                                    <textarea @keydown="autoSave" v-model="newNote.body" class="w-full leading-loose text-lg h-screen bg-transparent border-none focus:ring-0"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/vue'
import { PencilSquareIcon, CalendarIcon, TrashIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ListBulletIcon, CheckIcon, ChevronUpDownIcon, MagnifyingGlassIcon, CheckCircleIcon } from '@heroicons/vue/20/solid'
import {useNoteStore} from "@js/stores/note.js";
import {useLoaderStore} from "@js/stores/Loader.js";
import NavBar from "@components/NavBar.vue";
import LoadContent from "@components/LoadContent.vue";
import debounce from 'lodash.debounce'
import Datepicker from 'vue3-datepicker'


const noteStore = useNoteStore();
const loaderStore = useLoaderStore();

const searchTypes = [
    {name: 'Text', type: 'text'},
    {name: 'Date & Time', type: 'datetime'},
]
const searchType = ref(searchTypes[0])
const search = ref('')
const datePicker = ref()

const noteIsShow = ref(false);
const newNote = ref({title: '', body: ''});
const isSaving = ref(false);
const isSaved = ref(false);
const vdp_style = ref({"--vdp-hover-bg-color": "rgb(245, 158, 11)",
    "--vdp-selected-color": "#ffffff",
    "--vdp-selected-bg-color": "rgb(251, 191, 36)"})

onMounted(async () => {
    await reloadNotes();
});

const reloadNotes = async (notes=null) => {
    loaderStore.isLoading();
    await noteStore.loadNotes(notes);
    await loaderStore.isLoaded();
}

const showNote = (note) =>{
    noteIsShow.value = true;
    isSaved.value = false;
    newNote.value = note;
}

const noteIsSaved = async () => {
    isSaved.value = true;
    setTimeout(function () {
        isSaved.value = false
    },5000)
}

const autoSave = debounce(async () => {
    if (newNote.value.title) {
        isSaving.value = true;
        isSaved.value = false;
        let data = await noteStore.saveNote(newNote.value);
        if (data) {
            await reloadNotes();
            if (!newNote.value.id) {
                newNote.value = await data;
            }
        }
        isSaving.value = false;
        await noteIsSaved();
    }
},5000);

const handleSearch = async () => {
    let date = null;
    if (search.value || datePicker.value){
        console.log(search.value, datePicker.value.toLocaleDateString())
        let searchedNotes = await noteStore.searchNote(search.value, datePicker.value.toLocaleDateString());
        if (searchedNotes && searchedNotes.data.length){
            loaderStore.isLoading();
            noteStore.notes = searchedNotes.data;
            noteIsShow.value = false;
        }
    }
    await loaderStore.isLoaded();
}

const trashNote = () => {
    noteStore.deleteNote(newNote.value)
    reloadNotes();
    noteIsShow.value = false;
}

const createNoteMode = () => {
    noteIsShow.value = true;
    newNote.value = {title: '', body: ''}
}
const mobileFiltersOpen = ref(false)



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
