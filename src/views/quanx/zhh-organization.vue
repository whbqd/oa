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
      <!-- 顶部 -->
      <div class="top">
        <p class="font">组织构架</p>

        <!-- 添加父级 -->
        <el-button type="text" @click="dialogFormVisible = true">
          <span
            class="iconfont icon-jia icon a"
            v-test="{ name: '新建组织架构' }"
          ></span>
        </el-button>

        <el-dialog
          title="添加部门"
          :visible.sync="dialogFormVisible"
          :append-to-body="true"
        >
          <el-form :model="form">
            <el-form-item label="部门名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addf">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <!-- 树形结构 -->
      <div class="xuan">
        <!-- 树形结构 -->
        <div class="custom-tree-container">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <div class="nnn">
                <!-- 添加子级 -->
                <el-button
                  type="text"
                  size="mini"
                  @click="dialogFormVisibles = true"
                  class="a"
                  v-test="{ name: '新建组织架构' }"
                >
                  <span
                    class="iconfont icon-jia icon"
                    @click="() => adds(data)"
                  ></span>
                  <el-dialog
                    title="添加部门"
                    :visible.sync="dialogFormVisibles"
                    :append-to-body="true"
                  >
                    <el-form :model="form">
                      <el-form-item
                        label="部门名称"
                        :label-width="formLabelWidth"
                      >
                        <el-input
                          v-model="form.names"
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisibles = false"
                        >取 消</el-button
                      >
                      <el-button type="primary" @click="appends"
                        >确 定</el-button
                      >
                    </div>
                  </el-dialog>
                </el-button>
                <!-- 删除 -->
                <!-- v-test="{ name: '删除组织架构' }" -->
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                  class="a"
                >
                  <span class="iconfont icon-jian icon"></span>
                </el-button>
                <!-- 修改 -->
                <el-button
                  type="text"
                  size="mini"
                  @click="() => modify(node, data)"
                  class="a"
                >
                  <span class="iconfont icon-bianji icon"></span>
                </el-button>
              </div>
            </span>
          </el-tree>
        </div>
      </div>
    </div>
    <!-- 右边 -->
    <div class="right">
      <div class="top2">
        <!-- <button
          class="but col1 a"
          v-test="{ name: '导入员工' }"
          @click="shangchuan = true"
        >
          批量导入成员
        </button> -->
        <button
          class="but col2 a"
          @click="port"
          v-test="{ name: '员工excel表格下载' }"
        >
          导出
        </button>
        <button class="but col2" @click="dakai">筛选成员</button>
        <button class="but col3 a" v-test="{ name: '入职同步' }">
          入职同步
        </button>
        <button
          class="but col3 a"
          @click="mo"
          v-test="{ name: '员工excel表格模板下载' }"
        >
          导出模板
        </button>
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
        <el-table-column type="selection"> </el-table-column>
        <el-table-column property="sector" label="部门"> </el-table-column>
        <el-table-column property="name" label="姓名"> </el-table-column>
        <el-table-column property="posts" label="岗位"> </el-table-column>
        <el-table-column property="phone" label="手机" min-width="100px">
        </el-table-column>
        <el-table-column property="groupNumber" label="集团号">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              ><span
                class="iconfont icon-bianji sosuo a"
                v-test="{ name: '修改员工' }"
              ></span
            ></el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="
                deleteRow(scope.$index, tableData, scope.row)
              "
              ><span
                class="iconfont icon-shanchu sosuo col a"
                v-test="{ name: '删除员工' }"
              ></span></el-button></template
        ></el-table-column>
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
    </div>
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
          <!-- 身份证 -->
          <el-col :span="12">
            <el-form-item label="身份证" :label-width="formLabelWidth">
              <el-input v-model="forms.card" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <!-- 用工属性 -->
          <el-col :span="12">
            <el-form-item label="用工属性" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="gets">确 定</el-button>
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
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
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
</template>
<script>
// import axios from 'axios';
import { gets, posts, postp } from "../../request/wan";
import URL from "../../http/URL2";
var token = sessionStorage.getItem("token"); // 要保证取到
export default {
  data() {
    const data = [];
    return {
      daoru: "导入员工",
      // 导入员工文件
      myHeaders: { token: token },
      // 左边
      data: JSON.parse(JSON.stringify(data)),
      // 打开父级弹窗
      dialogFormVisible: false,
      // 打开子集弹窗
      dialogFormVisibles: false,
      // 表单
      form: { name: "", names: "" },
      // 表单间距
      formLabelWidth: "80px",
      // 保存当前树形结构data
      ring: "",
      // 当前元素父级
      fater: "",
      // 右边表格
      tableData: [],
      // 查询
      workinfoList: "",
      // 筛选
      saixuan: false,
      // 人员上传弹出
      shangchuan: false,
      // 自动获取
      department: [],
      post: [],
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
        pageSize: "",
        page: "",
        active: "0",
      },
      // 分页
      currentPage: 1,
      pagesize: 50,
      fileList: [],
      counts: 0,
      // 多选
      multipleSelection: [],
      // 当前单机区县
      dare: "",
      // 查询
      cha: "0",
      datas: "",
    };
  },
  created() {
    // 组织构架
    gets("sector/getSector").then((res) => {
      console.log(res.data, 88888);
      this.data = res.data;
      // console.log(this.data, "数据");
      this.qing();
      // console.log(this.readNodes(res.data), 66666);
    });
    // 人员名单
    gets("worker/getWorker", {
      pagesize: this.pagesize,
      page: this.currentPage,
    }).then((res) => {
      // console.log(res.data);
      this.tableData = res.data.worker.items;
      this.workinfoList = res.data.workinfo;
      // console.log(res.data);
      // 数据总条数
      this.counts = res.data.worker.counts;
    });
    // 获取岗位
    gets("tran/canPosts" + "?" + "sectorId=" + "").then((res) => {
      console.log(res);
      this.post = res.data;
    });
    // 岗位名单
    gets("/posts/getPostsGroupBy").then((res) => {
      this.post = res.data;
      console.log(this.post);
    });
  },
  computed: {
    uploadUrl() {
      return URL.apiUrl + "worker/insertWorker";
    },
  },
  methods: {
    // readNodes(arr) {
    //   const obj = {};
    //   var aa = [];
    //   for (let i = 0; i < arr.length; i++) {
    //     const id = arr[i].UpSector;
    //     if (i == 0) {
    //       obj[id] = id;
    //       aa.push(arr[i]);
    //       console.log(1234);
    //         console.log(obj[id],"第一次");
    //     } else {
    //       if (obj[id]) {
    //         // 重复
    //         console.log(89746489);
    //       } else {
    //         console.log(obj[id],"第二次");
    //         aa.push(arr[i]);
    //         console.log(123);
    //       }
    //     }
    //   }
    //   console.log(aa, 456456456);
    //   return aa;
    // },
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
      // console.log(this.department);
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
      gets("worker/getWorker", {
        pagesize: this.pagesize,
        page: this.currentPage,
      })
        .then((res) => {
          // console.log(res.data.items);
          this.tableData = res.data.worker.items;
          this.workinfoList = res.data.workinfo;
          // this.song = res.data.items;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 请求区县人员数据
    shujs() {
      const aa = this.dare;
      // console.log(aa, 7897);
      this.cha = 0;
      gets("user/getUserBySectorPage", {
        sector: aa,
        pagesize: this.pagesize,
        page: this.currentPage,
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.worker.items;
        this.counts = res.data.worker.counts;
      });
    },
    // 下载全部
    xias() {
      window.open(URL.xia + "worker/allWorkerDown");
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
    // 高级查询
    // shuj2() {
    //   this.cha = 1;
    //   this.forms.pageSize = this.pagesize;
    //   this.forms.page = this.currentPage;
    //   // console.log(this.forms.entryTime);
    //   // 时间转换
    //   this.forms.entryTime = this.dateFormat(
    //     "YYYY-mm-dd",
    //     this.forms.entryTime
    //   );
    //   this.forms.actual = this.dateFormat("YYYY-mm-dd", this.forms.actual);
    //   // 分页页码
    //   this.forms.pageSize = this.pagesize;
    //   this.forms.page = this.currentPage;
    //   const shuj = Object.values(this.forms);
    //   var b = 1;
    //   for (var a = 0; a <= shuj.length - 4; a++) {
    //     if (shuj[a] != "") {
    //       b = 0;
    //     }
    //   }
    //   if (b == 1) {
    //     this.shuj();
    //     this.xias();
    //     return;
    //   }
    //   // 提交信息
    //   postp("worker/selectWorker", this.forms).then((res) => {
    //     // console.log(res.data);
    //     this.tableData = res.data.pageResult.items;
    //     this.counts = res.data.pageResult.counts;
    //     this.multipleSelection = res.data.ids;
    //     this.workinfoList = res.data.workinfoList;
    //   });
    // },
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
    // 左边
    // 添加父级
    addf() {
      // this.data.push({ label: this.form.name });
      // 创建添加表单
      var news = {
        sectorName: this.form.name,
        upSector: 0,
      };
      if (!this.form.name) {
        this.$message("名称不能为空");
      } else {
        postp("/sector/insertSector", news)
          .then((res) => {
            console.log(res);
            this.zhuz();
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "添加成功!",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // console.log(this.ss)

      this.form.name = "";
    },
    // 添加子级
    adds(data) {
      this.ring = data;
      // console.log("12", this.ring.label);
      this.fater = this.ring.id;
    },
    // 确定
    appends() {
      const newChild = { label: this.form.names, children: [] };
      if (!this.ring.children) {
        this.$set(this.ring, "children", []);
      }
      // 插入
      this.ring.children.push(newChild);
      console.log(this.fater);
      // 创建添加表单
      var news = {
        sectorName: this.form.names,
        upSector: this.fater,
      };
      if (!this.form.names) {
        this.$message("名称不能为空");
      } else {
        postp("/sector/insertSector", news)
          .then((res) => {
            console.log(res);
            this.zhuz();
            // 还原
            this.dialogFormVisibles = false;
            this.form.names = "";
            this.fater = "";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // 删除
    remove(node, data) {
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex((d) => d.id === data.id);
      // children.splice(index, 1);
      console.log(data.id);
      this.$confirm("是否删除岗位, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          posts("/sector/deleteSector", {
            ids: data.id,
          }).then((res) => {
            console.log(res);
            this.zhuz();
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
          // console.log(res);
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
    // 修改人员
    handleClick(row) {
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
      console.log(rens, 87878788787);
      this.$store.commit("setRenyuan", "");
      this.$store.commit("setRenyuan", rens);
      this.$router.push("modifyEmployeeFiles");
    },
    revise(data) {
      console.log(data);
    },
    // 删除人员
    deleteRow(index, rows, row) {
      // rows.splice(index, 1);
      // console.log(row.id);
      this.$confirm("此操作将永久删除盖人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          posts("worker/deleteWorker", { ids: row.id }).then((res) => {
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

    // 分页
    // 每页数据
    handleSizeChange: function (val) {
      this.pagesize = val;
      console.log(val);
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
    // 导入失败
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
    gets() {
      // console.log(this.forms);
      this.page = 1;
      this.shuj2();
      this.saixuan = false;
    },
  },
};
</script>
<style scoped lang="less">
.el-form {
  .el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
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
      top: -27px;
      color: #d3d3d3;
    }
  }
  .xuan {
    width: 100%;
    height: 500px;
    overflow: auto;
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      .nnn {
        display: flex;
      }
    }
  }
  .top {
    width: 100%;
    height: 40px;
    background: #dddddd;
    position: relative;

    .font {
      font-size: 15px;
      line-height: 40px;
      font-weight: bold;
      margin-left: 20px;
    }
    .icon {
      font-size: 25px;
      position: absolute;
      top: 8px;
      left: 100px;
      margin-left: 10px;
      color: #43baff;
    }
  }
}
.right {
  width: 68%;
  height: 100%;
  background: #ffffff;
  margin-left: 2%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
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
    .col2 {
      background-color: #00babd;
    }
    .col3 {
      background-color: #ffb800;
    }
  }
}
</style>