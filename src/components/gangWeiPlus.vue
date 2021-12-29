<template>
  <div>
    <div class="right">
      <div class="top2">
        <button class="but col1" @click="news" v-test="{ name: '新增岗位' }">
          新增
        </button>
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
        <el-table-column type="selection"> </el-table-column>

        <el-table-column property="postsName" label="岗位名称">
        </el-table-column>
        <el-table-column property="sectorname" label="岗位所属部门">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick4(scope.row)" type="text" size="small"
              ><span class="iconfont icon-bianji sosuo"></span
            ></el-button>
            <el-button type="text" size="small" @click="deleteRow4(scope.row)"
              ><span
                class="iconfont icon-shanchu sosuo col"
                v-test="{ name: '删除岗位' }"
              ></span
            ></el-button> </template
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40, 60, 80, 100]"
        :page-size="pagesize"
        :total="counts"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
    <!-- 岗位设置新增 -->
    <el-dialog :visible.sync="gangweiNew" :append-to-body="true" title="新增">
      <div style="height: 300px" class="el-dialog-div">
        <el-form :model="gwNews" label-width="140px" class="froms">
          <el-col>
            <el-form-item label="岗位名称 ：">
              <el-input v-model="gwNews.postsName"></el-input>
              <span
                class="iconfont icon-tianjia1 tianJ"
                @click="addDomain"
              ></span>
            </el-form-item>
          </el-col>
        </el-form>
        <!-- 新增部门 -->
        <el-form
          class="form"
          :model="dynamicValidateForm"
          label-width="140px"
          v-for="domain in dynamicValidateForm.domains"
          :key="domain.key"
        >
          <el-col>
            <el-form-item label="申请岗位 ：" :required="true">
              <el-select
                v-model="domain.postDepartment"
                placeholder="请选择所在岗位"
              >
                <el-option
                  v-for="(sector, index) in sector"
                  :key="index"
                  :label="sector.sectorName"
                  :value="sector.sectorName"
                ></el-option>
              </el-select>
              <span
                class="iconfont icon-shanchu shan"
                @click.prevent="removeDomain(domain)"
              ></span>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="gangweiNew = false">取 消</el-button>
        <el-button @click="gangwei">确定</el-button>
      </div>
    </el-dialog>
    <!-- 岗位设置修改 -->
    <el-dialog :visible.sync="gangweiXui" :append-to-body="true" title="修改">
      <div style="height: 100px" class="el-dialog-div">
        <el-form :model="gwXiu" label-width="140px" class="froms">
          <el-col :span="7">
            <el-form-item label="岗位名称 ：">
              <el-input v-model="gwXiu.postsName"></el-input>
            </el-form-item> </el-col
        ></el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="gangweiXui = false">取 消</el-button>
        <el-button @click="hetongXuis4">确定</el-button>
      </div>
    </el-dialog>
    <!-- 部门树形结构 -->
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
      pagesize: 60,
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
        portsNum: 0,
        postsInNum: 0,
        vacanciesNum: 0,
      },
      // 新增
      dynamicValidateForm: {
        domains: [
          {
            postDepartment: "",
          },
        ],
      },
      // 岗位设置修改
      gwXiu: {
        postsName: "",
        postDepartment: "",
        portsNum: 0,
        postsInNum: 0,
        vacanciesNum: 0,
      },
      // 组织构架
      datas: "",
      defaultProps: {
        children: "children",
        label: "label",
      },
      xuanz: "",
      ids: "",
      sector: [],
    };
  },
  created() {
    // 组织构架
    gets("sector/getSector")
      .then((res) => {
        this.datas = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    // 新增部门
    gets("posts/getSector")
      .then((res) => {
        this.sector = res.data;
        console.log(this.sector, 9989);
      })
      .catch((error) => {
        console.log(error);
      });

    gets("posts/selPage", {
      pageSize: this.pagesize,
      page: this.currentPage,
    }).then((res) => {
      // console.log(res);
      console.log(res, 5645645645);
      this.tableData4 = res.data.items;
      this.counts = res.data.counts;
    });
  },
  methods: {
    // 部门转ID
    bum() {
      var a = [];
      this.sector.forEach((res1) => {
        this.dynamicValidateForm.domains.forEach((res2) => {
          console.log(res1.sectorName);
          console.log(res2.postDepartment, 66);
          if (res2.postDepartment == res1.sectorName) {
            a.push(res1.id);
          }
        });
      });

      return a;
    },
    news() {
      // 新增
      (this.dynamicValidateForm = {
        domains: [
          {
            postDepartment: "",
          },
        ],
      }),
        (this.gangweiNew = true);
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
    // 岗位设置
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
    // 删除表单
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    // 添加表单
    addDomain() {
      this.dynamicValidateForm.domains.push({
        postDepartment: "",
        key: Date.now(),
      });
    },
    // 岗位设置新增
    gangwei() {
      // console.log(this.bum());
      var id = this.bum();
      var sj = {
        postsName: this.gwNews.postsName,
        postDepartment: "",
        portsNum: 0,
        postsInNum: 0,
        vacanciesNum: 0,
      };
      id.forEach((res) => {
        sj.postDepartment = res;
        postp("posts/insert", sj).then((res) => {
          console.log(res);
          this.shuj();
          this.gangweiNew = false;
          this.$message({
            type: "success",
            message: "新增成功!",
          });
        });
      });
    },

    // 岗位设置删除
    deleteRow4(row) {
      // console.log(row.id);
      gets("posts/delPosts" + "?ids=" + row.id).then(() => {
        this.shuj();
      });
    },
    // 岗位设置修改弹出
    handleClick4(row) {
      this.qing();
      this.gangweiXui = true;
      this.gwXiu.postsName = row.postsName;
      this.gwXiu.postDepartment = row.postDepartment;
      this.gwXiu.portsNum = row.portsNum;
      this.gwXiu.postsInNum = row.postsInNum;
      this.gwXiu.vacanciesNum = row.vacanciesNum;
      this.ids = row.id;
    },
    // 岗位设置修改确定
    hetongXuis4() {
      // this.ids.details = this.ygXiu.details;
      postp("posts/updatePosts", {
        id: this.ids,
        postsName: this.gwXiu.postsName,
        postDepartment: this.gwXiu.postDepartment,
        portsNum: this.gwXiu.portsNum,
        postsInNum: this.gwXiu.postsInNum,
        vacanciesNum: this.gwXiu.vacanciesNum,
      }).then((res) => {
        console.log(res);
        this.shuj();
        this.gangweiXui = false;
      });
    },
    // 导出
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
.el-dialog-div {
  height: 60vh;
  overflow: auto;
}

.el-form {
  .el-input {
    width: 280px;
  }
  .el-select {
    width: 280px;
  }
}
.tianJ {
  font-size: 25px;
  position: relative;
  color: #dfdfdf;
  left: 10px;
  top: 6px;
}
.shan {
  font-size: 20px;
  position: relative;
  left: 12px;
  top: 5px;
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