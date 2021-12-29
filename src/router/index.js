import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import store from "../store"

// 测试
import cs from "../components/cs.vue";
// 登录
// import logIn from "../views/logIn.vue";
// 工作台
// import homepage from "../views/homepage.vue";
// import work from "../views/work.vue";

// UI库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import bus from '../assets/eventBus'
// import { resolve } from "core-js/fn/promise";
Vue.prototype.bus = bus;

Vue.use(ElementUI);


//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};


const constantRouters = [
  {
    path: "/",
    name: "logIn",
    component: () => import('../views/logIn'),
  },
  {
    path: "/cs",
    name: "cs",
    component: cs,
  },
]


const ss = [
  {
    path: "/",
    name: "logIn",
    component: () => import('../views/logIn'),
  },
  {
    path: "/cs",
    name: "cs",
    component: cs,
  }, {
    path: "/homepage",
    name: "homepage",
    component: () => import('../views/homepage'),
    meta: {
      pageName: "框架"
    },
    children: [
      {
        path: '/homepage',
        name: "work",
        meta: {
          pageName: "工作台"
        },
        component: () => import('../views/work')
      },
      {
        path: 'kaoqing',
        name: 'kaoqing',
        meta: {
          pageName: "考勤"
        },
        component: () => import('../views/kaoqing.vue')
      },
      {
        path: 'vidio',
        name: 'vidio',
        component: () => import('../views/vidio.vue')
      },
      {
        path: 'newtable',
        name: 'newtable',
        component: () => import('../views/newtable.vue')
      }, {
        path: 'transfer',
        name: "transfer",
        meta: {
          pageName: "调动"
        },
        component: () => import('../views/renshi/zhh-transfer')
      }, {
        path: 'approval',
        name: "approval",
        meta: {
          pageName: "审批流转"
        },
        component: () => import('../views/shengpi/zhh-approval')
      },
      {
        path: 'transferSheng',
        name: "transferSheng",
        meta: {
          pageName: "调动审批"
        },
        component: () => import('../views/shengpi/zhh-transferSheng')
      },
      {
        path: 'approvalPersonnel',
        name: "approvalPersonnel",
        meta: {
          pageName: "人员审批"
        },
        component: () => import('../views/shengpi/zhh-approvalPersonnel')
      },
      {
        path: 'adjustment',
        name: "adjustment",
        meta: {
          pageName: "人员调整审批"
        },
        component: () => import('../views/shengpi/zhh-adjustment')
      },
      {
        path: 'quitSheng',
        name: "quitSheng",
        meta: {
          pageName: "员工离职审批"
        },
        component: () => import('../views/shengpi/zhh-quitSheng')
      },
      {
        path: 'promotionSheng',
        name: "promotionSheng",
        meta: {
          pageName: "员工晋升审批"
        },
        component: () => import('../views/shengpi/zhh-promotionSheng')
      },
      {
        path: 'newProcess',
        name: "newProcess",
        meta: {
          pageName: "审批流转新建"
        },
        component: () => import('../views/zhh-newProcess')
      },
      {
        path: 'processApproval',
        name: "processApproval",
        meta: {
          pageName: "审批"
        },
        component: () => import('../views/zhh-processApproval')
      },
      {
        path: 'myAgent',
        name: "myAgent",
        meta: {
          pageName: "我的待办"
        },
        component: () => import('../views/zhh-myAgent')
      },
      {
        path: 'newAgent',
        name: "newAgent",
        meta: {
          pageName: "新建待办"
        },
        component: () => import('../views/zhh-newAgent')
      },
      {
        path: 'modifyAgent',
        name: "modifyAgent",
        meta: {
          pageName: "修改待办"
        },
        component: () => import('../views/zhh-modifyAgent')
      },
      {
        path: 'notice',
        name: "notice",
        meta: {
          pageName: "通知"
        },
        component: () => import('../views/tongzhi/zhh-notice')
      },
      {
        path: 'noticeAdmin',
        name: "noticeAdmin",
        meta: {
          pageName: "通知管理"
        },
        component: () => import('../views/tongzhi/zhh-noticeAdmin'),
      },
      {
        path: 'draft',
        name: "draft",
        meta: {
          pageName: "草稿箱"
        },
        component: () => import('../views/tongzhi/zhh-draft')
      },
      {
        path: 'noticeEdit',
        name: "noticeEdit",
        meta: {
          pageName: "新建通知"
        },
        component: () => import('../views/tongzhi/zhh-noticeEdit')
      },
      {
        path: 'read',
        name: "read",
        meta: {
          pageName: "阅读页"
        },
        component: () => import('../views/tongzhi/zhh-read')
      },
      {
        path: 'upload',
        name: "upload",
        meta: {
          pageName: "文库上传"
        },
        component: () => import('../views/zhh-upload')
      },
      {
        path: 'library',
        name: "library",
        meta: {
          pageName: "文库"
        },
        component: () => import('../views/zhh-library')
      },
      {
        path: 'contacts',
        name: "contacts",
        meta: {
          pageName: "通讯录"
        },
        component: () => import('../views/zhh-contacts')
      },
      {
        path: 'contactsChoice',
        name: "contactsChoice",
        meta: {
          pageName: "通讯录选择"
        },
        component: () => import('../views/zhh-contactsChoice')
      },

      {
        path: 'organization',
        name: "organization",
        meta: {
          pageName: "添加人员页面"
        },
        component: () => import('../views/quanx/zhh-organization')
      },
      {
        path: 'accountAuthority',
        name: "accountAuthority",
        meta: {
          pageName: "账号及权限"
        },
        component: () => import('../views/quanx/zhh-accountAuthority')
      },
      {
        path: 'roleManagement',
        name: "roleManagement",
        meta: {
          pageName: "角色管理"
        },
        component: () => import('../views/quanx/zhh-roleManagement')
      },
      {
        path: 'transfer',
        name: "transfer",
        meta: {
          pageName: "调动"
        },
        component: () => import('../views/renshi/zhh-transfer')
      },
      {
        path: 'blacklist',
        name: "blacklist",
        meta: {
          pageName: "黑名单"
        },
        component: () => import('../views/renshi/zhh-blacklist')
      },
      {
        path: 'remployment',
        name: "remployment",
        meta: {
          pageName: ""
        },
        component: () => import('../views/renshi/zhh-remployment')
      },
      {
        path: 'employeeFiles',
        name: "employeeFiles",
        meta: {
          pageName: "员工档案"
        },
        component: () => import('../views/renshi/zhh-employeeFiles')
      },
      {
        path: 'employeeFilesRen',
        name: "employeeFilesRen",
        meta: {
          pageName: "员工档案选择"
        },
        component: () => import('../views/renshi/zhh-employeeFilesRen')
      },
      {
        path: 'modifyEmployeeFiles',
        name: "modifyEmployeeFiles",
        meta: {
          pageName: "员工档案修改"
        },
        component: () => import('../views/renshi/zhh-modifyEmployeeFiles')
      },
      {
        path: 'viewApproval',
        name: "viewApproval",
        meta: {
          pageName: "查看审批"
        },
        component: () => import('../views/renshi/zhh-viewApproval')
      },
      {
        path: 'newEmployeeFiles',
        name: "newEmployeeFiles",
        meta: {
          pageName: "员工档案新增"
        },
        component: () => import('../views/renshi/zhh-newEmployeeFiles')
      },
      {
        path: 'quit',
        name: "quit",
        meta: {
          pageName: "员工离职"
        },
        component: () => import('../views/renshi/zhh-quit')
      },
      {
        path: 'promotion',
        name: "promotion",
        meta: {
          pageName: "员工晋升"
        },
        component: () => import('../views/renshi/zhh-promotion')
      },
      {
        path: 'applyPeople',
        name: "applyPeople",
        meta: {
          pageName: "人员申请"
        },
        component: () => import('../views/renshi/zhh-applyPeople')
      },
      {
        path: 'configure',
        name: "configure",
        meta: {
          pageName: "设置"
        },
        component: () => import('../views/renshi/zhh-configure')
      }, {
        path: 'other',
        name: "other",
        meta: {
          pageName: "通用审批"
        },
        component: () => import('../views/qita/zhh-other')
      }, {
        path: 'Ax',
        name: "Ax",
        meta: {
          pageName: "按需"
        },
        component: () => import('../views/anxu/zt-Ax')
      }, {
        path: 'Bz',
        name: "Bz",
        meta: {
          pageName: "班组设置"
        },
        component: () => import('../views/anxu/zt-Bz')
      }, {
        path: 'Bz-sh',
        name: "Bz-sh",
        meta: {
          pageName: "班组审核"
        },
        component: () => import('../views/anxu/zt-Bz-sh')
      }, {
        path: 'Hz',
        name: "Hz",
        meta: {
          pageName: "统计"
        },
        component: () => import('../views/anxu/zt-Hz')
      }, {
        path: 'Js',
        name: "Js",
        meta: {
          pageName: "结算"
        },
        component: () => import('../views/anxu/zt-Js')
      }, {
        path: 'Jssz',
        name: "Jssz",
        meta: {
          pageName: "结算设置"
        },
        component: () => import('../views/anxu/zt-Jssz')
      }, {
        path: 'Pd',
        name: "Pd",
        meta: {
          pageName: "派单"
        },
        component: () => import('../views/anxu/zt-Pd')
      },
      {
        path: 'yue',
        name: "yue",
        meta: {
          pageName: "阅读"
        },
        component: () => import('../views/tongzhi/zhh-yue')
      }, {
        path: 'pay',
        name: "pay",
        meta: {
          pageName: "薪酬"
        },
        component: () => import('../views/pay/zhh-pay')
      }, {
        path: 'payStatistics',
        name: "payStatistics",
        meta: {
          pageName: "薪酬统计"
        },
        component: () => import('../views/pay/zhh-payStatistics')
      }, {
        path: 'reportUpload',
        name: "reportUpload",
        meta: {
          pageName: "报表上传"
        },
        component: () => import('../views/report/zt-reportUpload')
      }, {
        path: 'reportProgress',
        name: "reportProgress",
        meta: {
          pageName: "报表进度"
        },
        component: () => import('../views/report/zt-reportProgress')
      }, {
        path: 'reportCenter',
        name: "reportCenter",
        meta: {
          pageName: "报表中心"
        },
        component: () => import('../views/report/zt-reportCenter')
      },
    ]
  }
]
console.log(constantRouters)

//注册路由
export const router = new VueRouter({
  routes: ss
});


// 树形结构遍历路由添加
export function readNodes(nodes = [], arr = [], left = []) {
  for (let item of nodes) {
    arr.push(item.label)
    left.push(item.pageUrl)
    if (item.children && item.children.length) readNodes(item.children, arr)
  }
  return { arr, left }
}

// 树形结构遍历按钮渲染
export function ergodic(nodes = [], arr = [], ye, cil = []) {

  for (let item of nodes) {
    if (ye == item.label) {
      cil.push = item
    }
    arr.push(item.label)
    if (item.children && item.children.length) ergodic(item.children, arr, ye, cil)
  }
  return cil
}

export function genRoute() {

  // 获取可添加路由
  //异步路由（需要权限的页面）
  const asyncRouters = [
    {
      path: 'approval',
      name: "approval",
      meta: {
        pageName: "审批流转"
      },
      component: () => import('../views/shengpi/zhh-approval')
    },
    {
      path: 'kaoqing',
      name: 'kaoqing',
      meta: {
        pageName: "考勤"
      },
      component: () => import('../views/kaoqing.vue')
    },
    {
      path: 'approvalPersonnel',
      name: "approvalPersonnel",
      meta: {
        pageName: "人员审批"
      },
      component: () => import('../views/shengpi/zhh-approvalPersonnel')
    },
    {
      path: 'adjustment',
      name: "adjustment",
      meta: {
        pageName: "人员调整审批"
      },
      component: () => import('../views/shengpi/zhh-adjustment')
    },
    {
      path: 'quitSheng',
      name: "quitSheng",
      meta: {
        pageName: "员工离职审批"
      },
      component: () => import('../views/shengpi/zhh-quitSheng')
    },
    {
      path: 'promotionSheng',
      name: "promotionSheng",
      meta: {
        pageName: "员工晋升审批"
      },
      component: () => import('../views/shengpi/zhh-promotionSheng')
    },
    {
      path: 'newProcess',
      name: "newProcess",
      meta: {
        pageName: "审批流转新建"
      },
      component: () => import('../views/zhh-newProcess')
    },
    {
      path: 'processApproval',
      name: "processApproval",
      meta: {
        pageName: "审批"
      },
      component: () => import('../views/zhh-processApproval')
    },
    {
      path: 'myAgent',
      name: "myAgent",
      meta: {
        pageName: "我的待办"
      },
      component: () => import('../views/zhh-myAgent')
    },
    {
      path: 'newAgent',
      name: "newAgent",
      meta: {
        pageName: "新建待办"
      },
      component: () => import('../views/zhh-newAgent')
    },
    {
      path: 'modifyAgent',
      name: "modifyAgent",
      meta: {
        pageName: "修改待办"
      },
      component: () => import('../views/zhh-modifyAgent')
    },

    {
      path: 'notice',
      name: "notice",
      meta: {
        pageName: "通知"
      },
      component: () => import('../views/tongzhi/zhh-notice')
    },
    {
      path: 'noticeAdmin',
      name: "noticeAdmin",
      meta: {
        pageName: "通知管理"
      },
      component: () => import('../views/tongzhi/zhh-noticeAdmin'),
    },
    {
      path: 'draft',
      name: "draft",
      meta: {
        pageName: "草稿箱"
      },
      component: () => import('../views/tongzhi/zhh-draft')
    },
    {
      path: 'noticeEdit',
      name: "noticeEdit",
      meta: {
        pageName: "新建通知"
      },
      component: () => import('../views/tongzhi/zhh-noticeEdit')
    },
    {
      path: 'read',
      name: "read",
      meta: {
        pageName: "阅读页"
      },
      component: () => import('../views/tongzhi/zhh-read')
    },

    {
      path: 'upload',
      name: "upload",
      meta: {
        pageName: "文库上传"
      },
      component: () => import('../views/zhh-upload')
    },
    {
      path: 'library',
      name: "library",
      meta: {
        pageName: "文库"
      },
      component: () => import('../views/zhh-library')
    },
    {
      path: 'contacts',
      name: "contacts",
      meta: {
        pageName: "通讯录"
      },
      component: () => import('../views/zhh-contacts')
    },
    {
      path: 'contactsChoice',
      name: "contactsChoice",
      meta: {
        pageName: "通讯录选择"
      },
      component: () => import('../views/zhh-contactsChoice')
    },
    {
      path: 'organization',
      name: "organization",
      meta: {
        pageName: "添加人员页面"
      },
      component: () => import('../views/quanx/zhh-organization')
    },
    {
      path: 'accountAuthority',
      name: "accountAuthority",
      meta: {
        pageName: "账号及权限"
      },
      component: () => import('../views/quanx/zhh-accountAuthority')
    },
    {
      path: 'roleManagement',
      name: "roleManagement",
      meta: {
        pageName: "角色管理"
      },
      component: () => import('../views/quanx/zhh-roleManagement')
    },
    {
      path: 'transfer',
      name: "transfer",
      meta: {
        pageName: "调动"
      },
      component: () => import('../views/renshi/zhh-transfer')
    },
    {
      path: 'blacklist',
      name: "blacklist",
      meta: {
        pageName: "黑名单"
      },
      component: () => import('../views/renshi/zhh-blacklist')
    },
    {
      path: 'remployment',
      name: "remployment",
      meta: {
        pageName: "离职员工"
      },
      component: () => import('../views/renshi/zhh-remployment')
    },
    {
      path: 'applyPeople',
      name: "applyPeople",
      meta: {
        pageName: "人员申请"
      },
      component: () => import('../views/renshi/zhh-applyPeople')
    },
    {
      path: 'employeeFiles',
      name: "employeeFiles",
      meta: {
        pageName: "员工档案"
      },
      component: () => import('../views/renshi/zhh-employeeFiles')
    }, {
      path: 'employeeFilesRen',
      name: "employeeFilesRen",
      meta: {
        pageName: "员工档案选择"
      },
      component: () => import('../views/renshi/zhh-employeeFilesRen')
    }, {
      path: 'modifyEmployeeFiles',
      name: "modifyEmployeeFiles",
      meta: {
        pageName: "员工档案修改"
      },
      component: () => import('../views/renshi/zhh-modifyEmployeeFiles')
    },
    {
      path: 'viewApproval',
      name: "viewApproval",
      meta: {
        pageName: "查看审批"
      },
      component: () => import('../views/renshi/zhh-viewApproval')
    },
    {
      path: 'newEmployeeFiles',
      name: "newEmployeeFiles",
      meta: {
        pageName: "员工档案新增"
      },
      component: () => import('../views/renshi/zhh-newEmployeeFiles')
    }, {
      path: 'quit',
      name: "quit",
      meta: {
        pageName: "员工离职"
      },
      component: () => import('../views/renshi/zhh-quit')
    }, {
      path: 'promotion',
      name: "promotion",
      meta: {
        pageName: "员工晋升"
      },
      component: () => import('../views/renshi/zhh-promotion')
    },
    {
      path: 'configure',
      name: "configure",
      meta: {
        pageName: "设置"
      },
      component: () => import('../views/renshi/zhh-configure')
    },
    {
      path: 'other',
      name: "other",
      meta: {
        pageName: "通用审批"
      },
      component: () => import('../views/qita/zhh-other')
    },
    {
      path: 'Ax',
      name: "Ax",
      meta: {
        pageName: "按需"
      },
      component: () => import('../views/anxu/zt-Ax')
    }, {
      path: 'Bz',
      name: "bz",
      meta: {
        pageName: "班组设置"
      },
      component: () => import('../views/anxu/zt-Bz')
    }, {
      path: 'Bz-sh',
      name: "Bz-sh",
      meta: {
        pageName: "班组审核"
      },
      component: () => import('../views/anxu/zt-Bz-sh')
    }, {
      path: 'Hz',
      name: "Hz",
      meta: {
        pageName: "统计"
      },
      component: () => import('../views/anxu/zt-Hz')
    }, {
      path: 'Js',
      name: "Js",
      meta: {
        pageName: "结算"
      },
      component: () => import('../views/anxu/zt-Js')
    }, {
      path: 'Jssz',
      name: "Jssz",
      meta: {
        pageName: "结算配置"
      },
      component: () => import('../views/anxu/zt-Jssz')
    }, {
      path: 'pd',
      name: "pd",
      meta: {
        pageName: "派单"
      },
      component: () => import('../views/anxu/zt-Pd')
    },
    {
      path: 'vidio',
      name: 'vidio',
      meta: {
        pageName: "视频"
      },
      component: () => import('../views/vidio.vue')
    },
    {
      path: 'newtable',
      name: 'newtable',
      meta: {
        pageName: "视频档案"
      },
      component: () => import('../views/newtable.vue')
    },
    {
      path: 'yue',
      name: "yue",
      meta: {
        pageName: "阅读"
      },
      component: () => import('../views/tongzhi/zhh-yue')
    }, {
      path: 'pay',
      name: "pay",
      meta: {
        pageName: "薪酬"
      },
      component: () => import('../views/pay/zhh-pay')
    }, {
      path: 'payStatistics',
      name: "payStatistics",
      meta: {
        pageName: "薪酬统计"
      },
      component: () => import('../views/pay/zhh-payStatistics')
    },
  ]

  // 添加的路由表
  const routeObj = {
    path: "/homepage",
    name: "homepage",
    component: () => import('../views/homepage'),
    meta: {
      pageName: "框架"
    },
    children: [
      {
        path: '/homepage',
        name: "work",
        meta: {
          pageName: "工作台"
        },
        component: () => import('../views/work')
      },
      {
        path: 'kaoqing',
        name: 'kaoqing',
        meta: {
          pageName: "考勤"
        },
        component: () => import('../views/kaoqing.vue')
      },
      {
        path: 'approval',
        name: "approval",
        meta: {
          pageName: "审批流转"
        },
        component: () => import('../views/shengpi/zhh-approval')
      },
      {
        path: 'newEmployeeFiles',
        name: "newEmployeeFiles",
        meta: {
          pageName: "员工档案新增"
        },
        component: () => import('../views/renshi/zhh-newEmployeeFiles')
      },
      {
        path: 'employeeFilesRen',
        name: "employeeFilesRen",
        meta: {
          pageName: "员工档案选择"
        },
        component: () => import('../views/renshi/zhh-employeeFilesRen')
      },
      {
        path: 'modifyEmployeeFiles',
        name: "modifyEmployeeFiles",
        meta: {
          pageName: "员工档案修改"
        },
        component: () => import('../views/renshi/zhh-modifyEmployeeFiles')
      },
      {
        path: 'viewApproval',
        name: "viewApproval",
        meta: {
          pageName: "查看审批"
        },
        component: () => import('../views/renshi/zhh-viewApproval')
      },
      {
        path: 'transferSheng',
        name: "transferSheng",
        meta: {
          pageName: "调动审批"
        },
        component: () => import('../views/shengpi/zhh-transferSheng')
      },
      {
        path: 'promotionSheng',
        name: "promotionSheng",
        meta: {
          pageName: "员工晋升审批"
        },
        component: () => import('../views/shengpi/zhh-promotionSheng')
      },
      {
        path: 'approvalPersonnel',
        name: "approvalPersonnel",
        meta: {
          pageName: "人员审批"
        },
        component: () => import('../views/shengpi/zhh-approvalPersonnel')
      },
      {
        path: 'contacts',
        name: "contacts",
        meta: {
          pageName: "通讯录"
        },
        component: () => import('../views/zhh-contacts')
      },
      {
        path: 'quitSheng',
        name: "quitSheng",
        meta: {
          pageName: "员工离职审批"
        },
        component: () => import('../views/shengpi/zhh-quitSheng')
      },
      {
        path: 'adjustment',
        name: "adjustment",
        meta: {
          pageName: "人员调整审批"
        },
        component: () => import('../views/shengpi/zhh-adjustment')
      },
      {
        path: 'otherSheng',
        name: "otherSheng",
        meta: {
          pageName: "通用审批"
        },
        component: () => import('../views/shengpi/zhh-otherSheng')
      },
      {
        path: 'read',
        name: "read",
        meta: {
          pageName: "阅读"
        },
        component: () => import('../views/tongzhi/zhh-read')
      }, {
        path: 'yue',
        name: "yue",
        meta: {
          pageName: "阅读"
        },
        component: () => import('../views/tongzhi/zhh-yue')
      }, {
        path: 'pay',
        name: "pay",
        meta: {
          pageName: "薪酬"
        },
        component: () => import('../views/pay/zhh-pay')
      }, {
        path: 'payStatistics',
        name: "payStatistics",
        meta: {
          pageName: "薪酬统计"
        },
        component: () => import('../views/pay/zhh-payStatistics')
      },
      // {
      //   path: 'quit',
      //   name: "quit",
      //   meta: {
      //     pageName: "员工离职"
      //   },
      //   component: () => import('../views/renshi/zhh-quit')
      // },
      // {
      //   path: 'notice',
      //   name: "notice",
      //   meta: {
      //     pageName: "通知"
      //   },
      //   component: () => import('../views/tongzhi/zhh-notice')
      // },
      // {
      //   path: 'noticeAdmin',
      //   name: "noticeAdmin",
      //   meta: {
      //     pageName: "通知管理"
      //   },
      //   component: () => import('../views/tongzhi/zhh-noticeAdmin'),
      // },
      // {
      //   path: 'draft',
      //   name: "draft",
      //   meta: {
      //     pageName: "草稿箱"
      //   },
      //   component: () => import('../views/tongzhi/zhh-draft')
      // },
      // {
      //   path: 'noticeEdit',
      //   name: "noticeEdit",
      //   meta: {
      //     pageName: "新建通知"
      //   },
      //   component: () => import('../views/tongzhi/zhh-noticeEdit')
      // },
      // {
      //   path: 'employeeFilesRen',
      //   name: "employeeFilesRen",
      //   meta: {
      //     pageName: "员工档案选择"
      //   },
      //   component: () => import('../views/renshi/zhh-employeeFilesRen')
      // },
    ]
  }
  const yem = readNodes(JSON.parse(store.state.routeObj)).arr

  // console.log(JSON.parse(store.state.routeObj), 7878)
  // 从可添加路由中筛选出需要的路由添加
  return yem.forEach(yes => {
    // console.log(yes, 99)
    asyncRouters.forEach(res => {
      // console.log(res)
      if (yes == res.meta.pageName) {
        // console.log(res.meta.pageName, 88)
        routeObj.children.push(res)
      }

    })
  }),
    router.addRoute('index', routeObj),
    console.log(routeObj, 8989),
    router.options.routes.push(routeObj)
}

router.beforeEach((to, from, next) => {
  // if (to.path == "/") {
  //   next();
  // } else {
  //   const token = sessionStorage.getItem(
  //     "token"
  //   );
  //   if (token) {
  //     next();
  //   } else {
  //     next({
  //       name: "logIn"
  //     });
  //   }
  // }
  next({
  });
  console.log(to)
  console.log(next)
  // console.log(from.name)
  store.state.url = from
});


export default router;


