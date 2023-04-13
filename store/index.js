import Vue from 'vue';
import Vuex from 'vuex';
import web3 from './modules/web3.js'
import app from './modules/app.js'
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {

	},
	mutations: {

	},
	actions: {

	},
	modules: {
		web3,
		app
	}
});

export default store;
