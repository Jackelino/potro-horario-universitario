<template>
    <Load :loading="isLoading" />
    <div v-if="!isLoading" >
        <BarTop/>
        <Header/>
        <main class="upload-file">
            <section>
                <div class="container">
                    <div class="row">
                        <div class="text-center">
                            <div class="dropzone p-3" draggable="false">
                                <i class="fa-solid fa-cloud-arrow-up" ></i>
                                <h6>Arrastrar y suelta archivos para cargar</h6>
                                <small>Sus archivos se agregarán automáticamente</small>
                                <h6 class="m-3">Ó</h6>
                                <div class="m-3">
                                    <label for="file" class="btn btn-success"><i class="fa-solid fa-file-arrow-up"></i> Seleccione archivos</label>
                                    <input type="file" class="d-none" v-on:change="loadFiles" id="file"  multiple accept=".csv, .pdf, .xlsx">
                                </div>

                            </div>

                        </div>
                    </div>
                    <div class="row p-4">
                      dsd
                        <div v-html="listFile">

                        </div>
                    </div>
                    <div class="row p-4">
                        <router-link to="/dashboard" class="btn btn-primary text-white">Continuar <i class="fa-solid fa-arrow-right-long"></i></router-link>
                    </div>
                </div>
            </section>
        </main>
        <Footer/>
    </div>
</template>

<script>
import Load from "../components/Load.vue"
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import BarTop from "../components/BarTop.vue";
export default {
    name: 'UploadFile',
    components: {
        BarTop,
        Load,
        Header,
        Footer,
    },
    data() {
        return {
            listFile: '',
            files: null,
            f: '',
            isLoading: true,
        }
    },
    async mounted() {
        setTimeout(() => this.isLoading = false, 2000);
    },
    methods: {
        loadFiles(event){
            this.files = event.target.files;
            for(let i = 0; i< this.files.length ; i++){
                if( this.files[i].type==='application/pdf'){ //pdf
                    this.f = this.f+'<li class="nav-item"> <i class="fa-solid fa-file-pdf"></i> '+this.files[i].name+'</li>'
                }else if(this.files[i].type==='text/csv'){ // csv
                    this.f = this.f+'<li class="nav-item"> <i class="fa-solid fa-file-csv"></i> '+this.files[i].name+'</li>'
                }else{ // excel
                    this.f = this.f+'<li class="nav-item"> <i class="fa-solid fa-file-excel"></i> '+this.files[i].name+'</li>'
                }
            }
            this.listFile= '<ul class="nav flex-column">' + this.f + '</ul>';
        }
    }
}
</script>

<style>

</style>
