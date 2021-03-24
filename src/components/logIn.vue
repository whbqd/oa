<template>
  <div id="logIn" class="background">
    <!-- 主体 -->
    <!-- 居中登录页面 -->
    <div class="logon">
      <!-- 左边部分 -->
      <img src="../assets/leftPic.png" class="letfPic" id="letfPic" />
      <!-- 右边部分 -->
      <div style="overflow: hidden" id="rightFrom" class="fan">
        <!-- 右边部分微信 -->
        <div class="rightFrom" id="rightFrom" :class="{ mare: show }">
          <!-- 登录头部 -->
          <div class="denglTop">
            <div class="denglTopOne" v-on:click="show = !show">
              <p class="yanz">验证码登录</p>
            </div>
            <!-- 三角形遮挡 -->
            <div class="zhedang" v-on:click="show = !show"></div>
            <div class="denglTopTwo"></div>
          </div>
          <!-- 登录主体 -->
          <div class="denglBottom">
            <div class="weix"><div class="weixFont">微信登录</div></div>
            <div class="code">
              <div class="codePic"></div>
            </div>
            <div class="shiyong">使用微信扫描二维码登录</div>
          </div>
        </div>
        <!-- 右边部分短信 -->
        <div class="rightFrom" id="rightFrom">
          <!-- 登录头部 -->
          <div class="denglTop">
            <div class="denglTopOne" v-on:click="show = !show">
              <p class="yanz">微信登录</p>
            </div>
            <!-- 三角形遮挡 -->
            <div class="zhedangDuan" v-on:click="show = !show"></div>
            <div class="denglTopTwoDuan"></div>
          </div>
          <!-- 登录主体 -->
          <div class="denglBottom">
            <div class="weix">
              <div class="duanFont">验证码登录</div>
              <form style="margin-top: 90px">
                <div class="duanxing" :class="{ col: col }">
                  <input
                    type="text"
                    name="phone"
                    placeholder="手机号/账号"
                    maxLength="11"
                    v-model="phone"
                    autocomplete="off"
                  />
                </div>
                <div class="duanxing" :class="{ col: cols }">
                  <input
                    type="text"
                    name="duanxing"
                    placeholder="请输入验证码"
                    maxLength="6"
                    v-model="duanxing"
                    autocomplete="off"
                  />
                  <button class="huoqu" @click="yanz" type="button">
                    <p class="huoquFont">{{ obtain }}</p>
                  </button>
                </div>
                <div style="margin-left: 80px">
                  <button class="denglu" @click="logon" type="button">
                    <p class="dengluFont">登录</p>
                  </button>
                </div>
                <div class="zhuc">
                  <p class="zhucFontOne">
                    没有账号？<span class="zhucSpan">立即注册</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 左下角 -->
    <div class="zuoxia" id="zuoxia">
      <img src="../assets/zuoxia.png" />
    </div>
    <!-- 右上角 -->
    <div class="youshang" id="youshang">
      <img src="../assets/youshang.png" />
    </div>
  </div>
</template>

<script>
import "../assets/ab";
export default {
  name: "logIn",
  data() {
    return {
      show: false, //微信短信切换
      duanxing: "",
      phone: "",
      col: false, //文字下划线
      cols: false,
      obtain: "获取验证码", //验证码
      tin: true,
    };
  },
  watch: {
    phone(val) {
      val != "" ? (this.col = true) : (this.col = false);
      console.log(1);
    },
    duanxing(val) {
      val != "" ? (this.cols = true) : (this.cols = false);
      console.log(2);
    },
  },
  methods: {
    logon() {
      //判断输入的手机号是否合法
      if (!this.phone) {
        this.$message("手机号码不能为空");
        // return false
      } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
        this.$message("请输入正确的手机号");
        // return false
      } else {
        this.$message("请输入验证码");
      }
    },
    //验证码登录
    yanz() {
      if (this.tin) {
        let time = 60;
        let timer = setInterval(() => {
          if (time == 0) {
            clearInterval(timer);
            this.obtain = "获取验证码";
            this.tin = true;
          } else {
            this.obtain = time + "秒后重试";
            time--;
            this.tin = false;
          }
        }, 1000);
      }
    },
  },
};
</script>

<style scoped lang="less">
@import "../assets/reset.css";
#logIn {
  width: 100%;
  height: 100%;
}
// 主体
.background {
  background-image: url(../assets/logIn.png);
  background-size: cover;
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: flex;
  overflow: hidden;
  // 居中登录页面
}
.logon {
  // width: 812px;
  border: 55px solid transparent;
  -webkit-border-image: url(../assets/di.png) 30 30 stretch; /* Safari 5 and older */
  -o-border-image: url(../assets/di.png) 30 30 stretch; /* Opera */
  border-image: url(../assets/di.png) 30 30 stretch;
  background-size: 100% 100%;
  height: 553px;
  // border: solid;
  margin: auto;
  z-index: 2;
  display: -webkit-flex;
  display: flex;
  // 左边部分
  .letfPic {
    width: 456px;
    height: 100%;
    overflow: hidden;
  }
  .fan {
    transition: 0.8s;
    transform-origin: right;
  }
  .letfPic img {
    width: 100%;
    height: 100%;
  }
  // 右边部分
  .rightFrom {
    width: 456px;
    height: 100%;
    background: #ffffff;
    transition: 1s;
    position: relative;
    z-index: 9999;
    // 登录头部
    .denglTop {
      width: 100%;
      height: 20%;
      background: #ffffff;
      display: -webkit-flex;
      display: flex;
      -webkit-justify-content: flex-end;
      justify-content: flex-end;
      -webkit-align-items: center;
      align-items: center;
      .denglTopOne {
        width: 115px;
        height: 27px;
        background: #e5f8f1;
        margin-right: -50px;
        margin-top: 10px;
        .yanz {
          font-size: 12px;
          line-height: 27px;
          text-align: center;
          color: #03bb7a;
        }
      }
      // 三角形
      .zhedang {
        width: 0;
        height: 0;
        border-bottom: 47px solid rgb(255, 255, 255);
        border-right: 56px solid transparent;
        position: relative;
        left: 56px;
      }
      .zhedangDuan {
        width: 0;
        height: 0;
        border-bottom: 47px solid rgb(255, 255, 255);
        border-right: 56px solid transparent;
        position: relative;
        left: 56px;
      }
      .denglTopTwo {
        width: 56px;
        height: 47px;
        background-image: url(../assets/验证码.png);
        background-size: 56px 47px;
        margin-right: 30px;
      }
      .denglTopTwoDuan {
        width: 56px;
        height: 47px;
        background-image: url(../assets/扫码.png);
        background-size: 56px 47px;
        margin-right: 30px;
      }
    }
    // 登录主体
    .denglBottom {
      width: 100%;
      height: 80%;
      .weix {
        width: 100%;
        height: 10%;
        .weixFont {
          height: 25px;
          width: 75px;
          border-bottom: 2px solid #03bb7a;
          font-size: 18px;
          margin: auto;
          text-align: center;
          color: #808080;
        }
        .duanFont {
          height: 25px;
          width: 95px;
          border-bottom: 2px solid #03bb7a;
          font-size: 18px;
          margin: auto;
          text-align: center;
          color: #808080;
        }
      }
      .code {
        width: 100%;
        height: 60%;
        -webkit-display: flex;
        display: flex;
        margin-bottom: 30px;
        .codePic {
          width: 216px;
          height: 216px;
          background: rgb(208, 208, 208);
          margin: auto;
        }
      }
      .shiyong {
        width: 100%;
        height: 20%;
        text-align: center;
        color: #999999;
      }
      .phone {
        width: 70%;
        height: 40px;
        margin: auto;
        margin-top: 90px;
        border-bottom: 2px solid #cccccc;
        font-size: 13px;
        line-height: 50px;
      }
      .duanxing {
        width: 70%;
        height: 40px;
        margin: auto;
        margin-top: 40px;
        border-bottom: 2px solid #cccccc;
        font-size: 13px;
        line-height: 50px;
        -webkit-display: flex;
        display: flex;
        .huoqu {
          width: 98px;
          height: 31px;
          border-radius: 50px;
          border: 1px solid #03bb7a;
          position: relative;
          right: -70px;
          .huoquFont {
            color: #03bb7a;
            font-size: 12px;
            line-height: 31px;
            text-align: center;
          }
        }
      }
      .col {
        border-bottom: 2px solid #03bb7a;
      }
      .denglu {
        width: 301px;
        height: 52px;
        background: url(../assets/登录.png);
        background-size: 301px 52px;
        margin: auto;
        margin-top: 60px;
        .dengluFont {
          color: rgb(255, 255, 255);
          font-size: 16px;
          line-height: 52px;
          text-align: center;
        }
      }
      .zhuc {
        width: 100%;
        height: 52px;
        text-align: center;
        .zhucFontOne {
          color: #999999;
          font-size: 12px;
          line-height: 30px;
        }
        .zhucSpan {
          color: #03bb7a;
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
  }
}
// 左下角
.zuoxia {
  position: absolute;
  left: -100px;
  bottom: 0px;
  z-index: 2;
  width: 7rem;
  height: 4.2rem;
  overflow: hidden;
  min-height: 180px;
  min-width: 360px;
}
.zuoxia img {
  width: 100%;
  height: 100%;
  margin-top: 20px;
}
// 右上角
.youshang {
  position: absolute;
  right: -0;
  width: 6rem;
  height: 5rem;
  top: -20px;
  z-index: 1;
  overflow: hidden;
  min-height: 200px;
  min-width: 260px;
}
.youshang img {
  width: 100%;
  height: 100%;
  margin-top: -10px;
  margin-left: 10px;
}

.mare {
  margin-top: -553px;
}
</style>
