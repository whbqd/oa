<template>
  <div id="main">
    <div class="nav">
      <router-link :to="{ name: 'ax' }">按需</router-link>
      <router-link to="/hz">统计</router-link>
      <router-link to="/js">结算</router-link>
      <router-link to="/jssz">结算设置</router-link>
      <router-link :to="{name: 'bz'}">班组设置</router-link>
       <router-link :to="{name: 'bzSh'}">班组审核</router-link>
    </div>
    <div class="content">
      <transition enter-active-class="animate__fadeInTopLeft v-enter-active">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>


<style lang="less" scoped>
#main {
  height: 100%;
  // overflow: hidden;
  .nav {
    height: 60px;
    line-height: 60px;

    text-align: right;
    a {
      margin-right: 30px;
      padding: 5px 7px;
      color: #000;
      transition: all .8s;
      &.router-link-active {
        color: #fff;
        background: #3498db;
        border-radius: 5px;
      }
    }
  }
}

.v-enter {
    opacity: 0;
}
.v-enter-active {
    transition: all .5s;
}
.v-enter-to {
    opacity: 1;
}


</style>