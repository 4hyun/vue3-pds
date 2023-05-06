import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './lib/dayjs'

import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'

import './assets/main.css'
import Auth from './auth'

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(Auth.Plugin)
app.use(router)

app.mount('#app')
