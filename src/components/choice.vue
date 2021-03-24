<template>
  <div>
    <div class="choice">
      <div v-for="(item, index) in ios" :key="index" @click="dian(index)">
        <router-link :to="{ path: item.url }">
          <p class="choiceFont" :class="{ xian: i == index }">
            {{ item.name }}
          </p></router-link
        >
      </div>
    </div>
    <div class="fen"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      i: 0,
    };
  },
  props: ["ios"],
  methods: {
    dian(index) {
      this.i = index;
      console.log(this.i);
    },
  },
};
</script>
<style scoped lang="less">
a {
  text-decoration: none;
  color: #00ecfc;
}
.router-link-active {
  text-decoraction: none;
  color: #00ecfc;
}
.choice {
  height: 45px;
  // background: aquamarine;
  display: flex;
  display: -webkit-flex;
  .choiceFont {
    line-height: 40px;
    margin-left: 50px;
    color: #808080;
    font-size: 14px;
    text-align: center;
    min-width: 60px;
  }
  .xian {
    border-bottom: 2px solid #0077f1;
  }
}
.fen {
  width: 100%;
  border-bottom: 1px solid #c9c9c9;
}
</style>