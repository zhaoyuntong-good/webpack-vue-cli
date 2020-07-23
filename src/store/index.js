import Vue from 'vue';
import Vuex from 'vuex';
import { router, resetRouter} from '@/router';
import handleRoutes from '@/utils/handleRoutes.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	asyncRoutes: null,
  	redirect: null,
  },
  mutations: {
  	setAsyncRoutes (state, asyncRoutes) {
  		const routes = handleRoutes(asyncRoutes);
  		routes.push({
  			path: '*',
  			name: '404',
  			component: () => import('@/views/404')
  		})
  		resetRouter();
  		router.addRoutes(routes);
  		state.redirect = asyncRoutes[0].path + asyncRoutes[0].children[0].path;
  		state.asyncRoutes = asyncRoutes;
  	},
  },
  actions: {
  },
  modules: {
  }
})
