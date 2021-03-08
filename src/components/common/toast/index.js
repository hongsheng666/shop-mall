import Toast from './Toast.vue'
const obj = {

}

// Vue.use 直接调用install方法
obj.install = function (Vue) {
  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2.创建组件对象
  const toast = new toastContrustor()
  //将组件对象挂载到元素上
  toast.$mount(document.createElement('div'))

  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast

}

export default obj