<template>
  <div class="work">
    <!-- 左侧 -->
    <div class="left">
      <!-- 横条1 -->
      <div class="leftPanel">
        <div class="leftPanelTop">
          <p class="leftPanelFont">任务面板</p>
          <div class="leftPanelBottom">
            <div class="leftBox">
              <div class="run col1">
                <span class="iconfont icon icon-gonggao"></span>
              </div>
              <p class="fontName">通知公告</p>
              <p class="fontNes">查阅未读公告</p>
              <!-- <div class="remind">
                <p class="fontRemind">10</p>
              </div> -->
            </div>
            <div class="leftBox">
              <div class="run col1">
                <span
                  class="iconfont icon icon-daiban"
                  style="margin-left: 5px; font-size: 44px; line-height: 75px"
                ></span>
              </div>
              <p class="fontName">员工入职</p>
              <p class="fontNes">处理待办事项</p>
              <!-- <div class="remind">
                <p class="fontRemind">10</p>
              </div> -->
            </div>
            <div class="leftBox">
              <div class="run col1">
                <span class="iconfont icon icon-shenpi"></span>
              </div>
              <p class="fontName">审批流转</p>
              <p class="fontNes">处理待办事项</p>
              <!-- <div class="remind">
                <p class="fontRemind">10</p>
              </div> -->
            </div>
            <div class="leftBox">
              <div class="run col1">
                <span class="iconfont icon icon-tongzhi1"></span>
              </div>
              <p class="fontName">发通知</p>
              <p class="fontNes">发送重要信息</p>
              <!-- <div class="remind">
                <p class="fontRemind">10</p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 横条2 -->
      <div class="leftPanel top">
        <div class="leftPanelTop">
          <p class="leftPanelFont">人事管理</p>
          <div class="leftPanelBottom">
            <div class="leftBox" @click="kao">
              <div class="run col2">
                <span class="iconfont icon icon-kaoqindaka"></span>
              </div>
              <p class="fontName">考勤打卡</p>
              <p class="fontNes">考勤打卡操作</p>
              <!-- <div class="remind">
                <p class="fontRemind">10</p>
              </div> -->
            </div>
            <div class="leftBox">
              <div class="run col2">
                <span class="iconfont icon icon-yuangongruzhi"></span>
              </div>
              <p class="fontName">员工入职</p>
              <p class="fontNes">员工入职审核</p>
              <!-- <div class="remind">
                <p class="fontRemind">10</p>
              </div> -->
            </div>
            <div class="leftBox">
              <div class="run col2">
                <span class="iconfont icon icon-yuangonglizhi"></span>
              </div>
              <p class="fontName">员工离职</p>
              <p class="fontNes">员工离职审批</p>
              <!-- <div class="remind">
                <p class="fontRemind">10</p>
              </div> -->
            </div>
            <div class="leftBox">
              <div class="run col2">
                <span class="iconfont icon icon-zhengshu"></span>
              </div>
              <p class="fontName">证书</p>
              <p class="fontNes">电工证登高证</p>
              <!-- <div class="remind">
                <p class="fontRemind">10</p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 横条3 -->
      <!-- <div class="leftPanel top">
        <div class="leftPanelTop">
          <p class="leftPanelFont">现场管理</p>
          <div class="leftPanelBottom">
            <div class="leftBox">
              <div class="run col3">
                <span
                  class="iconfont icon icon-zhijiandan"
                  style="font-size: 35px"
                ></span>
              </div>
              <p class="fontName">装维质检</p>
              <p class="fontNes">督检装维质量</p>
              <div class="remind">
                <p class="fontRemind">10</p>
              </div>
            </div>
            <div class="leftBox">
              <div class="run col3">
                <span
                  class="iconfont icon icon-zhenggaicuoshi"
                  style="font-size: 35px"
                ></span>
              </div>
              <p class="fontName">光功率整改</p>
              <p class="fontNes">光功率工单整改</p>
              <div class="remind">
                <p class="fontRemind">10</p>
              </div>
            </div>
            <div class="leftBox">
              <div class="run col3">
                <span
                  class="iconfont icon icon-jidinghe"
                  style="font-size: 52px"
                ></span>
              </div>
              <p class="fontName">机顶盒整改</p>
              <p class="fontNes">机顶盒工单整改</p>
              <div class="remind">
                <p class="fontRemind">10</p>
              </div>
            </div>
            <div class="leftBox"></div>
          </div>
        </div>
      </div> -->
      <!-- 横条4 -->
      <!-- <div class="leftPanel top">
        <div class="leftPanelTop">
          <p class="leftPanelFont">外包业务</p>
          <div class="leftPanelBottom">
            <div class="leftBox">
              <div class="run col4">
                <span class="iconfont icon icon-zizhi"></span>
              </div>
              <p class="fontName">资质申报</p>
              <p class="fontNes">外包资质申报</p>
              <div class="remind">
                <p class="fontRemind">10</p>
              </div>
            </div>
            <div class="leftBox">
              <div class="run col4">
                <span class="iconfont icon icon-business"></span>
              </div>
              <p class="fontName">业务申请</p>
              <p class="fontNes">发起业务申请</p>
              <div class="remind">
                <p class="fontRemind">10</p>
              </div>
            </div>
            <div class="leftBox">
              <div class="run col4">
                <span class="iconfont icon icon-hetongguanli"></span>
              </div>
              <p class="fontName">合同管理</p>
              <p class="fontNes">合同签订存档</p>
              <div class="remind">
                <p class="fontRemind">10</p>
              </div>
            </div>
            <div class="leftBox">
              <div class="run col4">
                <span class="iconfont icon icon-schedule"></span>
              </div>
              <p class="fontName">施工进度</p>
              <p class="fontNes">施工进度管理</p>
              <div class="remind">
                <p class="fontRemind">10</p>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <!-- 右侧 -->
    <div class="ringht">
      <div class="ringhtTop">
        <div class="ringhtHead">
          <p class="ringhtHeadFont">待办事项</p>
        </div>
        <div class="bottomBox">
          <!-- <p class="matter" v-for="(item, index) in matter" :key="index">
            待办事项{{ index + 1
            }}<span class="iconfont icon-qianwang jian"></span>
          </p> -->
        </div>
      </div>
      <div class="ringhtbottom">
        <div class="ringhtHead">
          <p class="ringhtHeadFont">最新公告</p>
        </div>
        <div class="bottomBox">
          <!-- <p class="matter" v-for="(item, index) in notice" :key="index">
            通知公告<span>{{ index + 1 }}</span
            ><span class="iconfont icon-qianwang jian"></span>
          </p> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      three: [
        { name: "装维质检", nes: "督检装维质量", icon: "icon-zhijiandan" },
        {
          name: "光功率整改",
          nes: "光功率工单整改",
          icon: "icon-zhenggaicuoshi",
        },
        { name: "机顶盒整改", nes: "机顶盒工单整改", icon: "icon-jidinghe" },
      ],
      matter: 8,
      notice: 7,
    };
  },
  methods: {
    aa(item) {
      console.log(item.name);
      if (item.name == "通知公告") {
        this.$router.push("/homepage/notice");
      }
      if (item.name == "我的待办") {
        this.$router.push("/homepage/myAgent");
      }
      if (item.name == "审批流转") {
        this.$router.push("/homepage/approval");
      }
    },
    tong() {
      this.$router.push("/homepage/notice");
      this.$store.state.left = 3;
    },
    yuan() {
      console.log(this.$store.state.left);
    },
    seng() {
      this.$router.push("/homepage/approval");
    },
    fa() {
      this.$router.push("/homepage/noticeEdit");
    },
    kao() {
      this.$router.push("/homepage/kaoqing");
    },
  },
};
</script>
<style scoped lang="less">
// @import url(//at.alicdn.com/t/font_2435137_37m73simzbd.css);
.ying {
  margin-left: 10px !important;
}
.work {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  .left {
    flex: 4;
    height: 590px;
    margin-right: 20px;
    //横条
    .leftPanel {
      width: 100%;
      height: 132px;
      // 标题
      .leftPanelTop {
        height: 35px;
        width: 100%;
        background: #dddddd;
      }
      .leftPanelFont {
        padding: 8px;
        padding-left: 20px;
        font-size: 15px;
      }
      .leftPanelBottom {
        display: flex;
        justify-content: space-around;
        background: rgb(255, 255, 255);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        .leftBox {
          width: 22%;
          height: 98px;
          // background: #12a041;
          position: relative;
          // margin-left: 40px;
          .run {
            width: 68px;
            height: 68px;
            border-radius: 50%;
            position: relative;
            top: 12px;
            text-align: center;
            margin-top: 5px;
            .icon {
              line-height: 68px;
              color: #ffffff;
              font-size: 40px;
            }
          }
          .col1 {
            background: #0077f1;
          }
          .col2 {
            background: #8dc21f;
          }
          .col3 {
            background: #ff9700;
          }
          .col4 {
            background: #7a1fa2;
          }
          .fontName {
            font-size: 13px;
            position: relative;
            top: -35px;
            left: 85px;
          }
          .fontNes {
            font-size: 12px;
            position: relative;
            top: -25px;
            left: 85px;
            color: #999999;
          }
          .fontRemind {
            text-align: center;
            height: 12px;
            font-size: 10px;
            color: #ffffff;
          }
          //消息
          .remind {
            width: 31px;
            height: 14px;
            background: red;
            border-radius: 50px;
            position: relative;
            top: -80px;
            right: -80%;
          }
        }
        .leftBox:hover {
          opacity: 0.8;
        }
      }
    }
    .top {
      margin-top: 20px;
    }
  }
  .ringht {
    flex: 1.5;
    height: 590px;
    // background: #12a06e;
    .ringhtTop {
      height: 285px;
      min-width: 250px;
      background: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    .ringhtbottom {
      margin-top: 20px;
      height: 285px;
      min-width: 250px;
      background: #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    .ringhtHead {
      height: 50px;
      background: #0077f1;
    }
    .ringhtHeadFont {
      color: #ffffff;
      font-size: 15px;
      line-height: 50px;
      margin-left: 30px;
    }
    .bottomBox {
      height: 235px;
      overflow-y: auto;
    }
    .bottomBox::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 13px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
      margin-left: 10px;
      scrollbar-arrow-color: red;
    }
    .bottomBox::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 8px;
      border: 3px solid #fff;
      // -webkit-box-shadow: inset 0 0 5px #0077f1;
      background: #0077f1;
      scrollbar-arrow-color: red;
    }
    .bottomBox::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      -webkit-box-shadow: none;
      background: none;
    }
    .matter {
      font-size: 13px;
      margin-left: 30px;
      margin-top: 20px;
      position: relative;
      .jian {
        position: absolute;
        right: 10px;
        color: #0077f1;
        font-size: 23px;
        font: bold;
      }
    }
  }
}
</style>