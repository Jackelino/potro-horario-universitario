<template>
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
                                <input type="file" class="d-none" name="" id="file">
                            </div>
                            
                        </div>   
                    </div> 
                    <div>

                    </div>
                </div>       
            </div>
                <div class="row m-5">
                    <router-link to="/dashboard" class="btn btn-primary text-white">Continuar <i class="fa-solid fa-arrow-right-long"></i></router-link>
                </div>
        </section>
    </main>
    <Footer/>
</template>

<script>
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
export default {
    name: 'UploadFile',
    components: {
        Header,
        Footer,
    }
}
</script>

<style>

</style>