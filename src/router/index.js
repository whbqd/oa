import Vue from "vue";
import VueRouter from "vue-router";
import logIn from "../components/logIn.vue";
import cs from "../components/cs.vue";
import homepage from "../components/homepage.vue";
import work from "../components/work.vue";
import approval from "../components/approval.vue";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import bus from '../assets/eventBus'
Vue.prototype.bus = bus;

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
  }, {
    path: "/homepage",
    name: "homepage",
    component: homepage,
    children: [
      {
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        path: 'work',
        component: work
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'approval',
        component: approval
      }
    ]

  }
];

const router = new VueRouter({
  routes
});

export default router;
