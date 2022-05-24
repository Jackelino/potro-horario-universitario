<template>
  <main class="main">
    <section>
      <div class="container-fluid pt-3 rounded-3 bg-light shadow-lg">
        <TableSchedule/>
        <div class="container">
          <Pagination/>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import TableSchedule from "./TableSchedule.vue";
import Pagination from "./Pagination.vue";

export default {
  name: "Main",
  components: {
    TableSchedule,
    Pagination
  }
};
</script>

<style>
</style>
