<template>
  <div class="dis">
    <!-- 上方 -->
    <div class="top" :class="navBarFixed == true ? 'navBarWrap' : ''">
      <div class="choice">
        <div v-for="(item, index) in res" :key="index" @click="top">
          <router-link
            :to="{ path: item.pageUrl, params: { id: item.id } }"
            class="choiceFont"
            tag="p"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>
      <div class="fen"></div>
    </div>
    <!-- 左边 -->
    <div class="left" id="left">
      <div
        class="option"
        v-for="item in items"
        :key="item.name"
        @click="yan(item)"
      >
        <!-- 左侧图标 -->
        <div :class="{ yans: i == item.name }">
          <span class="iconfont icon" :class="item.icon"></span>
        </div>
        <!-- 文字 -->
        <p class="optionFont" :class="{ yan: i == item.name }">
          {{ item.name }}
        </p>
      </div>
    </div>
  </div>
</template> 
<script>
import { readNodes } from "../router/index";
import store from "../store";
export default {
  data() {
    return {
      sh: true,
      i: "工作台",
      items: [],
      res: [],
      screenWidth: document.body.clientWidth,
      dongtai: false,
      // 吸顶
      navBarFixed: false,
      // 左侧高度
      // heig: "",
    };
  },
  props: ["logo"],
  // 起始页面
  methods: {
    // 点击页面跳转
    yan(item) {
      var qx = JSON.parse(store.state.routeObj);
      console.log(item, 789789789);
      if (item.id == 10) {
        window.open("http://www.cmtthz.com");
        return;
      }
      qx.forEach((qx) => {
        // console.log(qx);
        if (item.name == qx.pageUrl) {
          this.res = qx.children;
          // console.log("4", qx.children);
          this.$router.push(qx.children[0].pageUrl);
        }
      });

      this.i = item.name;
      if (this.i == "工作台") {
        this.res = [
          // { label: "工作台", pageUrl: "/homepage" },
          { label: "审批流转", pageUrl: "/homepage/approval" },
        ];
        this.$router.push("/homepage/approval");
      }
      if (this.i == "工资") {
        this.res = [
          { label: "人员工资", pageUrl: "/homepage/pay" },
          { label: "人员工资统计表", pageUrl: "/homepage/payStatistics" },
        ];
        this.$router.push("/homepage/pay");
      }
      // if (this.i == "通讯录") {
      //   this.res = [{ label: "通讯录", pageUrl: "/homepage/contacts" }];
      //   this.$router.push("/homepage/contacts");
      // }
      // if (this.i == "人事") {
      //   this.res = [
      //     { label: "员工档案 ", pageUrl: "/homepage/employeeFiles" },
      //     { label: "调动", pageUrl: "/homepage/transfer" },
      //     { label: "黑名单", pageUrl: "/homepage/blacklist" },
      //     { label: "人员申请 ", pageUrl: "/homepage/applyPeople" },
      //     { label: "员工离职 ", pageUrl: "/homepage/quit" },
      //     { label: "设置 ", pageUrl: "/homepage/configure" },
      //     { label: "员工晋升 ", pageUrl: "/homepage/promotion" },
      //   ];
      //   this.$router.push("/homepage/employeeFiles");
      // }
      // if (this.i == "通知") {
      //   this.res = [
      //     { label: "通知管理", pageUrl: "/homepage/noticeAdmin" },
      //     { label: "新建通知", pageUrl: "/homepage/noticeEdit" },
      //     { label: "草稿箱", pageUrl: "/homepage/draft" },
      //   ];
      //   this.$router.push("/homepage/noticeAdmin");
      // }
      //       if (this.i == "权限") {
      //   this.res = [
      //     { label: "权限", pageUrl: "/homepage/roleManagement" },
      //     { label: "新建通知", pageUrl: "/homepage/noticeEdit" },
      //     { label: "阅读页", pageUrl: "/homepage/read" },
      //     { label: "草稿箱", pageUrl: "/homepage/draft" },
      //   ];
      // }

      // 回到顶部
      document.documentElement.scrollTop = 0;
    },
    // 回到顶部
    top() {
      document.documentElement.scrollTop = 0;
    },
    // 是否触发吸顶
    watchScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log(scrollTop);
      //  当滚动超过 90 时，实现吸顶效果
      if (scrollTop > 90) {
        this.navBarFixed = true;
      } else {
        this.navBarFixed = false;
      }
    },
    leftItem(item) {
      var items = {};
      console.log(item, "左侧");
      item.forEach((res) => {
        switch (res.name) {
          case "通知":
            items[0] = res;
            break;
          case "工作台":
            items[1] = res;
            break;
          case "人事":
            items[2] = res;
            break;
          case "视频":
            items[3] = res;
            break;
          case "通用审批":
            items[4] = res;
            break;
          case "按需":
            items[5] = res;
            break;
          case "网维支撑":
            items[6] = res;
            break;
          case "权限":
            items[7] = res;
            break;
        }
      });
      return items;
    },
  },
  // 判断左侧导航位置
  mounted() {
    let router_path = this.$route.path;
    // console.log(this.$route.path);
    if (
      router_path == "/homepage" ||
      router_path == "/homepage/approval" ||
      router_path == "/homepage/newProcess" ||
      router_path == "/homepage/processApproval"
    ) {
      this.i = "工作台";
    }

    if (
      router_path == "/homepage/myAgent" ||
      router_path == "/homepage/newAgent" ||
      router_path == "/homepage/modifyAgent"
    ) {
      this.i = "待办";
    }

    if (
      router_path == "/homepage/notice" ||
      router_path == "/homepage/noticeAdmin" ||
      router_path == "/homepage/noticeEdit" ||
      router_path == "/homepage/draft" ||
      router_path == "/homepage/read"
    ) {
      this.i = "通知";
    }

    if (
      router_path == "/homepage/library" ||
      router_path == "/homepage/upload"
    ) {
      this.i = "文库";
    }
    if (
      router_path == "/homepage/contacts" ||
      router_path == "/homepage/contactsChoice"
    ) {
      this.i = "通讯录";
    }
    if (
      router_path == "/homepage/organization" ||
      router_path == "/homepage/accountAuthority" ||
      router_path == "/homepage/roleManagement"
    ) {
      this.i = "权限";
    }
    if (
      router_path == "/homepage/vidio" ||
      router_path == "/homepage/newtable"
    ) {
      this.i = "视频";
    }

    if (
      router_path == "/homepage/transfer" ||
      router_path == "/homepage/blacklist" ||
      router_path == "/homepage/applyPeople" ||
      router_path == "/homepage/employeeFiles" ||
      router_path == "/homepage/newEmployeeFiles" ||
      router_path == "/homepage/employeeFilesRen" ||
      router_path == "/homepage/configure" ||
      router_path == "/homepage/promotion" ||
      router_path == "/homepage/quit" ||
      router_path == "/homepage/remployment" ||
      router_path == "/homepage/viewApproval"
    ) {
      this.i = "人事";
    }
    if (
      router_path == "/homepage/Ax" ||
      router_path == "/homepage/Bz" ||
      router_path == "/homepage/Bz-sh" ||
      router_path == "/homepage/Hz" ||
      router_path == "/homepage/Js" ||
      router_path == "/homepage/Jssz"
    ) {
      this.i = "按需";
    }
    if (
      router_path == "/homepage/pay" ||
      router_path == "/homepage/payStatistics"
    ) {
      this.i = "工资";
    }
    if (router_path == "/homepage/other") {
      this.i = "通用审批";
    }
    if (this.i == "工作台") {
      this.res = [
        // { label: "工作台", pageUrl: "/homepage" },
        { label: "审批流转", pageUrl: "/homepage/approval" },
      ];
      this.$router.push("/homepage/approval");
    }
    if (this.i == "工资") {
      this.res = [
        { label: "人员工资", pageUrl: "/homepage/pay" },
        { label: "人员工资统计表", pageUrl: "/homepage/payStatistics" },
      ];
      this.$router.push("/homepage/pay");
    }
    // if (this.i == "通讯录") {
    //   this.res = [{ label: "通讯录", pageUrl: "/homepage/contacts" }];
    // }
    // if (this.i == "人事") {
    //   this.res = [
    //     { label: "员工档案 ", pageUrl: "/homepage/employeeFiles" },
    //     { label: "调动", pageUrl: "/homepage/transfer" },
    //     { label: "黑名单", pageUrl: "/homepage/blacklist" },
    //     { label: "人员申请 ", pageUrl: "/homepage/applyPeople" },
    //     { label: "员工离职 ", pageUrl: "/homepage/quit" },
    //     { label: "员工晋升 ", pageUrl: "/homepage/promotion" },
    //     { label: "设置 ", pageUrl: "/homepage/configure" },
    //   ];
    // }
    // if (this.i == "通知") {
    //   this.res = [
    //     { label: "通知管理", pageUrl: "/homepage/noticeAdmin" },
    //     { label: "新建通知", pageUrl: "/homepage/noticeEdit" },
    //     { label: "阅读页", pageUrl: "/homepage/read" },
    //     { label: "草稿箱", pageUrl: "/homepage/draft" },
    //   ];
    // }

    // 页面跳转路由判断
    var qx = JSON.parse(store.state.routeObj);
    qx.forEach((qx) => {
      if (this.i == qx.pageUrl) {
        this.res = qx.children;
      }
    });
    // 页面滚动
    window.addEventListener("scroll", this.watchScroll);
  },
  watch: {
    $route() {
      let router_path = this.$route.path;
      if (
        router_path == "/homepage" ||
        router_path == "/homepage/approval" ||
        router_path == "/homepage/newProcess" ||
        router_path == "/homepage/processApproval"
      ) {
        this.i = "工作台";
      }
      if (
        router_path == "/homepage/myAgent" ||
        router_path == "/homepage/newAgent" ||
        router_path == "/homepage/modifyAgent"
      ) {
        this.i = "待办";
      }
      if (
        router_path == "/homepage/notice" ||
        router_path == "/homepage/noticeAdmin" ||
        router_path == "/homepage/noticeEdit" ||
        router_path == "/homepage/draft" ||
        router_path == "/homepage/read"
      ) {
        this.i = "通知";
      }

      if (
        router_path == "/homepage/library" ||
        router_path == "/homepage/upload"
      ) {
        this.i = "文库";
      }
      if (
        router_path == "/homepage/contacts" ||
        router_path == "/homepage/contactsChoice"
      ) {
        this.i = "通讯录";
      }
      if (
        router_path == "/homepage/organization" ||
        router_path == "/homepage/accountAuthority" ||
        router_path == "/homepage/roleManagement"
      ) {
        this.i = "权限";
      }
      if (
        router_path == "/homepage/vidio" ||
        router_path == "/homepage/newtable"
      ) {
        this.i = "视频";
      }
      if (router_path == "/homepage/other") {
        this.i = "通用审批";
      }
      if (
        router_path == "/homepage/pay" ||
        router_path == "/homepage/payStatistics"
      ) {
        this.i = "工资";
      }
    },
  },
  created() {
    // 可添加
    const dat = [
      { id: "0", name: "工作台", icon: "icon-gongzuotai" },
      // { id: "1", name: "待办", icon: "icon-daiban" },
      { id: "2", name: "通知", icon: "icon-tongzhi" },
      // { id: "3", name: "文库", icon: "icon-wenjian" },
      // { id: "4", name: "通讯录", icon: "icon-icon_lianxiren" },
      { id: "6", name: "视频", icon: "icon-shipin" },
      { id: "7", name: "人事", icon: "icon-renshixitong" },
      { id: "8", name: "按需", icon: "icon-tubiao_xuqiu" },
      { id: "5", name: "权限", icon: "icon-quanxian" },
      { id: "9", name: "通用审批", icon: "icon-shenpi" },
      { id: "10", name: "网维支撑", icon: "icon-daiban" },
      { id: "11", name: "工资", icon: "icon-daiban" },
    ];
    // 预添加
// yingyongzhichengpingtai
    const tj = [
      { id: "0", name: "工作台", icon: "icon-gongzuotai" },
      // { id: "11", name: "工资", icon: "icon-daiban" },
    ];
    var left = readNodes(JSON.parse(store.state.routeObj)).left;
    // console.log("a", JSON.parse(store.state.routeObj));
    dat.forEach((res) => {
      // console.log(res.name,123);
      left.forEach((net) => {
        // console.log(net)
        if (res.name == net) {
          tj.push(res);
        }
      });
    });

    // 添加
    this.items = this.leftItem(tj);
    // console.log(this.items, 89898989898);
    console.log(this.items,"左侧导航")
  },
};
</script>

<style lang="less" scoped>
// 吸顶
.navBarWrap {
  position: fixed !important;
  top: 0 !important;
  z-index: 999 !important;
  // left: 0px !important;
}
// 页面
.dis {
  width: 100%;
  height: 100%;
  display: flex;
}
.top {
  width: 100%;
  background: #f2f2f2;
  height: 40px;
  float: left;
  margin-left: 155px;
  // 跳转包裹
  .choice {
    height: 45px;
    width: 100%;
    margin: 0px;
    // background: aquamarine;
    display: flex;
    display: -webkit-flex;
    // 跳转文字
    .choiceFont {
      line-height: 35px;
      margin-left: 50px;
      color: #808080;
      font-size: 13px;
      text-align: center;
      min-width: 60px;
    }
  }
}
// 左边
.left {
  width: 85px;
  min-width: 65px;
  height: 620px;
  overflow: auto;
  transition: 0.5s;
  margin-top: 40px;
  position: absolute;
  left: 40px;
  background: #ffffff;
  .left::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 3px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    // margin-left: 10px;
    // scrollbar-arrow-color: red;
  }
  .left::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 8px;
    // border: 3px solid #fff;
    // -webkit-box-shadow: inset 0 0 5px #0077f1;
    background: #dadada;
    // scrollbar-arrow-color: red;
  }
  .left::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: none;
    background: none;
  }
  // 图标for
  .option {
    width: 50px;
    margin: auto;
    margin-top: 20px;
    text-align: center;
    color: #808080;
    // 图标大小
    span {
      font-size: 33px;
    }
    span:hover {
      opacity: 0.5 !important;
    }
    // 图标下方文字
    .optionFont {
      transition: 0.5s;
      font-size: 12px;
      line-height: 30px;
      border-radius: 2px;
      // margin:0px
    }
  }
}

// 点击变色
.yan {
  transition: 0.5s;
  color: #0077f1 !important;
  border-bottom: 2px solid #0077f1 !important;
  line-height: 50px !important;
}
.yans {
  color: #0077f1 !important;
  height: 33px;
}
.wei {
  margin-right: 0px !important;
  transition: 0.5s;
}

p.router-link-exact-active {
  text-decoration: none;
  // color: #00ecfc !important;
  border-bottom: 2px solid #0077f1;
}
// 点击跳转下划线
.fen {
  // width: 500px;
  width: 100%;
  // min-width: 1100px;
  border-bottom: 1px solid #c9c9c9;
  margin-top: -5px;
}
</style>