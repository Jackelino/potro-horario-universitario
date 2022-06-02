<template>
  <main class="main">
    <section>
      <div class="container-fluid pt-3 rounded-3 bg-light shadow-lg">
        <TableSchedule :scheduleView="currentScheduleView"
                       v-for="schedule in 1"/>
        <div class="container">
          <Pagination :resultsArrayLen="engineResults.length"/>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import TableSchedule from "./TableSchedule.vue";
import Pagination from "./Pagination.vue";
import {mapState} from 'pinia';
import {useEngineResults} from "../store/useEngineResults";
import {useScheduleView} from "../store/useScheduleView";
import {usePoolStore} from "../store/usePools";

export default {
  name: "Main",
  data() {
    return {
      resultSelect: []
    };
  },
  components: {
    TableSchedule,
    Pagination,
  },

  computed:{
    ...mapState(useEngineResults, ['engineResults','engineRan']),
    ...mapState(useScheduleView, ['scheduleView']),
    ...mapState(usePoolStore, ['selectedGroupsAsScheduleView']),
    currentScheduleView(){
        if(this.engineRan){
            return this.scheduleView;
        }else{
            return this.selectedGroupsAsScheduleView;
        }
      } else {
        // aqui retorna los resultados de a partir del indice del arreglo
        return {
          nameSchedule: 'Horario ' + (this.currentResultIdx + 1),
          schedule: this.scheduleView = this.engineResults[this.currentResultIdx]
        }
      }

    }
  }
};
</script>

<style>
</style>
