
const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'ShowList',
				component: () => import('pages/ShowList.vue')
			},
			{
				path: 'edit/:id',
				name: 'ShowEdit',
				component: () => import('pages/ShowEdit.vue')
			}
		]
	}
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		redirect: '/'
	})
}

export default routes
