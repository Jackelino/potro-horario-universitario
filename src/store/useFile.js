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
        },
        deleteFile(file){
            let index = this.arrayFiles.indexOf(file)
            if (index > -1) {
                this.arrayFiles.splice(index, 1)
            }
        }
    }
});
