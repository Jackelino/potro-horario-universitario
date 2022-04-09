import { createApp } from 'vue';
import App from './App.vue';
import vSelect from 'vue-select'
import'./plugins/bootstrap/dist/js/bootstrap.bundle';

import './assets/scss/main.scss';
import 'vue-select/dist/vue-select.css';

createApp(App)
.component('v-select', vSelect)
.mount('#app')
