import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
//import '../src/assets/css/main.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5';
//import 'leaflet/dist/leaflet.css';
// import 'vue-map-ui/dist/normalize.css';
// import 'vue-map-ui/dist/style.css';
// import 'vue-map-ui/dist/theme-all.css';

DataTable.use(DataTablesCore);

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')
