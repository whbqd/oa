<template>
  <div class="employeeFiles">
    <!-- 标题 -->
    <div class="top">
      <div
        class="font a"
        @click="reren"
        :class="{ col: cli == 0 }"
        v-test="{ name: '信息配置' }"
      >
        <p>隶属单位</p>
      </div>
      <div
        class="font a"
        @click="jiao"
        :class="{ col: cli == 1 }"
        v-test="{ name: '合同性质' }"
      >
        <p>合同性质</p>
      </div>
      <div
        class="font a"
        @click="ruzhi"
        :class="{ col: cli == 2 }"
        v-test="{ name: '用工属性' }"
      >
        <p>用工属性</p>
      </div>
      <div
        class="font a"
        @click="shengpi"
        :class="{ col: cli == 4 }"
        v-test="{ name: '审批表模板' }"
      >
        <p>审批人模板</p>
      </div>
      <div
        class="font a"
        @click="zhiCheng"
        :class="{ col: cli == 5 }"
        v-test="{ name: '职称' }"
      >
        <p>职称</p>
      </div>
      <div
        class="font a"
        @click="gangw"
        :class="{ col: cli == 3 }"
        v-test="{ name: '岗位统计表' }"
      >
        <p>岗位统计表</p>
      </div>
      <div
        class="font a"
        @click="gangWeiPlus"
        :class="{ col: cli == 6 }"
        v-test="{ name: '岗位设置' }"
      >
        <p>岗位设置</p>
      </div>
      <div
        class="font a"
        @click="leixing"
        :class="{ col: cli == 7 }"
        v-test="{ name: '审批类型' }"
      >
        <p>审批类型</p>
      </div>
      <div
        class="font a"
        @click="lines"
        :class="{ col: cli == 8 }"
        v-test="{ name: '复用条线' }"
      >
        <p>复用条线</p>
      </div>
      <div
        class="font a"
        @click="phones"
        :class="{ col: cli == 9 }"
        v-test="{ name: '携号转网手机号录入' }"
      >
        <p>携号转网</p>
      </div>
    </div>
    <!-- 隶属单位 -->
    <div v-show="cli == 0" class="geren">
      <lishu></lishu>
    </div>
    <!-- 合同性质 -->
    <div v-show="cli == 1" class="experience">
      <hetong></hetong>
    </div>
    <!-- 用工属性 -->
    <div v-show="cli == 2" class="information">
      <yonggong></yonggong>
    </div>
    <!-- 岗位统计表 -->
    <div v-show="cli == 3" class="information">
      <gangWei></gangWei>
    </div>
    <!-- 审批人模板 -->
    <div v-show="cli == 4" class="information">
      <moBan></moBan>
    </div>
    <!-- 职称 -->
    <div v-show="cli == 5" class="information">
      <zhiCheng></zhiCheng>
    </div>
    <!-- 岗位设置 -->
    <div v-show="cli == 6" class="information">
      <gangWeiPlus></gangWeiPlus>
    </div>
    <!-- 审批类型 -->
    <div v-show="cli == 7" class="information">
      <types></types>
    </div>
    <!-- 复用条线 -->
    <div v-show="cli == 8" class="information">
      <lines></lines>
    </div>
    <!-- 携号转网手机号录入 -->
    <div v-show="cli == 9" class="information">
      <phones></phones>
    </div>
  </div>
</template>
<script>
import lishu from "../../components/lishu.vue";
import hetong from "../../components/hetong.vue";
import yonggong from "../../components/yonggong.vue";
import gangWei from "../../components/gangWei.vue";
import moBan from "../../components/moBan.vue";
import zhiCheng from "../../components/zhiCheng.vue";
import gangWeiPlus from "../../components/gangWeiPlus.vue";
import types from "../../components/types.vue";
import lines from "../../components/lines.vue";
import phones from "../../components/phones.vue";
export default {
  data() {
    return {
      cli: 9,
      tableData5: [],
      // 分页
      currentPage: 1,
      pagesize: 50,
      fileList: [],
      counts: 0,
    };
  },
  components: {
    lishu,
    hetong,
    yonggong,
    gangWei,
    moBan,
    zhiCheng,
    gangWeiPlus,
    types,
    lines,
    phones,
  },
  // created() {
  //   gets("inforConf/selSubunits").then((res) => {
  //     this.tableData = res.data.data.records;
  //     this.counts = res.data.data.total;
  //     // console.log(res.data.data.records);
  //   });
  // },
  methods: {
    // 隶属单位
    reren() {
      this.cli = 0;
    },
    // 合同性质
    jiao() {
      this.cli = 1;
      // this.shuj2();
    },
    // 用工属性
    ruzhi() {
      this.cli = 2;
    },
    // 岗位查看
    gangw() {
      this.cli = 3;
    },
    // 模板设置
    shengpi() {
      this.cli = 4;
    },
    // 职称
    zhiCheng() {
      this.cli = 5;
    },
    // 岗位设置
    gangWeiPlus() {
      this.cli = 6;
    },
    leixing() {
      this.cli = 7;
    },
    lines() {
      this.cli = 8;
    },
    phones() {
      console.log(123);
      this.cli = 9;
    },
  },
};
</script>
<style scoped lang="less">
.a {
  display: none;
}
.el-form {
  .el-input {
    min-width: 180px;
  }
  .el-select {
    min-width: 170px;
    width: 100%;
  }
}
.employeeFiles {
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
// 头部
.top {
  height: 40px;
  background: #dddddd;
  display: flex;
  .font {
    font-size: 15px;
    width: 150px;
    line-height: 40px;
    text-align: center;
  }
  // 点击变色
  .col {
    background: #ffffff;
    color: #0077f1;
  }
  .yan {
    background: #ffffff;
    width: 250px;
    height: 30px;
    border-radius: 20px;
    padding-left: 20px;
    margin-top: 10px;
    margin-left: 180px;
  }
  .ding {
    position: relative;
    right: 30px;
    top: 17px;
  }
  .pai {
    width: 80px;
    height: 30px;
    font-size: 10px;
    margin-top: 10px;
    margin-left: 30px;
  }
}
.from {
  width: 95%;
  margin: auto;
  .sosuo {
    color: #c0c0c0;
    font-size: 15px;
  }
}
// 个人资料
.geren {
  // 头像
  .pic {
    position: relative;
    width: 100px;
    height: 120px;
    top: 55px;
    left: 50px;
    border: 1px solid #d3d3d3;
  }
  .froms {
    position: relative;
    top: -67px;
    left: 100px;
    width: 92%;
  }
}
// 教育经历
.experience {
  .froms {
    position: relative;
    top: 30px;
    left: 20px;
    width: 90%;
  }
}
// 入职信息
.information {
  overflow: auto;
  height: 92%;
  // border: solid;
  .froms {
    position: relative;
    top: 30px;
    left: 20px;
    width: 90%;
  }
}
// 其他相关
.other {
  .froms {
    position: relative;
    top: 30px;
    left: 20px;
    width: 90%;
  }
}
.right {
  width: 100%;
  height: 100%;
  background: #ffffff;

  .top2 {
    height: 50px;
    width: 100%;
    display: flex;
    .but {
      width: 100px;
      height: 30px;
      color: #ffffff;
      border-radius: 3px;
      margin-top: 10px;
      margin-left: 30px;
    }
    .col1 {
      background-color: #0077f1;
    }
  }
}
</style>