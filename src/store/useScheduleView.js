import {defineStore} from 'pinia';
import {ScheduleView} from "../lib/gridUtils";
import {useEngineResults} from "./useEngineResults";
import {usePoolStore} from "./usePools";

export const useScheduleView = defineStore('schedule-view', {
    state: () => ({currentResultIdx: 0}),
    actions: {
        // cambia la paginacion conforme al indice del arreglo
        setCurrentResultIdx(index) {
            this.currentResultIdx = index;
        },
        // incrementa el indice
        setCurrentResultIdxIncrement() {
            let engineResult = useEngineResults();
            if (this.currentResultIdx < engineResult.engineResults.length - 1) {
                this.currentResultIdx++;
            }
        },
        // decrementa el indice
        setCurrentResultIdxDecrement() {
            if (this.currentResultIdx > 0) {
                this.currentResultIdx--;
            }
        }
    },
    getters: {
        scheduleView: (state) => {
            let scheduleView = new ScheduleView();
            let engineResults = useEngineResults();
            if (engineResults.engineRan) {
                const currentResult = engineResults.engineResults[state.currentResultIdx];
                for (const grid of currentResult.grids) {
                    scheduleView.pushGrid(grid);
                }
            } else {
                // Usar solo los horarios definidos en los engineParams
                let poolStore = usePoolStore();
                for (const grid of poolStore.selectedGroups) {
                    scheduleView.pushGrid(grid);
                }
            }
            return scheduleView;
        }

    }

});
