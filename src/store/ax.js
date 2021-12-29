export default {
	state: {
		ax: null,
	},
	getters: {},
	mutations: {
		setAx(state, payload) {
			sessionStorage.setItem("ax_pd", JSON.stringify(payload));
			state.ax = JSON.parse(sessionStorage.getItem("ax_pd"));
		},

		recoveryAx(state) {
			const axData = sessionStorage.getItem("ax_pd");
			if (!axData) {
				return null;
			}
			state.ax = JSON.parse(axData);
		},
	},
	actions: {},
};
