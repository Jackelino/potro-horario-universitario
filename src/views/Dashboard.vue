<template>
  <div class="grid-container">
    <BarTop/>
    <Header/>
    <Sidebar/>
    <Main/>
    <Footer/>
  </div>
</template>

<script>
import BarTop from "../components/BarTop.vue";
import Header from "../components/Header.vue";
import Sidebar from '../components/Sidebar.vue';
import Main from '../components/Main.vue';
import Footer from "../components/Footer.vue";
import init, {api_init_pools} from "uaemex-horarios";

// NOTA: NO me preguntes por qué es necesaria esta lína. Tiene que ver con un
// problema con vite, que al empaquetar y transformar los imports de wasm,
// no reconoce una url y regresa error. Básicamente se describe en este
// issue: https://github.com/vitejs/vite/discussions/2584 
import wasmURL from "uaemex-horarios/uaemex_horarios_bg.wasm?url";

const csv = "0,'Stephen Hawking','LINC19/L41031','Física Moderna I','FM02',,,,,'10:00','12:00',,,'10:00','12:00',,,,";
export default {
  setup: () => {
    init(wasmURL).then(()=>{
    const schedules = api_init_pools(csv);
    console.log(schedules);
  });
  },
  name: 'Dashboard',
  components: {
    BarTop,
    Header,
    Sidebar,
    Main,
    Footer
  }
}
</script>

<style>

</style>
