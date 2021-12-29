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
        <!-- 树形结构 -->
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
      <!-- 头部 -->
      <div class="top2">
        <button
          class="but col1"
          v-test="{ name: '导入员工' }"
          @click="shangchuan = true"
        >
          批量导入成员
        </button>
        <button class="but col1" @click="mo">批量导入模板</button>
        <!-- <button class="but col2 a">筛选</button> -->
        <button class="but col2 a" @click="news" v-test="{ name: '插入人员' }">
          新增
        </button>
        <button class="but col2" @click="dakai">筛选成员</button>
        <!-- <button class="but col3 a" v-test="{ name: '入职同步' }">
          入职同步
        </button> -->
        <button class="but col3" @click="port">导出</button>
        <button class="but col3" @click="shujuxia">导出数据</button>
      </div>
      <!-- 表格 -->
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        height="510"
        id="se"
        @selection-change="handleSelectionChange"
        :cell-style="{ padding: '1px', textAlign: 'center', fontSize: '12px' }"
        :header-cell-style="{
          background: '#dddddd',
          color: '#606266',
          textAlign: 'center',
          fontSize: '14px',
        }"
      >
        <el-table-column width="50" type="selection"> </el-table-column>
        <el-table-column property="name" label="姓名"> </el-table-column>
        <el-table-column property="sector" label="部门" width="120">
        </el-table-column>
        <el-table-column property="posts" label="职位"> </el-table-column>
        <el-table-column property="title" label="职称"> </el-table-column>
        <el-table-column property="line" label="条线"> </el-table-column>
        <el-table-column property="phone" label="手机号" width="150">
        </el-table-column>
        <el-table-column property="card" label="身份证" width="150">
        </el-table-column>
        <el-table-column property="groupNumber" label="集团号" width="100">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="130">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              ><span class="iconfont icon-yanjing sosuo"></span
            ></el-button>
            <el-button @click="handleClick2(scope.row)" type="text" size="small"
              ><span class="iconfont icon-bianji sosuo2"></span
            ></el-button>
            <!-- <el-button @click="deleteRow(scope.row)" type="text" size="small"
              ><span class="iconfont icon-heimingdan sosuo2"></span
            ></el-button>  -->
          </template></el-table-column
        >
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
      >
      </el-pagination>
      <!-- 弹出导出信息 -->
      <el-dialog title="导出" :visible.sync="saixuan" :append-to-body="true">
        <div>
          <el-form :model="forms" class="fom">
            <!-- 名称 -->
            <el-col :span="12">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="forms.name" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <!-- 部门 -->
            <el-col :span="12">
              <el-form-item label="部门" :label-width="formLabelWidth">
                <!-- <el-input v-model="forms.sector"></el-input> -->
                <el-select
                  v-model="forms.sector"
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
            <!-- 手机 -->
            <el-col :span="12">
              <el-form-item label="手机" :label-width="formLabelWidth">
                <el-input v-model="forms.phone" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <!-- 岗位 -->
            <el-col :span="12">
              <el-form-item label="岗位" :label-width="formLabelWidth">
                <!-- <el-input v-model="forms.posts"></el-input> -->
                <el-select v-model="forms.posts" placeholder="请选择所在岗位">
                  <el-option
                    v-for="(post, index) in post"
                    :key="index"
                    :label="post.postsName"
                    :value="post.postsName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 集团号 -->
            <el-col :span="12">
              <el-form-item label="集团号" :label-width="formLabelWidth">
                <el-input
                  v-model="forms.groupNumber"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="条线 ：" :label-width="formLabelWidth">
                <el-select v-model="forms.line" placeholder="请选择条线">
                  <el-option label="工程" value="工程"></el-option>
                  <el-option label="维护" value="维护"></el-option>
                  <el-option label="综合" value="综合"></el-option>
                  <el-option label="销售" value="销售"></el-option>
                  <el-option label="信息" value="信息"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 身份证 -->
            <el-col :span="12">
              <el-form-item label="身份证" :label-width="formLabelWidth">
                <el-input v-model="forms.card" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <!-- 用工属性 -->
            <el-col :span="12">
              <el-form-item
                label="用工属性"
                :label-width="formLabelWidth"
                :class="{ a: !zhenshi }"
              >
                <!-- <el-input v-model="forms.employ"></el-input> -->
                <el-select v-model="forms.employ" placeholder="请选择">
                  <el-option label="外包员工" value="外包员工"></el-option>
                  <el-option label="正式员工" value="正式员工"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 入职日期 -->
            <el-col :span="12">
              <el-form-item label="入职日期" :label-width="formLabelWidth">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                  v-model="forms.entryTime"
                  style="width: 100%"
                ></el-date-picker> </el-form-item
            ></el-col>
            <!-- 离职日期 -->
            <!-- <el-col :span="12">
              <el-form-item label="离职日期" :label-width="formLabelWidth">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="forms.actual"
                  style="width: 100%"
                ></el-date-picker> </el-form-item
            ></el-col> -->
            <!-- 是否在职 -->
            <el-col :span="12">
              <el-form-item label="是否在职" :label-width="formLabelWidth">
                <el-radio v-model="forms.active" label="0">是</el-radio>
                <el-radio v-model="forms.active" label="1">否</el-radio>
              </el-form-item>
            </el-col>
            <!-- 性别 -->
            <el-col :span="12">
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-radio v-model="forms.sex" label="0">女</el-radio>
                <el-radio v-model="forms.sex" label="1">男</el-radio>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="saixuan = false">取 消</el-button>
          <el-button type="primary" @click="daoChu">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 上传 -->
      <el-dialog
        :visible.sync="shangchuan"
        :append-to-body="true"
        title="上传"
        style="width: 800px; margin: auto"
      >
        <div>
          <el-upload
            class="upload-demo"
            drag
            :action="uploadUrl"
            multiple
            :headers="myHeaders"
            :on-success="ok"
            :on-error="no"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="shangchuan = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import jwt from "jsonwebtoken";
import { gets, postp } from "../../request/wan";
import URL from "../../http/URL2";
var token = sessionStorage.getItem("token"); // 要保证取到
export default {
  data() {
    return {
      // 导入员工文件
      myHeaders: { token: token },
      // 左边
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 图片
      aaa: "",
      // 右边
      tableData: [],
      song: "",
      // 分页
      currentPage: 1,
      pagesize: 50,
      fileList: [],
      counts: 0,
      // 查询表单
      forms: {
        name: "",
        sector: "",
        posts: "",
        phone: "",
        groupNumber: "",
        card: "",
        employ: "",
        sex: "",
        entryTime: "",
        actual: "",
        line: "",
        pageSize: 50,
        page: 1,
        active: "0",
      },
      // 查询
      workinfoList: "",
      // 黑名单
      dialogFormVisible: false,
      saixuan: false,
      // 人员上传弹出
      shangchuan: false,
      // 自动获取
      department: [],
      post: [],
      // 表单间距
      formLabelWidth: "80px",
      // 加入黑名单查看
      balck: {
        name: "",
        card: "",
        sector: "",
        infoDate: "",
        notes: "",
      },
      // 多选
      multipleSelection: [],
      // 当前单机区县
      dare: "",
      // 查询
      cha: "0",
      // 正式工权限
      zhenshi: "",
    };
  },
  // 打开页面
  created() {
    // 组织构架
    gets("sector/getSector").then((res) => {
      console.log(res.data, "树形结构");
      this.data = res.data;
      this.qing();
      // console.log("d ",this.data)
    });
    // 人员名单
    gets("/worker/getWorker", {
      pagesize: this.pagesize,
      page: this.currentPage,
    }).then((res) => {
      console.log(res.data, 9999);
      this.tableData = res.data.worker.items;
      this.workinfoList = res.data.workinfo;
      // console.log(this.workinfoList,898989) 
      // 数据总条数
      this.counts = res.data.worker.counts;
    });
    // 岗位名单
    gets("/posts/getPostsGroupBy").then((res) => {
        this.post = res.data;
        console.log(this.post);
    });
    // 查看权限
    gets("user/getRoleByUser").then((res) => {
      console.log(res.data, 999988888);
      this.zhenshi = res.data;
    });
  },
  computed: {
    uploadUrl() {
      return URL.apiUrl + "worker/insertWorker";
    },
  },
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
    // 获取岗位
    // findItemNameBYClass() {
    //   this.forms.posts = "";
    //   // console.log(this.zuan());
    //   gets("posts/getPostsBySector1" + "?id=" + this.zuan()).then((res) => {
    //     this.post = res.data;
    //     console.log(this.post);
    //   });
    // },
    // 部门名字转id
    zuan() {
      let son = "";
      console.log(this.department);
      this.department.forEach((res) => {
        if (this.forms.sector == res.label) {
          console.log(res.id, 8989);
          son = res.id;
        }
        // console.log(this.form2.traDenp,888);
        // console.log(res.id);
      });
      return son;
    },
    // 时间转换
    dateFormat(fmt, date) {
      if (date == "") {
        return;
      }
      let ret = "";
      date = new Date(date);
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        // "M+": date.getMinutes().toString(), // 分
        // "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    // 请求人员数据
    shuj() {
      this.workinfoList = "";
      gets("/worker/getWorker", {
        pagesize: this.pagesize,
        page: this.currentPage,
      })
        .then((res) => {
          console.log(res);
          this.tableData = res.data.worker.items;
          this.workinfoList = res.data.workinfo;
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
          this.tableData = res.data.worker.items;
          this.counts = res.data.worker.counts;

          console.log(res, 456);
          // console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 下载全部
    xias() {
      // console.log(jwt.decode(sessionStorage.getItem("token")), "信息");
      var id = jwt.decode(sessionStorage.getItem("token")).id;
      // console.log(id);
      window.open(URL.xia + "worker/allWorkerDown" + "?id=" + id);
    },
    // 打开查询
    dakai() {
      this.forms = {
        name: "",
        sector: "",
        posts: "",
        phone: "",
        groupNumber: "",
        card: "",
        employ: "",
        sex: "",
        entryTime: "",
        actual: "",
        pageSize: "",
        page: "",
        active: "0",
      };
      this.saixuan = true;
      this.currentPage = 1;
      this.pagesize = 50;
    },
    // 员工导入成功
    ok(response) {
      this.shuj();
      this.$confirm(response, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {});
    },
    //  员工导入失败
    no(res) {
      this.$confirm(res, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {});
    },
    // 高级查询
    shuj2() {
      this.cha = 1;
      this.forms.pageSize = this.pagesize;
      this.forms.page = this.currentPage;
      const shuj = Object.values(this.forms);
      var b = 1;
      for (var a = 0; a <= shuj.length - 4; a++) {
        if (shuj[a] != "") {
          b = 0;
        }
      }
      if (b == 1) {
        this.shuj();
        this.xias();
        return;
      }
      postp("worker/selectWorker", this.forms).then((res) => {
        console.log(res.data, "查找结果");
        this.tableData = res.data.pageResult.items;
        this.counts = res.data.pageResult.counts;
        this.workinfoList = res.data.workinfoList;
        this.multipleSelection = res.data.ids;
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
          this.tableData = res.data.worker.items;
          this.workinfoList = res.data.workinfo;
          // 数据总条数
          this.counts = res.data.worker.counts;
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
      console.log(row.id, 999);
      console.log(row, 999);
      const rens = [];
      this.workinfoList.forEach((res) => {
        console.log(res);
        console.log(res.worker);
        if (res.worker == row.id) {
          rens.push(row);
          rens.push(res);
        }
      });
      this.$store.commit("setRenyuan", "");
      this.$store.commit("setRenyuan", rens);
      this.$router.push("employeeFilesRen");
    },
    // 修改人员
    handleClick2(row) {
      console.log(row.id, 88);
      // console.log(row.id);
      const rens = [];
      this.workinfoList.forEach((res) => {
        // console.log(res)
        if (res.worker == row.id) {
          rens.push(row);
          rens.push(res);
        }
      });
      // console.log(rens);
      this.$store.commit("setRenyuan", "");
      this.$store.commit("setRenyuan", rens);
      this.$router.push("modifyEmployeeFiles");
    },
    // 分页
    // 每页数据
    handleSizeChange: function (val) {
      this.pagesize = val;
      if (this.dare) {
        this.shujs();
        return;
      }
      if (this.cha == 1) {
        this.shuj2();
        return;
      }
      this.shuj();
    },
    // 页码
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      if (this.dare) {
        this.shujs();
        return;
      }
      if (this.cha == 1) {
        this.shuj2();
        return;
      }
      this.shuj();
    },
    // 新增
    news() {
      this.$router.push("newEmployeeFiles");
    },
    // 模板下载
    mo() {
      window.open(URL.xia + "worker/workerTemplateDown");
    },
    // 表格多选
    handleSelectionChange(val) {
      this.multipleSelection = [];
      for (var i = 0; i <= val.length - 1; i++) {
        if (i < val.length - 1) {
          this.multipleSelection = this.multipleSelection + val[i].id + ",";
        } else {
          this.multipleSelection = this.multipleSelection + val[i].id;
        }
      }
    },
    // 员工导出
    port() {
      var ids = this.multipleSelection;
      // console.log(ids);
      if (ids == "") {
        this.$message.error("请选择人员");
      } else {
        window.open(URL.xia + "worker/workerDown" + "?ids=" + ids);
      }
    },
    // 员工导出区县
    daoChu() {
      this.page = 1;
      this.shuj2();
      this.saixuan = false;
    },
    // 导出数据
    shujuxia() {
      window.open(URL.xia + "statisticsVoDown");
    },
  },
};
</script>
<style scoped lang="less">
.a {
  display: none;
}
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
  .sosuo {
    font-size: 15px;
  }
  .sosuo2 {
    font-size: 20px;
  }
  .top2 {
    height: 50px;
    width: 100%;
    display: flex;
    .but {
      // width: 100px;
      padding-left: 10px;
      padding-right: 10px;
      height: 30px;
      color: #ffffff;
      border-radius: 3px;
      margin-top: 10px;
      margin-left: 10px;
    }
    .col1 {
      background-color: #0077f1;
    }
    .col2 {
      background-color: #00babd;
    }
    .col3 {
      background-color: #ffb800;
    }
  }
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
  img {
    width: 100%;
    height: 100%;
  }
  .form {
    position: relative;
    width: 70%;
  }
}
</style>