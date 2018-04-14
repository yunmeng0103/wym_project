// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'//引入路由
import store from './store/'//引入vuex
import './config/rem'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//注册路由
  store,//注册vuex仓
  components: { App },
  template: '<App/>'
})
