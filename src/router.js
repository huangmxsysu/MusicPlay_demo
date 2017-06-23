import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'hash',
	
	routes: [
		//首页
		{
			path: '/',
			name: 'home',
			component: resolve => require(['./views/home'], resolve),
		},
	]
})