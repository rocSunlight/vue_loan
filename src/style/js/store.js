
//验证用户数据
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)
const state = {
  urlIp : '192.168.1.158:8088'
}

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
  modules: {
    user,
  },
  state
})
