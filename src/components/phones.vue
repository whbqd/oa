<template>
  <div>
    <div class="right">
      <div class="top2">
        <button class="but col1 a" @click="news">新增</button>
      </div>
      <!-- 职称表 -->
      <el-table
        ref="singleTable"
        :data="tableData3"
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
        <el-table-column property="checkPhone" label="电话"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deleteRow3(scope.row)"
              ><span class="iconfont icon-shanchu sosuo col a"></span
            ></el-button> </template
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        :total="counts"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
    <!-- 职称新增 -->
    <el-dialog
      :visible.sync="zhicNew"
      :append-to-body="true"
      title="新增"
      style="width: 800px; margin: auto"
    >
      <div style="height: 100px">
        <el-form :model="phone" class="froms">
          <el-col :span="24">
            <el-form-item label="携号转网手机号 ：">
              <el-input v-model="phone.checkPhone"></el-input>
            </el-form-item> </el-col
        ></el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="zhicNew = false">取 消</el-button>
        <el-button @click="zhicheng">确定</el-button>
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
      tableData3: [],
      // 职称
      // 职称新增弹出
      zhicNew: false,
      // 职称修改弹出
      zhicXui: false,
      // 职称新增
      phone: { checkPhone: "" },
    };
  },
  created() {
    gets("Phone/getCheckPhonePage").then((res) => {
      console.log(res, "复用");
      this.tableData3 = res.data.items;
      this.counts = res.data.items.length;
    });
  },
  methods: {
    news() {
      this.zhicNew = true;
      this.phone.professionalTitle = "";
      this.phone.description = "";
    },
    // 复用
    shuj() {
      gets("Phone/getCheckPhonePage").then((res) => {
        this.tableData3 = res.data.items;
        this.counts = res.data.items.length;
      });
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
    // 职称新增
    zhicheng() {
      postp("/Phone/insertPhone", {
        checkPhone: this.phone.checkPhone,
      }).then((res) => {
        console.log(res);
        this.shuj();
        this.zhicNew = false;
        this.$message({
          type: "success",
          message: "新增成功!",
        });
      });
    },
    // 职称删除
    deleteRow3(row) {
      // console.log(row.id);
      const ids = [];
      ids.push(row.id);
      this.$confirm("是否删除当前职称, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          postp("Phone/deletePhone" + "?ids=" + ids).then(() => {
            this.shuj();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
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