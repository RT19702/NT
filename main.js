import App from './App'
// 引入全局uView
import uView from '@/uni_modules/uview-ui'
import store from './store';
import { showToast, showLoading, hideLoading } from '@/utils/methods.js';

Vue.prototype.$showToast = showToast;
Vue.prototype.$showLoading = showLoading;
Vue.prototype.$hideLoading = hideLoading;

Vue.use(uView)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
