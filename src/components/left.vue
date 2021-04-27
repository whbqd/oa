<template>
  <div class="dis">
    <div class="left" >
      <!-- 左边 -->
      <div
        class="option"
        v-for="item in items"
        :key="item.name"
        @click="yan(item)"
      >
        <div :class="{ yans: i == item.id }">
          <span class="iconfont icon" :class="item.icon"></span>
        </div>
        <p class="optionFont" :class="{ yan: i == item.id }">{{ item.name }}</p>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
    </div>
    <!-- 上方 -->
    <div class="top">
      <div class="choice">
        <div v-for="(item, index) in res" :key="index">
          <router-link :to="{ path: item.url }" class="choiceFont" tag="p">
            {{ item.name }}
          </router-link>
        </div>
      </div>
      <div class="fen"></div>
    </div>
  </div>
</template> 
<script>
export default {
  data() {
    return {
      sh: true,
      i: 0,
      items: [
        { id: "0", name: "工作台", icon: "icon-gongzuotai" },
        { id: "1", name: "待办", icon: "icon-daiban" },
        { id: "2", name: "通告", icon: "icon-tongzhi" },
        { id: "3", name: "文库", icon: "icon-wenjian" },
        { id: "4", name: "通讯录", icon: "icon-icon_lianxiren" },
        { id: "5", name: "权限", icon: "icon-quanxian" },
      ],
      res: [
        { name: "工作台", url: "/homepage" },
        { name: "审批流转", url: "/homepage/approval" },
        { name: "流程进度", url: "/homepage/newProcess" },
      ],
      screenWidth: document.body.clientWidth,
      dongtai: false,
    };
  },
  props: ["logo"],
  created() {
    let router_path = this.$route.path;

    if (
      router_path == "/homepage" ||
      router_path == "/homepage/approval" ||
      router_path == "/homepage/newProcess" ||
      router_path == "/homepage/processApproval"
    ) {
      this.i = 0;
    }

    if (
      router_path == "/homepage/myAgent" ||
      router_path == "/homepage/newAgent" ||
      router_path == "/homepage/modifyAgent"
    ) {
      this.i = 1;
    }

    if (
      router_path == "/homepage/notice" ||
      router_path == "/homepage/noticeAdmin" ||
      router_path == "/homepage/noticeEdit" ||
      router_path == "/homepage/read"
    ) {
      this.i = 2;
    }

    if (
      router_path == "/homepage/library" ||
      router_path == "/homepage/upload"
    ) {
      this.i = 3;
    }
    if (
      router_path == "/homepage/contacts" ||
      router_path == "/homepage/contactsChoice"
    ) {
      this.i = 4;
    }
    if (
      router_path == "/homepage/organization" ||
      router_path == "/homepage/accountAuthority" ||
      router_path == "/homepage/roleManagement"
    ) {
      this.i = 5;
    }

    if (this.i == 0) {
      this.res = [
        { name: "工作台", url: "/homepage" },
        { name: "审批流转", url: "/homepage/approval" },
      ];
    }
    if (this.i == 1) {
      this.res = [{ name: "我的待办", url: "/homepage/myAgent" }];
    }
    if (this.i == 2) {
      this.res = [
        { name: "通知", url: "/homepage/notice" },
        { name: "通知管理", url: "/homepage/noticeAdmin" },
        { name: "阅读页", url: "/homepage/read" },
      ];
    }
    if (this.i == 3) {
      this.res = [
        { name: "文库", url: "/homepage/library" },
        { name: "上传", url: "/homepage/upload" },
      ];
    }
    if (this.i == 4) {
      this.res = [
        { name: "通讯录", url: "/homepage/contacts" },
        { name: "通讯录选择", url: "/homepage/contactsChoice" },
      ];
    }
    if (this.i == 5) {
      this.res = [
        { name: "添加人员", url: "/homepage/organization" },
        { name: "账号及权限", url: "/homepage/accountAuthority" },
        { name: "角色管理", url: "/homepage/roleManagement" },
      ];
    }
    console.log(router_path);
  },
  methods: {
    yan(item) {
      this.i = item.id;
      if (this.i == 0) {
        this.res = [
          { name: "工作台", url: "/homepage" },
          { name: "审批流转", url: "/homepage/approval" },
        ];
        this.$router.push("/homepage");
      }
      if (this.i == 1) {
        this.res = [{ name: "我的待办", url: "/homepage/myAgent" }];
        this.$router.push("/homepage/myAgent");
      }
      if (this.i == 2) {
        this.res = [
          { name: "通知", url: "/homepage/notice" },
          { name: "通知管理", url: "/homepage/noticeAdmin" },
          { name: "阅读页", url: "/homepage/read" },
        ];
        this.$router.push("/homepage/notice");
      }
      if (this.i == 3) {
        this.res = [
          { name: "文库", url: "/homepage/library" },
          { name: "上传", url: "/homepage/upload" },
        ];
        this.$router.push("/homepage/library");
      }
      if (this.i == 4) {
        this.res = [
          { name: "通讯录", url: "/homepage/contacts" },
          { name: "通讯录选择", url: "/homepage/contactsChoice" },
        ];
        this.$router.push("/homepage/contacts");
      }
      if (this.i == 5) {
        this.res = [
          { name: "添加人员", url: "/homepage/organization" },
          { name: "账号及权限", url: "/homepage/accountAuthority" },
          { name: "角色管理", url: "/homepage/roleManagement" },
        ];
        this.$router.push("/homepage/organization");
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import url(//at.alicdn.com/t/font_2435137_37m73simzbd.css);
.top {
  width: 100%;
}
.dis {
  width: 100%;
  display: flex;
}
span {
  font-size: 33px;
}
.yan {
  transition: 0.5s;
  color: #0077f1 !important;
  border-bottom: 2px solid #0077f1 !important;
  line-height: 50px !important;
}
.yans {
  color: #0077f1 !important;
}
.wei {
  margin-right: 0px !important;
  transition: 0.5s;
}
.left {
  width: 85px;
  min-width: 65px;
  height: 620px;
  transition: 0.5s;
  margin: 40px;
  margin-bottom: 0px;
  background: #ffffff;
  .option {
    width: 50px;
    margin: auto;
    margin-top: 20px;
    text-align: center;
    color: #808080;
    .optionFont {
      transition: 0.5s;
      font-size: 14px;
      line-height: 30px;
      border-radius: 2px;
    }
  }
}
p.router-link-exact-active {
  text-decoration: none;
  // color: #00ecfc !important;
  border-bottom: 2px solid #0077f1;
}
.choice {
  height: 45px;
  width: 100%;
  margin: 0px;
  // background: aquamarine;
  display: flex;
  display: -webkit-flex;
  .choiceFont {
    line-height: 35px;
    margin-left: 50px;
    color: #808080;
    font-size: 14px;
    text-align: center;
    min-width: 60px;
  }
}
.fen {
  // width: 500px;
  width: 100%;
  // min-width: 1100px;
  border-bottom: 1px solid #c9c9c9;
  margin-top: -5px;
}
</style>