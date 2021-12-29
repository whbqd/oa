<template>
  <div>
    <div class="right">
      <div class="top2">
        <button class="but col1 a" @click="xin">新增</button>
        <button class="but col1 a" @click="xuan">筛选</button>
      </div>
      <!-- 审批人设置表 -->
      <el-table
        ref="singleTable"
        :data="tableData5"
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
        <el-table-column property="names" label="人员"> </el-table-column>
        <el-table-column property="type" label="用途"> </el-table-column>
        <el-table-column property="line" label="条线"> </el-table-column>
        <el-table-column property="annx" label="备注"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button
                @click="handleClick5(scope.row)"
                type="text"
                size="small"
                ><span class="iconfont icon-bianji sosuo a"></span
              ></el-button> -->
            <el-button type="text" size="small" @click="deleteRow5(scope.row)"
              ><span class="iconfont icon-shanchu sosuo col a"></span
            ></el-button> </template
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
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
    <!-- 审批人设置新增 -->
    <el-dialog
      :visible.sync="shengpiNew"
      :append-to-body="true"
      title="新增"
      style="width: 1200px; margin: auto"
    >
      <div class="el-dialog-div">
        <span class="iconfont icon-tianjia1 tianJ" @click="addDomain"></span>
        <el-form
          :model="dynamicValidateForm"
          label-width="120px"
          v-for="domain in dynamicValidateForm.domains"
          :key="domain.key"
        >
          <el-col :span="20">
            <el-form-item label="审批人 ：">
              <div @click="show = true">
                <el-input v-model="domain.name" placeholder="请选择"></el-input>
                <span
                  class="iconfont icon-shanchu shan"
                  @click.prevent="removeDomain(domain)"
                ></span>
              </div>
            </el-form-item>
          </el-col>
        </el-form>
        <el-form class="form" :model="spNews" label-width="120px">
          <el-col :span="22">
            <el-form-item label="模板用途 ：">
              <el-select v-model="spNews.wei" placeholder="请选择所在岗位">
                <el-option
                  v-for="(types, index) in types"
                  :key="index"
                  :label="types.approvalType"
                  :value="types.approvalType"
                ></el-option>
                <!-- <el-option label="人员调动" value="人员调动"></el-option>
                <el-option label="员工离职" value="员工离职"></el-option>
                <el-option label="岗位调整" value="岗位调整"></el-option>
                <el-option label="员工晋升" value="员工晋升"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="申请原由 ：">
              <el-input
                v-model="spNews.annx"
                type="textarea"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="22">
            <el-form-item label="所属条线 ：">
              <el-select v-model="spNews.tiao" placeholder="请选择所属条线">
                <el-option label="维护" value="维护"></el-option>
                <el-option label="销售" value="销售"></el-option>
                <el-option label="工程" value="工程"></el-option>
                <el-option label="信息" value="信息"></el-option>
                <el-option label="综合" value="综合"></el-option>
                <el-option label="市场" value="市场"></el-option></el-select
            ></el-form-item>
          </el-col>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shengpiNew = false">取 消</el-button>
        <el-button @click="mobanNew">确定</el-button>
      </div>
    </el-dialog>
    <!-- 审批人设置筛选 -->
    <el-dialog
      :visible.sync="shaixuanMO"
      :append-to-body="true"
      title="新增"
      style="width: 1200px; margin: auto"
    >
      <div class="el-dialog-div">
        <el-form class="form" :model="shaixuanForm" label-width="120px">
          <el-col :span="22">
            <el-form-item label="通途 ：">
              <el-input v-model="shaixuanForm.type"></el-input> </el-form-item
          ></el-col>
          <el-col :span="22">
            <el-form-item label="条线 ：">
              <el-input v-model="shaixuanForm.line"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shaixuanMO = false">取 消</el-button>
        <el-button @click="shaixuan">确定</el-button>
      </div>
    </el-dialog>
    <!-- 审批人设置修改 -->
    <!-- <el-dialog
      :visible.sync="shengpiXui"
      :append-to-body="true"
      title="修改"
      style="width: 1200px; margin: auto"
    >
      <div style="height: 100px">
        <span class="iconfont icon-tianjia1 tianJ" @click="addDomain"></span>
        <el-form
          :model="dynamicValidateForm2"
          label-width="120px"
          v-for="domain in dynamicValidateForm2.domains"
          :key="domain.key"
        >
          <el-col :span="20">
            <el-form-item label="审批人 ：">
              <div @click="show = true">
                <el-input v-model="domain.name" placeholder="请选择"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <span
              class="iconfont icon-shanchu shan"
              @click.prevent="removeDomain(domain)"
            ></span>
          </el-col>
        </el-form>
        <el-form class="form" :model="spXiu" label-width="120px">
          <el-col :span="22">
            <el-form-item label="模板用途 ：">
              <el-select v-model="spXiu.wei" placeholder="请选择所在岗位">
                <el-option label="岗位申请" value="岗位申请"></el-option>
                <el-option label="人员调动" value="人员调动"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="申请原由 ：">
              <el-input
                v-model="spXiu.annx"
                type="textarea"
              ></el-input> </el-form-item
          ></el-col>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shengpiXui = false">取 消</el-button>
        <el-button @click="hetongXuis5">确定</el-button>
      </div>
    </el-dialog> -->
    <!-- 人选择弹出 -->
    <el-dialog
      title="选择"
      :visible.sync="show"
      append-to-body
      destroy-on-close
    >
      <div style="width: 100%">
        <personnel2></personnel2>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="reny">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { gets, postp, posts } from "../request/wan";
import personnel2 from "../components/personnel2";
export default {
  data() {
    return {
      // 分页
      currentPage: 1,
      pagesize: 50,
      fileList: [],
      counts: 0,
      tableData5: [],
      // 模板设置
      // 模板设置新增弹出
      shengpiNew: false,
      shaixuanMO: false,
      // 模板设置修改弹出
      // shengpiXui: false,
      // 模板设置新增
      spNews: {
        wei: "",
        approvalIds: "",
        annx: "",
        tiao: "",
      },
      // 筛选
      shaixuanForm: {
        type: "",
        line: "",
        page: "",
        pageSize: "",
      },
      //  模板设置新增人员
      dynamicValidateForm: {
        domains: [
          {
            name: "",
            id: "1",
            ids: "",
          },
        ],
      },
      spXiu: {
        wei: "",
        approvalIds: "",
        annx: "",
      },
      // 修改的id
      ids: "",
      // 人员位置
      // hao: "",
      i: 1,
      // 人员点击
      show: false,
      // 类型
      types: "",
      shai: 0,
    };
  },
  components: { personnel2 },
  created() {
    gets("ApprovalTem/getApprovalTem", {
      pageSize: this.pagesize,
      page: this.currentPage,
    }).then((res) => {
      console.log(res);
      this.tableData5 = res.data.items;
      this.counts = res.data.counts;
      // console.log(res.data);
    });
    // 类型
    gets("ApprovalTypes/getApprovalTypes").then((res) => {
      this.types = res.data;
      console.log(this.types);
    });
  },
  methods: {
    // 新建
    xin() {
      this.shengpiNew = true;
      this.spNews.approvalIds = "";
      this.dynamicValidateForm.domains = [
        {
          name: "",
          id: "1",
          ids: "",
        },
      ];
    },
    xuan() {
      this.shaixuanMO = true;
      this.shaixuanForm = {
        type: "",
        line: "",
        page: "",
        pageSize: "",
      };
    },
    shaixuan() {
      this.shai = 1;
      this.shaixuanForm.page = this.currentPage;
      this.shaixuanForm.pageSize = this.pagesize;
      postp(
        "ApprovalTem/getApprovalTemByApprovalTemVo",
        this.shaixuanForm
      ).then((res) => {
        console.log(res);
        this.tableData5 = res.data.items;
        this.counts = res.data.counts;
        this.shaixuanMO = false;
      });
    },
    // 模板
    shuj() {
      gets("ApprovalTem/getApprovalTem", {
        pageSize: this.pagesize,
        page: this.currentPage,
      }).then((res) => {
        console.log(res);
        this.tableData5 = res.data.items;
        this.counts = res.data.counts;
      });
    },
    // 人员选择
    reny() {
      var len = 0;
      len = this.$store.name.length;
      if (len == 1) {
        console.log(this.$store.fromPerson);
        this.dynamicValidateForm.domains[this.i - 1].name =
          this.$store.fromPerson.userName;
        // console.log(this.dynamicValidateForm.domains, 9999);
        this.dynamicValidateForm.domains[this.i - 1].ids =
          this.$store.fromPerson.id;
        this.show = false;
      } else {
        this.$alert("请选择一人", "提示", {
          confirmButtonText: "确定",
        });
        this.show = true;
      }
    },
    // 删除表单
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
      this.i = this.i - 1;
    },
    // 添加表单
    addDomain() {
      this.i = this.i + 1;
      this.dynamicValidateForm.domains.push({
        name: "",
        id: this.i,
        ids: "",
        // key: Date.now(),
      });
    },

    // 分页
    handleSizeChange: function (val) {
      this.pagesize = val;
      if (this.shai == 0) {
        this.shuj();
      } else {
        this.shaixuan();
      }
    },
    // 数据条数
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      if (this.shai == 0) {
        this.shuj();
      } else {
        this.shaixuan();
      }
    },
    // 模板设置新增
    mobanNew() {
      this.dynamicValidateForm.domains.forEach((res) => {
        this.spNews.approvalIds = this.spNews.approvalIds + res.ids + ",";
      });
      this.spNews.approvalIds = this.spNews.approvalIds.substr(
        0,
        this.spNews.approvalIds.length - 1
      );
      postp("ApprovalTem/insertApprovalTem", {
        approvalIds: this.spNews.approvalIds,
        annx: this.spNews.annx,
        type: this.spNews.wei,
        line: this.spNews.tiao,
      }).then((res) => {
        console.log(res);
        this.shengpiNew = false;
        this.shuj();
        this.$message({
          type: "success",
          message: "新增成功!",
        });
      });
      // console.log(this.spNews);
    },
    // 模板设置删除
    deleteRow5(row) {
      // console.log(row.id);
      this.$confirm("是否删除当前模板, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          posts("ApprovalTem/deleteApprovalTem", { ids: row.id }).then(
            (res) => {
              console.log(res);
              this.shuj();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 模板设置修改弹出
    // handleClick5(row) {
    //   // console.log(row.names);
    //   row.names.forEach((res) => {
    //     console.log(res);
    //   });
    //   this.spXiu.annx = row.annx;
    //   this.spXiu.wei = row.type;
    //   this.shengpiXui = true;
    // },
    // 模板设置修改确定
    hetongXuis5() {},
  },
  watch: {
    shengpiNew() {
      if (this.shengpiNew == false) {
        this.i = 1;
        this.dynamicValidateForm = {
          domains: [
            {
              name: "",
              id: "1",
              ids: "",
            },
          ],
        };
        this.spNews = {
          wei: "",
          approvalIds: "",
          annx: "",
          tiao: "",
        };
      }
    },
  },
};
</script>
<style scoped lang="less">
.el-dialog-div {
  height: 50vh;
  overflow: auto;
}
.tianJ {
  font-size: 25px;
  position: relative;
  top: 40px;
  left: 520px;
  color: #dfdfdf;
}
.shan {
  font-size: 20px;
  position: relative;
  left: 10px;
  top: 6px;
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