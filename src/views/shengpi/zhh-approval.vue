<template>
  <div>
    <!-- 应用快 -->
    <div class="topB">
      <div class="kuai lan" @click="pend">
        <span class="iconfont icon-daiban kuaiF"></span>
        <p class="kuaiFont">待处理</p>
        <p class="kuaiFont">{{ datas1 }}</p>
        <div :class="{ bott1: butt == 1 }"></div>
      </div>
      <div class="kuai cheng" @click="proce">
        <span class="iconfont icon-shouyetubiao2-14 kuaiF"></span>
        <p class="kuaiFont">已处理</p>
        <p class="kuaiFont">{{ datas2 }}</p>
        <div :class="{ bott2: butt == 2 }"></div>
      </div>
      <div class="kuai lv" @click="wod">
        <span class="iconfont icon-wofaqide kuaiF"></span>
        <p class="kuaiFont">我发起的</p>
        <p class="kuaiFont">{{ datas3 }}</p>
        <div :class="{ bott3: butt == 3 }"></div>
      </div>
      <div class="kuai hong" @click="sho">
        <span class="iconfont icon-shoudaode kuaiF"></span>
        <p class="kuaiFont">我收到的</p>
        <p class="kuaiFont">{{ datas4 }}</p>
        <div :class="{ bott4: butt == 4 }"></div>
      </div>
    </div>
    <!-- 中间 -->
    <div class="cen">
      <!-- 表格 -->
      <el-table
        ref="singleTable"
        stripe
        :data="
          tableDatas.slice((currentPage - 1) * pagesize, currentPage * pagesize)
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
        <el-table-column property="type" label="类型"> </el-table-column>
        <el-table-column property="submitSector" label="申请部门">
        </el-table-column>
        <el-table-column property="annx" label="内容"> </el-table-column>
        <el-table-column property="approval" label="审批人"> </el-table-column>
        <el-table-column property="submitTime" label="发起时间" sortable>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 待处理 -->
          <template slot-scope="scope">
            <template v-if="dis">
              <el-button type="text" size="small" :class="{ dis: butt == 1 }"
                ><span @click="rov(scope.row)">查看</span></el-button
              >
              <el-button type="text" size="small" :class="{ dis: butt != 1 }"
                ><span @click="rov(scope.row)">审批</span></el-button
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
        :total="tableDatas.length"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>

    <div class="bottom">
      <p class="font">我发起的</p>
      <!-- <button name="buttom" class="but" @click="news">新建</button> -->
    </div>
  </div>
</template>
<script>
import { gets } from "../../request/wan";
export default {
  data() {
    return {
      // 后端数据存放
      // data: [],
      // 表格渲染数据
      tableDatas: [],
      // 分页
      currentPage: 1,
      pagesize: 50,
      counts: 0,
      // 操作
      dis: true,
      // 当前选中
      butt: 1,
      datas1: "",
      datas2: "",
      datas3: "",
      datas4: "",
    };
  },
  created() {
    // 待审批数据
    gets("PersonnelTransferApproval/getDaiChuLi").then((res) => {
      console.log(res.data.daichuli, 888);
      this.counts = res.data.daichuli.counts;
      this.tableDatas = res.data.daichuli;
    });
    // 总条数
    gets("PersonnelTransferApproval/getAll").then((res) => {
      // console.log(res, 888);
      this.datas1 = res.data.daichuli;
      this.datas2 = res.data.yichuli;
      this.datas3 = res.data.wofaqide;
      this.datas4 = res.data.woshoudaode;
    });
  },
  methods: {
    renderTime(date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
    },
    // 待处理
    pend() {
      this.currentPage = 1;
      this.butt = 1;
      gets("PersonnelTransferApproval/getDaiChuLi").then((res) => {
        console.log(res.data.daichuli, 888);
        this.counts = res.data.daichuli.counts;
        this.tableDatas = res.data.daichuli;
      });
    },
    // 已处理
    proce() {
      this.currentPage = 1;

      this.butt = 2;
      gets("PersonnelTransferApproval/getYiChuLi").then((res) => {
        // console.log(res.data, 888);
        this.counts = res.data.yichuli.counts;
        this.tableDatas = res.data.yichuli;
      });
    },
    // 发起
    wod() {
      this.currentPage = 1;

      this.butt = 3;
      gets("PersonnelTransferApproval/getWoFaQiDe").then((res) => {
        // console.log(res.data, 888);
        this.counts = res.data.wofaqide.counts;
        this.tableDatas = res.data.wofaqide;
      });
    },
    // 收到
    sho() {
      this.currentPage = 1;

      this.butt = 4;
      gets("PersonnelTransferApproval/getWoShouDaoDe").then((res) => {
        console.log(res.data, 888);
        this.counts = res.data.woshoudaode.counts;
        this.tableDatas = res.data.woshoudaode;
      });
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(val);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    // 新建
    news() {
      this.$router.push("/homepage/newProcess");
    },
    // 审批
    rov(row) {
      // console.log(row.type);
      // console.log(row.id);
      this.$store.shengID = row.id;
      this.$store.butt = this.butt;

      if (row.type == "人员调动申请") {
        this.$router.push("/homepage/transferSheng");
      } else if (row.type == "岗位申请") {
        this.$router.push("/homepage/approvalPersonnel");
      } else if (row.type == "岗位调整") {
        this.$router.push("/homepage/adjustment");
      } else if (row.type == "员工离职") {
        this.$router.push("/homepage/quitSheng");
      } else if (row.type == "员工晋升") {
        this.$router.push("/homepage/promotionSheng");
      } else {
        this.$router.push("/homepage/otherSheng");
      }
    },
  },
};
</script>
<style scoped lang="less">
.dis {
  display: none;
}
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
    background: url(../../static/蓝.png);
    background-size: cover;
  }
  .cheng {
    background: url(../../static/橙.png);
    background-size: cover;
  }
  .lv {
    background: url(../../static/绿.png);
    background-size: cover;
  }
  .hong {
    background: url(../../static/红.png);
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
    .bott1 {
      width: 0px;
      height: 0px;
      border: 13px solid;
      border-color: #0479f1 transparent transparent transparent;
      margin-top: -79px;
      margin-left: 160px;
    }
    .bott2 {
      width: 0px;
      height: 0px;
      border: 13px solid;
      border-color: #ff9107 transparent transparent transparent;
      margin-top: -79px;
      margin-left: 160px;
    }
    .bott3 {
      width: 0px;
      height: 0px;
      border: 13px solid;
      border-color: #8ec326 transparent transparent transparent;
      margin-top: -79px;
      margin-left: 160px;
    }
    .bott4 {
      width: 0px;
      height: 0px;
      border: 13px solid;
      border-color: #d90509 transparent transparent transparent;
      margin-top: -79px;
      margin-left: 160px;
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