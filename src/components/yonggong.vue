<template>
  <div>
    <div class="right">
      <div class="top2">
        <button class="but col1 a" @click="news">新增</button>
      </div>
      <!-- 用工属性表 -->
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
        <el-table-column property="details" label="名称"> </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick3(scope.row)" type="text" size="small"
              ><span class="iconfont icon-bianji sosuo a"></span
            ></el-button>
            <el-button type="text" size="small" @click="deleteRow3(scope.row)"
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
        :total="counts"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
    <!-- 用工属性新增 -->
    <el-dialog
      :visible.sync="yonggNew"
      :append-to-body="true"
      title="新增"
      style="width: 800px; margin: auto"
    >
      <div style="height: 100px">
        <el-form :model="ygNews" label-width="140px" class="froms">
          <el-col :span="7">
            <el-form-item label="用工属性名称 ：">
              <el-input v-model="ygNews.details"></el-input>
            </el-form-item> </el-col
        ></el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="yonggNew = false">取 消</el-button>
        <el-button @click="yonggong">确定</el-button>
      </div>
    </el-dialog>
    <!-- 用工属性修改 -->
    <el-dialog
      :visible.sync="yonggXui"
      :append-to-body="true"
      title="修改"
      style="width: 800px; margin: auto"
    >
      <div style="height: 100px">
        <el-form :model="ygXiu" label-width="140px" class="froms">
          <el-col :span="7">
            <el-form-item label="用工属性名称 ：">
              <el-input v-model="ygXiu.details"></el-input>
            </el-form-item> </el-col
        ></el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="yonggXui = false">取 消</el-button>
        <el-button @click="hetongXuis3">确定</el-button>
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
      // 用工属性
      // 用工属性新增弹出
      yonggNew: false,
      // 用工属性修改弹出
      yonggXui: false,
      // 用工属性新增
      ygNews: { details: "" },
      // 用工属性修改
      ygXiu: { details: "" },
    };
  },
  created() {
    gets("employ/selEmploy").then((res) => {
      this.tableData3 = res.data.data.records;
      this.counts = res.data.data.total;
    });
  },
  methods: {
    news() {
      this.yonggNew = true;
      this.ygNews.details = "";
    },
    // 合同性质
    shuj() {
      gets("employ/selEmploy").then((res) => {
        this.tableData3 = res.data.data.records;
        this.counts = res.data.data.total;
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
    // 用工属性新增
    yonggong() {
      postp("employ/insEmploy", {
        details: this.ygNews.details,
      }).then((res) => {
        console.log(res);
        this.shuj();
        this.yonggNew = false;
        this.$message({
          type: "success",
          message: "新增成功!",
        });
      });
    },
    // 用工属性删除
    deleteRow3(row) {
      // console.log(row.id);
      gets("employ/delEmploy" + "?ids=" + row.id).then(() => {
        this.shuj();
      });
    },
    // 用工属性修改弹出
    handleClick3(row) {
      // console.log(row);
      this.yonggXui = true;
      this.ygXiu.details = row.details;
      this.ids = row;
    },
    // 用工属性修改确定
    hetongXuis3() {
      this.ids.details = this.ygXiu.details;
      postp("employ/uplEmploy", this.ids).then((res) => {
        console.log(res);
        this.shuj();
        this.yonggXui = false;
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