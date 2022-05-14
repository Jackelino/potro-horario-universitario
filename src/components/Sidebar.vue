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
              <template #option="{ name , subject_id}">
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
              <div class="ms-auto"><i class="fa-solid fa-caret-up" v-if="flagArrowAnchor"></i><i
                  class="fa-solid fa-caret-down" v-else></i></div>
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
              <div class="ms-auto"><i class="fa-solid fa-caret-down" v-if="flagArrowFree"></i><i
                  class="fa-solid fa-caret-up" v-else></i></div>
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
    }
  },
  computed: {
    ...mapState(useFileStore, ['arrayFiles']),
    ...mapState(usePoolStore, ['subjects'])
  }
}
</script>

<style>

</style>
