<template>
  <div>
    <!-- 应用快 -->
    <div class="topB">
      <div class="kuai lan" @click="pend">
        <span class="iconfont icon-renwujindu kuaiF"></span>
        <p class="kuaiFont">待处理</p>
        <p class="kuaiFont">12</p>
      </div>
      <div class="kuai cheng" @click="proce">
        <span class="iconfont icon-shouyetubiao2-14 kuaiF"></span>
        <p class="kuaiFont">已处理</p>
        <p class="kuaiFont">4</p>
      </div>
      <div class="kuai lv" @click="wod">
        <span class="iconfont icon-wofaqide kuaiF"></span>
        <p class="kuaiFont">我发起的</p>
        <p class="kuaiFont">5</p>
      </div>
      <div class="kuai hong">
        <span class="iconfont icon-shoudaode kuaiF"></span>
        <p class="kuaiFont">我收到的</p>
        <p class="kuaiFont">7</p>
      </div>
    </div>
    <!-- 中间 -->
    <div class="cen">
      <!-- 表格 -->
      <el-table
        ref="singleTable"
        stripe
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
        <el-table-column property="number" label="编号"> </el-table-column>
        <el-table-column property="type" label="类型"> </el-table-column>
        <el-table-column property="applicant" label="申请人"> </el-table-column>
        <el-table-column property="content" label="内容"> </el-table-column>
        <el-table-column property="approved" label="审批人"> </el-table-column>
        <el-table-column label="操作">
          <!-- 待处理 -->
          <template slot-scope="scope">
            <template v-if="dis">
              <el-button type="text" size="small"
                ><span @click="rov">查看</span></el-button
              >
              <el-button type="text" size="small"
                ><span @click="rov">审批</span></el-button
              >
            </template>
            <!-- 已处理 -->
            <template v-else>
              <el-button type="text" size="small"
                ><span
                  class="iconfont icon-dui sosuo col"
                  :class="{ green: scope.row.state.proce }"
                ></span
              ></el-button>
              <el-button type="text" size="small"
                ><span
                  class="iconfont icon-cuowu1 sosuo col"
                  :class="{ red: !scope.row.state.proce }"
                ></span
              ></el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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

    <div class="bottom">
      <p class="font">我发起的</p>
      <button name="buttom" class="but" @click="news">新建</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 后端数据存放
      data: [],
      // 表格渲染数据
      tableData: [],
      // 分页
      currentPage: 1,
      pagesize: 10,
      // 操作
      dis: true,
    };
  },
  created() {
    this.$axios.get("/api/approval").then((res) => {
      // 创建存放待处理数据数组
      const newPend = [];
      // 存放数据
      this.data = res.data.list;
      // 遍历数组
      this.data.forEach((res) => {
        // 判断是否处理为ture添加该条记录
        if (Object.keys(res.state) == "pend") {
          newPend.push(res);
        }
      });
      // 将处理后数据保存
      this.tableData = newPend;
    });
  },
  methods: {
    // 待处理
    pend() {
      this.dis = true;
      // 创建存放待处理数据数组
      const newPend = [];
      // 遍历数组
      this.data.forEach((res) => {
        // 判断是否处理为ture添加该条记录
        if (Object.keys(res.state) == "pend") {
          newPend.push(res);
        }
      });
      // 将处理后数据保存
      this.tableData = newPend;
    },
    // 已处理
    proce() {
      this.dis = false;
      // 创建存放待已理数据数组
      const newPend = [];
      // 遍历数组
      this.data.forEach((res) => {
        // 判断是否处理为ture添加该条记录
        if (Object.keys(res.state) == "proce") {
          newPend.push(res);
        }
      });
      // 将处理后数据保存
      this.tableData = newPend;
      console.log(newPend);
      console.log(Object.values(newPend[0].state));
      // console.log(Object.values(newPend.state));
    },
    wod() {
      this.tableData = this.data;
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    // 新建
    news() {
      this.$router.push("/homepage/newProcess");
    },
    // 审批
    rov() {
      this.$router.push("/homepage/processApproval");
    },
  },
};
</script>
<style scoped lang="less">
// 小图标
.sosuo {
  font-size: 20px;
}
.col {
  color: #999999;
}

.red {
  color: red;
}

.green {
  color: green;
}
// 应用快
.topB {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 130px;
  background: #ffffff;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .lan {
    background: url(../assets/蓝.png);
    background-size: cover;
  }
  .cheng {
    background: url(../assets/橙.png);
    background-size: cover;
  }
  .lv {
    background: url(../assets/绿.png);
    background-size: cover;
  }
  .hong {
    background: url(../assets/红.png);
    background-size: cover;
  }
  .kuai {
    width: 208px;
    height: 107px;
    margin-top: -10px;
    padding-left: 20px;
    border-radius: 10px;
    position: relative;
    .kuaiF {
      font-size: 50px;
      color: #ffffff;
      line-height: 121px;
    }
    .kuaiFont {
      font-size: 16px;
      color: #ffffff;
      width: 100px;
      position: relative;
      top: -90px;
      left: 80px;
      line-height: 30px;
    }
  }
}

// 中间表
.cen {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
// 底部
.bottom {
  width: 100%;
  height: 55px;
  background: #ffffff;
  margin-top: 18px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .font {
    font-size: 15px;
    position: absolute;
    left: 40px;
    line-height: 55px;
  }
  .but {
    width: 60px;
    height: 30px;
    color: #ffffff;
    background: #0077f1;
    position: absolute;
    right: 90px;
    top: 13px;
    border-radius: 3px;
  }
}
</style>