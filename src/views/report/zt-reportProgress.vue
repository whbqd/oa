<template>
  <div class="progress">
    <div class="search">
      <div class="item">
        <span style="width: 40px">区县: </span>
        <Select v-model="county" style="width: 200px">
          <Option
            v-for="item in countyList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <div class="item">
        <span>日期查询: </span>
        <DatePicker
          type="daterange"
          placement="bottom-end"
          placeholder="Select date"
          style="width: 200px"
          v-model="date"
        ></DatePicker>
      </div>
      <div class="item">
        <span>负责人: </span>
        <Input
          width="200px"
          search
          placeholder="Enter something..."
          v-model="name"
        />
      </div>
    </div>
    <Table :columns="columns12" :data="data">
      <template slot="status" slot-scope="{ row }">
        <Tag v-if="row.status === 0" color="default">待上传</Tag>
        <Tag v-else-if="row.status === 1" color="warning">待审核</Tag>
        <Tag v-else-if="row.status === 2" color="success">已完成</Tag>
        <Tag v-else-if="row.status === 3" color="error">已驳回</Tag>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button
          type="info"
          size="small"
          @click="download(row.id)"
          style="margin-right: 5px; font-size: 13px"
          >下载</Button
        >
        <el-popconfirm
          title="确定同意吗？"
          icon-color="green"
          @confirm="edit(row.id, true)"
        >
          <Button
            type="success"
            size="small"
            style="margin-right: 5px; font-size: 13px"
            slot="reference"
            >同意</Button
          >
        </el-popconfirm>
        <el-popconfirm
          title="确定驳回吗？"
          icon-color="red"
          @confirm="edit(row.id, false)"
        >
          <Button
            type="error"
            size="small"
            style="margin-right: 5px; font-size: 13px"
            slot="reference"
            >驳回</Button
          >
        </el-popconfirm>
        <el-popconfirm
          title="确定删除吗？"
          icon-color="orange"
          @confirm="del(row.id)"
        >
          <Button
            size="small"
            type="warning"
            slot="reference"
            style="margin-right: 5px; font-size: 13px"
            >删除</Button
          >
        </el-popconfirm>
      </template>
    </Table>
    <div class="page">
      <Page
        :total="count"
        show-total
        show-sizer
        @on-change="changePage"
        @on-page-size-change="changeSize"
      />
    </div>
  </div>
</template>
<script>
import * as util from "@/util";
import * as api from "@/api/approve";

export default {
  computed: {
    watchData() {
      const { date, county } = this;
      let startDate = "",
        endDate = "";
      if (date) {
        startDate = util.formatData(date[0]);
        endDate = util.formatData(date[1]);
      }
      return {
        startDate,
        endDate,
        county,
      };
    },
  },
  watch: {
    watchData(val) {
      const { name, page, pageSize } = this;
      this.getList(page, pageSize, { ...val, name });
    },
    name(val) {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        const { page, pageSize } = this;
        // api
        this.getList(page, pageSize, { ...this.watchData, name: val });
      }, 500);
    },
  },
  data() {
    return {
      page: 1,
      pageSize: 15,
      count: 0, //总数
      timer: null,
      name: "", //负责人
      date: null, // [起止日期, 截止日期]
      countyList: [
        {
          id: Math.random().toString(32).split(4),
          value: "0",
          label: "全部",
        },
        ...util.getDept(),
      ],
      county: "0",
      columns12: [
        {
          title: "ID",
          key: "id",
        },
        {
          title: "月份",
          key: "month",
        },
        {
          title: "区县",
          key: "county",
        },
        {
          title: "文件名",
          key: "filename",
        },
        {
          title: "负责人",
          key: "uploadPeople",
        },
        {
          title: "状态",
          slot: "status",
        },
        {
          title: "Action",
          slot: "action",
          width: 300,
          align: "center",
        },
      ],
      data: [],
    };
  },
  methods: {
    async getList(
      page = 1,
      pageSize = 15,
      { county = "0", startDate = "", endDate = "", name = "" } = {}
    ) {
      // api
      const resp = await api.approve(page, pageSize, {
        county,
        startDate,
        endDate,
        name,
      });
      this.data = resp.data.datas;
      this.count = resp.data.count;
    },
    async del(id) {
      const resp = await api.approveDel(id);
      this.$Message.info(resp.message);
      this.getList(this.page, this.pageSize);
    },
    async edit(id, status) {
      const resp = await api.approveEdit(id, status);
      this.$Message.info(resp.message);
      this.getList(this.page, this.pageSize);
    },
    async download(id) {
      const resp = await api.approveDownload(id);
      window.open(resp.data);
    },

    changePage(val) {
      console.log("page: ", val);
      this.page = val;
      this.getList(this.page, this.pageSize);
    },
    changeSize(val) {
      console.log("size: ", val);
      this.pageSize = val;
      this.getList(this.page, this.pageSize);
    },
  },
};
</script>


<style scoped>
.progress {
  width: 100%;
}
.progress .search {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.search > div {
  display: flex;
  align-content: center;
}
.search span {
  width: 70px;
  text-align: center;
}
.search .item {
  display: flex;
  align-items: center;
}
.page {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
