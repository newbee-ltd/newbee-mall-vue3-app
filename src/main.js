import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'lib-flexible/flexible'
import 'vant/lib/index.css'; // 全局引入样式
import registerApp  from './utils/registerApp'

const app = createApp(App) // 创建实例

app.use(registerApp) // 对app进行初始化
app.use(router)
app.use(store)

app.mount('#app')