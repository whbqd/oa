<template>
  <div>
    <div class="right">
      <div class="top2">
        <!-- <button class="but col1 a" @click="news" v-test="{ name: '新增岗位' }">
          新增
        </button> -->
        <button class="but col1" @click="bumen = true">筛选</button>
        <button class="but col1" @click="dao">导出</button>
      </div>
      <!-- 岗位设置表 -->
      <el-table
        ref="singleTable"
        :data="tableData4"
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
        <el-table-column property="sectorname" label="岗位所属部门">
        </el-table-column>
        <el-table-column property="postsName" label="岗位名称">
        </el-table-column>

        <el-table-column property="portsNum" label="岗位人数">
        </el-table-column>
        <el-table-column property="postsInNum" label="岗位实际在职人数">
        </el-table-column>
        <el-table-column property="vacanciesNum" label="岗位空缺人数">
        </el-table-column>
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
    <!-- 岗位设置新增 -->
    <el-dialog
      :visible.sync="gangweiNew"
      :append-to-body="true"
      title="新增"
      style="width: 800px; margin: auto"
    >
      <div style="height: 100px">
        <el-form :model="gwNews" label-width="140px" class="froms">
          <el-col :span="7">
            <el-form-item label="岗位名称 ：">
              <el-input v-model="gwNews.postsName"></el-input>
            </el-form-item>
            <el-form-item label="岗位所属部门 ：">
              <el-select
                v-model="gwNews.postDepartment"
                placeholder="请选择所在部门"
              >
                <el-option
                  v-for="(postDepartments, index) in postDepartments"
                  :key="index"
                  :label="postDepartments.label"
                  :value="postDepartments.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="岗位人数 ：">
              <el-input v-model="gwNews.portsNum"></el-input>
            </el-form-item>
            <el-form-item label="岗位实际在职人数 ：">
              <el-input v-model="gwNews.postsInNum"></el-input>
            </el-form-item>
            <el-form-item label="岗位空缺人数 ：">
              <el-input v-model="gwNews.vacanciesNum"></el-input>
            </el-form-item> -->
          </el-col>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="gangweiNew = false">取 消</el-button>
        <el-button @click="gangwei">确定</el-button>
      </div>
    </el-dialog>
    <!-- 岗位设置查找 -->
    <el-dialog
      :visible.sync="bumen"
      :append-to-body="true"
      :destroy-on-close="true"
      title="修改"
      style="width: 800px; margin: auto"
    >
      <!-- 树形结构 -->
      <div class="xuan">
        <el-tree
          :data="datas"
          :props="defaultProps"
          default-expand-all
          ref="tree"
          show-checkbox
        ></el-tree>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="bumen = false">取 消</el-button>
        <el-button @click="exportr">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { gets, postp } from "../request/wan";
import URL2 from "../http/URL2";
export default {
  data() {
    return {
      // 分页
      currentPage: 1,
      pagesize: 50,
      fileList: [],
      counts: 0,
      tableData4: [],
      // 岗位设置
      // 自动获取父级
      postDepartments: [],
      // 岗位设置新增弹出
      gangweiNew: false,
      // 岗位设置修改弹出
      gangweiXui: false,
      bumen: false,
      // 岗位设置新增
      gwNews: {
        postsName: "",
        postDepartment: "",
        portsNum: "",
        postsInNum: "",
        vacanciesNum: "",
      },
      // 岗位设置修改
      gwXiu: {
        postsName: "",
        postDepartment: "",
        portsNum: "",
        postsInNum: "",
        vacanciesNum: "",
      },
      // 组织构架
      datas: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      xuanz: "",
      ids: "",
    };
  },
  created() {
    // 组织构架
    gets("sector/getSector")
      .then((res) => {
        this.datas = res.data;
        console.log(res.data, 999);
      })
      .catch((error) => {
        console.log(error);
      });
    // 表格数据
    gets("posts/selPage", {
      pageSize: this.pagesize,
      page: this.currentPage,
    }).then((res) => {
      // console.log(res);
      // console.log(res, 555);
      this.tableData4 = res.data.items;
      this.counts = res.data.counts;
    });
  },
  methods: {
    news() {
      this.gangweiNew = true;
      this.gwNews.postsName = "";
      this.gwNews.postDepartment = "";
      this.gwNews.portsNum = "";
      this.gwNews.postsInNum = "";
      this.gwNews.vacanciesNum = "";
      this.qing();
    },
    // 自动获取部门
    qing() {
      console.log(123);
      for (var i = 0; i < this.datas[0].children.length; i++) {
        const a = this.datas[0].children[i].sectorInNum;
        if (a != 0) {
          this.postDepartments.push(this.datas[0].children[i]);
        }
        for (var j = 0; j < this.datas[0].children[i].children.length; j++) {
          const a = this.datas[0].children[i].children[j].sectorInNum;
          if (a != 0) {
            this.postDepartments.push(this.datas[0].children[i].children[j]);
          }
        }
      }
    },
    // 数据
    shuj() {
      gets("posts/selPage", {
        pageSize: this.pagesize,
        page: this.currentPage,
      }).then((res) => {
        console.log(res);
        this.tableData4 = res.data.items;
        this.counts = res.data.counts;
      });
    },
    // 分页
    handleSizeChange: function (val) {
      this.pagesize = val;
      this.shuj();
    },
    // 数据条数
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.shuj();
    },
    // 岗位设置新增
    gangwei() {
      postp("posts/insert", {
        postsName: this.gwNews.postsName,
        postDepartment: this.gwNews.postDepartment,
      }).then((res) => {
        console.log(res);
        this.shuj();
        this.gangweiNew = false;
        this.$message({
          type: "success",
          message: "新增成功!",
        });
      });
    },
    // 查找
    exportr() {
      this.xuanz = this.$refs.tree.getCheckedNodes();
      var ids = "";
      this.xuanz.forEach((res) => {
        console.log(res);
        if (res.UpSector != 0 && res.UpSector != 26) {
          console.log(123);
          ids = ids + res.id + ",";
        }
      });
      ids = ids.substr(0, ids.length - 1);
      console.log(ids);
      this.ids = ids;
      gets("posts/getPostsBySector1" + "?id=" + ids).then((res) => {
        this.tableData4 = res.data;
        this.counts = res.data.length;
        // console.log(res);
      });
      this.bumen = false;
    },
    // 下载
    dao() {
      window.open(URL2.xia + "posts/postsDown" + "?id=" + this.ids);
    },
  },
};
</script>
<style scoped lang="less">
.a {
  display: none;
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
.xuan {
  width: 100%;
  height: 380px;
  overflow: auto;
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