<template>
  <div>
    <div class="row">
      <div class="text-center">
        <div class="dropzone p-3" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive"
             @dragover.prevent
             @drop.prevent="dropFile"
             :class="activeDrop"
        >
          <i class="fa-solid fa-cloud-arrow-up fs-1 text-info text-opacity-50"></i>
          <h5>Arrastrar y suelta archivos para cargar</h5>
          <small>Sus archivos se agregarán automáticamente</small>
          <h6 class="m-3">Ó</h6>
          <div class="m-3">
            <label for="file" class="btn btn-success" :class="{'btn btn-light': activeDropzone}"><i
                class="fa-solid fa-file-arrow-up"></i> Seleccione
              archivos</label>
            <input type="file" class="d-none" v-on:change="loadFiles" id="file" multiple accept=".csv">
          </div>

        </div>
        <div class="text-start text-muted">Solo archivos .csv menor a 3MB</div>
      </div>
    </div>
    <div class="row p-0 my-1">
      <div>
        <ul class="nav flex-column">
          <li class="nav-item" v-for="file in listFile" :key="file">
            <div class="container border border-2 rounded bg-light p-3 my-1 text-start file">
              <div class="row">
                <div class="col-lg-10 col-md-10 col-sm-10">
                  <i class="fa-solid fa-file-csv text-success fs-4"></i> {{
                    file.name
                  }}
                </div>
                <div class="col-lg-2 col-md-2 col-sm-2">
                  <i class="fa-solid fa-trash hover-trash" @click.prevent="removeFile(file)"></i>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {usePoolStore} from "../store/usePools";
import {useFileStore} from "../store/useFile.js";
import {createToast} from "mosha-vue-toastify";
import init, {api_init_pools} from "uaemex-horarios";
// NOTA: NO me preguntes por qué es necesaria esta lína. Tiene que ver con un
// problema con vite, que al empaquetar y transformar los imports de wasm,
// no reconoce una url y regresa error. Básicamente se describe en este
// issue: https://github.com/vitejs/vite/discussions/2584
import wasmURL from "uaemex-horarios/uaemex_horarios_bg.wasm?url";

export default {
  name: "LoadFile",
  data() {
    return {
      listFile: [],
      files: [],
      engineInitPools: null,
      activeDropzone: false,
    }
  },
  mounted() {
    init(wasmURL).then(() => {
      this.engineInitPools = api_init_pools;
    });
    // aqui le psasmos los archivos de la tienda que se cargaron antes de moverse a otra vista
    // muestra los archivos cargados anteriormente
    this.listFile = this.arrayFiles
  },
  methods: {
    ...mapActions(usePoolStore, ['addToPools']),
    ...mapActions(useFileStore, ['addAllFiles', 'deleteFile']),
    toggleActive() {
      this.activeDropzone = this.activeDropzone !== true;
    },
    async addFileToPoolStore(file) {
      // Validar que el csv tenga el formato correcto y que no se
      // repitan materias
      try {
        const text = await file.text();
        // El API lanza una exepción si no tiene el formato correcto.
        const { pools } = await this.engineInitPools(text);

        // Lanza una excepción si se repite una clave en el nuevo
        // archivo
        this.addToPools(pools);

      } catch (e) {
        // Error en API tiene propiedad msg
        if (e.msg) {
          throw new Error(e.msg)
        } else {
          throw new Error(e.message)
        }
      }
    },
    async loadFiles(event) {
      this.files = event.target.files;
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].size >= 24000000) { //3MB
          createToast('El archivo es demasiado pesado.', {
            type: 'danger',
            position: 'top-center',
            timeout: 4000,
            showIcon: true
          });
          throw new Error("Error de peso")
        }
        if (this.files[i].type !== "text/csv") {
          createToast('El archivo no es de tipo texto/csv.', {
            type: 'danger',
            position: 'top-center',
            timeout: 4000,
            showIcon: true
          });
          throw new Error("Error de tipo")
        }
        // verificammos que el archivo que quiero cargar no existe para que no
        // ocaciones errores.
        if (this.fileExists(this.files[i]) === false) {
          try {
            await this.addFileToPoolStore(this.files[i]);
            this.listFile.push(this.files[i]);
            console.log(this.files[i])
          } catch (e) {
            createToast(e.message, {
              type: 'danger',
              position: 'top-center',
              timeout: 4000,
              showIcon: true
            });
            throw e;
          }
        } else {
          createToast('Este archivo ya esta cargado.', {
            type: 'warning',
            position: 'top-center',
            timeout: 4000,
            showIcon: true
          });
        }
      }
    },
    async dropFile(event) {
      this.files = event.dataTransfer.files;
      for (let i = 0; i < this.files.length; i++) {
        if (this.files[i].size >= 24000000) { //3MB
          createToast('El archivo es demasiado pesado.', {
            type: 'danger',
            position: 'top-center',
            timeout: 4000,
            showIcon: true
          });
          this.toggleActive()
          throw new Error("Error de peso")
        }
        if (this.files[i].type !== "text/csv") {
          createToast('El archivo no es de tipo texto/csv.', {
            type: 'danger',
            position: 'top-center',
            timeout: 4000,
            showIcon: true
          });
          this.toggleActive()
          throw new Error("Error de tipo")
        }
        // verificammos que el archivo que quiero cargar no existe para que no
        // ocaciones errores.
        if (this.fileExists(this.files[i]) === false) {
          try {
            await this.addFileToPoolStore(this.files[i]);
            this.listFile.push(this.files[i]);
            console.log(this.files[i])
          } catch (e) {
            createToast(e.message, {
              type: 'danger',
              position: 'top-center',
              timeout: 4000,
              showIcon: true
            });
            this.toggleActive()
            throw e;
          }
        } else {
          createToast('Este archivo ya esta cargado.', {
            type: 'warning',
            position: 'top-center',
            timeout: 4000,
            showIcon: true
          });
        }
      }
      this.toggleActive()
    },
    fileExists(fileFind) {
      for (let i = 0; i < this.listFile.length; i++) {
        if (this.listFile[i].name === fileFind.name && this.listFile[i].type === fileFind.type && this.listFile[i].lastModified === fileFind.lastModified) {
          return true;
        }
      }
      return false
    },
    removeFile(file) {
      this.deleteFile(file)// se elimina de la tienda
      let index = this.listFile.indexOf(file)
      if (index > -1) {
        this.listFile.splice(index, 1)
      }
    }
  },
  computed: {
    // mapeamos los archivos cargados
    ...mapState(useFileStore, ['arrayFiles']),
    activeDrop() {
      return (this.activeDropzone) ? 'bg-success active-dropzone' : '';
    }
  }
}
</script>

<style scoped>

</style>
