import Vue from "vue";
import VueRouter from "vue-router";
import logIn from "../components/logIn.vue";
import cs from "../components/cs.vue";
import homepage from "../components/homepage.vue";
import work from "../components/work.vue";
import approval from "../components/zhh-approval.vue";
import myAgent from "../components/zhh-myAgent";
import newAgent from "../components/zhh-newAgent";
import newProcess from "../components/zhh-newProcess";
import processApproval from "../components/zhh-processApproval";
import notice from "../components/zhh-notice";
import upload from "../components/zhh-upload";
import library from "../components/zhh-library";
import noticeAdmin from "../components/zhh-noticeAdmin";
import noticeEdit from "../components/zhh-noticeEdit";
import modifyAgent from "../components/zhh-modifyAgent";
import contacts from "../components/zhh-contacts";
import contactsChoice from "../components/zhh-contactsChoice";
import organization from "../components/zhh-organization"; 
import accountAuthority from "../components/zhh-accountAuthority";
import roleManagement from "../components/zhh-roleManagement.vue";
import read from "../components/zhh-read";
import left from "../components/left";

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
    path: "/homepage",
    name: "homepage",
    component: homepage,
    children: [
      {
        path: '/homepage',
        component: work
      },
      {
        path: 'approval',
        meta: {
          title: '订单'
        },
        component: approval
      },
      {
        path: 'myAgent',
        name: "myAgent",
        component: myAgent
      },
      {
        path: 'newAgent',
        name: "newAgent",
        component: newAgent
      },
      {
        path: 'newProcess',
        name: "newProcess",
        component: newProcess
      },
      {
        path: 'processApproval',
        name: "processApproval",
        component: processApproval
      },
      {
        path: 'notice',
        name: "notice",
        component: notice
      },
      {
        path: 'upload',
        name: "upload",
        component: upload
      },
      {
        path: 'library',
        name: "library",
        component: library
      }, {
        path: 'read',
        name: "read",
        component: read
      },
      {
        path: 'contacts',
        name: "contacts",
        component: contacts
      },
      {
        path: 'organization',
        name: "organization",
        component: organization
      },
      {
        path: 'accountAuthority',
        name: "accountAuthority",
        component: accountAuthority
      },
      {
        path: 'roleManagement',
        name: "roleManagement",
        component: roleManagement
      },
      {
        path: 'noticeAdmin',
        name: "noticeAdmin",
        component: noticeAdmin
      },
      {
        path: 'noticeEdit',
        name: "noticeEdit",
        component: noticeEdit
      },
      {
        path: 'modifyAgent',
        name: "modifyAgent",
        component: modifyAgent
      },
      {
        path: 'contactsChoice',
        name: "contactsChoice",
        component: contactsChoice
      }
    ]
  }, {
    path: "/left",
    name: "left",
    component: left
  },
  {
    path: "/cs",
    name: "cs",
    component: cs,
  },
];

const router = new VueRouter({
  routes
});

export default router;
