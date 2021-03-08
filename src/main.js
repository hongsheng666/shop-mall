import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'


// 使用fastclick解决移动端300ms延迟问题
FastClick.attach(document.body);

// 图片懒加载
Vue.use(VueLazyLoad, {
  loading: require('../src/assets/img/common/placeholder.png')
})
Vue.config.productionTip = false

Vue.use(toast)
// 创建事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')