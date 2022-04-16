<template>
    <div class="d-flex text-center justify-content-center align-items-center h" v-if="loading">
        <div class="spinner-grow text-success" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    
</template>

<script>
export default {
    name: 'Load',
    props: {
        loading: Boolean
    }
}
</script>

<style lang="scss">
.h{
    min-height: 100vh;
}

</style>