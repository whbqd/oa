<template>
  <div class="work">
    <!-- 左侧 -->
    <div class="left">
      <!-- 横条1 -->
      <div class="leftPanel">
        <div class="leftPanelTop">
          <p class="leftPanelFont">任务面板</p>
          <div class="leftPanelBottom">
            <div class="leftBox" v-for="(item, index) in one" :key="index">
              <div class="run col1">
                <span class="iconfont icon" :class="item.icon"></span>
              </div>
              <p class="fontName">{{ item.name }}</p>
              <p class="fontNes">{{ item.nes }}</p>
              <div class="remind">
                <p class="fontRemind">10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 横条2 -->
      <div class="leftPanel top">
        <div class="leftPanelTop">
          <p class="leftPanelFont">人事管理</p>
          <div class="leftPanelBottom">
            <div class="leftBox" v-for="(item, index) in two" :key="index">
              <div class="run col2">
                <span class="iconfont icon" :class="item.icon"></span>
              </div>
              <p class="fontName">{{ item.name }}</p>
              <p class="fontNes">{{ item.nes }}</p>
              <div class="remind">
                <p class="fontRemind">10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 横条3 -->
      <div class="leftPanel top">
        <div class="leftPanelTop">
          <p class="leftPanelFont">现场管理</p>
          <div class="leftPanelBottom">
            <div class="leftBox" v-for="(item, index) in three" :key="index">
              <div class="run col3">
                <span class="iconfont icon" :class="item.icon"></span>
              </div>
              <p class="fontName">{{ item.name }}</p>
              <p class="fontNes">{{ item.nes }}</p>
              <div class="remind">
                <p class="fontRemind">10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 横条4 -->
      <div class="leftPanel top">
        <div class="leftPanelTop">
          <p class="leftPanelFont">外包业务</p>
          <div class="leftPanelBottom">
            <div class="leftBox" v-for="(item, index) in four" :key="index">
              <div class="run col4">
                <span class="iconfont icon" :class="item.icon"></span>
              </div>
              <p class="fontName">{{ item.name }}</p>
              <p class="fontNes">{{ item.nes }}</p>
              <div class="remind">
                <p class="fontRemind">10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="ringht">
      <div class="ringhtTop">
        <div class="ringhtHead">
          <p class="ringhtHeadFont">代办事项</p>
        </div>
        <div class="bottomBox">
          <p class="matter" v-for="(item, index) in matter" :key="index">
            代办事项<span>{{ index + 1 }}</span
            ><span class="iconfont icon-qianwang jian"></span>
          </p>
        </div>
      </div>
      <div class="ringhtbottom">
        <div class="ringhtHead">
          <p class="ringhtHeadFont">最新公告</p>
        </div>
        <div class="bottomBox">
          <p class="matter" v-for="(item, index) in notice" :key="index">
            通知公告<span>{{ index + 1 }}</span
            ><span class="iconfont icon-qianwang jian"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      one: [
        { name: "通知公告", nes: "查阅未读公告", icon: "icon-gonggao" },
        { name: "我的代办", nes: "处理代办事项", icon: "icon-renwujindu" },
        { name: "审批流转", nes: "处理代办事项", icon: "icon-shenpi" },
        { name: "发通知", nes: "发送重要信息", icon: "icon-tongzhi1" },
      ],
      two: [
        { name: "考勤打卡", nes: "考勤打卡操作", icon: "icon-kaoqindaka" },
        { name: "员工入职", nes: "员工入职审核", icon: "icon-yuangongruzhi" },
        { name: "员工离职", nes: "员工离职审批", icon: "icon-yuangonglizhi" },
        { name: "证书", nes: "电工证登高证", icon: "icon-zhengshu" },
      ],
      three: [
        { name: "装维质检", nes: "督检装维质量", icon: "icon-zhijiandan" },
        {
          name: "光功率整改",
          nes: "光功率工单整改",
          icon: "icon-zhenggaicuoshi",
        },
        { name: "机顶盒整改", nes: "机顶盒工单整改", icon: "icon-jidinghe" },
      ],
      four: [
        { name: "资质申报", nes: "外包资质申报", icon: "icon-zizhi" },
        { name: "业务申请", nes: "发起业务申请", icon: "icon-yewushenqing" },
        { name: "合同管理", nes: "合同签订存档", icon: "icon-hetongguanli" },
        { name: "施工进度", nes: "施工进度管理", icon: "icon-schedule" },
      ],
      matter: 8,
      notice: 7,
    };
  },
};
</script>
<style scoped lang="less">
@import url(//at.alicdn.com/t/font_2435137_37m73simzbd.css);

.work {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  .left {
    flex: 4;
    height: 590px;
    margin-right: 40px;
    //横条
    .leftPanel {
      width: 100%;
      height: 132px;
      // background: #1244a0;
      // 标题
      .leftPanelTop {
        height: 35px;
        width: 100%;
        background: #dddddd;
      }
      .leftPanelFont {
        padding: 8px;
        padding-left: 20px;
        font-size: 18px;
      }
      .leftPanelBottom {
        display: flex;
        background: rgb(255, 255, 255);
        .leftBox {
          width: 200px;
          height: 98px;
          // background: #12a041;
          position: relative;
          margin-left: 40px;
          .run {
            width: 74px;
            height: 74px;
            border-radius: 50%;
            position: relative;
            top: 12px;
            text-align: center;
            .icon {
              line-height: 74px;
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
            font-size: 16px;
            position: relative;
            top: -45px;
            left: 85px;
          }
          .fontNes {
            font-size: 12px;
            position: relative;
            top: -35px;
            left: 85px;
            color: #999999;
          }
          .fontRemind {
            text-align: center;
            font-size: 10px;
            color: #ffffff;
          }
          //消息
          .remind {
            width: 31px;
            height: 14px;
            background: red;
            border-radius: 50px;
            position: absolute;
            top: 20px;
            right: 0px;
          }
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
      min-width: 300px;
      background: #ffffff;
    }
    .ringhtbottom {
      margin-top: 20px;
      height: 285px;
      min-width: 300px;
      background: #ffffff;
    }
    .ringhtHead {
      height: 50px;
      background: #0077f1;
    }
    .ringhtHeadFont {
      color: #ffffff;
      font-size: 18px;
      line-height: 50px;
      margin-left: 30px;
    }
    .bottomBox {
      height: 235px;
      overflow-y: auto;
    }
    .bottomBox::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
      scrollbar-arrow-color: red;
    }
    .bottomBox::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
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
      font-size: 16px;
      margin-left: 30px;
      margin-top: 20px;
      .jian {
        margin-left: 220px;
        color: #0077f1;
        font-size: 23px;
        font: bold;
      }
    }
  }
}
</style>