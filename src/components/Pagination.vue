<template>
  <div class="paginate" v-show="validateResults">
    <nav aria-label="Page navigation example" class="p-1">
      <ul class="pagination justify-content-end">

        <li class="page-item">
          <a @click="decCurrentResultIdx" class="page-link" href="#"><i class="fa-solid fa-angle-left"></i></a>
        </li>
        <li class="page-item" v-for="index in resultsArrayLen"
        :key="index"><a class="page-link" href="#"
        :class="{'number-highlight': index - 1 == currentResultIdx}"
        @click="setCurrentResultIdx(index - 1)"
        >{{index}}</a></li>
        
        <li class="page-item">
          <a @click="incCurrentResultIdx" class="page-link" href="#"><i class="fa-solid fa-angle-right"></i></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

import { mapActions, mapState} from "pinia";
import { useScheduleView } from "../store/useScheduleView";
export default {
  name: "Pagination",
  props:{
    resultsArrayLen: Number 
  },
  computed:{
    ...mapState(useScheduleView, ["currentResultIdx"]),
  },
  methods:{
    ...mapActions(useScheduleView, ["setCurrentResultIdx","incCurrentResultIdx", "decCurrentResultIdx"]),
  }
}
</script>
<style scoped>
.number-highlight{
    font-weight:900;
    background-color:#D2D5D9;
}
</style>
