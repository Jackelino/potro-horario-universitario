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

export default {
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
