import { createApp } from 'vue'
import App from './App.vue'
import { sdInstall } from './lib'


const app = createApp(App)
sdInstall(app, { prefix: 'rs' })
app.mount('#app')
