import { createWebHistory, createRouter } from "vue-router";
import Home from '@/views/Home.vue'

// Police
import PoliceIndex from '@/views/apps/police/Index.vue'
import PoliceHome from '@/views/apps/police/Home.vue'
import PoliceReports from '@/views/apps/police/Reports.vue'
// import PoliceWarrants from '@/views/apps/police/Warrants.vue'
// import PoliceBolos from '@/views/apps/police/Bolos.vue'
// import PoliceRecords from '@/views/apps/police/Records.vue'
// import PoliceAuth from '@/views/apps/police/Auth.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/apps/police/',
		name: 'police.home',
		component: PoliceIndex,
		children: [
			{
				path: 'home',
				name: 'police.home',
				component: PoliceHome
			},
			{
				path: 'reports',
				name: 'police.reports',
				component: PoliceReports
			},
			// {
			// 	path: 'warrants',
			// 	name: 'police.warrants',
			// 	component: PoliceWarrants
			// },
			// {
			// 	path: 'bolos',
			// 	name: 'police.bolos',
			// 	component: PoliceBolos
			// },
			// {
			// 	path: 'records',
			// 	name: 'police.records',
			// 	component: PoliceRecords
			// }
		]
	},
	// {
	// 	path: '/apps/police/auth',
	// 	name: 'police.auth',
	// 	component: PoliceAuth
	// }
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router