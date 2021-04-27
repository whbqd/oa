<template>
  <div class="noticeEdit">
    <!-- 标题 -->
    <div class="top">
      <p class="topFont">新建通知</p>
      <span class="iconfont icon-icon- tui" @click="tui"></span>
    </div>
    <!-- 表格 -->
    <div class="gund">
      <el-form label-width="100px" class="from">
        <!-- 标题 -->
        <el-form-item label="标题：">
          <el-input v-model="title" placeholder="请输入"></el-input>
        </el-form-item>
        <!-- 编号 -->
        <el-col :span="9">
          <el-form-item label="编号：" class="yourForm">
            <el-input
              v-model="grade"
              placeholder="系统自动分配"
            ></el-input> </el-form-item
        ></el-col>
        <!-- 拟稿人： -->
        <el-col :span="9" :offset="6">
          <el-form-item label="拟稿人：" class="yourForm">
            <el-input
              v-model="drafter"
              placeholder="默认当前账号人"
            ></el-input></el-form-item
        ></el-col>
        <!-- 签发部门 -->
        <el-col :span="9">
          <el-form-item label="签发部门：" class="yourForm">
            <el-input
              v-model="issue"
              placeholder="默认当前部门"
            ></el-input> </el-form-item
        ></el-col>
        <!-- 接收人 -->
        <el-col :span="9" :offset="6">
          <el-form-item label="接收人：" class="yourForm">
            <el-select v-model="seceiver" placeholder="请选择">
              <el-option label="张呵呵" value="zhang"></el-option>
              <el-option label="王呵呵" value="wang"></el-option>
            </el-select> </el-form-item
        ></el-col>
        <!-- 类型 -->
        <el-col :span="9">
          <el-form-item label="类型：" class="yourForm">
            <el-select v-model="type" placeholder="请选择">
              <el-option label="通知" value="1"></el-option>
              <el-option label="公告" value="2"></el-option>
              <el-option label="新闻" value="3"></el-option>
              <el-option label="学习" value="4"></el-option>
              <el-option label="企业文化" value="4"></el-option>
              <el-option label="规章制度" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 封面图 -->
        <el-col :span="9" :offset="6">
          <el-form-item label="封面图：">
            <el-radio-group v-model="xuanzhe">
              <el-radio label="单图大"></el-radio>
              <el-radio label="单图小"></el-radio>
              <el-radio label="大图"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <!-- 正文 -->
        <el-col :span="24">
          <el-form-item label="正文：">
            <div id="demo">
              <p>编辑</p>
            </div>
          </el-form-item></el-col
        >
        <el-button type="primary" class="zhong" @click="a">发布</el-button>
        <el-button type="warning" class="zhong" @click="handleLook"
          >预览</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  data() {
    return {
      title: "",
      grade: "",
      drafter: "",
      issue: "",
      seceiver: "",
      type: "",
      xuanzhe: "",
      text: "",
      editor: null,
    };
  },
  methods: {
    // 预览
    handleLook() {
      console.log(this.editor.txt.html());
      this.text = this.editor.txt.html();
      this.$store.commit("setText", this.text);
      this.$router.push("/homepage/read");
    },
    // 退出
    tui() {
      this.$router.push("/homepage/notice");
    },
    a() {
      this.$router.push("/homepage/notice");
    },
  },
  mounted() {
    // 创建编辑器
    this.editor = new E(`#demo`);
    this.editor.config.height = 450;
    this.editor.create();
  },

  beforeDestroy() {
    // 销毁编辑器
    this.editor.destroy();
    this.editor = null;
  },
};
</script>
<style scoped lang="less">
.noticeEdit {
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.yourForm {
  .el-select {
    width: 100%;
  }
}
.top {
  height: 50px;
  width: 100%;
  background: #cccccc;
  .topFont {
    font-size: 15px;
    line-height: 50px;
    font-weight: bold;
    margin-left: 30px;
  }
  .tui {
    position: relative;
    left: 96%;
    top: -35px;
    transition: 0.1s;
    font-size: 30px;
  }
  .tui:hover {
    font-size: 35px;
  }
}
.from {
  width: 95%;
  margin: auto;
  margin-top: 30px;
  height: 550px;
  .le {
    width: 50%;
    height: 20%;
    background: #bd2020;
  }
  .ri {
    width: 50%;
    height: 20%;
    background: #20bd47;
  }
  .editor {
    line-height: normal !important;
    height: 500px;
  }
  .zhong {
    position: relative;
    left: 50%;
    transform: translateX(-200%);
    width: 80px;
    height: 32px;
    line-height: 8px;
    margin-left: 50px;
    margin-bottom: 20px;
  }
}

.gund {
  overflow: auto;
  height: 540px;
}
</style>