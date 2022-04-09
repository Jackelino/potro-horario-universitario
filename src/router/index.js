import { createRouter, createWebHistory } from "vue-router";
import UploadFile from "../views/UploadFile.vue";
import Dashboard from "../views/Dashboard.vue";
const routes = [
    {
    path: "/",
    name: "Uploadfile",
    component: UploadFile,
    },
    {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;