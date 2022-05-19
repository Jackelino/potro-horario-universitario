<template>
  <aside class="sidebar bg-light">
    <div class="container">
      <div class="container">
        <div class="row">
          <CanvasLoadFile/>
        </div>
        <div class="row">
          <label for="inputEmail3" class="col-form-label ">Anclar materia(s):</label>
          <div  class="style-chooser">
            <v-select
                :options="groups"
                :get-option-label="option => option.data.nombre"
                :filter-by="(option,label,search) =>
                    normalizeStr(label).includes(normalizeStr(search))">
              <template #option="{data, pool_id}">
                <h6 style="margin: 0">{{ data.nombre }}</h6>
                <em>{{ pool_id.id_list.join("/") }}</em> <br>
                <em>{{ data.profesor }}</em> <br>
                <em>{{ data.grupo }}</em>
              </template>
            </v-select>
          </div>
        </div>
        <div class="row">
          <label for="inputEmail3" class="col-form-label">Elegir materia(s):</label>
          <div class="">
            <v-select :options="subjects" label="name"
                :filter-by="(option,label,search) =>
                    normalizeStr(label).includes(normalizeStr(search))">
              <template #option="{name , subject_id}">
                <h6 style="margin: 0">{{ name }}</h6>
                <em>{{ subject_id.id_list.join("/") }}</em>
              </template>
            </v-select>
          </div>
          <div class="col-form-label">
            <div class="text-center">
              <button type="button" class="btn btn-primary text-white"><i class="fa-solid fa-code-compare"></i> Generar
                combinaciones
              </button>
            </div>

          </div>
        </div>
      </div>
      <hr>
      <div class="container">
        <div class="row">
          <button class="btn btn-light" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseSubjectAnchor"
                  aria-expanded="true" aria-controls="collapseSubjectAnchor" v-on:click="changeArrowAnchor">

            <div class="hstack gap-3">
              <div class="fw-bold">Materias Ancladas</div>
              <div class="ms-auto">
                <i class="fa-solid fa-angle-up fs-6 fw-bold" v-if="flagArrowAnchor"></i>
                <i class="fa-solid fa-angle-down fs-6 fw-bold"  v-else></i></div>
            </div>
          </button>
          <div class="subjects mt-2 mb-2 pe-0 ps-0">
            <div class="collapse show mt-2" id="collapseSubjectAnchor">
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="container">
        <div class="row">
          <button class="btn btn-light" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseSubjectFree"
                  aria-expanded="false" aria-controls="collapseSubjectFree" v-on:click="changeArrowFree">
            <div class="hstack gap-3">
              <div class="fw-bold">Materias libres</div>
              <div class="ms-auto">
                <i class="fa-solid fa-angle-down fs-6 fw-bold" v-if="flagArrowFree"></i>
                <i class="fa-solid fa-angle-up fs-6 fw-bold" v-else></i></div>
            </div>
          </button>
          <div class="subjects mt-2 mb-2 pe-0 ps-0">
            <div class="collapse mt-2" id="collapseSubjectFree">
              <CardSubject v-for="(subject, idx) in subjects"
              :subjectName="subject.name"
              :group="subject.subject_id.id_list.join('/')"
              :key="idx"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapState } from "pinia";
import { useFileStore } from "../store/useFile";
import { usePoolStore } from "../store/usePools";
import CardSubject from './CardSubject.vue';
import CanvasLoadFile from "./CanvasLoadFile.vue";

export default {
  name: 'Sidebar',
  components: {
    CanvasLoadFile,
    CardSubject
  },
  data() {
    return {
      flagArrowAnchor: true,
      flagArrowFree: true,
    }
  },
  methods: {
    changeArrowAnchor() {
      this.flagArrowAnchor = this.flagArrowAnchor !== true;
    },
    changeArrowFree() {
      this.flagArrowFree = this.flagArrowFree !== true;
    },
    // Función  para quitar acentos de una palabra y convertir a
    // minúsculas
    normalizeStr(str){
       return str.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
    }
  },
  computed: {
    ...mapState(useFileStore, ['arrayFiles']),
    ...mapState(usePoolStore, ['subjects', 'groups'])
  }
}
</script>

<style>

</style>
