<template>
  <div>
    <zhtop></zhtop>
    <div class="bottom">
      <left class="left" :logo="it"></left>
      <choice :ios="res" class="right bottom"></choice>
      <div class="right">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import zhtop from "../components/zhtop.vue";
import left from "../components/left.vue";
import choice from "../components/choice.vue";
export default {
  data() {
    return {
      it: [
        { id: "0", name: "工作台", icon: "icon-gongzuotai" },
        { id: "1", name: "代办", icon: "icon-renwujindu" },
        { id: "2", name: "通告", icon: "icon-tongzhi" },
        { id: "3", name: "文库", icon: "icon-wenku" },
        { id: "4", name: "通讯录", icon: "icon-icon_lianxiren" },
      ],
      res: [
        { name: "工作台", url: "/homepage/work" },
        { name: "审批流转", url: "/homepage/approval" },
        { name: "新建流程", url: "/homepage/approval" },
        { name: "流程进度", url: "/homepage/approval" },
        { name: "流程审批", url: "/homepage/approval" },
      ],
    };
  },
  components: { zhtop, left, choice },
};
</script>
<style scoped lang="less">
.left {
  float: left;
  margin: 50px;
}
.right {
  width: 86%;
  margin-left: 170px;
  min-width: 1400px;
  .jian {
    margin-bottom: 25px;
  }
}
  .bottom{
    margin-bottom: 25px;
  }
</style>