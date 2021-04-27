<template>
  <div class="library">
    <!-- 标题 -->
    <div class="top">
      <div class="font" @click="cli = 0" :class="{ col: cli == 0 }">
        <p>政策文件</p>
      </div>
      <div class="font" @click="cli = 1" :class="{ col: cli == 1 }">
        <p>管理考核</p>
      </div>
      <div class="font" @click="cli = 2" :class="{ col: cli == 2 }">
        <p>办公模板</p>
      </div>
      <div class="font" @click="cli = 3" :class="{ col: cli == 3 }">
        <p>学习资料</p>
      </div>
      <div class="font" @click="cli = 4" :class="{ col: cli == 4 }">
        <p>上传文件</p>
      </div>
      <input
        type="text"
        name="lookup"
        placeholder="搜索标题，编号，正文内容"
        autocomplete="off"
        class="yan"
      />
      <span class="iconfont icon-sousuo ding"></span>
      <el-button type="primary" class="pai" size="mini">综合排序</el-button>
    </div>
    <!-- 表格 -->
    <div class="from">
      <el-table
        ref="multipleTable"
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        tooltip-effect="dark"
        height="503"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :cell-style="{ padding: '1px', textAlign: 'center', fontSize: '12px' }"
        :header-cell-style="{
          color: '#606266',
          textAlign: 'center',
          fontSize: '14px',
        }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="文件名称"> </el-table-column>
        <el-table-column prop="type" label="分类"> </el-table-column>
        <el-table-column prop="size" label="大小"> </el-table-column>
        <el-table-column prop="date" label="时间"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text" size="small"
              ><span class="iconfont icon-xiazai sosuo"></span
            ></el-button>
            <el-button type="text" size="small"
              ><span class="iconfont icon-shanchu sosuo"></span
            ></el-button> </template
        ></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cli: "",
      // 表格
      tableData: [],
      multipleSelection: [],
      // 分页
      currentPage: 1,
      pagesize: 10,
      fileList: [],
    };
  },
  created() {
    this.$axios.get("/api/library").then((res) => {
      this.tableData = res.data.list;
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 分页
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
  },
};
</script>
<style scoped lang="less">
.library {
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
// 头部
.top {
  height: 50px;
  background: #dddddd;
  display: flex;
  .font {
    font-size: 15px;
    width: 150px;
    line-height: 50px;
    text-align: center;
    font-weight: 600;
  }
  // 点击变色
  .col {
    background: #ffffff;
    color: #0077f1;
  }
  .yan {
    background: #ffffff;
    width: 250px;
    height: 30px;
    border-radius: 20px;
    padding-left: 20px;
    margin-top: 10px;
    margin-left: 180px;
  }
  .ding {
    position: relative;
    right: 30px;
    top: 17px;
  }
  .pai {
    width: 80px;
    height: 30px;
    font-size: 10px;
    margin-top: 10px;
    margin-left: 30px;
  }
}
.from {
  width: 95%;
  margin: auto;
  .sosuo {
    color: #c0c0c0;
    font-size: 15px;
  }
}
</style>