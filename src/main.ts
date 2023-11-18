import '@/assets/css/index.css'
import 'normalize.css'
import Particles from "particles.vue3";
import registerIcons from "@/global/registerIcons"

import router from '@/router'
import pinia from '@/store'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(router).use(pinia).use(Particles).use(registerIcons).mount('#app')

// or 链式写法
// const app = createApp(App)
// app.use(router)
// app.mount("#app")
