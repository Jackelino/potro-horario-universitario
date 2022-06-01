<template>
  <main class="main">
    <section>
      <div class="container-fluid pt-3 rounded-3 bg-light shadow-lg">
        <TableSchedule :scheduleView="currentScheduleView"/>
        <div class="container">
          <Pagination :results="engineResults || []"/>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import TableSchedule from "./TableSchedule.vue";
import Pagination from "./Pagination.vue";
import { mapState } from 'pinia';
import { useEngineResults } from "../store/useEngineResults";
import { useScheduleView } from "../store/useScheduleView";
import { usePoolStore } from "../store/usePools";

export default {
  name: "Main",
  data(){
    return {
        currentSelectedIdx: 0
    };
  },
  components: {
    TableSchedule,
    Pagination,
  },
  computed:{
    ...mapState(useEngineResults, ['engineResults', 'engineRan']),
    ...mapState(useScheduleView, ['scheduleView']),
    ...mapState(usePoolStore, ['selectedGroupsAsScheduleView']),
    currentScheduleView(){
        if(this.engineRan){
            return this.scheduleView;
        }else{
            return this.selectedGroupsAsScheduleView;
        }
    }
  }
};
</script>

<style>
</style>
