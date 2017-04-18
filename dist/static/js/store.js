/**
 * Created by Administrator on 2017/3/16.
 */

//验证用户数据
import Vue from 'vue'
import Vuex from 'vuex'
import user from '../../src/style/js/user'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
  modules: {
    user
  }
})
