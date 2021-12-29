import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ergodic } from "./router/index"
// 假数据
// import "./assets/mock";
//路由
import axios from 'axios';
Vue.prototype.$axios = axios;
axios.defaults.baseURL = '/api'  //关键代码

//富文本
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.config.productionTip = false;

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 组件传参
import VueBus from 'vue-bus';
Vue.use(VueBus);

// 自定义组件
Vue.directive('test', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding) {
    const ye = router.currentRoute.meta.pageName
    // console.log("12",ye)
    var qx = JSON.parse(store.state.routeObj);
    var arr = []
    var sj = ergodic(qx, arr, ye).push.children
    // console.log(sj, 45)
    sj.forEach(sj => {
      sj.children.forEach(an => {
        if (an.label == binding.value.name) {
          el.style.display = "block"
        }
      })
      if (sj.label == binding.value.name) {
        // a = 1
        el.style.display = "block"
      }
    })
    // console.log(binding); //一个对象，包含很多属性属性
    // console.log(el);//指令所绑定的DOM元素
  },
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
