<template>
  <div id="hzClass">
    <div class="button-box">
      <Col span="12">
        <DatePicker
          v-model="time"
          type="daterange"
          format="yyyy/MM/dd"
          placeholder="Select date"
          style="width: 200px"
        ></DatePicker>
      </Col>
      <Input
        v-model="teamname"
        search
        enter-button
        placeholder="搜索小组名称"
      />
    </div>
    <Table
      height="500"
      :columns="columns"
      :data="data"
      :loading="loading"
    ></Table>
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page
          :total="total"
          :current="1"
          @on-change="changePage"
          @on-page-size-change="changeSizePage"
          show-sizer
          :page-size-opts="[20, 30, 40, 50, 60, 80, 100, 200]"
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import { getHz_class } from "@/api/getHzApi";
export default {
  data() {
    return {
      loading: true,
      time: ["", ""], //时间
      teamname: "", //小组名称
      page: 1,
      pagesize: 50,
      total: 0,
      columns: [
        {
          title: "id",
          key: "id",
        },
        {
          title: "小组名称",
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
    time() {
      this.page = 1;
      this.getData();
    },
    teamname() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.page = 1;
        this.getData();
      }, 400);
    },
  },
  methods: {
    // 获取数据
    async getData() {
      this.loading = true;
      const { time, teamname, page, pagesize } = this;
      const res = await getHz_class("toji/getTeamRanking", {
        time,
        teamname,
        page,
        pagesize,
      });
      this.total = res.counts;
      this.data = res.items;
      this.loading = false;
    },
    changePage(val) {
      this.page = val;
      this.getData();
    },
    changeSizePage(val) {
      this.pagesize = val;
      this.getData();
    }
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
#hzClass {
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
</style>