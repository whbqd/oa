<template>
  <div class="contacts">
    <!-- 左边 -->
    <div class="left">
      <div class="so">
        <input
          type="text"
          name="lookup"
          placeholder="搜索部门，人名"
          autocomplete="off"
          class="yan"
        />
        <div class="ding"><span class="iconfont icon-sousuo"></span></div>
      </div>
      <div class="top">
        <p class="font">组织构架</p>

        <!-- 添加父级 -->
        <el-button type="text" @click="dialogFormVisible = true">
          <span class="iconfont icon-jia icon"></span>
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
      <div class="xuan">
        <!-- 树形结构 -->

        <div class="custom-tree-container">
          <el-tree :data="data" show-checkbox node-key="id" default-expand-all>
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span class="nnn">
                <el-button
                  type="text"
                  size="mini"
                  @click="dialogFormVisibles = true"
                >
                  <!-- 添加子级 -->
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
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                >
                  <span class="iconfont icon-jian icon"></span>
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </div>
    </div>
    <!-- 右边 -->
    <div class="right">
      <div class="top2">
        <button class="but col1">批量导入成员</button>
        <button class="but col2">导出/修改成员</button>
        <button class="but col3">入职同步</button>
      </div>
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        height="535"
        id="se"
        :cell-style="{ padding: '1px', textAlign: 'center', fontSize: '12px' }"
        :header-cell-style="{
          background: '#dddddd',
          color: '#606266',
          textAlign: 'center',
          fontSize: '14px',
        }"
      >
        <el-table-column width="50"> </el-table-column>
        <el-table-column property="depa" label="部门"> </el-table-column>
        <el-table-column property="name" label="姓名"> </el-table-column>
        <el-table-column property="post" label="岗位"> </el-table-column>
        <el-table-column property="phone" label="手机"> </el-table-column>
        <el-table-column property="number" label="集团号"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              ><span class="iconfont icon-bianji sosuo"></span
            ></el-button>
            <el-button
              type="text"
              size="small"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              ><span class="iconfont icon-shanchu sosuo col"></span
            ></el-button> </template
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "领导",
      },
    ];
    return {
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
      // 右边
      tableData: [
        {
          depa: "武林",
          name: "张呵呵",
          post: "维护一线",
          phone: "15954123558",
          number: "9999",
        },
        {
          depa: "武林",
          name: "张呵呵",
          post: "维护一线",
          phone: "15954123558",
          number: "9999",
        },
        {
          depa: "武林",
          name: "张呵呵",
          post: "维护一线",
          phone: "15954123558",
          number: "9999",
        },
        {
          depa: "武林",
          name: "张呵呵",
          post: "维护一线",
          phone: "15954123558",
          number: "9999",
        },
        {
          depa: "武林",
          name: "张呵呵",
          post: "维护一线",
          phone: "15954123558",
          number: "9999",
        },
        {
          depa: "武林",
          name: "张呵呵",
          post: "维护一线",
          phone: "15954123558",
          number: "9999",
        },
        {
          depa: "武林",
          name: "张呵呵",
          post: "维护一线",
          phone: "15954123558",
          number: "9999",
        },
        {
          depa: "武林",
          name: "张呵呵",
          post: "维护一线",
          phone: "15954123558",
          number: "9999",
        },
        {
          depa: "武林",
          name: "张呵呵",
          post: "维护一线",
          phone: "15954123558",
          number: "9999",
        },
      ],
    };
  },
  methods: {
    // 左边
    addf() {
      // 添加父级
      this.dialogFormVisible = false;
      this.data.push({ label: this.form.name });
      this.form.name = "";
    },

    adds(data) {
      // 添加父级
      this.ring = data;
      // console.log("12", this.ring.label);
      this.fater = this.ring.label;
    },
    // 确定
    appends() {
      const newChild = { label: this.form.names, children: [] };
      if (!this.ring.children) {
        this.$set(this.ring, "children", []);
      }
      // 插入
      this.ring.children.push(newChild);

      var tij = { sectorName: newChild.label, upSector: "" };
      var upSector = this.fater;

      this.$axios
        .post("www.111.com", { tij, upSector })
        .then(function () {
          console.log(1);
        })
        .catch(function () {
          console.log(2);
        });

      // 还原
      this.dialogFormVisibles = false;
      this.form.names = "";
      this.fater = "";
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
    // 点击
    // handleNodeClick(data) {
    //   console.log(data.label);
    // },
    // 右边
    handleClick(row) {
      console.log(row);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
  },
};
</script>
<style scoped lang="less">
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
      left: 95px;
      top: -23px;
      color: #d3d3d3;
    }
  }
  .xuan {
    width: 100%;
    height: 460px;
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
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
    .col2 {
      background-color: #0ec7ff;
    }
    .col3 {
      background-color: #ffb546;
    }
  }
}
</style>