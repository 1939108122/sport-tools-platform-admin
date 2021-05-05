import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios';
axios.defaults.baseURL='http://127.0.0.1:7001/admin/'

// 为请求创建一个axios拦截器，为请求头加上Authorization属性，使他能够访问需要权限的接口
axios.interceptors.request.use(config=>{
    config.headers.Authorization=window.sessionStorage.getItem('token')
    return config
  })
Vue.prototype.$http=axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
