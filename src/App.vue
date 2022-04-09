<template>
  <div class="grid-container">
    <Header />
    <Sidebar/>
    <Main/>
    <Footer />
  </div>
    
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from './components/Sidebar.vue';
import Main from './components/Main.vue';
import Footer from "./components/Footer.vue";
const myModal = document.getElementById('staticBackdrop');
export default {
  name: 'App',
  components:{
    Header,
    Sidebar,
    Main,
    Footer
  },
  mounted() {

    },
}
</script>

<style>

</style>
