<template>
  <header class="header bg-light ">
    <!-- Navbar Start -->
    <div class="container-fluid">
      <div class="row pt-2 pb-2">
        <div class="d-flex justify-content-between">
          <div class="escudo-uemex">
            <router-link to="/" data-bs-toggle="tooltip" data-bs-placement="top" title="Inicio">
              <img src="../assets/image/escudo-uaemex.png" class="img-fluid" alt="fs" width="100">
            </router-link>
          </div>
          <div class="align-self-center">
            <div class="align-middle">
              <h4 class="m-0">Potro horario universitario</h4>
            </div>
          </div>
          <div class="escudo-fiuaemex">
            <img src="../assets/image/escudo-fiuaaemex.png" class="img-fluid" alt="fs" width="100">
          </div>
        </div>
      </div>
    </div>
    <!-- Navbar End -->
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>

</style>
