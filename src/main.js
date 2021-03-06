import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vue3PhotoPreview from 'vue3-photo-preview';
import 'vue3-photo-preview/dist/index.css';
import highlight from './utils/plugins/highlight'
import diary from './utils/plugins/diary'
 
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)


// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }
app.use(router).use(store).use(highlight).use(diary).use(vue3PhotoPreview).mount('#app')

