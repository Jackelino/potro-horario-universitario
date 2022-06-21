<template>
  <div class="paginate" v-show="validateResults">
    <nav aria-label="Page navigation example" class="pt-2">
      <ul class="pagination justify-content-end">
        <li class="page-item me-2">
          <div class="fw-bold align-middle p-2">Horario {{currentResultIdx +1}} de {{resultsArrayLen }}</div>
        </li>
        <li class="page-item" :class="disabledPaginationBack">
          <div @click="decCurrentResultIdx" class="page-link" data-bs-toggle="tooltip" data-bs-placement="top" title="Horario anterior"><i class="fa-solid fa-angle-left"></i></div>
        </li>

        <li class="page-item" :class="disabledPaginationNext">
          <div @click="incCurrentResultIdx" class="page-link" data-bs-toggle="tooltip" data-bs-placement="top" title="Horario siguiente"><i class="fa-solid fa-angle-right"></i></div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

import {mapActions, mapState} from "pinia";
import {useScheduleView} from "../store/useScheduleView";

export default {
  name: "Pagination",
  props: {
    resultsArrayLen: Number
  },
  data() {
    return {
      noAllPaginate: 3,
      itemss: 1
    }
  },
  mounted() {

  },
  computed: {
    ...mapState(useScheduleView, ["currentResultIdx"]),
    // si no tiene resultados no se muestra la paginacion
    validateResults() {
      return this.resultsArrayLen === 0 ? false : true;
    },
    // habilita y desabilita las felchas de la paginacion con direccion atras
    disabledPaginationBack() {
      return this.currentResultIdx === 0 ? 'disabled' : '';
    },
    // habilita y desabilita las felchas de la paginacion con direccion adelante
    disabledPaginationNext() {
      return this.currentResultIdx === this.resultsArrayLen - 1 ? 'disabled' : '';
    }
  },
  methods: {
    ...mapActions(useScheduleView, ["setCurrentResultIdx", "incCurrentResultIdx", "decCurrentResultIdx"])
  }
}
</script>
<style scoped>
.number-highlight {
  font-weight: 900;
  background-color: #D2D5D9;
}
</style>
