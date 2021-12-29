<template>
  <div id="hzDept">
    
      
    <Table height="500" :columns="columns" :data="data" :loading="loading"></Table>
  </div>
</template>

<script>
import { getHz_dept } from "@/api/getHzApi";
import { getDept } from "@/util";
export default {
  data() {
    return {
      loading: true,
      county: "",
      deptList: getDept(),
      page: 1,
      pagesize: 50,
      total: 0,
      columns: [
        {
          title: "id",
          key: "id",
        },
        {
          title: "区县",
          key: "teamName",
        },
        {
          title: "总工单",
          key: "workCounts",
        },
        {
          title: "完成工单",
          key: "finishWorks",
        },
        {
          title: "预估金额",
          key: "workMoney",
        },
      ],
      data: [],
      timer: null,
    };
  },
  watch: {
    county() {
      this.getData();
    },
  },
  methods: {
    // 获取数据
    async getData() {
      this.loading = true;
      const { county, pagesize } = this;
      const res = await getHz_dept("toji/countyrankings", {
        county,
        pagesize,
      });
      this.data = res.items;
      this.loading = false;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
#hzDept {
  width: 100%;
  height: 100%;
  .button-box {
    height: 60px;
    line-height: 60px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
}
.mr10 {
    margin-right: 10px;
}
</style>