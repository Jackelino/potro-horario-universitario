<template>
  <div class="card m-1 bg-info bg-opacity-25 border border-info">
    <div class="card-body p-2">
      <div class="conatainer">
        <div class="position-relative">
          <div class="position-absolute top-0 end-0">
            <button type="button" class="btn btn-dark p-0 pe-1 ps-1">
              <i class="fa-solid fa-xmark "></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="p-0 m-0"><b>{{subjectName}}</b></p>
          <p class="p-0 m-0"><span>Grupo:</span><b>{{group}}</b></p>
        </div>
        <div class="col d-flex text-center align-items-center justify-content-center">
          <div class="stiker">
            🐙
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    subjectName:{  
      type: String,
      default: "Nombre Materia",
    },
    group:{ 
      type: String,
      default: "Grupo"
    }
  },
  name: 'CardSubject'
}
</script>

<style>

</style>
