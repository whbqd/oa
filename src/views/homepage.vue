<template>
  <div class="app">
    <!-- 顶部 -->
    <zhtop class="top"></zhtop>
    <!-- 左侧选择 -->
    <div class="left" :class="{ weiYi: dongtai }">
      <left></left>
    </div>

    <!-- 路由 -->
    <div class="right" :class="{ weiYi2: dongtai }">
      <router-view />
    </div>
  </div>
</template>
<script>
import zhtop from "../components/zhtop.vue";
import left from "../components/left.vue";
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth,
      dongtai: false,
    };
  },
  // 打开页面时获取宽度
  created() {
    // console.log("11", this.screenWidth);
    if (this.screenWidth < 1350) {
      this.dongtai = true;
    } else {
      this.dongtai = false;
    }
  },

  mounted() {
    // 监听窗口变化大小
    let width = this;
    window.addEventListener("resize", function () {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        width.screenWidth = window.screenWidth;
      })();
    });
    // 监听页面滚动
    window.addEventListener("scroll", this.watchScroll);
  },
  // 监听
  watch: {
    screenWidth: {
      handler(newVal) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if (!this.timer) {
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenWidth = newVal;
          this.timer = true;
          let width = this;
          setTimeout(function () {
            // 打印screenWidth变化的值
            // console.log("1", width.screenWidth);
            width.timer = false;
          }, 400);
          if (width.screenWidth < 1350) {
            this.dongtai = true;
          } else {
            this.dongtai = false;
          }
        }
      },
      immediate: true,
    },
  },
  components: { zhtop, left },
};
</script>
<style scoped lang="less">
// 吸顶
.navBarWrap {
  position: fixed;
  top: 0;
  // left: 0;
  z-index: 999;
}
.app {
  // padding-bottom: 20px;
}
.top {
  width: 100%;
  min-width: 1150px;
}
.left {
  // float: left;
  width: 98%;
  position: absolute;
  min-width: 1150px;
}
.weiYi {
  margin-left: -15px;
  transition: 0.5s;
}
.weiYi2 {
  position: relative;
  left: 130px !important;
  transition: 0.5s;
}
.right {
  transition: 0.5s;
  width: 88%;
  min-width: 1000px;
  margin-top: 70px;
  position: relative;
  left: 160px;
  z-index: 99;
  height: 590px;
  // overflow: hidden;
}
</style>