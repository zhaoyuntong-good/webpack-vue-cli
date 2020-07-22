const asyncRoutes = [
	{
		path: '/index',
		meta: {
			check: true,
			icon: 'el-icon-menu',
			title: '首页'
		},
		component: '@/views/Layout',
		children: [
			{
				path: '/',
				name: 'Index',
				meta: {
					check: true,
					icon: '',
					title: '首页'
				},
				component: '@/views/Index'
			}
		]
	},
	{
		path: '/module1',
		component: '@/views/Layout',
		redirect: '/module1/module1-1',
		meta: {
			check: true,
			icon: 'el-icon-location',
			title: '模块一'
		},
		children: [
			{
				path: '/module1-1',
				name: 'Module1-1',
				meta: {
					check: true,
					icon: '',
					title: '子模块1'
				},
				component: '@/views/Module1/Module1-1'
			},
			{
				path: '/module1-2',
				name: 'Module1-2',
				meta: {
					check: true,
					icon: '',
					title: '子模块2'
				},
				component: '@/views/Module1/Module1-2'
			},
			{
				path: '/module1-3',
				name: 'Module1-3',
				meta: {
					check: true,
					icon: '',
					title: '子模块3'
				},
				component: '@/views/Module1/Module1-3'
			}
		]
	},
	{
		path: '/module2',
		meta: {
			check: true,
			icon: 'el-icon-document',
			title: '模块二'
		},
		component: '@/views/Layout',
		children: [
			{
				path: '/',
				name: 'Module2',
				meta: {
					check: true,
					icon: '',
					title: '模块二'
				},
				component: '@/views/Module2'
			}
		]
	},
	{
		path: '/module3',
		meta: {
			check: true,
			icon: 'el-icon-setting',
			title: '模块三'
		},
		component: '@/views/Layout',
		children: [
			{
				path: '/',
				name: 'Module3',
				meta: {
					check: true,
					icon: '',
					title: '模块三'
				},
				component: '@/views/Module3'
			}
		]
	}
]

export default asyncRoutes;