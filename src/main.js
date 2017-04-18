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


//全局时间戳过滤器
Vue.filter('time',function (value) {
  //value为时间戳
  function add0(m) {
    return m<10?'0'+m:m
  }
  //函数可解析一个字符串，并返回一个整数。
  var times = new Date(parseInt(value) * 1000)
  var y = times.getFullYear();
  var m = times.getMonth() + 1;
  var d = times.getDate();
  return y + '-' + add0(m) + '-' + add0(d);
})

//请求登录post传递参数
Vue.http.options.emulateJSON = true;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store
}).$mount('#app')


