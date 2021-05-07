import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import router from './router'
import { store } from './store'
import { sync } from 'vuex-router-sync'

sync(store, router)

const app = createApp(App)

app.use(Quasar, quasarUserOptions)
app.use(router)
app.use(store)

app.mount('#app')
