<template>
  <div>
    <div class="right">
      <div class="top2">
        <button class="but col1 a" @click="news">新增</button>
      </div>
      <!-- 合同性质表 -->
      <el-table
        ref="singleTable"
        :data="tableData2"
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
        <el-table-column property="contractNature" label="名称">
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick2(scope.row)" type="text" size="small"
              ><span class="iconfont icon-bianji sosuo a"></span
            ></el-button>
            <el-button type="text" size="small" @click="deleteRow2(scope.row)"
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
    <!-- 合同性质新增 -->
    <el-dialog
      :visible.sync="hetongNew"
      :append-to-body="true"
      title="新增"
      style="width: 800px; margin: auto"
    >
      <div style="height: 100px">
        <el-form :model="htNews" label-width="140px" class="froms">
          <el-col :span="7">
            <el-form-item label="合同性质名称 ：">
              <el-input v-model="htNews.contractNature"></el-input>
            </el-form-item> </el-col
        ></el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hetongNew = false">取 消</el-button>
        <el-button @click="hetong">确定</el-button>
      </div>
    </el-dialog>
    <!-- 合同性质修改 -->
    <el-dialog
      :visible.sync="hetongXui"
      :append-to-body="true"
      title="修改"
      style="width: 800px; margin: auto"
    >
      <div style="height: 100px">
        <el-form :model="htXiu" label-width="140px" class="froms">
          <el-col :span="7">
            <el-form-item label="合同性质名称 ：">
              <el-input v-model="htXiu.contractNature"></el-input>
            </el-form-item> </el-col
        ></el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hetongXui = false">取 消</el-button>
        <el-button @click="hetongXuis2">确定</el-button>
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
      tableData2: [],
      // 合同性质
      // 合同性质新增弹出
      hetongNew: false,
      // 合同性质修改弹出
      hetongXui: false,
      // 合同性质新增
      htNews: { contractNature: "" },
      // 合同性质修改
      htXiu: { contractNature: "" },
    };
  },
  created() {
    gets("contract/selContract").then((res) => {
      this.tableData2 = res.data.items;
      this.counts = res.data.counts;
    });
  },
  methods: {
    news() {
      this.hetongNew = true;
      this.htNews.contractNature = "";
    },
    // 合同性质
    shuj() {
      gets("contract/selContract").then((res) => {
        this.tableData2 = res.data.items;
        this.counts = res.data.counts;
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
    // 合同性质新增
    hetong() {
      postp("contract/insContract", {
        contractNature: this.htNews.contractNature,
      }).then((res) => {
        console.log(res);
        this.shuj();
        this.hetongNew = false;
        this.$message({
          type: "success",
          message: "新增成功!",
        });
      });
    },
    // 合同性质删除
    deleteRow2(row) {
      // console.log(row.id);
      gets("contract/delContract" + "?ids=" + row.id).then(() => {
        this.shuj();
      });
    },
    // 合同性质修改弹出
    handleClick2(row) {
      // console.log(row);
      this.hetongXui = true;
      this.htXiu.contractNature = row.contractNature;
      this.ids = row;
    },
    // 合同性质修改确定
    hetongXuis2() {
      this.ids.contractNature = this.htXiu.contractNature;
      postp("contract/uplContract", this.ids).then((res) => {
        console.log(res);
        this.shuj();
        this.hetongXui = false;
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