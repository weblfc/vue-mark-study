import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import storesModules from './modules'
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: storesModules
})