<template>
  <div class="notice">
    <img src="../assets/通知1.png" />
    <img src="../assets/通知2.png" style="margin-left: 20px" />

    <div class="bottom">
      <div class="top">
        <div class="font" @click="cli = 0" :class="{ col: cli == 0 }">
          <p>公司新闻</p>
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
          <p>学习</p>
        </div>
        <div class="font" @click="cli = 5" :class="{ col: cli == 5 }">
          <p>企业文化</p>
        </div>
        <!-- 小图标 -->
        <el-tooltip class="item" effect="dark" content="新建" placement="top">
          <el-button>
            <span class="iconfont icon-xinjian icon" @click="edit"></span
          ></el-button>
        </el-tooltip>
        <div class="wei">
          <p class="weiFont">未读</p>
          <p class="weiFont2">99+</p>
        </div>
      </div>
      <div class="news">
        <div
          class="xin hang"
          v-for="(wen, index) in news.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )"
          :key="index"
        >
          <p class="qing hang">{{ wen.state }}</p>
          <div class="depa">{{ wen.depa }}</div>
          <div class="tong">{{ wen.type }}</div>
          <p class="zhu hang">{{ wen.explain }}</p>
          <p class="date hang">{{ wen.date }}</p>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pagesize"
        :total="news.length"
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
      cli: "",
      news: [],
      currentPage: 1,
      pagesize: 10,
    };
  },
  created() {
    this.$axios.get("/api/notice").then((res) => {
      this.news = res.data.list;
    });
  },
  methods: {
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
  },
};
</script>
<style scoped lang="less">
.notice {
  width: 100%;
  height: 100%;
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
    line-height: 20px;
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
      top: -25px;
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
    height: 40px;
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
      width: 50px;
      margin-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      height: 22px;
      border-radius: 3px;
      background: #0077f1;
      text-align: center;
      line-height: 22px;
      color: #ffffff;
    }
    .depa {
      position: absolute;
      left: 270px;
      width: 60px;
      border-radius: 3px;
      text-align: center;
      margin-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
      height: 20px;
      border: 1px solid #c0c0c0;
      background: #c0c0c0;
      line-height: 20px;
    }

    .zhu {
      position: absolute;
      left: 430px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 700px;
      font-size: 13px;
    }
    .date {
      position: absolute;
      right: 30px;
      font-size: 13px;
      margin-left: 150px;
    }
  }
}
</style>