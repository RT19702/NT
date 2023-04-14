import { getUserInfoApi } from "@/api/index.js";

const state = {
	user: uni.getStorageSync('user') || null,
}

const mutations = {
	setUser(state, user) {
		state.user = user
		uni.setStorageSync('user', user)
	}
}

const actions = {
	async getUser({ commit }) {
		const res = await getUserInfoApi()
		if (res.code === 0) {
			commit('setUser', res.data)
		} else {
			throw new Error(res.msg)
		}
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}