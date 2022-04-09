<template>
    <aside class="sidebar bg-light">
        <div class="container">
            <div class="container">
                <h6>Materias</h6>
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