<template>
  <div id="xiaLa">
    <div class="cheng">
      <el-popover
        placement="bottom"
        width="150"
        trigger="click"
        v-model="value"
      >
        <div class="sheng" @click="regions($event)">
          <div id="regionName" v-for="(qu, index) in qu" :key="index">
            {{ qu }}
          </div>
        </div>
        <div class="cheng2" slot="reference">
          <span style="font-size: 13px; margin-right: 15px"> 区县 </span>
          <span class="iconfont icon icon-jiantouxia"> </span>
        </div>
      </el-popover>
      <div class="quyu">{{ shuji }}</div>
      <!-- <div class="shi">
        <div class="regionName" v-for="(shi, index) in shi" :key="index">
          {{ shi }}
        </div>
      </div>
      <div class="qu">
        <div class="regionName" v-for="(qu, index) in qu" :key="index">
          {{ qu }}
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: false,
      shuji: "",
      sheng: ["浙江省", "江苏省"],
      shi: ["杭州市"],
      qu: ["萧山区", "上城区"],
    };
  },
  methods: {
    clickme() {
      // 通过自定义事件addNum把值传给父组件
    },
    regions(e) {
      this.value = false;
      if (e.target.innerText) {
        this.shuji = e.target.innerText;
        this.$emit("addNum", this.shuji);
      }

      // console.log(e.target.innerText);
    },
  },
};
</script>
<style lang="less" scoped>
.dis {
  display: none;
}
#regionName {
  width: 126px;
  height: 30px;
  font-size: 13px;
  text-align: left;
  line-height: 30px;
}
#regionName:hover {
  background-color: rgb(236, 236, 236);
}
.cheng {
  position: relative;
  left: 20px;
  width: 300px;
  height: 30px;
  border: 1px solid #cacaca;
  border-radius: 50px;
  .quyu {
    position: relative;
    top: -24px;
    left: 200px;
    width: 120px;
  }
  .cheng2 {
    width: 150px;
    height: 28px;
    border-radius: 50px 0px 0px 50px;
    background-color: #ebebeb;
    text-align: center;
    line-height: 28px;
  }
  // 弹出
  .sheng {
    position: absolute;
    top: 40px;
    width: 120px;
    min-height: 130px;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .regionName {
      width: 80px;
      height: 30px;
      font-size: 13px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #000000;
    }
  }
  .shi {
    position: absolute;
    top: 40px;
    left: 120px;
    width: 120px;
    min-height: 130px;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .regionName {
      width: 80px;
      height: 30px;
      font-size: 13px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #000000;
    }
  }
  .qu {
    position: absolute;
    top: 40px;
    left: 240px;
    width: 120px;
    min-height: 130px;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .regionName {
      width: 80px;
      height: 30px;
      font-size: 13px;
      text-align: center;
      line-height: 30px;
      border: 1px solid #000000;
    }
  }
}
</style>