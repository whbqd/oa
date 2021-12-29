<template>
  <div class="notice">
    <img src="../../static/通知1.png" />
    <img src="../../static/通知2.png" style="margin-left: 20px" />

    <div class="bottom">
      <div class="top">
        <div class="font" @click="cli = 0" :class="{ col: cli == 0 }">
          <p>公司文件</p>
        </div>
        <div class="font" @click="cli = 1" :class="{ col: cli == 1 }">
          <p>党建工作</p>
        </div>
        <div class="font" @click="cli = 2" :class="{ col: cli == 2 }">
          <p>通知公告</p>
        </div>
        <div class="font" @click="cli = 3" :class="{ col: cli == 3 }">
          <p>规章制度</p>
        </div>
        <div class="font" @click="cli = 4" :class="{ col: cli == 4 }">
          <p>学习材料</p>
        </div>
        <!-- 小图标 -->
        <el-tooltip class="item" effect="dark" content="新建" placement="top">
          <span class="iconfont icon-xinjian icon" @click="edit"></span>
        </el-tooltip>
        <div class="wei" @click="weidu">
          <p class="weiFont">未读</p>
          <p class="weiFont2">{{ counst }}</p>
        </div>
      </div>

      <el-table
        :data="news"
        style="width: 100%"
        :cell-style="{ padding: '1px', textAlign: 'center', fontSize: '12px' }"
        :header-cell-style="{
          color: '#606266',
          textAlign: 'center',
          fontSize: '14px',
        }"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="editName" label="发送人"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="types" label="类型"> </el-table-column>
        <el-table-column prop="creatTime" label="日期" sortable>
        </el-table-column>
        <el-table-column label="阅读状态">
          <template slot-scope="scope">
            <span :class="{ dis: scope.row.userRead }">已读</span>
            <span :class="{ dis: !scope.row.userRead }">未读</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small"
              ><span
                class="iconfont icon-yanjing xiu"
                @click="seet(scope.row)"
              ></span
            ></el-button> </template
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagesize"
        :total="news.length"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination> -->
    </div>
  </div>
</template>
<script>
import { gets } from "../../request/wan";
export default {
  data() {
    return {
      cli: "",
      news: [],
      currentPage: 1,
      pagesize: 50,
      counst: "",
      ids: "",
    };
  },
  created() {
    // this.$axios.get("/api/notice").then((res) => {
    //   this.news = res.data.list;
    // });
    gets("Notification/getNotificationByUser" + "?type=" + "公司文件").then(
      (res) => {
        console.log(res.data);
        console.log(res.data.list);
        this.news = res.data.list;
        this.counst = res.data.count;
        this.ids = res.data.ids;
      }
    );
  },
  methods: {
    shuj(val) {
      gets("Notification/getNotificationByUser" + "?type=" + val).then(
        (res) => {
          console.log(res.data);
          console.log(res.data.list);
          this.news = res.data.list;
        }
      );
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 查看
    seet(row) {
      console.log(row);
      this.$router.push("/homepage/read");
      this.$store.state.tongId = row.id || row;
      console.log(row.id);
    },
    // 分页
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    // 新建
    edit() {
      this.$router.push("/homepage/noticeEdit");
    },
    // 未读颜色
    tableRowClassName({ row }) {
      // console.log(row.userRead);
      // console.log(row.rowIndex);
      if (row.userRead) {
        console.log(1);
        return "warning-row";
      }
      return "";
    },
    // 未读
    weidu() {
      // console.log(this.ids[0]);
      this.seet(Number(this.ids[0]));
    },
  },
  watch: {
    cli(val) {
      var a = ["公司文件", "党建工作", "通知公告", "规章制度", "学习材料"];
      // console.log(val);
      this.shuj(a[val]);
    },
  },
};
</script>
<style scoped lang="less">
.notice {
  width: 100%;
  height: 100%;
}
.dis {
  display: none;
}
.el-table .warning {
  background: rgb(255, 115, 0);
}
.el-table .success {
  background: #4cd800;
}
// 头部
.top {
  height: 40px;
  background: #cccccc;
  display: flex;
  .font {
    font-size: 15px;
    width: 150px;
    line-height: 40px;
    text-align: center;
  }
  .col {
    background: #ffffff;
    color: #0077f1;
  }
  .icon {
    font-size: 22px;
    line-height: 42px;
  }
  .icon:hover {
    color: #ffffff;
  }
  .item {
    width: 10px;
    height: 30px;
    position: absolute;
    right: 20px;
    background: #cccccc;
    border: none;
  }
  .wei {
    width: 50px;
    height: 20px;
    border-radius: 50px;
    background: #ff3939;
    position: absolute;
    right: 80px;
    top: 210px;
    .weiFont {
      text-align: center;
      color: #ffffff;
      line-height: 20px;
      // font-size: 1px;
    }
    .weiFont2 {
      color: #ff3939;
      position: relative;
      font-size: 15px;
      top: -30px;
      left: 50px;
    }
  }
}
img {
  width: 49%;
  height: 30%;
}
.bottom {
  margin-top: 20px;
  width: 100%;
  height: 392px;
  background: #ffffff;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .news {
    height: 320px;
    overflow: auto;
  }
  .xin {
    width: 95%;
    // height: 40px;
    margin: auto;
    margin-top: 10px;
    display: flex;
    position: relative;
    .hang {
      line-height: 40px;
    }
    .qing {
      position: absolute;
      left: 30px;
      font-size: 10px;
      color: #838383;
    }
    .tong {
      position: absolute;
      left: 130px;
      width: 100px;
      margin-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      height: 25px;
      border-radius: 3px;
      background: #0077f1;
      text-align: center;
      line-height: 25px;
      color: #ffffff;
      font-size: 10px;
    }
    .depa {
      position: absolute;
      left: 270px;
      width: 80px;
      border-radius: 3px;
      text-align: center;
      margin-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      height: 25px;
      border: 1px solid #c0c0c0;
      background: #c0c0c0;
      line-height: 25px;
    }

    .zhu {
      position: absolute;
      left: 430px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 680px;
      font-size: 13px;
    }
    .date {
      position: absolute;
      right: 130px;
      font-size: 13px;
    }
    .look {
      position: absolute;
      background: #0077f1;
      line-height: 25px;
      border-radius: 3px;
      margin-top: 10px;
      text-align: center;
      color: #ffffff;
      font-size: 10px;
      width: 80px;
      height: 25px;
      right: 10px;
    }
  }
}
</style>