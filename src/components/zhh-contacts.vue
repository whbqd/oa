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
      </div>
      <div class="xuan">
        <el-tree
          :data="data"
          :props="defaultProps"
          show-checkbox
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
        ></el-tree>
      </div>
    </div>
    <div class="right">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
        height="585"
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
    return {
      // 左边
      data: [
        {
          label: "公司领导",
          name: "ling",
          checked: false,
        },
        {
          label: "维护部",
          name: "wei",
          checked: false,
          children: [
            {
              label: "维护部（家集客）",
              name: "weihu",
              checked: false,
            },
            {
              label: "二级 2-2",
            },
          ],
        },
        {
          label: "建设部",
          children: [
            {
              label: "二级 3-1",
            },
            {
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
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
    handleNodeClick(data) {
      const ling = [
        {
          name: "小红",
        },
        {
          name: "小丽",
        },
        {
          name: "小美",
        },
        {
          name: "小刚",
        },
      ];
      const weihu = [
        {
          name: "小涨",
        },
        {
          name: "小和",
        },
        {
          name: "小有",
        },
        {
          name: "小蛋",
        },
      ];
      if (data.name == "ling") {
        this.name = ling;
      }
      if (data.name == "weihu") {
        this.name = weihu;
      }
    },
    handleCheckChange(data) {
      const ling = [
        {
          name: "小红",
        },
        {
          name: "小丽",
        },
        {
          name: "小美",
        },
        {
          name: "小刚",
        },
      ];
      if (data.name == "ling") {
        this.checkboxGroup = ling;
      }
      this.sele = this.checkboxGroup.length;
    },
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
}
</style>