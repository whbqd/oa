<template>
  <div class="reads">
    <div class="biao">
      <div class="yuan1"></div>
      <div class="yuanx1"></div>
      <div class="gunzhi1"></div>
      <div class="gunzhi2"></div>
      <div class="yuanx2"></div>
      <div class="yuan2"></div>
      <div class="timu">{{ types }}</div>
    </div>
    <div class="read">
      <div class="ti">
        <span class="ao"> {{ p }}</span>
        <span>发布人：</span>
        <span> {{ names }}</span>
      </div>
      <div v-html="texts" class="yuedu"></div>
      <div class="xiazai">
        <span :class="{ dis: !fu }">附件下载</span>
        <span
          class="iconfont icon-xiazai xia"
          @click="xia()"
          :class="{ dis: !fu }"
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
import { gets } from "../../request/wan";
export default {
  data() {
    return {
      texts: "",
      fu: "",
      editorOption: {},
      p: "",
      names: "",
      types: "",
    };
  },
  methods: {
    xia() {
      if (this.fu) {
        window.open("http://www.cmtthz.com/" + this.fu);
      } else {
        this.$message({
          message: "暂无附件",
          type: "error",
        });
      }
    },
  },
  created() {
    gets("Notification/readCount" + "?id=" + this.$store.state.tongId)
      .then((res) => {
        console.log(res.data);
        this.texts = res.data.content;
        console.log(this.texts);
        this.fu = res.data.annx;
        this.p = res.data.title;
        this.names = res.data.editName;
        this.types = res.data.types;
      })
      .catch((res) => {
        console.log(res);
        this.$router.push("/homepage/notice");
        this.$message({
          message: "查看失败",
          type: "error",
        });
      });
  },
};
</script>

<style scoped lang="less">
.reads {
  margin-top: -20px;
  height: 590px;
  // background-color: #ffffff;
  overflow: over;
}
.dis {
  display: none;
}
.biao {
  position: relative;
  width: 1200px;
  height: 60px;
  margin: auto;
  background-color: #00bfff;
  border: 2px solid #00b4f0;
  border-radius: 10px;
  .yuan1 {
    position: absolute;
    left: 150px;
    width: 30px;
    height: 30px;
    background-color: #ffffff;
    border-radius: 50%;
    top: 16px;
  }
  .yuanx1 {
    z-index: 99;
    position: absolute;
    left: 150px;
    width: 30px;
    height: 30px;
    background-color: #00bfff;
    border-radius: 50%;
    top: 130px;
  }
  .gunzhi1 {
    z-index: 99;
    position: absolute;
    left: 155px;
    width: 20px;
    height: 90px;
    background-color: #00bfff;
    top: 50px;
  }
  .yuan2 {
    position: absolute;
    right: 150px;
    width: 30px;
    height: 30px;
    background-color: #ffffff;
    border-radius: 50%;
    top: 15px;
  }
  .yuanx2 {
    z-index: 99;
    position: absolute;
    right: 150px;
    width: 30px;
    height: 30px;
    background-color: #00bfff;
    border-radius: 50%;
    top: 130px;
  }
  .gunzhi2 {
    z-index: 99;
    position: absolute;
    right: 155px;
    width: 20px;
    height: 90px;
    background-color: #00bfff;
    top: 50px;
  }
  .timu {
    width: 200px;
    margin: auto;
    color: #ffffff;
    font-size: 30px;
    line-height: 58px;
  }
}

.read {
  position: relative;
  top: 30px;
  border: 3px solid #00bfff;
  border-radius: 10px;
  width: 1200px;
  height: 510px;
  margin: auto;
  background: #ffffff;
  .ti {
    margin: auto;
    width: 800px;
    margin-top: 10px;
    // background-color: #ff1616;
    line-height: 60px;
    text-align: center;

    .ao {
      font-size: 30px;
      padding-right: 20px;
    }
  }
  .yuedu {
    width: 90%;
    height: 428px;
    margin: auto;
    // border: 3px solid #00bfff;
    overflow: auto;
  }
  ::-webkit-scrollbar {
    width: 0;
  }
}
.text {
  height: 600px;
  overflow: auto;
}
.editor {
  line-height: normal !important;
  height: 545px;
  .ql-container {
    font-size: 100px !important;
  }
}
.xiazai {
  background-color: rgb(255, 255, 255);
  position: absolute;
  right: 10px;
  bottom: 30px;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  // border: 1px solid #00bfff;
  .xia {
    font-size: 30px;
  }
}
</style>
