import router from '@/router';
import { getToken } from '@/utils/saveToLocal.js';
import store from '@/store';
const whiteList = ['/']
// 路由守卫
router.beforeEach((to, from, next) => {
  if (!whiteList.includes(to.fullPath)) {
  	if (getToken()) {
  		if (store.state.handledRoutes) {
  			next();
  		} else {
  			import('@/router/asyncRoutes.js').then( res => {
  				store.commit('setAsyncRoutes', res.default);
  				const asyncRoutes = handleRoutes(res.default);
  				console.log(asyncRoutes)
  				router.addRoutes(asyncRoutes);
  				store.commit('setHandledRoutes');
  				console.log(router)
        }).then(() => {
        	next();
        })
  		}
  	} else {
  		router.push({
  			path: '/'
  		})
  	}
  } else {
  	next()
  }
})
// 处理路由
const handleRoutes = (asyncRoutes) => {
	return asyncRoutes.reduce( (pre, cur) => {
		let route = {};
		if (cur.children) {
			route = {
				path: cur.path,
				meta: cur.meta,
				component: () => import(cur.component),
				children: handleRoutes(cur.children)
			}
		} else {
			route = {
				path: cur.path,
				name: cur.name,
				meta: cur.meta,
				component: () => import(cur.component)
			}
		}
		pre.push(route)
		return pre;
	}, [])
}
