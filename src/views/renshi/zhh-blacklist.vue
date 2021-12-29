<template>
  <div class="noticeAdmin">
    <div class="top">
      <button class="but col1" @click="lookup">查找</button>
      <!-- <button class="but col2">批量删除</button> -->
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
        background: '#dddddd',
        color: '#606266',
        textAlign: 'center',
        fontSize: '14px',
      }"
    >
      <el-table-column type="selection"> </el-table-column>

      <el-table-column property="name" label="姓名"> </el-table-column>
      <el-table-column property="card" label="身份证"> </el-table-column>
      <el-table-column property="sector" label="所在部门"> </el-table-column>
      <el-table-column property="infoDate" label="入职日期"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small"
            ><span
              class="iconfont icon-yanjing xiu"
              @click="seet(scope.row)"
            ></span
          ></el-button>
          <el-button type="text" size="small"
            ><span
              class="iconfont icon-shanchu xiu col a"
              @click="shan(scope.row)"
              v-test="{ name: '删除黑名单' }"
            ></span
          ></el-button> </template
      ></el-table-column>
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
    <!-- 弹出查看黑名单 -->
    <el-dialog
      title="拉入黑名单"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      lock-scroll
    >
      <!-- 选择成员 -->
      <div class="kuan">
        <div class="pic"></div>
        <el-form :model="form" class="form" label-width="220px">
          <el-form-item label="姓名 ：">
            <div @click="show = true">
              <el-input v-model="form.name" placeholder="请选择"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="身份证 ：">
            <el-input v-model="form.card"></el-input
          ></el-form-item>
          <el-form-item label="部门 ：">
            <el-input v-model="form.sector"></el-input
          ></el-form-item>
          <el-form-item label="入职日期 ：">
            <el-input v-model="form.infoDate"></el-input
          ></el-form-item>
          <el-form-item label="备注 ：" style="margin-left: -200px">
            <el-input v-model="form.notes" type="textarea" :rows="5"></el-input
          ></el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="gets">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 高级查找黑名单 -->
    <el-dialog
      title="黑名单查询"
      :visible.sync="dialogFormVisible2"
      :append-to-body="true"
      lock-scroll
    >
      <!-- 选择成员 -->
      <div class="kuan">
        <el-form :model="form3" class="form" label-width="80px">
          <el-col :span="24">
            <el-form-item label="姓名 ：">
              <el-input v-model="form3.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="身份证 ：">
              <el-input v-model="form3.card" placeholder="请输入"></el-input
            ></el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="部门 ：">
              <el-input v-model="form3.sector" placeholder="请输入"></el-input
            ></el-form-item>
          </el-col>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="lookups">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 人选择弹出 -->
    <el-dialog
      title="选择"
      :visible.sync="show"
      append-to-body
      destroy-on-close
    >
      <div style="width: 100%">
        <personnel></personnel>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="reny">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { gets, posts, postp } from "../../request/wan";
import personnel from "../../components/personnel";
export default {
  data() {
    return {
      tableData: [],
      // 查看
      form: {
        name: "",
        card: "",
        sector: "",
        infoDate: "",
        notes: "",
      },
      // 修改
      form2: {
        name: "",
        card: "",
        sector: "",
        infoDate: "",
        notes: "",
      },
      // 高级查询
      form3: {
        name: "",
        card: "",
        sector: "",
      },
      // 弹出新增黑名单
      show: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      // 分页
      currentPage: 1,
      pagesize: 50,
      counts: 0,
    };
  },
  created() {
    // 黑名单
    gets("BlackList/getBlackList", {
      pageSize: this.pagesize,
      page: this.currentPage,
    })
      .then((res) => {
        console.log(res.data);
        this.counts = res.data.counts;
        this.tableData = res.data.items;
        console.log(this.tableData, 888);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  components: { personnel },

  methods: {
    shuj() {
      gets("BlackList/getBlackList", {
        pagesize: this.pagesize,
        page: this.currentPage,
      }).then((res) => {
        console.log(res);
        this.counts = res.data.counts;
        this.tableData = res.data.items;
      });
    },
    // 查询
    shuj2() {
      postp(
        "BlackList/selectBlackList" +
          "?pageSize=" +
          this.pagesize +
          "&page=" +
          this.currentPage,
        this.form3
      ).then((res) => {
        console.log(res);
        this.counts = res.data.counts;
        this.tableData = res.data.items;
        this.dialogFormVisible2 = false;
      });
    },
    // 人员选择
    reny() {
      var len = 0;
      len = this.$store.name.length;
      if (len == 1) {
        console.log(this.$store.fromPerson);
        this.form.name = this.$store.fromPerson.name;
        this.form.card = this.$store.fromPerson.card;
        this.form.sector = this.$store.fromPerson.sector;
        this.form.infoDate = this.$store.fromPerson.infoDate;
        // this.form.time2 = this.$store.fromPerson.name;
        this.show = false;
      } else {
        this.$alert("请选择一人", "提示", {
          confirmButtonText: "确定",
        });
        this.show = true;
      }
    },
    handleSizeChange: function (val) {
      this.pagesize = val;
      this.shuj2();
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.shuj2();
    },
    gets() {
      this.dialogFormVisible = false;
    },
    // 查看
    seet(row) {
      this.dialogFormVisible = true;
      this.form.name = row.name;
      this.form.card = row.card;
      this.form.sector = row.sector;
      this.form.infoDate = row.infoDate;
      this.form.notes = row.notes;
    },
    // 查询清空表单
    lookup() {
      this.dialogFormVisible2 = true;
      this.form3.name = "";
      this.form3.card = "";
      this.form3.sector = "";
    },
    // 查询
    lookups() {
      this.currentPage = 1;
      postp(
        "BlackList/selectBlackList" +
          "?pagesize=" +
          this.pagesize +
          "&page=" +
          this.currentPage,
        this.form3
      ).then((res) => {
        // console.log(res);
        this.counts = res.data.counts;
        this.tableData = res.data.items;
        this.dialogFormVisible2 = false;
        this.$message({
          type: "success",
          message: "查询成功!",
        });
      });
    },
    // 删除
    shan(row) {
      // console.log(row);
      // console.log(row.id);
      this.$confirm("此操作将该人员从黑名单中删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          posts("BlackList/deleteBlackList", { ids: row.id }).then((res) => {
            console.log(res);
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
.a {
  display: none;
}
.noticeAdmin {
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #ffffff;
}
.top {
  height: 50px;
  background: #ffffff;
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
  .col2 {
    background-color: #fe5722;
  }
  .yan {
    background: #ffffff;
    width: 250px;
    height: 30px;
    border-radius: 20px;
    padding-left: 20px;
    margin-top: 10px;
    margin-left: 30px;
    border: 0px;
  }
  .sosuo {
    position: absolute;
    left: 270px;
    top: 18px;
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

.kuan {
  display: flex;
  .pic {
    position: relative;
    width: 100px;
    height: 120px;
    top: 45px;
    left: 70px;
    border: 1px solid #d3d3d3;
  }
  .form {
    position: relative;
    width: 70%;
  }
}
</style>