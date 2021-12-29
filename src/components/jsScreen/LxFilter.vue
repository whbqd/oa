<template>
  <div class="filterBox">
    <slot></slot>
    <div class="item">
      <span class="title">整改人员:</span>
      <Input
        v-model="filterItem.personnel"
        placeholder="Enter something..."
        clearable
        style="width: 200px"
      />
    </div>
    <div class="item">
      <span class="title">结算金额:</span>
      <Input
        v-model="filterItem.money"
        placeholder="Enter something..."
        clearable
        style="width: 200px"
      />
    </div>
    
    <div class="item">
      <span class="title">质检:</span>
      <Select v-model="filterItem.test" clearable style="width: 200px">
        <Option
          v-for="item in testList"
          :value="item.value"
          :key="item.value + new Date() + Math.random() * 100000"
          >{{ item.label }}</Option
        >
      </Select>
    </div>
  </div>
</template>


<script>
// import { formatData } from "@/util/index";
export default {
  data() {
    return {
      filterItem: {
        personnel: "", //整改人员
        test: "", //质检
        money: "", //结算金额
      },

      testList: [
        {
          label: "无",
          value: "",
        },
        {
          label: "合格",
          value: 0,
        },
        {
          label: "不合格",
          value: 1,
        },
        {
          label: "待质检",
          value: 2,
        },
      ],

      completionList: [
        {
          value: "",
          label: "无",
        },
        {
          value: 0,
          label: "在途",
        },
        {
          value: 1,
          label: "完成整改",
        },
        {
          value: 2,
          label: "无法整改",
        },
      ],
    };
  },
  methods: {
    getItem() {
      const filterItem = { ...this.filterItem };
      return filterItem;
    },
  },
};
</script>


<style lang="less" scoped>
.filterBox {
  height: 250px;
  overflow: auto;
  .item {
    height: 40px;
    margin: 15px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title {
      margin-right: 10px;
      display: inline-block;
      width: 100px;
      text-align: right;
    }
  }
}
</style>