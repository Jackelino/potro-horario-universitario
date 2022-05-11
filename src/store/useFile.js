import { defineStore } from 'pinia';

export const useFileStore = defineStore('file', {
    state: () => ({
        arrayFiles: []
    }),
    getters: {},
    actions: {
        // agrega los archivos de la UoloadFile
        addAllFiles(files) {
            this.arrayFiles = files;
        }
    }
});
