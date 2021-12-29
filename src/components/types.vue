<template>
  <div>
    <div class="right">
      <div class="top2">
        <button class="but col1 a" @click="news">新增</button>
      </div>
      <!-- 审批名称表 -->
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        height="460"
        id="se"
        :cell-style="{
          padding: '1px',
          textAlign: 'center',
          fontSize: '12px',
        }"
        :header-cell-style="{
          background: '#dddddd',
          color: '#606266',
          textAlign: 'center',
          fontSize: '14px',
        }"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column property="id" label="ID"> </el-table-column>
        <el-table-column property="approvalType" label="名称">
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              ><span class="iconfont icon-bianji sosuo a"></span
            ></el-button>
            <el-button type="text" size="small" @click="deleteRow(scope.row)"
              ><span class="iconfont icon-shanchu sosuo col a"></span
            ></el-button> </template
        ></el-table-column> -->
      </el-table>
      <!-- 分页 -->
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
    <!-- 审批名称新增 -->
    <el-dialog
      :visible.sync="dialogFormVisiblers"
      :append-to-body="true"
      title="新增"
      style="width: 800px; margin: auto"
    >
      <div style="height: 100px">
        <el-form :model="types" label-width="140px" class="froms">
          <el-col :span="7">
            <el-form-item label="审批名称 ：">
              <el-input v-model="types.approvalType"></el-input>
            </el-form-item> </el-col
        ></el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblers = false">取 消</el-button>
        <el-button @click="leixing">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { gets, postp } from "../request/wan";
export default {
  data() {
    return {
      // 分页
      currentPage: 1,
      pagesize: 50,
      fileList: [],
      counts: 0,
      tableData: [],
      // 审批名称
      // 审批名称新增弹出
      dialogFormVisiblers: false,
      // 审批名称新增
      types: { approvalType: "" },
    };
  },
  created() {
    gets("ApprovalTypes/getApprovalTypes").then((res) => {
      console.log(res);
      this.tableData = res.data;
      this.counts = res.data.length;
    });
  },
  methods: {
    news() {
      this.dialogFormVisiblers = true;
      this.types.approvalType = "";
    },
    // 分页
    handleSizeChange: function (val) {
      this.pagesize = val;

      this.shuj();
    },
    // 数据条数
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;

      this.shuj();
    },
    // 审批名称数据
    shuj() {
      gets("ApprovalTypes/getApprovalTypes").then((res) => {
        console.log(res);
        this.tableData = res.data;
        this.counts = res.data.length;
      });
    },
    // 审批名称新增
    leixing() {
      postp("ApprovalTypes/insertApprovalTypes", {
        approvalType: this.types.approvalType,
      }).then((res) => {
        console.log(res);
        this.shuj();
        this.dialogFormVisiblers = false;
        this.$message({
          type: "success",
          message: "新增成功!",
        });
      });
    },
  },
};
</script>
<style scoped lang="less">
.el-form {
  .el-input {
    min-width: 180px;
  }
  .el-select {
    min-width: 170px;
    width: 100%;
  }
}
.right {
  width: 100%;
  height: 100%;
  background: #ffffff;

  .top2 {
    height: 50px;
    width: 100%;
    display: flex;
    .but {
      width: 100px;
      height: 30px;
      color: #ffffff;
      border-radius: 3px;
      margin-top: 10px;
      margin-left: 30px;
    }
    .col1 {
      background-color: #0077f1;
    }
  }
}
</style>