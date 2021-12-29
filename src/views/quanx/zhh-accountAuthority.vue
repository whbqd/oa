<template>
  <div class="noticeAdmin">
    <div class="top">
      <button class="but col1 a" @click="xins" v-test="{ name: '插入用户' }">
        新建
      </button>
      <button class="but col1" @click="chas = true">查找</button>
      <!-- 弹出新增账号 -->
      <el-dialog
        title="新增"
        :visible.sync="dialogFormVisible"
        :append-to-body="true"
        lock-scroll
      >
        <!-- 弹出人员 -->
        <el-dialog
          title="人员"
          :visible.sync="innerVisible"
          append-to-body
          destroy-on-close
        >
          <div style="width: 100%">
            <personnel3></personnel3>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary" @click="reny">确 定</el-button>
          </div>
        </el-dialog>
        <div>
          <!-- 选择成员 -->
          <el-form :model="form" class="fom">
            <el-form-item label="选择成员" :label-width="formLabelWidth">
              <div @click="innerVisible = true">
                <el-input v-model="form.member" placeholder="请选择"></el-input>
              </div>
            </el-form-item>
            <!-- 所在部门 -->
            <el-form-item label="所在部门" :label-width="formLabelWidth">
              <el-input
                v-model="form.deap"
                :disabled="true"
                placeholder="自动获取"
              ></el-input>
            </el-form-item>
            <!-- 岗位 -->
            <el-form-item label="岗位" :label-width="formLabelWidth">
              <el-input
                v-model="form.position"
                :disabled="true"
                placeholder="自动获取"
              ></el-input>
            </el-form-item>
            <!-- 手机登录 -->
            <el-form-item label="手机登录" :label-width="formLabelWidth">
              <el-input v-model="form.phone" placeholder="自动获取"></el-input>
            </el-form-item>
            <!-- 角色 -->
            <el-form-item label="角色" :label-width="formLabelWidth">
              <el-select v-model="form.role" placeholder="请选择角色">
                <el-option
                  v-for="(roles, index) in rolesData"
                  :key="index"
                  :label="roles.roleName"
                  :value="roles.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 是否审批人-->
            <el-form-item label="是否审批人" :label-width="formLabelWidth">
              <el-radio v-model="form.radio" label="0">是</el-radio>
              <el-radio v-model="form.radio" label="1">否</el-radio>
            </el-form-item>
            <!-- 审批人说明-->
            <el-form-item
              label="审批人说明"
              :label-width="formLabelWidth"
              :class="{ a: form.radio == 1 }"
            >
              <el-input v-model="form.annx" placeholder="请输入"></el-input>
            </el-form-item>
            <!-- 是否条线负责人-->
            <el-form-item
              label="条线负责人"
              :label-width="formLabelWidth"
              :class="{ a: form.radio == 1 }"
            >
              <el-radio v-model="form.radio2" label="0">是</el-radio>
              <el-radio v-model="form.radio2" label="1">否</el-radio>
            </el-form-item>
            <!-- 所属条线 -->
            <el-form-item
              label="所属条线 ："
              :label-width="formLabelWidth"
              :class="{ a: form.radio2 == 1 }"
            >
              <el-select v-model="form.tiao" placeholder="请选择所属条线">
                <el-option label="维护" value="维护"></el-option>
                <el-option label="销售" value="销售"></el-option>
                <el-option label="工程" value="工程"></el-option>
                <el-option label="信息" value="信息"></el-option>
                <el-option label="综合" value="综合"></el-option> </el-select
            ></el-form-item>
            <!-- 是否区县或部门负责人-->
            <el-form-item
              label="区县或部门负责人"
              :label-width="formLabelWidth"
              :class="{ a: form.radio == 1 }"
            >
              <el-radio v-model="form.radio3" label="0">是</el-radio>
              <el-radio v-model="form.radio3" label="1">否</el-radio>
            </el-form-item>
            <!-- 所属区县或部门 -->
            <el-form-item
              label="所属区县或部门 ："
              :label-width="formLabelWidth"
              :class="{ a: form.radio3 == 1 }"
            >
              <el-input
                v-model="form.responsibleSector"
                :disabled="true"
                placeholder="自动获取"
              ></el-input
            ></el-form-item>

            <!-- 描述 -->
            <el-col :span="24">
              <el-form-item label="描述" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  v-model="form.describe"
                  rows="3"
                  placeholder="用于运营人员等账号新建，密码重置，信息编辑等"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="gets" :loading="an.xinz"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 弹出查看账号 -->
      <el-dialog
        title="查看"
        :visible.sync="dialogFormVisible2"
        :append-to-body="true"
        lock-scroll
      >
        <!-- 弹出人员 -->
        <el-dialog
          title="人员"
          :visible.sync="innerVisible"
          append-to-body
          destroy-on-close
        >
          <div style="width: 100%">
            <personnel3></personnel3>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary" @click="reny">确 定</el-button>
          </div>
        </el-dialog>
        <div>
          <!-- 选择成员 -->
          <el-form :model="form" class="fom">
            <el-form-item label="选择成员" :label-width="formLabelWidth">
              <div @click="innerVisible = true">
                <el-input
                  v-model="form.member"
                  placeholder="请选择"
                  :disabled="true"
                ></el-input>
              </div>
            </el-form-item>
            <!-- 所在部门 -->
            <el-form-item label="所在部门" :label-width="formLabelWidth">
              <el-input
                v-model="form.deap"
                :disabled="true"
                placeholder="自动获取"
              ></el-input>
            </el-form-item>
            <!-- 岗位 -->
            <el-form-item label="岗位" :label-width="formLabelWidth">
              <el-input
                v-model="form.position"
                :disabled="true"
                placeholder="自动获取"
              ></el-input>
            </el-form-item>
            <!-- 手机登录 -->
            <el-form-item label="手机登录" :label-width="formLabelWidth">
              <el-input
                v-model="form.phone"
                placeholder="自动获取"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <!-- 角色 -->
            <el-form-item label="角色" :label-width="formLabelWidth">
              <el-select
                v-model="form.role"
                placeholder="请选择角色"
                :disabled="true"
              >
                <el-option
                  v-for="(roles, index) in rolesData"
                  :key="index"
                  :label="roles.roleName"
                  :value="roles.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 是否审批人-->
            <el-form-item label="是否审批人" :label-width="formLabelWidth">
              <el-radio v-model="form.radio" label="0" :disabled="true"
                >是</el-radio
              >
              <el-radio v-model="form.radio" label="1" :disabled="true"
                >否</el-radio
              >
            </el-form-item>
            <!-- 审批内容-->
            <el-form-item
              label="审批内容"
              :label-width="formLabelWidth"
              :disabled="true"
              :class="{ a: form.radio == 1 }"
            >
              <el-input
                v-model="form.annx"
                placeholder="请输入"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <!-- 是否条线或区县负责人-->
            <el-form-item
              label="条线或区县负责人"
              :label-width="formLabelWidth"
              :class="{ a: form.radio == 1 }"
            >
              <el-radio v-model="form.radio2" label="0" :disabled="true"
                >是</el-radio
              >
              <el-radio v-model="form.radio2" label="1" :disabled="true"
                >否</el-radio
              >
            </el-form-item>
            <!-- 所属条线 -->
            <el-form-item
              label="所属条线 ："
              :label-width="formLabelWidth"
              :class="{ a: form.radio2 == 1 }"
            >
              <el-select
                v-model="form.tiao"
                placeholder="请选择所属条线"
                :disabled="true"
              >
                <el-option label="维护" value="维护"></el-option>
                <el-option label="销售" value="销售"></el-option>
                <el-option label="工程" value="工程"></el-option>
                <el-option label="信息" value="信息"></el-option>
                <el-option label="综合" value="综合"></el-option></el-select
            ></el-form-item>
            <!-- 是否区县或部门负责人-->
            <el-form-item
              label="区县或部门负责人"
              :label-width="formLabelWidth"
              :class="{ a: form.radio == 1 }"
            >
              <el-radio v-model="form.radio3" label="0" :disabled="true"
                >是</el-radio
              >
              <el-radio v-model="form.radio3" label="1" :disabled="true"
                >否</el-radio
              >
            </el-form-item>
            <!-- 所属区县或部门 -->
            <el-form-item
              label="所属区县或部门 ："
              :label-width="formLabelWidth"
              :class="{ a: form.radio3 == 1 }"
            >
              <el-input
                v-model="form.responsibleSector"
                :disabled="true"
                placeholder="自动获取"
              ></el-input
            ></el-form-item>
            <!-- 描述 -->
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                v-model="form.describe"
                rows="3"
                :disabled="true"
                placeholder="用于运营人员等账号新建，密码重置，信息编辑等"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="gets2">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 弹出修改账号 -->
      <el-dialog
        title="修改"
        :visible.sync="dialogFormVisible3"
        :append-to-body="true"
        lock-scroll
      >
        <!-- 弹出人员 -->
        <el-dialog
          title="人员"
          :visible.sync="innerVisible"
          append-to-body
          destroy-on-close
        >
          <div style="width: 100%">
            <personnel3></personnel3>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisible = false">取 消</el-button>
            <el-button type="primary" @click="reny">确 定</el-button>
          </div>
        </el-dialog>
        <div>
          <!-- 选择成员 -->
          <el-form :model="form" class="fom">
            <el-form-item label="选择成员" :label-width="formLabelWidth">
              <div @click="innerVisible = true">
                <el-input v-model="form.member" placeholder="请选择"></el-input>
              </div>
            </el-form-item>
            <!-- 所在部门 -->
            <el-form-item label="所在部门" :label-width="formLabelWidth">
              <el-input
                v-model="form.deap"
                :disabled="true"
                placeholder="自动获取"
              ></el-input>
            </el-form-item>
            <!-- 岗位 -->
            <el-form-item label="岗位" :label-width="formLabelWidth">
              <el-input
                v-model="form.position"
                :disabled="true"
                placeholder="自动获取"
              ></el-input>
            </el-form-item>
            <!-- 手机登录 -->
            <el-form-item label="手机登录" :label-width="formLabelWidth">
              <el-input v-model="form.phone" placeholder="自动获取"></el-input>
            </el-form-item>
            <!-- 角色 -->
            <el-form-item label="角色" :label-width="formLabelWidth">
              <el-select v-model="form.role" placeholder="请选择角色">
                <el-option
                  v-for="(roles, index) in rolesData"
                  :key="index"
                  :label="roles.roleName"
                  :value="roles.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 是否审批人-->
            <el-form-item label="是否审批人" :label-width="formLabelWidth">
              <el-radio v-model="form.radio" label="0">是</el-radio>
              <el-radio v-model="form.radio" label="1">否</el-radio>
            </el-form-item>
            <!-- 审批内容-->
            <el-form-item
              label="审批内容"
              :label-width="formLabelWidth"
              :class="{ a: form.radio == 1 }"
            >
              <el-input v-model="form.annx" placeholder="请输入"></el-input>
            </el-form-item>
            <!-- 是否条线或区县负责人-->
            <el-form-item
              label="条线或区县负责人"
              :label-width="formLabelWidth"
              :class="{ a: form.radio == 1 }"
            >
              <el-radio v-model="form.radio2" label="0">是</el-radio>
              <el-radio v-model="form.radio2" label="1">否</el-radio>
            </el-form-item>
            <!-- 所属条线 -->
            <el-form-item
              label="所属条线 ："
              :label-width="formLabelWidth"
              :class="{ a: form.radio2 == 1 }"
            >
              <el-select v-model="form.tiao" placeholder="请选择所属条线">
                <el-option label="维护" value="维护"></el-option>
                <el-option label="销售" value="销售"></el-option>
                <el-option label="工程" value="工程"></el-option>
                <el-option label="信息" value="信息"></el-option>
                <el-option label="综合" value="综合"></el-option> </el-select
            ></el-form-item>
            <!-- 是否区县或部门负责人-->
            <el-form-item
              label="区县或部门负责人"
              :label-width="formLabelWidth"
              :class="{ a: form.radio == 1 }"
            >
              <el-radio v-model="form.radio3" label="0">是</el-radio>
              <el-radio v-model="form.radio3" label="1">否</el-radio>
            </el-form-item>
            <!-- 所属区县或部门 -->
            <el-form-item
              label="所属区县或部门 ："
              :label-width="formLabelWidth"
              :class="{ a: form.radio3 == 1 }"
            >
              <el-input
                v-model="form.responsibleSector"
                :disabled="true"
                placeholder="自动获取"
              ></el-input
            ></el-form-item>
            <!-- 描述 -->
            <el-form-item label="描述" :label-width="formLabelWidth">
              <el-input
                type="textarea"
                v-model="form.describe"
                rows="3"
                placeholder="用于运营人员等账号新建，密码重置，信息编辑等"
              ></el-input>
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
      :cell-style="{ padding: '1px', textAlign: 'center' }"
      :header-cell-style="{
        background: '#dddddd',
        color: '#606266',
        textAlign: 'center',
      }"
    >
      <el-table-column width="50"> </el-table-column>
      <el-table-column property="id" label="ID"> </el-table-column>
      <el-table-column property="sector" label="部门"> </el-table-column>
      <el-table-column property="userName" label="姓名"> </el-table-column>
      <el-table-column property="position" label="岗位"> </el-table-column>
      <el-table-column property="rolename" label="角色"> </el-table-column>
      <el-table-column property="account" label="手机"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small"
            ><span
              class="iconfont icon-yanjing xiu a"
              @click="seet(scope.row)"
              v-test="{ name: '查看用户角色详情' }"
            ></span
          ></el-button>
          <el-button type="text" size="small"
            ><span
              class="iconfont icon-bianji xiu col a"
              @click="revise(scope.row)"
              v-test="{ name: '修改用户权限' }"
            ></span
          ></el-button>
          <el-button type="text" size="small"
            ><span
              class="iconfont icon-shanchu xiu col a"
              @click="deleteRow(scope.$index, tableData, scope.row)"
              v-test="{ name: '删除某个用户' }"
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
    <!-- 弹出查找 -->
    <el-dialog
      title="查找"
      :visible.sync="chas"
      append-to-body
      destroy-on-close
    >
      <div style="width: 100%">
        <el-form :model="formCha" class="fom">
          <!-- 姓名 -->
          <el-form-item label="姓名" label-width="120px">
            <el-input
              v-model="formCha.userName"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="部门" label-width="120px">
            <el-select v-model="formCha.sector">
              <el-option
                v-for="(department, index) in department"
                :key="index"
                :label="department.label"
                :value="department.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 角色 -->
          <el-form-item label="角色" label-width="120px">
            <el-select v-model="formCha.role" placeholder="请选择角色">
              <el-option
                v-for="(roles, index) in rolesData"
                :key="index"
                :label="roles.roleName"
                :value="roles.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 是否应用 -->
          <el-form-item label="状态" label-width="120px">
            <el-radio-group v-model="formCha.available">
              <el-radio label="0">可用</el-radio>
              <el-radio label="1">不可用</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="是否审批人" label-width="120px">
            <el-radio v-model="formCha.approval" label="0">是</el-radio>
            <el-radio v-model="formCha.approval" label="1">否</el-radio>
          </el-form-item>
          <el-form-item label="是否条线负责人" label-width="120px">
            <el-radio v-model="formCha.responsible" label="0">是</el-radio>
            <el-radio v-model="formCha.responsible" label="1">否</el-radio>
          </el-form-item>
          <el-form-item label="是否区县负责人" label-width="120px">
            <el-radio v-model="formCha.sectorHead" label="0">是</el-radio>
            <el-radio v-model="formCha.sectorHead" label="1">否</el-radio>
          </el-form-item> -->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="chazhao = false">取 消</el-button>
        <el-button type="primary" @click="chazhao">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import personnel3 from "../../components/personnel3.vue";
import { gets, postp, posts } from "../../request/wan";
export default {
  data() {
    return {
      news: "新建",
      // 表格数据
      tableData: [],
      // 分页
      currentPage: 1,
      pagesize: 50,
      counts: 0,
      // 添加表单
      form: {
        member: "",
        deap: "",
        position: "",
        phone: "",
        role: "",
        describe: "",
        id: "",
        radio: "1",
        radio2: "1",
        radio3: "1",
        annx: "",
        tiao: "",
        responsibleSector: "",
      },
      // 查找
      formCha: {
        sector: "",
        userName: "",
        role: "",
        available: "0",
      },
      // 新建弹出
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      chas: false,
      // 人员选择弹出弹出
      innerVisible: false,
      formLabelWidth: "130px",
      // 动态角色
      rolesData: [],
      // 系统人员名单
      xitong: "",
      // 按钮状态
      an: {
        xinz: false,
        xiug: false,
      },
      // 部门
      department: [],
      // 组织构架
      datas: "",
    };
  },
  components: { personnel3 },
  created() {
    // 请求账号数据
    gets("user/getUser", {
      pagesize: this.pagesize,
      page: this.currentPage,
    })
      .then((res) => {
        this.tableData = res.data.items;
        this.counts = res.data.counts;
        console.log("64", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // 请求角色数据,用来动态获取角色下拉选项
    gets("role/getRoles", {
      pagesize: 50,
      page: 1,
    })
      .then((res) => {
        this.rolesData = res.data.items;
        console.log(this.rolesData, "角色");
      })
      .catch((error) => {
        console.log(error);
      });
    // 系统人员名单
    gets("user/getApproval").then((res) => {
      this.xitong = res.data;
    });
    // 组织构架
    gets("sector/getSector").then((res) => {
      this.datas = res.data;
      this.qing();
    });
  },
  methods: {
    // 高级查找
    chazhao() {
      postp("user/getUserByUserVo", this.formCha)
        .then((res) => {
          this.tableData = res.data;

          for (let s = 0; s < this.tableData.length; s++) {
            this.rolesData.forEach((rol) => {
              if (this.tableData[s].role == rol.id) {
                console.log(rol);
                this.tableData[s].rolename = rol.roleName;
              }
            });
          }

          console.log("45", this.tableData);
          this.chas = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 自动获取部门
    qing() {
      var aa = 0;
      console.log(this.datas, 8888);

      console.log(this.datas[0], 9999);
      Object.keys(this.datas[0]).forEach((key) => {
        // console.log(key);
        if (key == "children") {
          aa = 1;
        }
      });
      if (aa == 1) {
        for (var i = 0; i < this.datas[0].children.length; i++) {
          // console.log(this.datas[0].children[i].children);
          const a = this.datas[0].children[i].UpSector;
          console.log(this.datas[0].children[i]);
          if (a != 0 && a != 26) {
            this.department.push(this.datas[0].children[i]);
          }
          for (var j = 0; j < this.datas[0].children[i].children.length; j++) {
            const a = this.datas[0].children[i].children[j].UpSector;
            if (a != 0 && a != 26) {
              this.department.push(this.datas[0].children[i].children[j]);
            }
          }
        }
      } else {
        // console.log(this.datas[0].children[i].children);
        const a = this.datas[0].UpSector;
        if (a != 0 && a != 26) {
          this.department.push(this.datas[0]);
        }
      }
      console.log(this.department, 88888888);
    },
    // 比较
    bijiao(a, b) {
      if (this.xitong == "") {
        return;
      }
      var aa = 0;
      this.xitong.forEach((res) => {
        if (a == res.line && res.responsible == 0) {
          console.log(1);
          aa = 1;
          this.$message({
            message: "当前条线负责人为" + res.userName,
            type: "error",
          });
        }
        if (b == res.responsibleSector && res.sectorHead == 0) {
          console.log(2);
          this.$message({
            message: "当前部门或区县负责人为" + res.userName,
            type: "error",
          });
          aa = 1;
        }
      });
      return aa;
    },
    // 清除数据
    qingchu() {
      this.form = {
        member: "",
        deap: "",
        position: "",
        phone: "",
        role: "",
        describe: "",
        id: "",
        radio: "1",
        radio2: "1",
        radio3: "1",
        annx: "",
        tiao: "",
        responsibleSector: "",
      };
    },
    // 请求账号数据
    shuj() {
      gets("user/getUser", {
        pagesize: this.pagesize,
        page: this.currentPage,
      })
        .then((res) => {
          this.tableData = res.data.items;
          // 数据总条数
          this.counts = res.data.counts;
        })
        .catch((error) => {
          console.log(error);
        });
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
    // 删除账号
    deleteRow(index, rows, row) {
      // rows.splice(index, 1);
      this.$confirm("是否删除当前账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          posts("user/deleteUser", { ids: row.id }).then((res) => {
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
    // 查看角色读取
    seet(row) {
      // console.log(row);
      this.dialogFormVisible2 = true;
      this.form.member = row.userName;
      this.form.deap = row.sector;
      this.form.position = row.position;
      this.form.phone = row.account;
      this.form.role = row.role;
      this.form.describe = row.description;
      this.form.radio = JSON.stringify(row.approval);
      this.form.annx = row.annx;
      this.form.radio2 = JSON.stringify(row.responsible);
      this.form.tiao = row.line;
      this.form.radio3 = JSON.stringify(row.sectorHead);
      this.form.responsibleSector = row.responsibleSector;
    },
    // 修改角色读取
    revise(row) {
      // console.log(row);
      this.dialogFormVisible3 = true;
      this.form.id = row.id;
      this.form.member = row.userName;
      this.form.deap = row.sector;
      this.form.position = row.position;
      this.form.phone = row.account;
      this.form.role = row.role;
      this.form.describe = row.description;
      this.form.radio = JSON.stringify(row.approval);
      this.form.annx = row.annx;
      this.form.radio2 = JSON.stringify(row.responsible);
      this.form.tiao = row.line;
      this.form.radio3 = JSON.stringify(row.sectorHead);
      this.form.responsibleSector = row.responsibleSector;
    },
    // 新建账号弹出
    xins() {
      this.dialogFormVisible = true;
      this.form.phone = "";
      this.form.member = "";
      this.form.role = "";
      this.form.deap = "";
      this.form.position = "";
      this.form.describe = "";
      this.form.radio = "1";
      this.form.annx = "";
      this.form.radio2 = "1";
      this.form.radio3 = "1";
      this.form.tiao = "";
      this.form.responsibleSector = "";
    },
    // 新建账号提交
    gets() {
      // 按钮
      this.an.xinz = true;
      var news = {
        oid: null,
        account: this.form.phone,
        userName: this.form.member,
        role: this.form.role,
        sector: this.form.deap,
        position: this.form.position,
        description: this.form.describe,
        approval: this.form.radio,
        annx: this.form.annx,
        line: this.form.tiao,
        responsible: this.form.radio2,
        sectorHead: this.form.radio3,
        responsibleSector: this.form.responsibleSector,
      };
      // console.log(news);
      if (!this.form.member) {
        this.$message({
          message: "姓名不能为空",
          type: "error",
        });
        return;
      }
      if (!this.form.phone) {
        this.$message({
          message: "手机号不能为空",
          type: "error",
        });
        return;
      }
      if (!/^1[345678]\d{9}$/.test(this.form.phone)) {
        this.$message({
          message: "请输入正确的手机号",
          type: "error",
        });
        return;
      }
      if (!this.form.role) {
        this.$message({
          message: "角色不能为空",
          type: "error",
        });
        return;
      }
      if (!this.form.deap) {
        this.$message({
          message: "部门不能为空",
          type: "error",
        });
        return;
      }
      if (!this.form.position) {
        this.$message({
          message: "岗位不能为空",
          type: "error",
        });
        return;
      }
      if (!this.form.describe) {
        this.$message({
          message: "描述不能为空",
          type: "error",
        });
        return;
      }
      if (this.form.radio2 == 0) {
        if (this.bijiao(news.line, "") == 1) {
          console.log(333);
          return;
        }
      }
      if (this.form.radio3 == 0) {
        if (this.bijiao("", news.responsibleSector) == 1) {
          console.log(333);
          return;
        }
      }
      // 新建账号
      postp("user/insertUser", news)
        .then((res) => {
          console.log(res.data);
          // 按钮
          setTimeout(() => {
            this.an.xinz = false;
          }, 500);
          // this.$message(res.data);
          this.$message({
            message: res.data,
            type: "success",
          });
          this.dialogFormVisible = false;
          // 刷新数据
          this.shuj();
        })
        .catch((error) => {
          console.log(error);
          this.an.xinz = false;
        });
    },
    // 查看账号提交
    gets2() {
      this.dialogFormVisible2 = false;
    },
    // 修改账号提交
    gets3() {
      // 按钮
      this.an.xiug = true;
      var news = {
        id: this.form.id,
        oid: null,
        account: this.form.phone,
        userName: this.form.member,
        role: this.form.role,
        sector: this.form.deap,
        position: this.form.position,
        description: this.form.describe,
        approval: this.form.radio,
        annx: this.form.annx,
        line: this.form.tiao,
        responsible: this.form.radio2,
        sectorHead: this.form.radio3,
        responsibleSector: this.form.responsibleSector,
      };
      if (this.form.radio == 1) {
        this.form.tiao = "";
        this.form.responsibleSector = "";
      }
      if (this.form.radio == 2) {
        this.form.tiao = "";
      }
      if (this.form.radio == 3) {
        this.form.responsibleSector = "";
      }
      // console.log(news, 8989);
      // 修改账号
      postp("user/updateUser", news)
        .then((res) => {
          console.log(res);
          // 按钮
          setTimeout(() => {
            this.an.xiug = false;
          }, 500);
          // 刷新数据
          this.shuj();
          this.dialogFormVisible3 = false;
          this.$message({
            type: "success",
            message: "修改成功!",
          });
        })
        .catch((error) => {
          console.log(error);
          this.an.xiug = false;
        });
    },
    // 人员选择
    reny() {
      var len = 0;
      len = this.$store.name.length;
      console.log(this.$store.fromPerson, 5645654546554);
      if (len == 1) {
        this.form.member = this.$store.fromPerson.name;
        this.form.deap = this.$store.fromPerson.sector;
        this.form.position = this.$store.fromPerson.posts;
        this.form.phone = this.$store.fromPerson.phone;
        this.form.responsibleSector = this.$store.fromPerson.sector;
        this.innerVisible = false;
      } else {
        this.$alert("请选择一人", "提示", {
          confirmButtonText: "确定",
        });
        this.innerVisible = true;
      }
    },
  },
  watch: {
    dialogFormVisible() {
      this.qingchu();
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