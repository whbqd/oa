<template>
  <div class="noticeAdmin">
    <div class="top">
      <!-- <button class="but col1" @click="port">导出离职员工</button> -->
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
      <el-table-column property="submitName" label="发起人姓名">
      </el-table-column>
      <el-table-column property="submitSector" label="发起人部门">
      </el-table-column>
      <el-table-column property="approvalName" label="审批人" width="300px">
      </el-table-column>
      <el-table-column property="type" label="审批类型"> </el-table-column>
      <el-table-column property="applicantionName" label="人员">
      </el-table-column>
      <el-table-column property="totalApprovalStatus" label="审批状态">
        <template slot-scope="scope">
          <!-- 通过 -->
          <span
            class="iconfont icon-dui judge"
            :class="{ a: scope.row.totalApprovalStatus != 0 }"
          ></span>
          <!-- 未通过 -->
          <span
            class="iconfont icon-cuowu1 judge2"
            :class="{
              a: scope.row.totalApprovalStatus != 1,
            }"
          ></span>
          <!-- 待审批 -->
          <span
            class="iconfont icon-time judge3"
            :class="{
              a: scope.row.totalApprovalStatus != 2,
            }"
          ></span>
        </template>
      </el-table-column>
      <el-table-column property="name" label="审批进度"> </el-table-column>
      <el-table-column property="approvalTime" label="时间"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small"
            ><span
              class="iconfont icon-yanjing xiu"
              @click="seet(scope.row)"
            ></span
          ></el-button>
          <!-- <el-button type="text" size="small"
            ><span
              class="iconfont icon-shanchu xiu col"
              @click="shan(scope.row)"
            ></span
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
    <!-- 弹出查看离职员工 -->
    <!-- <el-dialog
      title="离职员工查看"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      lock-scroll
    >
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
    </el-dialog> -->
    <!-- 高级查找 -->
    <el-dialog
      title="高级查找"
      :visible.sync="dialogFormVisible2"
      :append-to-body="true"
      lock-scroll
    >
      <!-- 高级查找 -->
      <div class="kuan">
        <el-form :model="form3" class="form" label-width="80px">
          <el-col :span="24">
            <el-form-item label="姓名">
              <el-input
                v-model="form3.submitName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <!-- 部门 -->
          <el-col :span="24">
            <el-form-item label="部门">
              <!-- <el-input v-model="forms.sector"></el-input> -->
              <el-select
                v-model="form3.submitSector"
                placeholder="请选择所在部门"
              >
                <el-option
                  v-for="(department, index) in department"
                  :key="index"
                  :label="department.label"
                  :value="department.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="部门 ：">
              <el-input
                v-model="form3.submitSector"
                placeholder="请输入"
              ></el-input
            ></el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item label="审批状态">
              <el-select
                v-model="form3.totalApprovalStatus"
                placeholder="请选择审批状态"
              >
                <el-option label="通过" value="0"></el-option>
                <el-option label="驳回" value="1"></el-option>
                <el-option label="审批中" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审批类型">
              <el-select v-model="form3.type" placeholder="请选择户口性质">
                <el-option
                  v-for="(types, index) in types"
                  :key="index"
                  :label="types.approvalType"
                  :value="types.approvalType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="标题">
              <el-input
                v-model="form3.title"
                placeholder="查找除人事以外的审批"
              ></el-input
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
// import URL from "../../http/URL2";
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
        submitName: "",
        submitSector: "",
        totalApprovalStatus: "",
        type: "岗位申请",
        title: "",
        pageSize: 50,
        page: 1,
      },
      // 查询
      workinfoList: "",
      // 弹出新增黑名单
      show: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      // 分页
      currentPage: 1,
      pagesize: 50,
      counts: 0,
      // 加入黑名单查看
      balck: {
        name: "",
        card: "",
        sector: "",
        infoDate: "",
        notes: "",
      },
      // 图片
      aaa: "",
      // 导出的ID
      ids: "",
      approvalComments: "",
      // 类型
      types: "",
      // 调动人员
      applicantionName: 0,
      // 部门
      department: [],
      // 组织构架
      data: "",
    };
  },
  created() {
    // console.log(this.$store.state.url.name);
    let shu = "";
    let url = this.$store.state.url.name;
    console.log(this.$store.state.url.name);
    if (
      url == "approvalPersonnel" ||
      url == "adjustment" ||
      url == "otherSheng" ||
      url == "promotionSheng" ||
      url == "quitSheng" ||
      url == "transferSheng"
    ) {
      console.log(shu, 789);
      shu = this.$store.state.shengPi;
      this.currentPage = shu.page;
      this.pageSize = shu.pageSize;
    } else {
      shu = this.form3;
      this.$store.state.shengPi = this.form3;
    }
    //类型选择
    postp("/PersonnelTransferApproval/getApprovalPage", shu)
      .then((res) => {
        // console.log(res.data);
        console.log(shu, 45645689445486489);

        this.counts = res.data.counts;
        this.tableData = res.data.items;
        this.ids = res.data.ids;
        this.dang();
      })
      .catch((error) => {
        console.log(error);
      });
    // 类型
    gets("ApprovalTypes/getApprovalTypes").then((res) => {
      this.types = res.data;
      console.log(this.types);
    });
    // 组织构架
    gets("sector/getSector").then((res) => {
      console.log(res.data, "树形结构");
      this.data = res.data;
      this.qing();
      // console.log("d ",this.data)
    });
  },
  components: { personnel },
  methods: {
    // 自动获取部门
    qing() {
      var aa = 0;
      console.log(this.data, 8888);

      console.log(this.data[0], 9999);
      Object.keys(this.data[0]).forEach((key) => {
        // console.log(key);
        if (key == "children") {
          aa = 1;
        }
      });
      if (aa == 1) {
        for (var i = 0; i < this.data[0].children.length; i++) {
          // console.log(this.data[0].children[i].children);
          const a = this.data[0].children[i].UpSector;
          console.log(this.data[0].children[i]);
          if (a != 0 && a != 26) {
            this.department.push(this.data[0].children[i]);
          }
          for (var j = 0; j < this.data[0].children[i].children.length; j++) {
            const a = this.data[0].children[i].children[j].UpSector;
            if (a != 0 && a != 26) {
              this.department.push(this.data[0].children[i].children[j]);
            }
          }
        }
      } else {
        // console.log(this.data[0].children[i].children);
        const a = this.data[0].UpSector;
        if (a != 0 && a != 26) {
          this.department.push(this.data[0]);
        }
      }
      console.log(this.department, 88888888);
    },
    // 当前审批人
    dang() {
      // totalApprovalStatus
      for (let i = 0; i < this.tableData.length; i++) {
        // console.log(this.tableData[i].approvalComments, i);
        var dangID = "";
        var quanName = "";
        quanName = this.tableData[i].approvalName.split(",");
        // this.applicantionName = this.tableData[i].applicantionName;
        if (this.tableData[i].approvalComments) {
          dangID = this.tableData[i].approvalComments.split("||").length;
          switch (this.tableData[i].totalApprovalStatus) {
            case 0:
              this.tableData[i].name = "已通过";
              break;
            case 1:
              this.tableData[i].name = quanName[dangID - 1];
              break;
            case 2:
              this.tableData[i].name = quanName[dangID];
              break;
          }

          // if( this.tableData[i].totalApprovalStatus == 2){

          // }else{
          //             this.tableData[i].totalApprovalStatus == 0
          //   ? (this.tableData[i].name = "已通过")
          //   : (this.tableData[i].name = dangName);
          // }
        } else {
          this.tableData[i].name = quanName[0];
        }
        // console.log(this.tableData[i].workerId);
      }
      console.log(this.tableData);
    },
    shuj() {
      this.form3.pageSize = this.pagesize;
      this.form3.page = this.currentPage;
      postp("/PersonnelTransferApproval/getApprovalPage", this.form3).then(
        (res) => {
          console.log(res);
          this.counts = res.data.counts;
          this.tableData = res.data.items;
          this.dang();
          this.dialogFormVisible2 = false;

          console.log(123);
        }
      );
    },
    // 校验
    jiaoy() {
      let aaa = 0;
      // 是否黑名单
      gets("BlackList/checkBlackList", { card: this.balck.card }).then(
        (res) => {
          console.log(res.data);
          if (!res.data.bool) {
            this.$message({
              message: "该员工已在黑名单",
              type: "error",
            });
          } else {
            this.gets2();
          }
        }
      );
      return aaa;
    },
    // 上传黑名单
    gets2() {
      postp("BlackList/insertBlackList", this.balck).then((res) => {
        console.log(res);
        this.shuj();
        this.dialogFormVisible3 = false;
      });
      console.log(this.balck);
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
      this.shuj();
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.shuj();
    },
    gets() {
      this.dialogFormVisible = false;
    },

    // 查看
    seet(row) {
      // console.log(row.type);
      // console.log(row.id);
      this.$store.shengID = row.id;
      this.$store.butt = 2;
      if (row.type == "人员调动申请") {
        this.$router.push("/homepage/transferSheng");
      } else if (row.type == "岗位申请") {
        this.$router.push("/homepage/approvalPersonnel");
      } else if (row.type == "岗位调整") {
        this.$router.push("/homepage/adjustment");
      } else if (row.type == "员工离职") {
        this.$router.push("/homepage/quitSheng");
      } else if (row.type == "员工晋升") {
        this.$router.push("/homepage/promotionSheng");
      } else {
        this.$router.push("/homepage/otherSheng");
      }
    },
    // 查询清空表单
    lookup() {
      this.dialogFormVisible2 = true;
      this.form3.submitName = "";
      this.form3.submitSector = "";
      this.form3.totalApprovalStatus = "";
    },
    // 查询
    lookups() {
      this.currentPage = 1;
      this.form3.pageSize = this.pagesize;
      this.form3.page = this.currentPage;
      this.$store.state.shengPi = this.form3;
      this.shuj();
      // postp("worker/selectWorker", this.form3).then((res) => {
      //   console.log(res);
      //   this.counts = res.data.pageResult.counts;
      //   this.tableData = res.data.pageResult.items;
      //   this.dialogFormVisible2 = false;
      //   this.$message({
      //     type: "success",
      //     message: "查询成功!",
      //   });
      // });
    },
    // 删除
    shan(row) {
      // console.log(row);
      // console.log(row.id);
      this.$confirm("此操作将删除该离职员工, 是否继续?", "提示", {
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
.judge3 {
  font-size: 18px;
  color: #00a2ff;
}
.judge2 {
  font-size: 18px;
  color: #ff0000;
}
.judge {
  font-size: 18px;
  color: #07d800;
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