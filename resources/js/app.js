import './bootstrap';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia();
const app = createApp(App);


app.use(pinia)


import router from './router'
app.use(router)

app.mount('#app')
