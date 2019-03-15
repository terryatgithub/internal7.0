// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import axios from 'axios'
import VueRouter from 'vue-router'
//import '@/assets/icon.css'
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
Vue.prototype.$http= axios
Vue.use(VueRouter)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
