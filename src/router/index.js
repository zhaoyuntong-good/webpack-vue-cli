import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('@/views/Layout');

Vue.use(VueRouter)
const staticRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
  	path: '/',
  	name: 'Redirect',
  	component: () => import('@/views/Redirect')
  }
]
const asyncRoutes = [
	{
		path: '/index',
		component: Layout,
		meta: {
			icon: 'el-icon-menu',
			title: '首页'
		},
		children: [
			{
				path: '',
				name: 'Index',
				meta: {
					icon: '',
					title: '首页'
				},
				component: () => import('@/views/Index')
			}
		]
	},
	{
		path: '/module1',
		component: Layout,
		redirect: '/module1/module1-1',
		meta: {
			icon: 'el-icon-location',
			title: '模块一'
		},
		children: [
			{
				path: 'module1-1',
				name: 'Module1-1',
				meta: {
					icon: '',
					title: '子模块1'
				},
				component: () => import('@/views/Module1/Module1-1')
			},
			{
				path: 'module1-2',
				name: 'Module1-2',
				meta: {
					icon: '',
					title: '子模块2'
				},
				component: () => import('@/views/Module1/Module1-2')
			},
			{
				path: 'module1-3',
				name: 'Module1-3',
				meta: {
					icon: '',
					title: '子模块3'
				},
				component: () => import('@/views/Module1/Module1-3')
			}
		]
	},
	{
		path: '/module2',
		meta: {
			icon: 'el-icon-document',
			title: '模块二'
		},
		component: Layout,
		children: [
			{
				path: '',
				name: 'Module2',
				meta: {
					icon: '',
					title: '模块二'
				},
				component: () => import('@/views/Module2')
			}
		]
	},
	{
		path: '/module3',
		meta: {
			icon: 'el-icon-setting',
			title: '模块三'
		},
		component: Layout,
		children: [
			{
				path: '',
				name: 'Module3',
				meta: {
					icon: '',
					title: '模块三'
				},
				component: () => import('@/views/Module3')
			}
		]
	}
]

const routes = [...staticRoutes];
const createRouter = () => new VueRouter({
  routes
})
const router = createRouter();
// 重置路由
const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }
export {
	router,
	resetRouter
} 
