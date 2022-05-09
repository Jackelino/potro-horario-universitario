import {createApp} from 'vue';
import App from './App.vue';
import {createPinia} from 'pinia';
import router from './router';
import vSelect from 'vue-select'
// import plugin bootstrap
import './plugins/bootstrap/bootstrap.bundle.min';
//import css
import './assets/scss/main.scss';
import 'mosha-vue-toastify/dist/style.css'

const app = createApp(App)
app.component('v-select', vSelect)
app.use(router)
app.use(createPinia())
app.mount('#app')
