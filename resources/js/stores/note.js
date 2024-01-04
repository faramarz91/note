import {defineStore} from "pinia";
import NoteApi from "@js/axios/Notes.js";

export const useNoteStore = defineStore('notes', {
   state:  () => ({
       notes:{},
       note:{},
       noteValidation: {},
   }),
    actions: {
       async loadNotes(notes=null) {
           if (notes && notes.length) {
               this.notes = notes;
           }
           return await NoteApi.index()
               .then(res => {
                   this.notes = res.data.data;
                   return res.data;
               })
               .catch(err => {
                   console.log('noteStore->loadNote', err)
                   return null;
               });
       },

        async searchNote(text, date) {
            return await NoteApi.search(text, date)
                .then(res => res.data)
                .catch(err => console.log('noteStore->searchNote', err));
        },

        async saveNote(note) {
            if (note.id){
                return await NoteApi.update(note.id, {title: note.title, body: note.body})
                    .then(res => res.data.data)
                    .catch(err => {
                        if (err.response?.status === 422){
                            this.validationError = err.response.data;
                        }
                        console.log('noteStore->saveNote->update API', err)
                        return null;
                    })
            } else {
                return await NoteApi.store(note)
                    .then(res => res.data.data)
                    .catch(err => {
                        if (err.response?.status === 422){
                            this.validationError = err.response.data;
                        }
                        console.log('noteStore->saveNote->store API', err)
                        return null;
                    })
            }
        },

        async deleteNote(note) {
            return await NoteApi.destroy(note.id)
                .then(res => res.data)
                .catch(err => console.log('noteStore->delete', err))
        },
    },

});
