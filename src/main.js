import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import {API_ROOT} from './config'
import VueResource from 'vue-resource'
import './assets/css/normalize.css'

Vue.use(VueResource)

// 全局方法和属性
Vue.prototype.API_ROOT = API_ROOT   // api根路径

// vue-resource配置
// Vue.http.options.crossOrigin = true     // 允许跨域
// Vue.http.options.emulateJSON = true     // 请求类型设置为application/x-www-form-urlencoded

// vue-resource请求拦截
/*Vue.http.interceptors.push(function(request, next) {
    
    next(function(response) {

        // 根据请求的状态，response参数会返回给successCallback或errorCallback
        return response
    })
})*/

/*router.beforeEach((to, from, next) => {
	if (!to.meta.auth) {
        next({name: 'developing'})
    }else{
        next()
    }
})*/

Vue.config.debug = true

new Vue({
	router,
    store,
	el: '#app',
	render: h => h(App)
})