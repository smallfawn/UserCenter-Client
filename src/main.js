//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/router';

import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElementPlus)

app.mount('#app')
