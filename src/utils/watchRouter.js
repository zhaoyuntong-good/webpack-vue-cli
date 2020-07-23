import {router} from '@/router';
import { getToken } from '@/utils/saveToLocal.js';
import store from '@/store';
// 白名单路由不校验登录状态
const whiteList = ['/' ,'/login']
// 路由守卫
router.beforeEach((to, from, next) => {
  if (!whiteList.includes(to.fullPath)) {
  	if (getToken()) {
  		if (store.state.asyncRoutes) {
  			next();
  		} else {
  			import('@/router/asyncRoutes.js').then( res => {
  				store.commit('setAsyncRoutes', res.default);
					next({ ...to, replace: true });
        })
  		}
  	} else {
  		next('/login');
  	}
  } else {
  	next();
  }
})