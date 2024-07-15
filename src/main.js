import '@/assets/main.scss'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from '@/stores/index'
// import { ElementPlus } from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(pinia)
app.use(router)
// app.use(ElementPlus)
app.mount('#app')
