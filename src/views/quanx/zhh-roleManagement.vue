<template>
  <div class="noticeAdmin">
    <div class="top">
      <button
        class="but col1 a"
        @click="dialogFormVisible = true"
        v-test="{ name: '插入角色' }"
      >
        新建
      </button>
      <!-- 弹出新增 -->
      <el-dialog
        title="新增"
        :visible.sync="dialogFormVisible"
        :append-to-body="true"
      >
        <div>
          <el-form :model="form" class="fom">
            <!-- 名称 -->
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- 描述内容 -->
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                v-model="form.describe"
                rows="3"
                placeholder="用于运营人员等账号新建，密码重置，信息编辑等"
              ></el-input>
            </el-form-item>
            <!-- 单选 -->
            <el-form-item label="数据权限" :label-width="formLabelWidth">
              <el-radio-group v-model="form.resource">
                <el-radio label="0">本人的数据</el-radio>
                <el-radio label="1">本部门的数据</el-radio>
                <el-radio label="2">本部门及下属的数据</el-radio>
                <el-radio label="3">全部数据</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 多选 -->
            <el-form-item label="功能权限" :label-width="formLabelWidth">
              <!-- 树形结构 -->
              <el-tree
                :data="data"
                show-checkbox
                :default-checked-keys="kong"
                node-key="id"
                ref="tree"
                :props="defaultProps"
              >
              </el-tree>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="gets" :loading="an.xinz"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 弹出查看 -->
      <el-dialog
        title="查看"
        :visible.sync="dialogFormVisible2"
        :append-to-body="true"
      >
        <div>
          <el-form :model="form" class="fom">
            <!-- 名称 -->
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input
                v-model="form.name"
                :disabled="true"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <!-- 描述内容 -->
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                v-model="form.describe"
                :disabled="true"
                rows="3"
                placeholder="用于运营人员等账号新建，密码重置，信息编辑等"
              ></el-input>
            </el-form-item>
            <!-- 单选 -->
            <el-form-item label="数据权限" :label-width="formLabelWidth">
              <el-radio-group v-model="form.resource" disabled>
                <el-radio label="0">本人的数据</el-radio>
                <el-radio label="1">本部门的数据</el-radio>
                <el-radio label="2">本部门及下属的数据</el-radio>
                <el-radio label="3">全部数据</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 多选 -->
            <el-form-item label="功能权限" :label-width="formLabelWidth">
              <!-- 树形结构 -->
              <el-tree
                :data="data"
                show-checkbox
                :default-checked-keys="kong"
                node-key="id"
                ref="tree"
                :props="defaultProps"
              >
              </el-tree>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="gets2">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 弹出修改 -->
      <el-dialog
        title="修改"
        :visible.sync="dialogFormVisible3"
        :append-to-body="true"
      >
        <div>
          <el-form :model="form" class="fom">
            <!-- 名称 -->
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- 描述内容 -->
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                v-model="form.describe"
                rows="3"
                placeholder="用于运营人员等账号新建，密码重置，信息编辑等"
              ></el-input>
            </el-form-item>
            <!-- 单选 -->
            <el-form-item label="数据权限" :label-width="formLabelWidth">
              <el-radio-group v-model="form.resource">
                <el-radio label="0">本人的数据</el-radio>
                <el-radio label="1">本部门的数据</el-radio>
                <el-radio label="2">本部门及下属的数据</el-radio>
                <el-radio label="3">全部数据</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 多选 -->
            <el-form-item label="功能权限" :label-width="formLabelWidth">
              <!-- 树形结构 -->
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                ref="tree"
                :default-checked-keys="kong"
                :props="defaultProps"
              >
              </el-tree>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="gets3" :loading="an.xiug"
            >确 定</el-button
          >
        </div>
      </el-dialog>
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
      :cell-style="{ padding: '1px' }"
      :header-cell-style="{ background: '#dddddd', color: '#606266' }"
    >
      <el-table-column width="50"> </el-table-column>
      <el-table-column property="id" label="角色编码"> </el-table-column>
      <el-table-column property="roleName" label="角色名称"> </el-table-column>
      <el-table-column property="dataRights" label="数据权限">
      </el-table-column>
      <el-table-column property="description" label="描述"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small"
            ><span
              class="iconfont icon-yanjing xiu a"
              @click="seet(scope.row)"
              v-test="{ name: '查看角色详情' }"
            ></span
          ></el-button>
          <el-button type="text" size="small"
            ><span
              class="iconfont icon-bianji xiu col"
              @click="revise(scope.row)"
              v-test="{ name: '修改角色权限' }"
            ></span
          ></el-button>
          <el-button type="text" size="small"
            ><span
              class="iconfont icon-shanchu xiu col a"
              @click="deleteRow(scope.$index, tableData, scope.row)"
              v-test="{ name: '删除角色' }"
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
  </div>
</template>
<script>
import { gets, postp, posts } from "../../request/wan";
export default {
  data() {
    return {
      // 数据
      tableData: [],
      // 分页
      currentPage: 1,
      pagesize: 50,
      fileList: [],
      counts: 10,
      // 表单
      form: {
        name: "",
        describe: "",
        resource: "",
        type: [],
        id: "",
      },
      // 树形结构默认选择
      kong: [],
      // 是否弹出
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      formLabelWidth: "120px",
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 按钮状态
      an: {
        xinz: false,
        xiug: false,
      },
    };
  },
  created() {
    // 请求角色数据
    gets("role/getRoles", {
      pagesize: this.pagesize,
      page: this.currentPage,
    })
      .then((res) => {
        this.tableData = res.data.items;
        // console.log(res.data);
        // 数据总条数
        this.counts = res.data.counts;
        // console.log(this.counts, "测试");
      })
      .catch((error) => {
        console.log(error);
      });
    // 接口明细
    gets("role/getInterfaces")
      .then((res) => {
        console.log(res.data,88888);
        this.data = res.data;
        // 数据总条数
        // this.counts = res.data.counts;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // 拼接功能权限ID
    ping() {
      // 拼接功能权限ID
      let zi = this.$refs.tree.getCheckedKeys(); //返回选中子节点的key
      let fu = this.$refs.tree.getHalfCheckedKeys(); //返回选中子节点的父节点的key
      let new1 = zi.concat(fu);
      var gongwan = new1.toString();
      // var gongwan = "";
      // for (var i = 0; i <= new1.length - 1; i++) {
      //   if (i < new1.length - 1) {
      //     gongwan = gongwan + new1[i] + ",";
      //   } else {
      //     gongwan = gongwan + new1[i];
      //   }
      // }
      return gongwan;
    },
    // 请求角色数据
    shuj() {
      gets("role/getRoles", {
        pagesize: this.pagesize,
        page: this.currentPage,
      })
        .then((res) => {
          this.tableData = res.data.items;
          // console.log(res.data);
          // 数据总条数
          this.counts = res.data.counts;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 清空表单
    qingc() {
      this.form.name = "";
      this.form.describe = "";
      this.form.resource = "";
      this.kong = [];
      this.$refs.tree.setCheckedKeys([]);
      // this.an.xinz = false;
      // this.an.xiug = false;
    },
    // 分页
    // 每页数据
    handleSizeChange: function (val) {
      this.pagesize = val;
      console.log(val);
      if (this.dare) {
        this.shujs();
      } else {
        this.shuj();
      }
    },
    // 页码
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      if (this.dare) {
        this.shujs();
      } else {
        this.shuj();
      }
    },
    // 删除角色
    deleteRow(index, rows, row) {
      // rows.splice(index, 1);
      this.$confirm("是否删除当前角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          posts("role/deleteRoles", { ids: row.id }).then((res) => {
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
    // 修改角色读取
    revise(row) {
      console.log(row);
      this.dialogFormVisible3 = true;
      this.form.name = row.roleName;
      this.form.describe = row.description;
      this.form.id = row.id;
      this.form.resource = row.dataRights.toString();
      this.kong = row.rolePage.split(",").map(Number);
      // this.kong = row.interId;
    },
    // 查看角色读取
    seet(row) {
      console.log(row);
      this.dialogFormVisible2 = true;
      this.form.name = row.roleName;
      this.form.describe = row.description;
      this.form.id = row.id;
      this.form.resource = row.dataRights.toString();
      this.kong = row.rolePage.split(",").map(Number);
      // this.kong = row.interId;
    },
    // 新建角色提交
    gets() {
      // 按钮
      this.an.xinz = true;
      // 创建提交表单
      var news = {
        roleName: this.form.name,
        roleInterface: this.ping(),
        dataRights: this.form.resource,
        description: this.form.describe,
        rolePage: this.$refs.tree.getCheckedKeys().toString(),
      };
      console.log(news);
      if (!this.form.name) {
        this.$message("请输入角色名称");
      } else if (!this.ping()) {
        this.$message("请选择功能权限");
      } else if (!this.form.resource) {
        this.$message("请选择数据权限");
      } else if (!this.form.describe) {
        this.$message("请输入描述");
      } else {
        // 新建
        postp("role/insertRole", news)
          .then((res) => {
            console.log(res);
            // 按钮
            setTimeout(() => {
              this.an.xinz = false;
            }, 500);
            // 刷新数据
            this.shuj();
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "新建成功!",
            });
          })
          .catch((error) => {
            console.log(error);
            this.an.xinz = false;
          });
      }
    },
    // 查看角色关闭
    gets2() {
      this.dialogFormVisible2 = false;
    },
    // 修改角色提交
    gets3() {
      // 按钮
      this.an.xiug = true;
      // 创建提交表单
      var news = {
        id: this.form.id,
        roleName: this.form.name,
        roleInterface: this.ping(),
        dataRights: this.form.resource,
        description: this.form.describe,
        rolePage: this.$refs.tree.getCheckedKeys().toString(),
      };
      // 修改角色
      postp("role/updateRoles", news)
        .then((res) => {
          console.log(res);
          this.dialogFormVisible3 = false;
          // 按钮
          setTimeout(() => {
            this.an.xiug = false;
          }, 500);
          // 刷新数据
          this.shuj();
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        })
        .catch((error) => {
          console.log(error);
          this.an.xiug = false;
        });
      this.kong = [];
    },
  },
  // 监听表单，关闭清空
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.qingc();
      }
    },
    dialogFormVisible2(val) {
      if (!val) {
        this.qingc();
      }
    },
    dialogFormVisible3(val) {
      if (!val) {
        this.qingc();
      }
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
.fom {
  .el-input {
    width: 220px;
  }
}
.top {
  height: 50px;
  display: flex;
  // background: #dddddd;
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
.xiu {
  font-size: 8px;
}
.col {
  color: #a2a2a2;
  font-size: 15px;
}
</style>