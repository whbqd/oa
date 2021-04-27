<template>
  <div class="modifyAgent">
    <div class="top">
      <p class="topFont">修改待办</p>
      <span class="iconfont icon-icon- tui" @click="tui"></span>
    </div>
    <div class="bott">
      <!-- 表格 -->
      <el-form label-width="100px" class="from">
        <!-- 待办名称 -->
        <el-form-item label="待办名称：">
          <el-input v-model="name" placeholder="请输入"></el-input>
        </el-form-item>
        <!-- 紧急程度 -->
        <el-col :span="9">
          <el-form-item label="紧急程度：" class="yourForm">
            <el-select v-model="urgent" placeholder="请选择">
              <el-option label="紧急不重要" value="1"></el-option>
              <el-option label="紧急重要" value="2"></el-option>
              <el-option label="紧急不重要" value="3"></el-option>
              <el-option label="紧急重要" value="4"></el-option>
            </el-select> </el-form-item
        ></el-col>
        <!-- 待办类型 -->
        <el-col :span="9" :offset="6">
          <el-form-item label="待办类型：" class="yourForm">
            <el-select v-model="type" placeholder="请选择">
              <el-option label="类型1" value="shanghai"></el-option>
              <el-option label="类型2" value="beijing"></el-option>
            </el-select> </el-form-item
        ></el-col>
        <!-- 执行人 -->
        <el-col :span="9">
          <el-form-item label="执行人：" class="yourForm">
            <el-select v-model="implement" placeholder="请选择">
              <el-option label="张呵呵" value="zhang"></el-option>
              <el-option label="王呵呵" value="wang"></el-option>
            </el-select> </el-form-item
        ></el-col>
        <!-- 督办人 -->
        <el-col :span="9" :offset="6">
          <el-form-item label="督办人：" class="yourForm">
            <el-select v-model="supervise" placeholder="请选择">
              <el-option label="张呵呵" value="zhang"></el-option>
              <el-option label="王呵呵" value="wang"></el-option>
            </el-select> </el-form-item
        ></el-col>
        <!-- 开始时间 -->
        <el-col :span="9">
          <el-form-item label="开始时间：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="date1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- 结束时间 -->
        <el-col :span="9" :offset="6">
          <el-form-item label="结束时间：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="date2"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="具体说明：">
            <el-input
              type="textarea"
              v-model="desc"
              rows="5"
              placeholder="请输入"
            ></el-input> </el-form-item
        ></el-col>
        <!-- 待办开关 -->
        <el-col :span="9">
          <el-form-item label="待办开关：">
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <!-- 完成情况 -->
        <el-col :span="9" :offset="6">
          <el-form-item label="完成情况：">
            <el-select v-model="type" placeholder="请选择">
              <el-option label="已完成" value="1"></el-option>
              <el-option label="未完成" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="上传附件：">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload></el-form-item
          ></el-col
        >
        <el-button type="primary" class="zhong">提交</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      region: "",
      urgent: "",
      type: "",
      implement: "",
      supervise: "",
      date1: "",
      date2: "",
      desc: "",
      fileList: [],
      value: true,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 退出
    tui() {
      this.$router.push("/homepage/myAgent");
    },
  },
};
</script>
<style scoped lang="less">
.modifyAgent {
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
  height: 40px;
  background: #dddddd;
  .topFont {
    font-size: 18px;
    line-height: 40px;
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
.bott {
  overflow: auto;
  height: 550px;
}
.from {
  width: 95%;
  margin: auto;
  margin-top: 30px;

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
  .zhong {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    line-height: 10px;
    height: 32px;
    width: 80px;
    border-radius: 3px;
    margin-bottom: 10px;
  }
}
</style>