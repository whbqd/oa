<template>
  <div class="top">
    <!-- 左 -->
    <div class="left">
      <img src="../static/移动.png" class="yidong" />
      <p class="yidongFont">杭移办公OA系统</p>
    </div>
    <!-- 中 -->
    <div class="cen">
      <div class="cenBox">
        <p class="cenFont">
          欢迎使用后台管理系统（V1.2）你本次的登录时间为
          {{ dateFormat(date) }}
        </p>
        <!-- <i class="el-icon-close tuic"></i> -->
      </div>
    </div>

    <!-- 右 -->
    <div class="ringht">
      <img src="../static/移动.png" class="toux" />
      <div class="touxFont">
        <p class="nameFont">{{ form.userName }}</p>
        <p class="depaFont bottonFont">{{ form.sector }}</p>
      </div>
      <div class="touxFont">
        <img src="../static/设置.png" class="setPic" />
        <p class="depaFont">设置</p>
      </div>
      <el-button type="text" @click="open">
        <div class="touxFont">
          <img src="../static/退出.png" class="setPic" />
          <p class="depaFont">退出</p>
        </div></el-button
      >
    </div>
  </div>
</template>
<script>
import jwt from "jsonwebtoken";
import { postp } from "../request/wan";
// import bao from "../components/bao.vue";
export default {
  name: "zhtop",
  data() {
    return {
      lists: [
        " 欢迎使用后台管理系统（V1.2）你本次的登录时间为2021年03月19日14.35登录IP192.168.12.11",
      ],
      form: "",
      date: new Date(),
    };
  },
  // components: { bao },
  created() {
    this.form = jwt.decode(sessionStorage.getItem("token"));
    console.log(this.form);
    // console.log("1312312", this.form);
    // this.lists = this.dateFormat(time);
  },
  methods: {
    // 退出
    open() {
      this.$confirm("即将退出当前账号，确定是否退出", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        postp("loginOut" + "?phone=" + this.form.mobile).then((res) => {
          this.$router.push("/");
          sessionStorage.clear();
          console.log(res);
        });
      });
    },
    // 时间
    dateFormat(time) {
      // console.log(time,789)
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      this.nian = year + "-" + month + "-" + day;
      this.miao = hours + ":" + minutes + ":" + seconds;
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        "日" +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    },
  },
  mounted() {
    //显示当前日期时间
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
};
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  height: 85px;
  display: -webkit-flex;
  display: flex;
  background: #ffffff;
  // 左
  .left {
    flex: 1;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    -webkit-align-items: center;
    margin-left: 20px;
    background: #ffffff;
    .yidong {
      min-width: 60px;
      height: 60px;
    }
    .yidongFont {
      font-size: 22px;
      margin-left: 20px;
      min-width: 220px;
    }
  }
  // 中
  .cen {
    background: #ffffff;
    display: -webkit-flex;
    display: flex;
    flex: 1.5;
    .cenBox {
      position: relative;
      margin: auto;
      // margin-right: 40px;
      height: 35px;
      line-height: 35px;
      background: #f6ffed;
      // padding-right: 40px;
      border: 1px solid #7cac1c;
      min-width: 480px;
      .cenFont {
        font-size: 12px;
        color: #8dc21f;
        margin-top: 0;
        margin-left: 35px;
      }
      .tuic {
        font-size: 21px;
        color: #808080;
        position: absolute;
        right: 0;
        top: 10px;
      }
    }
  }

  // 右
  .ringht {
    flex: 1;
    margin-right: 40px;
    display: -webkit-flex;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    -webkit-align-items: center;
    background: #ffffff;
    .toux {
      width: 45px;
      height: 45px;
      border-radius: 50px;
    }
    .touxFont {
      height: 50px;
      text-align: center;
      margin-left: 10px;
      .nameFont {
        font-size: 14px;
        min-width: 50px;
        line-height: 28px;
      }
      .depaFont {
        font-size: 13px;
        color: #808080;
        margin-top: 6px;
        min-width: 60px;
      }
      .setPic {
        width: 25px;
        height: 25px;
      }
      .bottonFont {
        margin-top: 5px;
      }
    }
  }
}
</style>