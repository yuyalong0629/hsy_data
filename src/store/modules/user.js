const user = {
  state: {
    userInfo: null,
    hasLogin: false,
    loginModal: false,
    registerModal: false
  },
  getters: {
    userStorage(state) {
      if (!state.userInfo) {
        state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      }
      return state.userInfo
    },
    hasLogin(state) {
      if (!state.hasLogin) {
        state.hasLogin = sessionStorage.getItem('hasLogin')
      }
      return state.hasLogin
    }
  },
  mutations: {
    login(state, userInfo) {
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      sessionStorage.setItem('hasLogin', true)
      state.userInfo = userInfo
      state.hasLogin = true
    },
    logout(state, status) {
      sessionStorage.removeItem('userInfo')
      sessionStorage.removeItem('hasLogin')
      // sessionStorage.clear()
      state.userInfo = null
      state.hasLogin = status
    },
    loginModal(state, status) {
      state.loginModal = status
    },
    registerModal(state, status) {
      state.registerModal = status
    }
  },
  actions: {}
}

export default user
