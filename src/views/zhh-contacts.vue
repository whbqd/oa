<template>
  <div class="contacts">
    <!-- 左边 -->
    <div class="left">
      <!-- <div class="so">
        <input
          type="text"
          name="lookup"
          placeholder="搜索部门，人名"
          autocomplete="off"
          class="yan"
        />
        <div class="ding"><span class="iconfont icon-sousuo"></span></div>
      </div> -->
      <div class="top">
        <p class="font">组织构架</p>
      </div>
      <div class="xuan">
        <el-tree
          :data="data"
          :props="defaultProps"
          default-expand-all
          show-checkbox
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
        ></el-tree>
      </div>
    </div>
    <div class="right">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        height="550"
        id="se"
        :cell-style="{ padding: '1px', textAlign: 'center', fontSize: '12px' }"
        :header-cell-style="{
          background: '#dddddd',
          color: '#606266',
          textAlign: 'center',
          fontSize: '14px',
        }"
      >
        <el-table-column width="50"> </el-table-column>
        <el-table-column property="sector" label="部门"> </el-table-column>
        <el-table-column property="name" label="姓名"> </el-table-column>
        <el-table-column property="posts" label="岗位"> </el-table-column>
        <el-table-column property="phone" label="手机" min-width="100px">
        </el-table-column>
        <el-table-column property="groupNumber" label="集团号">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              ><span class="iconfont icon-bianji sosuo"></span
            ></el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="
                deleteRow(scope.$index, tableData, scope.row)
              "
              ><span class="iconfont icon-shanchu sosuo col"></span
            ></el-button> </template
        ></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { gets, posts } from "../request/wan";
export default {
  data() {
    return {
      // 左边
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 右边
      tableData: [],
      song: "",
      // 分页
      currentPage: 1,
      pagesize: 50,
      fileList: [],
      counts: 0,
      // 当前单机区县
      dare: "",
    };
  },
  // 打开页面
  created() {
    // 组织构架
    gets("sector/getSector")
      .then((res) => {
        // console.log(res.data);
        this.data = res.data;
        // console.log("d ",this.data)
      })
      .catch((error) => {
        console.log(error);
      });
    // 人员名单
    gets("worker/getWorker")
      .then((res) => {
        this.tableData = res.data.items;
        // console.log(res.data);
        // 数据总条数
        this.counts = res.data.counts;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // 请求人员数据
    shuj() {
      gets("worker/getWorker", {
        pagesize: this.pagesize,
        page: this.currentPage,
      })
        .then((res) => {
          // console.log(res.data.items);
          this.tableData = res.data.items;
          // this.song = res.data.items;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 请求组织构架
    zhuz() {
      gets("sector/getSector")
        .then((res) => {
          // console.log(res.data);
          this.data = res.data;
          // console.log("d ",this.data)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 请求区县人员数据
    shujs() {
      const aa = this.dare;
      // console.log(aa, 7897);
      gets("user/getUserBySectorPage", {
        sector: aa,
        pagesize: this.pagesize,
        page: this.currentPage,
      })
        .then((res) => {
          this.tableData = res.data.items;
          this.counts = res.data.counts;

          console.log(res, 456);
          // console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 单机
    handleNodeClick(data) {
      this.dare = data.label;
      this.currentPage = 1;
      gets("user/getUserBySectorPage", {
        sector: data.label,
        pagesize: this.pagesize,
        page: this.currentPage,
      })
        .then((res) => {
          this.tableData = res.data.items;
          this.counts = res.data.counts;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 全选
    handleCheckChange(data) {
      console.log(data.label);
    },
    // 右边
    // 查看
    handleClick(row) {
      console.log(row);
    },
    // 删除
    deleteRow(index, rows, row) {
      rows.splice(index, 1);
      console.log(row.id);
      posts("worker/deleteWorker", { id: row.id })
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
    },
    // 分页
    // 每页数据
    handleSizeChange: function (val) {
      this.pagesize = val;
            if (this.dare) {
        this.shujs();
      } else {
        this.shuj();
      }
    },
    // 页码
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
            if (this.dare) {
        this.shujs();
      } else {
        this.shuj();
      }
    },
  },
};
</script>
<style scoped lang="less">
.contacts {
  width: 100%;
  height: 100%;
  display: flex;
}
.left {
  width: 30%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .so {
    height: 50px;
    .yan {
      border: 1px solid #d3d3d3;
      width: 60%;
      height: 30px;
      border-radius: 20px;
      padding-left: 15%;
      margin-top: 10px;
      margin-left: 17%;
    }
    .ding {
      width: 20px;
      position: relative;
      left: 25%;
      top: -25px;
      color: #d3d3d3;
    }
  }
  .xuan {
    width: 100%;
    height: 500px;
    overflow: auto;
  }
  .top {
    width: 100%;
    height: 40px;
    background: #dddddd;
    .font {
      font-size: 15px;
      line-height: 40px;
      font-weight: bold;
      margin-left: 20px;
    }
  }
}
.right {
  width: 68%;
  height: 100%;
  background: #ffffff;
  margin-left: 2%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>