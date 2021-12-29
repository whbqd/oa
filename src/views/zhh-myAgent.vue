<template>
  <div>
    <!-- 上方 -->
    <div class="top">
      <div class="topHead">
        <div class="yang">
          <span class="iconfont icon-shaixuan yangCol"></span>
        </div>
        <input
          type="text"
          name="lookup"
          placeholder="搜索标题，编号，正文内容"
          autocomplete="off"
        />
        <div><span class="iconfont icon-sousuo sosuo"></span></div>
        <el-tooltip effect="dark" content="非常紧急" placement="top">
          <span class="iconfont icon-jinji kuaiF"></span>
        </el-tooltip>
        <el-tooltip effect="dark" content="未完成" placement="top">
          <span class="iconfont icon-weiwancheng kuaiF"></span>
        </el-tooltip>
        <el-tooltip effect="dark" content="今日" placement="top">
          <span class="iconfont icon-jinri kuaiF"></span>
        </el-tooltip>
        <el-tooltip effect="dark" content="新建" placement="top">
          <span class="iconfont icon-xinjian kuaiF" @click="news"></span>
        </el-tooltip>
      </div>
      <!-- 应用块 -->
      <div class="topB">
        <div class="kuai lan" @click="a">
          <span class="iconfont icon-daiban kuaiFs"></span>
          <p class="kuaiFont">待办进行中</p>
          <p class="kuaiFont">12</p>
          <div :class="{ bott1: butt == 1 }"></div>
        </div>

        <div class="kuai cheng" @click="b">
          <span class="iconfont icon-dubanrenwu kuaiFs"></span>
          <p class="kuaiFont">督办进行中</p>
          <p class="kuaiFont">4</p>
          <div :class="{ bott2: butt == 2 }"></div>
        </div>
        <div class="kuai lv" @click="c">
          <span class="iconfont icon-yiwancheng kuaiFs"></span>
          <p class="kuaiFont">已完成</p>
          <p class="kuaiFont">5</p>
          <div :class="{ bott3: butt == 3 }"></div>
        </div>
        <div class="kuai hong" @click="d">
          <span class="iconfont icon-yuqi kuaiFs"></span>
          <p class="kuaiFont">逾期</p>
          <p class="kuaiFont">7</p>
          <div :class="{ bott4: butt == 4 }"></div>
        </div>
      </div>
    </div>
    <!-- 下方 -->
    <div class="bottom">
      <!-- 表格 -->
      <el-table
        ref="singleTable"
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        highlight-current-row
        style="width: 100%"
        height="323"
        id="se"
        :cell-style="{ padding: '1px', textAlign: 'center', fontSize: '12px' }"
        :header-cell-style="{
          background: '#dddddd',
          color: '#606266',
          textAlign: 'center',
          fontSize: '14px',
        }"
      >
        <el-table-column property="name" label="名称"> </el-table-column>
        <el-table-column property="explain" label="说明" width="360">
        </el-table-column>
        <el-table-column property="urgency" label="紧急程度"> </el-table-column>
        <el-table-column property="executor" label="执行人"> </el-table-column>
        <el-table-column property="supervisor" label="督办人">
        </el-table-column>
        <el-table-column property="start" label="开始时间" width="160">
        </el-table-column>
        <el-table-column property="ends" label="截止时间" width="160">
        </el-table-column>
        <el-table-column property="completion" label="完成情况">
        </el-table-column>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 50,
      data: "",
      // 当前选中
      butt: 1,
    };
  },
  created() {
    this.$axios.get("/api/myAgent").then((res) => {
      this.data = res.data.list;
      const ss = [];
      this.data.forEach((res) => {
        // console.log(res.panduan);
        if (res.panduan == 1) {
          ss.push(res);
        }
      });
      this.tableData = ss;
    });
  },
  methods: {
    // 编辑
    handleClick(row) {
      console.log(row);
      this.$router.push("/homepage/modifyAgent");
    },
    // 删除
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 分页
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    // 新建
    news() {
      this.$router.push("/homepage/newAgent");
    },
    a() {
      const ss = [];
      this.data.forEach((res) => {
        // console.log(res.panduan);
        if (res.panduan == 1) {
          ss.push(res);
        }
      });
      this.tableData = ss;
      this.butt = 1;
    },
    b() {
      const ss = [];
      this.data.forEach((res) => {
        // console.log(res.panduan);
        if (res.panduan == 2) {
          ss.push(res);
        }
      });
      this.tableData = ss;
      this.butt = 2;
    },
    c() {
      const ss = [];
      this.data.forEach((res) => {
        // console.log(res.panduan);
        if (res.completion == "已完成") {
          ss.push(res);
        }
      });
      this.tableData = ss;
      this.butt = 3;
    },
    d() {
      const ss = [];
      this.data.forEach((res) => {
        // console.log(res.panduan);
        if (res.completion == "未完成") {
          ss.push(res);
        }
      });
      this.tableData = ss;
      this.butt = 4;
    },
  },
};
</script>
<style scoped lang="less">
// @import url(//at.alicdn.com/t/font_2435137_1sre1lmsp3h.css);
@import "../assets/reset.css";
// 搜索框
input {
  background: #ffffff;
  height: 30px;
  width: 230px;
  border-radius: 25px;
  font-size: 10px;
  margin-left: 30px;
  margin-top: 10px;
  padding-left: 60px;
}
// 上方
.top {
  height: 206px;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  // 顶部
  .topHead {
    width: 100%;
    height: 50px;
    background: #dddddd;
    position: relative;
    .yang {
      width: 50px;
      height: 30px;
      border-radius: 25px 0px 0px 25px;
      position: absolute;
      top: 10px;
      left: 20px;
      background: #ededed;
      .yangCol {
        color: #9b9b9b;
        line-height: 30px;
        margin-left: 20px;
      }
    }
    .sosuo {
      position: absolute;
      left: 290px;
      top: 18px;
      color: rgb(165, 165, 165);
    }
    .kuaiF {
      color: #8c8c8c;
      font-size: 24px;
      margin-left: 50px;
      position: relative;
      top: -25px;
      left: 300px;
    }
    .kuaiF:hover {
      color: #ffffff;
    }
  }
  // 应用快
  .topB {
    display: flex;
    justify-content: space-around;
    padding-top: 25px;
    // 应用快颜色
    .lan {
      background: url(../static/蓝.png);
      background-size: cover;
    }
    .cheng {
      background: url(../static/橙.png);
      background-size: cover;
    }
    .lv {
      background: url(../static/绿.png);
      background-size: cover;
    }
    .hong {
      background: url(../static/红.png);
      background-size: cover;
    }
    .lan:hover {
      opacity: 0.8;
    }
    .cheng:hover {
      opacity: 0.8;
    }
    .lv:hover {
      opacity: 0.8;
    }
    .hong:hover {
      opacity: 0.8;
    }
    // 应用快中内容
    .kuai {
      width: 208px;
      height: 107px;
      // background: #9b8282;
      padding-left: 20px;
      border-radius: 10px;
      .kuaiFs {
        font-size: 50px;
        color: #ffffff;
        line-height: 123px;
      }
      .kuaiFont {
        font-size: 16px;
        color: #ffffff;
        position: relative;
        width: 100px;
        top: -90px;
        left: 80px;
        line-height: 30px;
      }
      .bott1 {
        width: 0px;
        height: 0px;
        border: 13px solid;
        border-color: #0479f1 transparent transparent transparent;
        margin-top: -80px;
        margin-left: 170px;
      }
      .bott2 {
        width: 0px;
        height: 0px;
        border: 13px solid;
        border-color: #ff9107 transparent transparent transparent;
        margin-top: -80px;
        margin-left: 170px;
      }
      .bott3 {
        width: 0px;
        height: 0px;
        border: 13px solid;
        border-color: #8ec326 transparent transparent transparent;
        margin-top: -80px;
        margin-left: 170px;
      }
      .bott4 {
        width: 0px;
        height: 0px;
        border: 13px solid;
        border-color: #d90509 transparent transparent transparent;
        margin-top: -80px;
        margin-left: 170px;
      }
    }
  }
}
// 下方表格
.bottom {
  width: 100%;
  height: 362px;
  background: #ffffff;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .sosuo {
    font-size: 15px;
  }
  .col {
    color: #999999;
  }
}
</style>