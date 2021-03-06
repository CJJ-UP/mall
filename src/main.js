import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "./components/common/toast"
import VueLazyload from 'vue-lazyload'
import Fastclick from 'fastclick';

Vue.config.productionTip = false
//添加事件总线$bus原型
Vue.prototype.$bus = new Vue()

//安装自定义的toast插件
Vue.use(toast)

//安装图片懒加载插件
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

//解决移动端300ms延迟
Fastclick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
