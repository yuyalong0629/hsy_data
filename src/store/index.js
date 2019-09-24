import Vue from 'vue'
import Vuex from 'vuex'
import basic from './modules/basic'
import user from './modules/user'
import detail from './modules/detail'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    basic,
    user,
    detail
  }
})

export default store
