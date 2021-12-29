<template>
  <div>
    <div class="right">
      <div class="top2">
        <button class="but col1" @click="bumen = true">{{ ste }}</button>
        <div class="block">
          <!-- <span class="demonstration">带快捷选项</span> -->
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <button class="but col1" @click="cha">查找</button>
        <button class="but col1" @click="dao">导出</button>
      </div>
      <!-- 岗位设置表 -->
      <el-table
        ref="singleTable"
        :data="tableData4"
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
        <el-table-column property="name" label="姓名"> </el-table-column>
        <el-table-column property="sector" label="部门"> </el-table-column>

        <el-table-column property="morningTime" label="上班打卡时间">
        </el-table-column>
        <el-table-column property="morningType" label="上班打卡状态">
        </el-table-column>
        <el-table-column property="afternoonTime" label="下班打卡时间">
        </el-table-column>
        <el-table-column property="afternoonType" label="下班打卡状态">
        </el-table-column>
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
    <!-- 部门树形结构 -->
    <el-dialog
      :visible.sync="bumen"
      :append-to-body="true"
      :destroy-on-close="true"
      title="修改"
      style="width: 800px; margin: auto"
    >
      <!-- 树形结构 -->
      <div class="xuan">
        <el-tree
          :data="datas"
          :props="defaultProps"
          default-expand-all
          ref="tree"
          show-checkbox
        ></el-tree>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="bumen = false">取 消</el-button>
        <el-button @click="exportr">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { gets } from "../request/wan";
// import URL2 from "../http/URL2";
export default {
  data() {
    return {
      // 分页
      currentPage: 1,
      pagesize: 50,
      fileList: [],
      counts: 0,
      tableData4: [],
      // 岗位设置
      // 自动获取父级
      postDepartments: [],
      bumen: false,
      // 组织构架
      datas: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      xuanz: "",
      ids: "",
      // 选择的部门
      ste: "选择部门",
      // 日期选择
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value2: "",
      times: "",
    };
  },
  created() {
    // 组织构架
    gets("sector/getSector")
      .then((res) => {
        this.datas = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // 时间
    handleSelect(e) {
      //获取到的e的数据入下
      // 0:Tue Jun 01 2021 08:00:00 GMT+0800 (中国标准时间) {}
      // 1:Fri Jun 11 2021 08:00:00 GMT+0800 (中国标准时间) {}

      let date = [];
      for (const i in e) {
        date.push(this.gettime(e[i]));
      }
      // console.log(date, "handleSelect");
      return date;
    },
    //时间处理函数
    gettime(data) {
      let value =
        data.getFullYear() +
        "-" +
        this.checkTime(data.getMonth() + 1) +
        "-" +
        this.checkTime(data.getDate());
      return value;
    },

    // 时间处理 如果时间小于10 ，则再前面加一个'0'
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    // 自动获取部门
    qing() {
      console.log(123);
      for (var i = 0; i < this.datas[0].children.length; i++) {
        const a = this.datas[0].children[i].sectorInNum;
        if (a != 0) {
          this.postDepartments.push(this.datas[0].children[i]);
        }
        for (var j = 0; j < this.datas[0].children[i].children.length; j++) {
          const a = this.datas[0].children[i].children[j].sectorInNum;
          if (a != 0) {
            this.postDepartments.push(this.datas[0].children[i].children[j]);
          }
        }
      }
    },
    // 考勤
    shuj() {
      this.$axios
        .get(
          "http://172.25.65.166:8888//report/selBySector" +
            "?sector=" +
            this.ste +
            "&time=" +
            this.times +
            "&page=" +
            this.currentPage +
            "&pageSize=" +
            this.pagesize
        )
        .then((res) => {
          console.log(res);
          this.counts = res.data.counts;
          this.tableData4 = res.data.items;
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

    // 导出
    exportr() {
      this.xuanz = this.$refs.tree.getCheckedNodes();
      // this.xuanz = this.$refs.tree.getCheckedNodes();
      this.ste = this.xuanz[0].label;
      this.bumen = false;
    },
    jiaoyan() {
      var ss = 0;
      this.times = this.handleSelect(this.value2);
      if (this.ste == "" || this.ste == "选择部门") {
        this.$message({
          message: "请选择部门",
          type: "error",
        });
        ss = 1;
        return ss;
      }
      if (this.times == "") {
        this.$message({
          message: "请选择时间",
          type: "error",
        });
        ss = 1;
        return ss;
      }
      return ss;
    },
    cha() {
      if (this.jiaoyan() == 0) {
        this.shuj();
      }
    },
    // 下载
    dao() {
      if (this.jiaoyan() == 0) {
        window.open(
          "http://172.25.65.166:8888/report/export" +
            "?sector=" +
            this.ste +
            "&time=" +
            this.times
        );
      }
    },
  },
};
</script>
<style scoped lang="less">
.a {
  display: none;
}
.el-form {
  .el-input {
    min-width: 180px;
  }
  .el-select {
    min-width: 170px;
    width: 100%;
  }
}
.xuan {
  width: 100%;
  height: 380px;
  overflow: auto;
}
.right {
  width: 100%;
  height: 100%;
  background: #ffffff;

  .top2 {
    height: 50px;
    width: 100%;
    display: flex;
    .block {
      // width: 500px;
      position: relative;
      left: 10px;
      top: 5px;
    }
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