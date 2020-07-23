// 处理路由
const handleRoutes = (asyncRoutes) => {
	return asyncRoutes.reduce( (pre, cur) => {
		let route = {};
		if (cur.children) {
			route = {
				path: cur.path,
				meta: cur.meta,
				component: () => import(`@/views${cur.component}`),
				children: handleRoutes(cur.children)
			}
		} else {
			route = {
				path: cur.path,
				name: cur.name,
				meta: cur.meta,
				component: () => import(`@/views${cur.component}`)
			}
		}
		pre.push(route)
		return pre;
	}, []);
}

export default handleRoutes;