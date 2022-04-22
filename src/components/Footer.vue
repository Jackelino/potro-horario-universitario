<template>
    <footer class="footer">
        <div class="container-fluid">
            <div class="row p-3">
                <div class="text-center">
                    <small class="text-white">
                        © {{ date }} - All Rights Reserved.
                    </small>
                    <small ><i class=" fa-solid fa-mug-saucer text-white"></i></small>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            date: 0,
        }
    },
    mounted() {
        this.date = new Date().getFullYear();
    },
}
</script>

<style>

</style>
