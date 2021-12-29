<template>
  <div class="filterBox">
    <slot></slot>
    <div class="item">
      <span class="title">工单编号:</span>
      <Input
        v-model="filterItem.number"
        placeholder="Enter something..."
        clearable
        style="width: 200px"
      />
    </div>
    <div class="item">
      <span class="title">工单完成时间:</span>
      <Col span="12">
        <DatePicker
          format="yyyy/MM/dd"
          placement="bottom-end"
          placeholder="Select date"
          style="width: 200px"
          v-model="filterItem.finishTime"
        ></DatePicker>
      </Col>
    </div>
    <div class="item">
      <span class="title">分光器名称:</span>
      <Input
        v-model="filterItem.spectroscopeName"
        placeholder="Enter something..."
        clearable
        style="width: 200px"
      />
    </div>

    <div class="item">
      <span class="title">下派时间:</span>
      <Col span="12">
        <DatePicker
          format="yyyy/MM/dd"
          placement="bottom-end"
          placeholder="Select date"
          style="width: 200px"
          v-model="filterItem.lowerTime"
        ></DatePicker>
      </Col>
    </div>

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
      <span class="title">整改有效期:</span>
      <Col span="12">
        <DatePicker
          format="yyyy/MM/dd"
          placement="bottom-end"
          placeholder="Select date"
          style="width: 200px"
          v-model="filterItem.changeTime"
        ></DatePicker>
      </Col>
    </div>
    <div class="item">
      <span class="title">质检:</span>
      <Select v-model="filterItem.qualityTesting" style="width: 200px">
        <Option
          v-for="item in testList"
          :value="item.value"
          :key="item.value + new Date() + Math.random() * 100000"
          >{{ item.label }}</Option
        >
      </Select>
    </div>
    <div class="item">
      <span class="title">是否完成:</span>
      <Select v-model="filterItem.completion" style="width: 200px">
        <Option
          v-for="item in completionList"
          :value="item.value"
          :key="item.value + new Date() + Math.random() * 100000"
          >{{ item.label }}</Option
        >
      </Select>
    </div>
  </div>
</template>


<script>
import { formatData } from "@/util/index";
export default {
  data() {
    return {
      filterItem: {
        number: "", //工单编号
        finishTime: "", //工单完成时间
        spectroscopeName: "", //分光器名称
        lowerTime: "", //下派时间
        personnel: "", //整改人员
        changeTime: "", //整改有效期
        qualityTesting: "", //质检
        completion: "", //是否完成
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
      filterItem.finishTime =
        filterItem.finishTime && formatData(filterItem.finishTime);

      filterItem.lowerTime =
        filterItem.lowerTime && formatData(filterItem.lowerTime);
      filterItem.changeTime =
        filterItem.changeTime && formatData(filterItem.changeTime);
      return filterItem;
    },
  },
};
</script>


<style lang="less" scoped>
.filterBox {
  height: 400px;
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