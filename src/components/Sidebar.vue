<template>
    <aside class="sidebar bg-light">
        <div class="container">
            <div class="container">
                <h6>Materias</h6>  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Toggle right offcanvas</button>

                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Cargar archivos</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">
                        ...
                    </div>
                    </div>
                <div class="row">
                    <label for="inputEmail3" class="col-form-label">Anclar materia(s):</label>
                    <div class="">
                        <v-select :options="options.subjects"></v-select>
                    </div>
                </div>
                <div class="row">
                    <label for="inputEmail3" class="col-form-label">materia(s):</label>
                    <div class="">
                        <v-select :options="options.subjects"></v-select>
                    </div>
                    <div class="col-form-label">
                        <button type="button" class="btn btn-primary text-white"><i class="fa-solid fa-code-compare"></i> Generar combinaciones</button>
                    </div>
                </div>
            </div>
            <hr>
            <div class="container">
                <h6>Panel de Materias</h6>
                <div class="subjects">
                    <CardSubject v-for="n in 6"/>
                </div>
                
            </div>
        </div>
    </aside>
</template>

<script>
import CardSubject from './CardSubject.vue';
export default {
    name: 'Sidebar',
    components: {
        CardSubject
    },
    data() {
        return {
            options:{
                subjects: ["PDF", "CSV", "EXCEL"]
            }
        }
    },
}
</script>

<style>

</style>