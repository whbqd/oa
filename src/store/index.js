import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    text: '',
    data: [{ label: "a" }, { label: "b" }, { label: "c" }]
  },
  mutations: {
    setText(state, payload) {
      state.text = payload;
    }
  },
  actions: {},
  modules: {}
});
