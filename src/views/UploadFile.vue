<template>
  <Load :loading="isLoading"/>
  <div v-if="!isLoading">
    <BarTop/>
    <Header/>
    <main class="upload-file">
      <section>
        <div class="container">
          <LoadFile/>
          <div class="row p-4">
            <router-link to="/dashboard" class="btn btn-primary text-white" :class="nullFile"
                         @click.prevent="addAllFiles(listFile)">Continuar <i
                class="fa-solid fa-arrow-right-long"></i></router-link>
          </div>
        </div>
      </section>
    </main>
    <Footer/>
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia";
import {useFileStore} from "../store/useFile.js";
import Load from "../components/Load.vue"
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import BarTop from "../components/BarTop.vue";
import LoadFile from "../components/LoadFile.vue";

export default {
  name: 'UploadFile',
  components: {
    LoadFile,
    BarTop,
    Load,
    Header,
    Footer,
  },
  data() {
    return {
      isLoading: true,
    }
  },
  async mounted() {
    setTimeout(() => this.isLoading = false, 2000);
  },
  computed: {
    // mapeamos los archivos cargados
    ...mapState(useFileStore, ['arrayFiles']),
    nullFile() {
      return this.arrayFiles.length === 0 ? 'disabled' : '';
    }
  }
}
</script>

<style >


</style>
