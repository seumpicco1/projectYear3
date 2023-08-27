import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import './assets/main.css'

import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';



const pinia = createPinia()
const app=createApp(App)
app.use(router)
app.use(pinia)
app.component('QuillEditor', QuillEditor)
app.mount('#app')

