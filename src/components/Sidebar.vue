<template>
  <aside class="sidebar bg-light">
    <div class="container">
      <div class="container">
        <div class="row">
          <div class="pt-3">
            <button class="btn btn-primary btn-sm text-white" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Administrar platilla...
            </button>
          </div>
        </div>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel">Cargar archivos</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            ...
          </div>
        </div>
        <div class="row">
          <label for="inputEmail3" class="col-form-label">Anclar materia(s):</label>
          <div class="">
            <v-select :options="subjects" label="title">
              <template #option="{ title, teacher , group}">
                <h6 style="margin: 0">{{ title }}</h6>
                <em>{{ teacher.firstName }} {{ teacher.lastName }}</em> <br>
                <em>{{ group }}</em>
              </template>
            </v-select>
          </div>
        </div>
        <div class="row">
          <label for="inputEmail3" class="col-form-label">Elegir materia(s):</label>
          <div class="">
            <v-select :options="subjects" label="title">
              <template #option="{ title, teacher }">
                <h6 style="margin: 0">{{ title }}</h6>
                <em>{{ teacher.firstName }} {{ teacher.lastName }}</em>
              </template>
            </v-select>
          </div>
          <div class="col-form-label">
            <button type="button" class="btn btn-primary text-white"><i class="fa-solid fa-code-compare"></i> Generar
              combinaciones
            </button>
          </div>
        </div>
      </div>
      <hr>
      <div class="container">
        <div class="row">
          <button class="btn btn-light" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="true" aria-controls="collapseExample">
            <div class="hstack gap-3">
              <div class="">Materias libres</div>
              <div class="ms-auto"><i class="fa-solid fa-caret-down"></i></div>
            </div>
          </button>
          <div class="subjects mt-2 mb-2 pe-0 ps-0">
            <div class="collapse show mt-2" id="collapseExample">
              <CardSubject v-for="n in 5"/>
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <button class="btn btn-light" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseExampl"
                  aria-expanded="false" aria-controls="collapseExample">
            <div class="hstack gap-3">
              <div class="">Materias libres</div>
              <div class="ms-auto"><i class="fa-solid fa-caret-down"></i></div>
            </div>
          </button>
          <div class="subjects mt-2 mb-2 pe-0 ps-0">
            <div class="collapse mt-2" id="collapseExampl">
              <CardSubject v-for="n in 6"/>
            </div>
          </div>
        </div>

      </div>
    </div>
  </aside>
</template>

<script>
import CardSubject from './CardSubject.vue';

export default {
  name: 'Sidebar',
  components: {
    CardSubject
  },
  data() {
    return {
      subjects: [
        {
          title: "Modelos de red",
          teacher: {
            firstName: 'Joel',
            lastName: 'Scalzi',
          },
          group: 'LA34',
        },
        {
          title: "Base de datos I",
          teacher: {
            firstName: 'John',
            lastName: 'Scalzi',
          },
          group: 'fd',
        },
      ],
    }
  },
}
</script>

<style>

</style>
