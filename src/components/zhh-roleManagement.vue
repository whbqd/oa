<template>
  <div class="noticeAdmin">
    <div class="top">
      <button class="but col1" @click="dialogFormVisible = true">新建</button>
      <!-- 弹出 -->
      <el-dialog
        title="新增"
        :visible.sync="dialogFormVisible"
        :append-to-body="true"
      >
        <div style="height: 400px; overflow: auto; width: 102%">
          <el-form :model="form" class="fom">
            <!-- 名称 -->
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="form.name"></el-input>
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
                <el-radio label="本人的数据"></el-radio>
                <el-radio label="本部门的数据"></el-radio>
                <el-radio label="本部门及下属的数据"></el-radio>
                <el-radio label="全部数据"></el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 多选 -->
            <el-form-item label="功能权限" :label-width="formLabelWidth">
              <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                ref="tree"
                :props="defaultProps"
                @check-change="handleCheckChange"
              >
              </el-tree>
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
      <el-table-column property="id" label="角色编码"> </el-table-column>
      <el-table-column property="name" label="角色名称"> </el-table-column>
      <el-table-column property="fun" label="功能权限"> </el-table-column>
      <el-table-column property="record" label="数据权限"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
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
      // 数据
      tableData: [
        {
          id: "1",
          name: "公众号管理",
          fun: "组织构架",
          record: "本部门，下属部门",
        },
        {
          id: "1",
          name: "公众号管理",
          fun: "组织构架",
          record: "本部门，下属部门",
        },
        {
          id: "1",
          name: "公众号管理",
          fun: "组织构架",
          record: "本部门，下属部门",
        },
        {
          id: "1",
          name: "公众号管理",
          fun: "组织构架",
          record: "本部门，下属部门",
        },
        {
          id: "1",
          name: "公众号管理",
          fun: "组织构架",
          record: "本部门，下属部门",
        },
        {
          id: "1",
          name: "公众号管理",
          fun: "组织构架",
          record: "本部门，下属部门",
        },
        {
          id: "1",
          name: "公众号管理",
          fun: "组织构架",
          record: "本部门，下属部门",
        },
        {
          id: "1",
          name: "公众号管理",
          fun: "组织构架",
          record: "本部门，下属部门",
        },
        {
          id: "1",
          name: "公众号管理",
          fun: "组织构架",
          record: "本部门，下属部门",
        },
        {
          id: "1",
          name: "公众号管理",
          fun: "组织构架",
          record: "本部门，下属部门",
        },
        {
          id: "1",
          name: "公众号管理",
          fun: "组织构架",
          record: "本部门，下属部门",
        },
        {
          id: "1",
          name: "公众号管理",
          fun: "组织构架",
          record: "本部门，下属部门",
        },
      ],
      // 分页
      currentPage: 1,
      pagesize: 10,
      // 表单
      form: {
        name: "公众号管理员",
        number: "2545588",
        describe: "",
        resource: "",
        type: [],
      },
      // 是否弹出
      dialogFormVisible: false,
      formLabelWidth: "120px",
      data: [
        {
          id:"1",
          label: "工作台",
          children: [
            {
              id: "5",
              label: "三级 1-1-1",
            },
            {
              id: "9",
              label: "三级 1-1-2",
            },
          ],
        },
        {
          id: 2,
          label: "待办",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "通告",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
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
    // 提交
    gets() {
      this.dialogFormVisible = false;
      console.log(this.$refs.tree.getCheckedKeys());
      console.log("45", this.$refs.tree.getHalfCheckedKeys());
      // console.log(this.form.name, this.form.number, this.form.describe);
    },
    handleCheckChange(data) {
      console.log(data);
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