<template>
  <div class="filterBox">
    <slot></slot>
    <div class="item">
      <span class="title">名称:</span>
      <Input
        v-model="filterItem.name"
        placeholder="Enter something..."
        clearable
        style="width: 200px"
      />
    </div>
    <div class="item">
      <span class="title">所属站点:</span>
      <Input
        v-model="filterItem.site"
        placeholder="Enter something..."
        clearable
        style="width: 200px"
      />
    </div>
    <div class="item">
      <span class="title">所属机房:</span>
      <Input
        v-model="filterItem.computerRoom"
        placeholder="Enter something..."
        clearable
        style="width: 200px"
      />
    </div>
    <div class="item">
      <span class="title">所属网络资源点:</span>
      <Input
        v-model="filterItem.networkPoints"
        placeholder="Enter something..."
        clearable
        style="width: 200px"
      />
    </div>
    <div class="item">
      <span class="title">具体位置:</span>
      <Input
        v-model="filterItem.location"
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
        v-model="filterItem.correctivePersonnel"
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
          v-model="filterItem.correctiveTime"
        ></DatePicker>
      </Col>
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
    <div class="item">
      <span class="title">是否完成:</span>
      <Select v-model="filterItem.completion" clearable style="width: 200px">
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
        name: "", //名称
        site: "", //所属站点
        computerRoom: "", //所属机房
        networkPoints: "", //所属网络资源
        location: "", //具体位置
        lowerTime: "", //下派时间
        correctivePersonnel: "", //整改人员
        correctiveTime: "", //整改有效期
        test: "", //质检
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
      filterItem.lowerTime = filterItem.lowerTime && formatData(filterItem.lowerTime);
      filterItem.correctiveTime = filterItem.correctiveTime && formatData(filterItem.correctiveTime);
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