import { defineStore } from 'pinia';
import { ScheduleView } from "../lib/gridUtils";
import { useEngineResults } from "../store/useEngineResults";
import { usePoolStore } from "../store/usePools";

export const useScheduleView = defineStore('schedule-view', {
    state: () => ({ currentResultIdx: 0 }),
    actions: {
        setCurrentResultIdx(idx) {
            this.currentResultIdx = idx;
        },
        decCurrentResultIdx() {
            if (this.currentResultIdx > 0) {
                this.currentResultIdx--;
            }
        },
        incCurrentResultIdx() {
            let engineResults = useEngineResults();
            if (this.currentResultIdx < engineResults.results.length - 1) {
                this.currentResultIdx++;
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
