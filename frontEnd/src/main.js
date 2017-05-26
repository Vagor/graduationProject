// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vuex from 'vuex'
import store from './vuex/store.js'
import axios from 'axios'

Vue.use(router)
Vue.use(MintUI)
Vue.use(Vuex)
Vue.config.productionTip = false

// 一个全局变量，用于全局的存储全局信息和便捷工具
window._const = {
  count: 1,
  teacherId: '58c73c5879534a10c243fa11',
  studentId: '5905df11a3846e0e9c8c49e4',
  classId: '5905df11a3846e0e9c8c49e4',
  lessonId:''
}


// Axios
Vue.prototype.$http = axios
// axios.defaults.baseURL = 'http://127.0.0.1:3000/'; // 设置服务端地址
axios.defaults.baseURL = 'http://192.168.1.152:3000/'; // 设置服务端地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 通用方法
Vue.prototype.goBack = function () {
  history.go(-1)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
