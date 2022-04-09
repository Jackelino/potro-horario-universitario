<template>
    <footer class="footer">
        <div class="container-fluid">
            <div class="row p-2">
                <div class="text-center">
                    <small class="text-muted">
                        © {{ date }} - All Rights Reserved.
                    </small>
                    <small><i class="fa-solid fa-mug-saucer"></i></small>
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