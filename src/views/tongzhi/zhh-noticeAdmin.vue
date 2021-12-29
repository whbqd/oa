<template>
  <div class="noticeAdmin">
    <div class="top">
      <input
        type="text"
        name="lookup"
        placeholder="搜索标题，编号，正文内容"
        autocomplete="off"
        class="yan"
      />
      <div><span class="iconfont icon-sousuo sosuo"></span></div>
      <el-tooltip class="item" effect="dark" content="新建" placement="top">
        <span class="iconfont icon-xinjian icon" @click="edit"></span>
      </el-tooltip>
    </div>
    <!-- 表格 -->
    <el-table
      ref="singleTable"
      stripe
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      height="505"
      id="se"
      :cell-style="{ padding: '1px', textAlign: 'center', fontSize: '12px' }"
      :header-cell-style="{
        color: '#606266',
        textAlign: 'center',
        fontSize: '14px',
      }"
    >
      <el-table-column width="50"> </el-table-column>
      <el-table-column property="editName" label="发起人"> </el-table-column>
      <el-table-column property="title" label="标题"> </el-table-column>
      <el-table-column property="types" label="类型"> </el-table-column>
      <el-table-column property="sendTime" label="发布时间"> </el-table-column>
      <!-- <el-table-column label="发布状态">
        <templat                                                    e slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="seet(scope.row)"
            ><span class="iconfont icon-yanjing xiu"></span
          ></el-button>
          <el-button type="text" size="small" @click="xia(scope.row)"
            ><span class="iconfont icon-xiazai xiu"></span
          ></el-button>
          <!-- <el-button type="text" size="small"
            ><span class="iconfont icon-bianji xiu col"></span
          ></el-button>  -->
        </template></el-table-column
      >
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pagesize"
      :total="counts"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>
<script>
import { gets } from "../../request/wan";
// import url from "../../http/URL2";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 50,
      counts: 0,
    };
  },
  created() {
    // 请求通知数据
    gets("Notification/getNotification", {
      pagesize: this.pagesize,
      page: this.currentPage,
      type: 0,
    }).then((res) => {
      console.log(res);
      this.tableData = res.data.items;
      this.counts = res.data.counts;
      // this.counts = res.data.counts;
      // console.log("64", res.data);
    });
  },
  methods: {
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    // 新建
    edit() {
      this.$router.push("/homepage/noticeEdit");
    },
    seet(row) {
      this.$router.push("/homepage/read");
      this.$store.state.tongId = row.id;
    },
    xia(row) {
      this.$router.push("/homepage/yue");
      this.$store.state.tongId = row.id;
      // window.open(
      //   url.xia + "Notification/notificationRecordDown" + "?id=" + row.id
      // );
      // console.log(row);
    },
  },
};
</script>
<style scoped lang="less">
.noticeAdmin {
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #ffffff;
}
.top {
  height: 50px;
  background: #dddddd;
  .yan {
    background: #ffffff;
    width: 250px;
    height: 30px;
    border-radius: 20px;
    padding-left: 20px;
    margin-top: 10px;
    margin-left: 30px;
  }
  .sosuo {
    position: absolute;
    left: 250px;
    top: 13px;
    color: rgb(165, 165, 165);
  }
  .col {
    color: #000;
  }
  .icon {
    font-size: 22px;
    line-height: 20px;
  }
  .icon:hover {
    color: #ffffff;
  }
  .item {
    width: 10px;
    height: 30px;
    position: relative;
    left: 380px;
    top: -25px;
    background: #dddddd;
    border: none;
  }
}
.xiu {
  font-size: 8px;
}
.col {
  color: #a2a2a2;
  font-size: 18px;
}
</style>