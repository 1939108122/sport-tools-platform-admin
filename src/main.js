import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'

import axios from 'axios';
axios.defaults.baseURL='http://127.0.0.1:7001/'

// 为请求创建一个axios拦截器，为请求头加上Authorization属性，使他能够访问需要权限的接口
axios.interceptors.request.use(config=>{
    config.headers.Authorization=window.sessionStorage.getItem('token')
    return config
  })
Vue.prototype.$http=axios

  // 相对时间过滤器,把时间戳转换成时间
// 格式: 2020-02-25 21:43:23
Vue.filter('dateFormat', (dataStr) => {
    var time = new Date(dataStr);
    function timeAdd0 (str) {
      if (str < 10) {
        str = '0' + str;
      }
      return str;
    }
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
