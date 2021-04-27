<template>
  <div class="top">
    <!-- 左 -->
    <div class="left">
      <img src="../assets/移动.png" class="yidong" />
      <p class="yidongFont">杭移办公OA系统</p>
    </div>
    <!-- 中 -->
    <div class="cen">
      <div class="cenBox">
        <p class="cenFont">
          <bao :lists="lists"></bao>
        </p>
        <i class="el-icon-close tuic"></i>
      </div>
    </div>

    <!-- 右 -->
    <div class="ringht">
      <img src="../assets/as.jpg" class="toux" />
      <div class="touxFont">
        <p class="nameFont">张三</p>
        <p class="depaFont bottonFont">维护部</p>
      </div>
      <div class="touxFont">
        <img src="../assets/设置.png" class="setPic" />
        <p class="depaFont">设置</p>
      </div>
      <el-button type="text" @click="open">
        <div class="touxFont">
          <img src="../assets/退出.png" class="setPic" />
          <p class="depaFont">退出</p>
        </div></el-button
      >
    </div>
  </div>
</template>
<script>
import bao from "../components/bao.vue";
export default {
  name: "zhtop",
  data() {
    return {
      lists: [
        " 欢迎使用后台管理系统（V1.2）你本次的登录时间为2021年03月19日14.35登录IP192.168.12.11",
      ],
    };
  },
  components: { bao },
  methods: {
    // 退出
    open() {
      this.$confirm("即将退出当前账号，确定是否退出", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$router.push("/");
      });
    },
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
      margin-right: 40px;
      height: 35px;
      line-height: 35px;
      background: #f6ffed;
      padding-right: 40px;
      border: 1px solid #7cac1c;
      .cenFont {
        font-size: 12px;
        color: #8dc21f;
        margin-left: 30px;
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