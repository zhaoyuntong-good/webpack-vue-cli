import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	asyncRoutes: null,
  	handledRoutes: false,
  },
  mutations: {
  	setAsyncRoutes (state, asyncRoutes) {
  		state.asyncRoutes = asyncRoutes;
  	},
  	setHandledRoutes (state) {
  		state.handledRoutes = true;
  	},
  },
  actions: {
  },
  modules: {
  }
})
