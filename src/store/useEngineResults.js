import { defineStore } from 'pinia';
export const useEngineResults = defineStore('engine-results', {
    state: () => ({ engineResults: [], engineRan: false }),
    actions: {
        setResults(results) {
            this.engineResults = results;
        },
        setEngineRan(val) {
            this.engineRan = val;
        }
    },
    getters: {
        results: (state) => {
            return state.engineResults;
        }
    }
});
