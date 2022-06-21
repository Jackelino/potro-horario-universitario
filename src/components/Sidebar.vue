<template>
  <aside class="sidebar bg-light">
    <div class="container">
      <div class="container">

        <div class="row" v-if="!engineRan">
          <CanvasLoadFile/>
        </div>
        <div class="row" v-if="!engineRan">
          <label for="inputEmail3" class="col-form-label">Anclar grupos:</label>
          <div class="style-chooser" v-if="!engineRan">
            <v-select
                @option:selected="groupSelectedCallback"
                :options="groups"
                :get-option-label="(option) => option.data.nombre"
                :filter-by="
                (option, label, search) =>
                  normalizeStr(label).includes(normalizeStr(search))"
            >
              <template #option="{ data, pool_id }">
                <h6 style="margin: 0">{{ data.nombre }}</h6>
                <em>{{ pool_id.id_list.join("/") }}</em> <br/>
                <em>{{ data.profesor }}</em> <br/>
                <em>{{ data.grupo }}</em>
              </template>
            </v-select>
          </div>
        </div>
        <div class="row" v-if="!engineRan">
          <label for="inputEmail3" class="col-form-label"
          >Elegir materias libres:</label
          >
          <div class="">
            <v-select
                v-model="seleccionado"
                :options="subjects"
                label="name"
                @option:selected="subjectSelectedCallback"
                :filter-by="
                (option, label, search) =>
                  normalizeStr(label).includes(normalizeStr(search))
              "
            >
              <template #option="{ name, subject_id }">
                <h6 style="margin: 0">{{ name }}</h6>
                <em>{{ subject_id.id_list.join("/") }}</em>
              </template>
            </v-select>
          </div>
          <div class="col-form-label">
            <div class="d-flex justify-content-between">
              <div class="text-center">Núm. de grupos a inscribir</div>
              <div class="text-end">
                <button
                    @click="decEngineBound"
                    class="btn btn-primary btn-sm text-white rounded-circle"
                >
                  <i class="fa-solid fa-minus"></i>
                </button>
                {{ engineParams.bound }}
                <button
                    @click="incEngineBound"
                    class="btn btn-primary btn-sm text-white rounded-circle"
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-form-label">
          <div class="text-center">
            <button
                v-if="!engineRan"
                type="button"
                class="btn btn-primary text-white"
                @click="engineRun"
                :disabled="validateCombinations"
            >
              <i class="fa-solid fa-code-compare"></i> Generar combinaciones
            </button>
            <button type="button"
                    @click="changeParamsButtonClicked"
                    class="btn btn-secondary text-white"
                    v-else
            >Cambiar parámetros
            </button>
          </div>
        </div>
      </div>
      <hr/>
      <div class="container" v-if="!engineRan">
        <div class="row">
          <button
              class="btn btn-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSubjectAnchor"
              aria-expanded="true"
              aria-controls="collapseSubjectAnchor"
              v-on:click="changeArrowAnchor"
          >
            <div class="hstack gap-3">
              <div class="fw-bold">Grupos anclados</div>
              <div class="ms-auto">
                <i class="fa-solid fa-angle-up" v-if="flagArrowAnchor"></i
                ><i class="fa-solid fa-angle-down" v-else></i>
              </div>
            </div>
          </button>
          <div class="subjects mt-2 mb-2 pe-0 ps-0">
            <div class="collapse show mt-2" id="collapseSubjectAnchor">
              <CardSubject
                  v-for="(group, idx) in selectedGroups"
                  @closed="removeSeedFromEngineParams(group)"
                  :subjectName="group.data.nombre"
                  :id="group.pool_id.id_list.join('/')"
                  :group="group.data.grupo"
                  :teacher="group.data.profesor"
                  :key="idx"
                  :label="group.label"
                  :style="group.style"
              />
            </div>
          </div>
        </div>
      </div>
      <hr v-if="!engineRan">
      <div class="container" v-if="!engineRan">
        <div class="row">
          <button
              class="btn btn-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSubjectFree"
              aria-expanded="true"
              aria-controls="collapseSubjectFree"
              v-on:click="changeArrowFree"
          >
            <div class="hstack gap-3">
              <div class="fw-bold">Materias libres</div>
              <div class="ms-auto">
                <i
                    class="fa-solid fa-angle-up fs-6 fw-bold"
                    v-if="flagArrowFree"
                ></i>
                <i class="fa-solid fa-angle-down fs-6 fw-bold" v-else></i>
              </div>
            </div>
          </button>
          <div class="subjects mt-2 mb-2 pe-0 ps-0">
            <div class="collapse mt-2 show" id="collapseSubjectFree">
              <CardSubject
                  v-for="(subject, idx) in selectedSubjects"
                  @closed="removePoolFromEngineParams(subject.subject_id)"
                  :subjectName="subject.name"
                  :id="subject.subject_id.id_list.join('/')"
                  :key="idx"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="container" v-if="engineRan">
        <div class="row">
          <button
              class="btn btn-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseGroupsResult"
              aria-expanded="true"
              aria-controls="collapseGroupsResult"
              v-on:click="changeArrowResults"
          >
            <div class="hstack gap-3">
              <div class="fw-bold">Grupos del horario actual</div>
              <div class="ms-auto">
                <i
                    class="fa-solid fa-angle-down fs-6 fw-bold"
                    v-if="flagArrowResults"
                ></i>
                <i class="fa-solid fa-angle-up fs-6 fw-bold" v-else></i>
              </div>
            </div>
          </button>
          <div class="subjects mt-2 mb-2 pe-0 ps-0">
            <div class="collapse mt-2 show" id="collapseGroupsResult">
              <CardSubject
                  v-for="(group, idx) in scheduleView.grids"
                  :subjectName="group.data.nombre"
                  :id="group.pool_id.id_list.join('/')"
                  :group="group.data.grupo"
                  :teacher="group.data.profesor"
                  :label="group.label"
                  :style="group.style"
                  :key="idx"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import {mapState, mapActions} from "pinia";
import {useFileStore} from "../store/useFile";
import {usePoolStore} from "../store/usePools";
import {useEngineResults} from "../store/useEngineResults";
import {useScheduleView} from "../store/useScheduleView";
import CardSubject from "./CardSubject.vue";
import CanvasLoadFile from "./CanvasLoadFile.vue";
import init, {api_engine_main} from "uaemex-horarios";
// NOTA: NO me preguntes por qué es necesaria esta lína. Tiene que ver con un
// problema con vite, que al empaquetar y transformar los imports de wasm,
// no reconoce una url y regresa error. Básicamente se describe en este
// issue: https://github.com/vitejs/vite/discussions/2584
import wasmURL from "uaemex-horarios/uaemex_horarios_bg.wasm?url";

export default {
  name: "Sidebar",
  components: {
    CanvasLoadFile,
    CardSubject,
  },
  data() {
    return {
      seleccionado: null,
      flagArrowAnchor: true,
      flagArrowFree: true,
      flagArrowResults: true,
      apiEngineMain: null,
      engineReady: false,
    };
  },
  mounted() {
    init(wasmURL).then(() => {
      this.apiEngineMain = api_engine_main;
      this.engineReady = true;
    });
  },
  methods: {
    ...mapActions(usePoolStore, [
      "addPoolToEngineParams",
      "removePoolFromEngineParams",
      "addSeedToEngineParams",
      "removeSeedFromEngineParams",
      "incEngineBound",
      "decEngineBound",
    ]),
    ...mapActions(useEngineResults, ["setResults", "setEngineRan"]),
    subjectSelectedCallback(subject) {
      // Buscar pool con subject_id == pool_id
      let pool = this.pools.find((p) => {
        for (const poolId of p.pool_id.id_list) {
          for (const subjectId of subject.subject_id.id_list) {
            if (subjectId === poolId) {
              return true;
            }
          }
        }
        return false;
      });
      // Añadirlo a engineParams.
      // Esto también la elimina de la lista general, es decir, ya no
      // aparece en las materias seleccionables.
      if (pool) {
        this.addPoolToEngineParams(pool);
      } else {
        console.error("Esto no debería de suceder!");
      }
    },
    groupSelectedCallback(group) {
      this.addSeedToEngineParams(group);
    },
    changeArrowAnchor() {
      this.flagArrowAnchor = this.flagArrowAnchor !== true;
    },
    changeArrowFree() {
      this.flagArrowFree = this.flagArrowFree !== true;
    },
    changeArrowResults() {
      this.flagArrowResults = !this.flagArrowResults;
    },
    // Función  para quitar acentos de una palabra y convertir a
    // minúsculas
    normalizeStr(str) {
      return str
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
    },
    engineRun() {
      let engineResults = this.apiEngineMain(this.engineParams);
      this.setResults(engineResults);
      this.setEngineRan(true);
    },
    changeParamsButtonClicked() {
      let engineResultsStore = useEngineResults();
      // Resetar los resultados del engine
      engineResultsStore.$reset();
    }
  },
  computed: {
    ...mapState(useFileStore, ["arrayFiles"]),
    ...mapState(useScheduleView, ["scheduleView"]),
    ...mapState(useEngineResults, ["engineRan"]),
    ...mapState(usePoolStore, [
      "pools",
      "selectedSubjects",
      "selectedGroupsAsScheduleView",
      "engineParams",
      "subjects",
      "groups",
    ]),
    selectedGroups() {
      return this.selectedGroupsAsScheduleView.grids;
    },
    validateCombinations() {
      return (this.scheduleView.grids.length === 0 && this.selectedSubjects.length === 0);
    }
  },
};
</script>

