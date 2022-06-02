<template>
  <main class="main">
    <section>
      <div class="container-fluid pt-3 rounded-3 bg-light shadow-lg">
        <TableSchedule :scheduleView="currentScheduleView"/>
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
  components: {
    TableSchedule,
    Pagination,
  },

  computed: {
    ...mapState(useEngineResults, ['engineResults', 'engineRan']),
    ...mapState(useScheduleView, ['scheduleView', 'currentResultIdx']),
    ...mapState(usePoolStore, ['selectedGroupsAsScheduleView']),
    currentScheduleView() {
      // retornamos un objeto para enviar el grid y el nummero de horario de los resultados
      if (this.engineRan) {
        return {
          nameSchedule: 'Horario ' + (this.currentResultIdx + 1),
          schedule: this.scheduleView
        }
      } else {
        return {
          nameSchedule: 'Horario Previo',
          schedule: this.selectedGroupsAsScheduleView
        }
      }
    }
  }
};
</script>

<style>
</style>
