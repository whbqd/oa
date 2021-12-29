<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { genRoute } from "./router/index";
import store from "./store";

export default {
  data() {
    return {};
  },
  mounted() {
    //写在mounted或者activated生命周期内即
    window.addEventListener("beforeunload", this.beforeunloadFn());
  },
  methods: {
    beforeunloadFn() {
      if (store.state.routeObj) {
        // console.log("1253", store.state.routeObj);
        genRoute(store.state.routeObj);
        // console.log(1);
      }
      // console.log(2);
    },
  },
};
</script>
<style lang="less">
#app {
  height: 100%;
  width: 100%;
}
li {
  list-style: none;
}
// @font-face {
//   font-family: "iconfont"; /* Project id 2435137 */
//   src: url("//at.alicdn.com/t/font_2435137_fxu3jxb18a.woff2?t=1631171363794")
//       format("woff2"),
//     url("//at.alicdn.com/t/font_2435137_fxu3jxb18a.woff?t=1631171363794")
//       format("woff"),
//     url("//at.alicdn.com/t/font_2435137_fxu3jxb18a.ttf?t=1631171363794")
//       format("truetype");
// }
// @font-face {
//   font-family: "iconfont"; /* Project id 2435137 */
//   src: url("http://at.alicdn.com/t/font_2435137_irte1u5xxq.woff2?t=1631928863376")
//       format("woff2"),
//     url("http://at.alicdn.com/t/font_2435137_irte1u5xxq.woff?t=1631928863376")
//       format("woff"),
//     url("http://at.alicdn.com/t/font_2435137_irte1u5xxq.ttf?t=1631928863376")
//       format("truetype");
// }
@font-face {
  font-family: "iconfont"; /* Project id 2435137 */
  src: url("https://at.alicdn.com/t/font_2435137_z4hpwbimtvr.woff2?t=1634094835449")
      format("woff2"),
    url("https://at.alicdn.com/t/font_2435137_z4hpwbimtvr.woff?t=1634094835449")
      format("woff"),
    url("https://at.alicdn.com/t/font_2435137_z4hpwbimtvr.ttf?t=1634094835449")
      format("truetype");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-heimingdan:before {
  content: "\e7ef";
}

.icon-tubiao:before {
  content: "\e60a";
}

.icon-tubiao_xuqiu:before {
  content: "\e63c";
}

.icon-renshixitong:before {
  content: "\e63f";
}

.icon-shipin:before {
  content: "\e61d";
}

.icon-wenjian:before {
  content: "\f289";
}

.icon-daiban:before {
  content: "\e64a";
}

.icon-jian:before {
  content: "\e66e";
}

.icon-jia:before {
  content: "\e66f";
}

.icon-quanxian:before {
  content: "\e6b6";
}

.icon-jinri:before {
  content: "\e619";
}

.icon-weiwancheng:before {
  content: "\e663";
}

.icon-jinji:before {
  content: "\e645";
}

.icon-shenpi1:before {
  content: "\e676";
}

.icon-icon-:before {
  content: "\e623";
}

.icon-time:before {
  content: "\e62d";
}

.icon-xiazai:before {
  content: "\e86f";
}

.icon-xinjian:before {
  content: "\e62f";
}

.icon-tianjia1:before {
  content: "\e61f";
}

.icon-yanjing:before {
  content: "\e601";
}

.icon-shoudaode:before {
  content: "\e60c";
}

.icon-dui:before {
  content: "\e607";
}

.icon-shouyetubiao2-14:before {
  content: "\e624";
}

.icon-cuowu1:before {
  content: "\e64b";
}

.icon-wofaqide:before {
  content: "\e60e";
}

.icon-shaixuan:before {
  content: "\e60b";
}

.icon-bianji:before {
  content: "\e603";
}

.icon-shanchu:before {
  content: "\e617";
}

.icon-yiwancheng:before {
  content: "\e614";
}

.icon-sousuo:before {
  content: "\e616";
}

.icon-yuqi:before {
  content: "\e6c1";
}

.icon-dubanrenwu:before {
  content: "\e622";
}

.icon-zhenggaicuoshi:before {
  content: "\e661";
}

.icon-shenpi:before {
  content: "\e62c";
}

.icon-business:before {
  content: "\e755";
}

.icon-zhengshu:before {
  content: "\e6d1";
}

.icon-kaoqindaka:before {
  content: "\e6d9";
}

.icon-hetongguanli:before {
  content: "\e600";
}

.icon-tongzhi1:before {
  content: "\e639";
}

.icon-zizhi:before {
  content: "\e615";
}

.icon-yuangonglizhi:before {
  content: "\e640";
}

.icon-yuangongruzhi:before {
  content: "\e64e";
}

.icon-jidinghe:before {
  content: "\e69f";
}

.icon-schedule:before {
  content: "\e62a";
}

.icon-zhijiandan:before {
  content: "\e62b";
}

.icon-qianwang:before {
  content: "\e81d";
}

.icon-gonggao:before {
  content: "\e680";
}

.icon-icon_lianxiren:before {
  content: "\e63d";
}

.icon-tongzhi:before {
  content: "\e606";
}

.icon-wenku:before {
  content: "\e627";
}

.icon-gongzuotai:before {
  content: "\e636";
}
</style>
