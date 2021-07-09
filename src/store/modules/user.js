const state = {
  token: localStorage.getItem('token'),
  roles: []
}

const getters = {
  roles: (state) => {
    state.token
  }
}

const mutations = {
  setToken: (state, token) => {
    state.token = token
  },
  setRoles: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 登录
  login({
    commit
  }, userInfo) {
    const {
      username,
      userpassword
    } = userInfo;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username == "admin" && userpassword == "123456") {
          commit("setToken", username)
          localStorage.setItem('token', username)
          resolve()
        } else {
          reject('用户名或密码错误')
        }
      }, 100)
    })
  },
  getInfo({
    commit,
    state
  }) {
    return new Promise(reslove => {
      setTimeout(() => {
        const roles = state.token == "admin" ? ['admin'] : []
        commit("setRoles", roles)
        reslove({
          roles
        })
      }, 100)
    })
  },
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit("setToken", "")
      commit("setRoles", [])
      localStorage.removeItem('token')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}