<template>
    <main class="main">
        <section>
            <div class="container-main p-0 m-2 rounded">
                <div class="container bg-light mb-3">
                    <div class="row p-3">
                        info
                        <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
                    </div>
                </div>
                <TableSchedule/>
            </div>
        </section>
    </main>
</template>

<script>
import TableSchedule from "./TableSchedule.vue";
export default {
    name: "Main",
    components: {
        TableSchedule
    }
};
</script>

<style>
</style>