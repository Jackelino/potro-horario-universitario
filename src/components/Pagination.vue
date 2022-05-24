<template>
  <div class="paginate">
    <nav aria-label="Page navigation example" class="p-1">
      <ul class="pagination justify-content-end">
        <li class="page-item disabled">
          <a class="page-link"><i class="fa-solid fa-angle-left"></i></a>
        </li>
        <li class="page-item" v-for="(item, index) in results" :key="index"><a class="page-link" href="#">{{index + 1}}</a></li>
        <li class="page-item">
          <a class="page-link" href="#"><i class="fa-solid fa-angle-right"></i></a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      numberGrids: 0
    }
  },
  props:{
    results: Array
  },
}
</script>

<style>

</style>
