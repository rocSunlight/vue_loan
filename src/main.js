// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//router路由管理
import router from './router'
import store from '../static/js/store'
//引入ajax请求
import VueResource from 'vue-resource'

//全局注册muse-ui框架
Vue.use(VueResource)


//请求登录post传递参数
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store
}).$mount('#app')


