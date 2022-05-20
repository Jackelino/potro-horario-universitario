import { defineStore } from 'pinia';
export const useEngineResults = defineStore('engine-results', {
    state: () => ({ engineResults: [] }),
    actions:{
        setResults(results){
            this.engineResults = results;
        }
    }
});
