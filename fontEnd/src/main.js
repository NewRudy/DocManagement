import {createApp} from 'vue'

import router from './router'
import '@/permission'

import App from './App.vue'

import ElementPlus from 'element-plus'
import ElContainer from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import store from '@/store/index'

const app = createApp(App)

app
  .use(store)
  .use(router)
  // .use(ElementPlus, { size: 'small', zIndex: 3000})
  .use(ElementPlus, {locale: zhCn})
    .use(ElContainer)
  .mount('#app')

export default app
