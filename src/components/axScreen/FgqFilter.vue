<template>
  <div class="filterBox">
    <slot></slot>
    <div class="item">
      <span class="title">分光器名称:</span>
      <Input
        v-model="filterItem.spectrometerName"
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
      <span class="title">归属OLT:</span>
      <Input
        v-model="filterItem.attributionOlt"
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
          v-model="filterItem.nextTime"
        ></DatePicker>
      </Col>
    </div>
    <div class="item">
      <span class="title">下派小组:</span>
      <Input
        v-model="filterItem.correctivePersonnel"
        placeholder="Enter something..."
        clearable
        style="width: 200px"
      />
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
          v-model="filterItem.rectificationDate"
        ></DatePicker>
      </Col>
    </div>
    <div class="item">
      <span class="title">质检:</span>
      <Select v-model="filterItem.qualityInspection" style="width: 200px">
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
        spectrometerName: "", //分光器名称
        site: "", //所属站点
        computerRoom: "", //所属机房
        networkResource: "", //所属网络资源点
        attributionOlt: "", //归属OLT
        nextTime: "", //下派时间
        correctivePersonnel: "", //下派小组
        personnel: "", //整改人员
        rectificationDate: "", //整改有效期
        qualityInspection: "", //质检
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
      filterItem.nextTime =
        filterItem.nextTime && formatData(filterItem.nextTime);

      filterItem.rectificationDate =
        filterItem.rectificationDate &&
        formatData(filterItem.rectificationDate);

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