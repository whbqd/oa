<template>
  <div>
    <div class="right">
      <div class="top2">
        <button class="but col1 a" @click="news">新增</button>
      </div>
      <!-- 隶属单位表 -->
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
        <el-table-column property="unitName" label="名称"> </el-table-column>
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
    <!-- 隶属单位新增 -->
    <el-dialog
      :visible.sync="dialogFormVisiblers"
      :append-to-body="true"
      title="新增"
      style="width: 800px; margin: auto"
    >
      <div style="height: 100px">
        <el-form :model="lsNews" label-width="140px" class="froms">
          <el-col :span="7">
            <el-form-item label="隶属单位名称 ：">
              <el-input v-model="lsNews.unitName"></el-input>
            </el-form-item> </el-col
        ></el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblers = false">取 消</el-button>
        <el-button @click="lishu">确定</el-button>
      </div>
    </el-dialog>
    <!-- 隶属单位修改 -->
    <el-dialog
      :visible.sync="lishuXui"
      :append-to-body="true"
      title="修改"
      style="width: 800px; margin: auto"
    >
      <div style="height: 100px">
        <el-form :model="lsXiu" label-width="140px" class="froms">
          <el-col :span="7">
            <el-form-item label="隶属单位名称 ：">
              <el-input v-model="lsXiu.unitName"></el-input>
            </el-form-item> </el-col
        ></el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lishuXui = false">取 消</el-button>
        <el-button @click="lishuXuis2">确定</el-button>
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
      // 隶属单位
      // 隶属单位新增弹出
      dialogFormVisiblers: false,
      // 隶属单位修改弹出
      lishuXui: false,
      // 隶属单位新增
      lsNews: { unitName: "" },
      // 隶属单位修改
      lsXiu: { unitName: "" },
    };
  },
  created() {
    gets("inforConf/selSubunits").then((res) => {
      this.tableData = res.data.data.records;
      this.counts = res.data.data.total;
    });
  },
  methods: {
    news() {
      this.dialogFormVisiblers = true;
      this.lsNews.unitName = "";
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
    // 隶属单位数据
    shuj() {
      gets("inforConf/selSubunits").then((res) => {
        this.tableData = res.data.data.records;
        this.counts = res.data.data.total;
      });
    },
    // 隶属单位新增
    lishu() {
      postp("inforConf/insSubunits", { unitName: this.lsNews.unitName }).then(
        (res) => {
          console.log(res);
          this.shuj();
          this.dialogFormVisiblers = false;
                              this.$message({
              type: "success",
              message: "新增成功!",
            });
        }
      );
    },
    // 隶属单位删除
    deleteRow(row) {
      console.log(row.id);
      gets("inforConf/delSubunits" + "?ids=" + row.id).then(() => {
        this.shuj();
      });
    },
    // 隶属单位修改弹出
    handleClick(row) {
      // console.log(row);
      this.lishuXui = true;
      this.lsXiu.unitName = row.unitName;

      this.ids = row;
    },
    // 隶属单位修改确定
    lishuXuis2() {
      // console.log(this.ids.unitName);
      this.ids.unitName = this.lsXiu.unitName;
      postp("inforConf/uplSubunits", this.ids).then((res) => {
        console.log(res);
        this.shuj();
        this.lishuXui = false;
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