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
          欢迎使用后台管理系统（V1.2）你本次的登录时间为<span>2021年03月19日14.35</span>，登录IP<span
            >192.168.12.11</span
          >
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
      <div class="touxFont">
        <img src="../assets/退出.png" class="setPic" />
        <p class="depaFont">退出</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zhtop",
  data() {
    return {};
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
      font-size: 26px;
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
      height: 43px;
      line-height: 43px;
      background: #f6ffed;
      min-width: 680px;

      .cenFont {
        font-size: 14px;
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
        font-size: 16px;
        min-width: 50px;
      }
      .depaFont {
        font-size: 14px;
        color: #808080;
        margin-top: 6px;
        min-width: 60px;
      }
      .setPic {
        width: 25px;
        height: 25px;
      }
      .bottonFont {
        margin-top: 15px;
      }
    }
  }
}
</style>