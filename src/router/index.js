import Vue from "vue";
import VueRouter from "vue-router";
import logIn from "../components/logIn.vue";
import cs from "../components/cs.vue";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "logIn",
    component: logIn
  }, {
    path: "/cs",
    name: "cs",
    component: cs
  }
];

const router = new VueRouter({
  routes
});

export default router;
