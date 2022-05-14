<template>
  <div class="pt-3">
    <div class="text-end">
      <button class="btn btn-primary btn-sm text-white" type="button" data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Administrar platilla...
      </button>
    </div>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Cargar archivos</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <LoadFile/>
      </div>
    </div>
  </div>
</template>

<script>
import LoadFile from "./LoadFile.vue";
export default {
  name: "CanvasLoadFile",
  components: {
    LoadFile
  }

}
</script>

<style scoped>

</style>
