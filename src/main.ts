import { createSSRApp } from 'vue'
import App from './App.vue'
import { requestInterceptor } from './http/interceptor'
import i18n from './locale/index'

import { routeInterceptor } from './router/interceptor'
import store from './store'
import { useLocaleStore } from './store/locale'
import { initH5Enhance } from './utils/h5Enhance'
import '@/style/index.scss'
import 'virtual:uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)

  // 初始化语言设置
  const localeStore = useLocaleStore()
  localeStore.initLocale()

  app.use(routeInterceptor)
  app.use(requestInterceptor)
  app.use(i18n)

  // 初始化 H5 平台增强功能（鼠标转触摸 + 滚动条优化）
  initH5Enhance()

  return {
    app,
  }
}
