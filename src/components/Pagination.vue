<template>
  <div class="paginate">
    <nav aria-label="Page navigation example" class="p-1">
      <ul class="pagination justify-content-end">
        <li class="page-item">
          <a @click="decCurrentResultIdx" class="page-link"><i class="fa-solid fa-angle-left"></i></a>
        </li>
        <li class="page-item" v-for="index in resultsArrayLen" :key="index"><a class="page-link" href="#">{{index}}</a></li>
        <li class="page-item">
          <a @click="incCurrentResultIdx" class="page-link" href="#"><i class="fa-solid fa-angle-right"></i></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useScheduleView } from "../store/useScheduleView";
export default {
  name: "Pagination",
  props:{
    resultsArrayLen: Number 
  },
  methods:{
    ...mapActions(useScheduleView, ["incCurrentResultIdx", "decCurrentResultIdx"]),
  }
}
</script>
