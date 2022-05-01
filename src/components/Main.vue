<template>
    <main class="main">
        <section>
            <div class="container-fluid pt-3 rounded">
                <TableSchedule/>
            </div>
        </section>
    </main>
</template>

<script>
import TableSchedule from "./TableSchedule.vue";
export default {
    name: "Main",
    components: {
        TableSchedule
    }
};
</script>

<style>
</style>
