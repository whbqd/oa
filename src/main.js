import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 假数据
import "./assets/mock";
//路由
import axios from 'axios';
//富文本
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 组件传参
import VueBus from 'vue-bus';

// 框架
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

Vue.use(VueBus);

Vue.use(VueQuillEditor, /* { default global options } */)

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.directive('test', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding) {
    if (!binding.value) {
      el.style.display = "none"
    } else {
      el.style.display = ""
    }

    console.log(binding); //一个对象，包含很多属性属性
    console.log(el);//指令所绑定的DOM元素
  },
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
