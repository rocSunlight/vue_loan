import Vue from 'vue'

export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录
export const USER_SIGNGET = 'USER_SIGNGET' //读取数据

//vuex的核心store仓库，state状态，mutations更改，actions动作
export default {
  state: JSON.parse(localStorage.getItem('user')) || {},
  mutations: {
    [USER_SIGNIN](state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      Object.assign(state, user)
    },
    [USER_SIGNOUT](state) {
      localStorage.removeItem('user')
      Object.keys(state).forEach(k => Vue.delete(state, k))
    },
    [USER_SIGNGET](state, user) {
      localStorage.getItem('user')
      Object.assign(state, user)
    }
  },
  actions: {
    [USER_SIGNIN]({commit}, user) {
      commit(USER_SIGNIN, user)
    },
    [USER_SIGNGET]({commit}, user) {
      commit(USER_SIGNGET, user)
    },
    [USER_SIGNOUT]({commit}) {
      commit(USER_SIGNOUT)
    }
  }
}
