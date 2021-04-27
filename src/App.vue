<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      screenHeight: document.body.clientHeight,
      dongtai: false,
    };
  },
  created() {
    if (this.screenHeight > 740) {
      this.dongtai = true;
    } else {
      this.dongtai = false;
    }
  },
  mounted() {
    let Height = this;
    window.addEventListener("resize", function () {
      return (() => {
        window.screenHeight = document.body.clientHeight;
        Height.screenHeight = window.screenHeight;
      })();
    });
  },
  watch: {
    screenHeight: {
      handler(newVal) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if (!this.timer) {
          // 一旦监听到的screenHeight值改变，就将其重新赋给data里的screenHeight
          this.screenHeight = newVal;
          this.timer = true;
          let Height = this;
          setTimeout(function () {
            // 打印screenHeight变化的值
            // console.log("1", Height.screenHeight);
            Height.timer = false;
          }, 400);
          if (Height.screenHeight > 740) {
            this.dongtai = true;
          } else {
            this.dongtai = false;
          }
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="less">
#app {
  height: 100%;
  width: 100%;
}
</style>
