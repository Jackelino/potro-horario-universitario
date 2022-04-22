<template>
    <main class="main">
        <section>
            <div class="container-fluid pt-3 rounded">
                <div class="container bg-light mb-3">
                    <div class="row p-3">
                        info
                    </div>
                </div>
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
