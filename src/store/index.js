import Vue from "vue";
import Vuex from "vuex";
import ax from './ax';
import jwt from "jsonwebtoken";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ax,
  },

  state: {
    dept: sessionStorage.getItem('token') ? jwt.decode(sessionStorage.getItem("token")).sector : '',
    token: sessionStorage.getItem('token') || '',
    text: '',
    data: [{ label: "sd" }, { label: "b" }, { label: "c" }],
    name: "",
    fromPerson: "",
    fromPersons: [],
    left: 1,
    routeObj: sessionStorage.getItem('routeObj') || '',
    // 人员信息
    renyuan: [],
    // 审批id
    shengID: "",
    // 审批or查看
    butt: "",
    // 上一页路由
    url: "",
    // 头像信息
    xingxi: "",
    tongId: "",
    // 审批信息保留
    shengPi: {
      submitName: "",
      submitSector: "",
      totalApprovalStatus: "",
      type: "岗位申请",
      title: "",
      pageSize: 10,
      page: 1,
    },
    // 人员新增数据
    newPeople1: {},
    newPeople2: {},
    newPeople3: {},
    newPeople4: {}
  },

  mutations: {
    setText(state, payload) {
      state.text = payload;
    },
    setShengPi(state, payload) {
      state.shengPi = payload;
    },
    setTongId(state, payload) {
      state.tongId = payload;
    },
    setXingxi(state, payload) {
      state.xingxi = payload;
    },
    setRenyuan(state, payload) {
      state.renyuan = payload;
    },
    setShengID(state, payload) {
      state.shengID = payload;
    },
    setButt(state, payload) {
      state.butt = payload;
    },
    setUrl(state, payload) {
      state.url = payload;
    },
    setNewPeople1(state, payload) {
      state.newPeople1 = payload;
    },
    setNewPeople2(state, payload) {
      state.newPeople2 = payload;
    },
    setNewPeople3(state, payload) {
      state.newPeople3 = payload;
    },
    setNewPeople4(state, payload) {
      state.newPeople4 = payload;
    },
    setRouteObj(state, payload) {
      state.routeObj = payload;
      sessionStorage.setItem('routeObj', payload);
    },
    setToken(state, payload) {
      sessionStorage.setItem('token', payload);
      state.token = payload;
    },
    setCounty(state, payload) {
      state.dept = payload;
    }

  },
  actions: {},
});
