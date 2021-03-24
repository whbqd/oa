<template>
  <div class="left">
    <div
      class="option"
      v-for="item in logo"
      :key="item.name"
      @click="yan(item)"
    >
      <div :class="{ yans: i == item.id }">
        <span class="iconfont icon" :class="item.icon"></span>
      </div>
      <p class="optionFont" :class="{ yan: i == item.id }">{{ item.name }}</p>
    </div>
    <br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      sh: true,
      items: [],
      i: 0,
    };
  },
  props: ["logo"],
  methods: {
    yan(item) {
      this.i = item.id;
    },
  },
};
</script>
<style lang="less" scoped>
@import url(//at.alicdn.com/t/font_2435137_37m73simzbd.css);
span {
  font-size: 33px;
}
.yan {
  transition: 0.5s;
  color: #0077f1 !important;
  border-bottom: 2px solid #0077f1 !important;
  line-height: 50px !important;
}
.yans {
  color: #0077f1 !important;
}
.left {
  width: 85px;
  height: 610px;
  position: absolute;
  background: #ffffff;
  .option {
    width: 50px;
    margin: auto;
    margin-top: 20px;
    text-align: center;
    color: #808080;
    .optionFont {
      transition: 0.5s;
      font-size: 16px;
      line-height: 30px;
      border-radius: 2px;
    }
  }
}
</style>