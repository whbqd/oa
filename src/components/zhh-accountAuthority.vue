<template>
  <div class="noticeAdmin">
    <div class="top">
      <button class="but col1" @click="dialogFormVisible = true">新建</button>

      <el-dialog
        title="新增"
        :visible.sync="dialogFormVisible"
        :append-to-body="true"
      >
        <div style="height: 400px; overflow: auto; width: 102%">
          <el-form :model="form" class="fom">
            <el-form-item label="选择成员" :label-width="formLabelWidth">
              <el-input v-model="form.member"></el-input>
            </el-form-item>
            <el-form-item label="所在部门" :label-width="formLabelWidth">
              <el-input v-model="form.deap"></el-input>
            </el-form-item>
            <el-form-item label="职位" :label-width="formLabelWidth">
              <el-input v-model="form.position"></el-input>
            </el-form-item>

            <el-form-item label="手机登录" :label-width="formLabelWidth">
              <el-input v-model="form.phone"></el-input>
              <el-button type="success" size="mini" style="margin-left: 10px"
                >修改</el-button
              >
            </el-form-item>

            <el-form-item label="微信登录" :label-width="formLabelWidth">
              <el-input v-model="form.weChat"></el-input>
              <el-button type="success" size="mini" style="margin-left: 10px"
                >修改</el-button
              >
            </el-form-item>

            <el-form-item label="角色" :label-width="formLabelWidth">
              <el-input v-model="form.role"></el-input>
            </el-form-item>
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
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="gets">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 表格 -->
    <el-table
      ref="singleTable"
      stripe
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      highlight-current-row
      style="width: 100%"
      height="505"
      id="se"
      :cell-style="{ padding: '1px' }"
      :header-cell-style="{ background: '#dddddd', color: '#606266' }"
    >
      <el-table-column width="50"> </el-table-column>
      <el-table-column property="id" label="ID"> </el-table-column>
      <el-table-column property="deap" label="部门"> </el-table-column>
      <el-table-column property="name" label="姓名"> </el-table-column>
      <el-table-column property="phone" label="手机"> </el-table-column>
      <el-table-column label="操作">
        <template  slot-scope="scope">
          <el-button type="text" size="small"
            ><span
              class="iconfont icon-yanjing xiu"
              @click="dialogFormVisible = true"
            ></span
          ></el-button>
          <el-button type="text" size="small"
            ><span
              class="iconfont icon-bianji xiu col"
              @click="dialogFormVisible = true"
            ></span
          ></el-button>
          <el-button type="text" size="small"
            ><span
              class="iconfont icon-shanchu xiu col"
              @click="deleteRow(scope.$index, tableData)"
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
      :total="tableData.length"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "1",
          deap: "行政会议",
          name: "张呵呵",
          phone: "15957125446",
        },
        {
          id: "1",
          deap: "行政会议",
          name: "张呵呵",
          phone: "15957125446",
        },
        {
          id: "1",
          deap: "行政会议",
          name: "张呵呵",
          phone: "15957125446",
        },
        {
          id: "1",
          deap: "行政会议",
          name: "张呵呵",
          phone: "15957125446",
        },
        {
          id: "1",
          deap: "行政会议",
          name: "张呵呵",
          phone: "15957125446",
        },
        {
          id: "1",
          deap: "行政会议",
          name: "张呵呵",
          phone: "15957125446",
        },
        {
          id: "1",
          deap: "行政会议",
          name: "张呵呵",
          phone: "15957125446",
        },
        {
          id: "1",
          deap: "行政会议",
          name: "张呵呵",
          phone: "15957125446",
        },
        {
          id: "1",
          deap: "行政会议",
          name: "张呵呵",
          phone: "15957125446",
        },
        {
          id: "1",
          deap: "行政会议",
          name: "张呵呵",
          phone: "15957125446",
        },
        {
          id: "1",
          deap: "行政会议",
          name: "张呵呵",
          phone: "15957125446",
        },
        {
          id: "1",
          deap: "行政会议",
          name: "张呵呵",
          phone: "15957125446",
        },
      ],
      currentPage: 1,
      pagesize: 10,
      form: {
        member: "李四",
        deap: "维护部",
        position: "员工",
        phone: "15845652336",
        weChat: "wdsdfds",
        role: "",
        describe: "",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  methods: {
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    edit() {
      this.$router.push("/homepage/noticeEdit");
    },
    // 删除
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    gets() {
      this.dialogFormVisible = false;
      console.log(122);
      console.log(
        this.form.member,
        this.form.deap,
        this.form.position,
        this.form.phone,
        this.form.weChat,
        this.form.role,
        this.form.describe
      );
    },
  },
};
</script>
<style scoped lang="less">
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
    background-color: rgb(58, 124, 247);
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