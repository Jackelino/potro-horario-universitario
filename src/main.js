import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vSelect from 'vue-select'
import './plugins/bootstrap/bootstrap.bundle.min';

import './assets/scss/main.scss';

import 'mosha-vue-toastify/dist/style.css'

createApp(App)
    .component('v-select', vSelect)
    .use(router)
.mount('#app')
