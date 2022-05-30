<template>
  <div class="paginate" v-show="validateResults">
    <nav aria-label="Page navigation example" class="p-1">
      <ul class="pagination justify-content-end">
        <li class="page-item" :class="disabledPaginationBack">
          <a class="page-link" @click.prevent="setCurrentResultIdxDecrement()"><i
              class="fa-solid fa-angle-left"></i></a>
        </li>
        <li class="page-item" v-for="(item, index) in results" :key="index" :class="activePagination(index)"><a
            class="page-link" href="#" @click.prevent="setCurrentResultIdx(index)">{{ index + 1 }}</a></li>
        <li class="page-item" :class="disabledPaginationNext">
          <a class="page-link" href="#" @click.prevent="setCurrentResultIdxIncrement()"><i
              class="fa-solid fa-angle-right"></i></a>
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
  data() {
    return {
      numberSchedule: 0
    }
  },
  props: {
    results: Array
  },
  methods: {
    ...mapActions(useScheduleView, ['setCurrentResultIdx', 'setCurrentResultIdxIncrement', 'setCurrentResultIdxDecrement']),
    // indica que paginacion esta activa
    activePagination(index) {
      return this.currentResultIdx === index ? 'active' : '';
    }
  },
  computed: {
    ...mapState(useScheduleView, ['currentResultIdx']),
    // si no tiene resultados no se muestra la paginacion
    validateResults() {
      return this.results.length === 0 ? false : true;
    },
    // habilita y desabilita las felchas de la paginacion con direccion atras
    disabledPaginationBack() {
      return this.currentResultIdx === 0 ? 'disabled' : '';
    },
    // habilita y desabilita las felchas de la paginacion con direccion adelante
    disabledPaginationNext() {
      return this.currentResultIdx === this.results.length - 1 ? 'disabled' : '';
    }
  }
}
</script>

<style>

</style>
