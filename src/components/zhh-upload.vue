<template>
  <div class="upload">
    <div class="top">
      <p class="font">文件上传</p>
    </div>
    <div class="bott"></div>
    <div class="from">
      <el-form label-width="100px">
        <el-form-item label="文件名称：" class="wid">
          <el-input
            v-model="name"
            placeholder="请输入：可自动识别文件名"
          ></el-input>
        </el-form-item>
        <el-form-item label="文件分类：" class="yourForm">
          <el-select v-model="urgent" placeholder="请选择">
            <el-option label="政策文件" value="1"></el-option>
            <el-option label="管理考核" value="2"></el-option>
            <el-option label="办公模板" value="3"></el-option>
            <el-option label="学习资料" value="4"></el-option>
            <el-option label="上传文件" value="5"></el-option>
          </el-select>
        </el-form-item>
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
        >
        <el-button type="primary" round class="zhong">上传</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      urgent: "",
      fileList: [],
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
  },
};
</script>

<style scoped lang="less">
.upload {
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.top {
  height: 35px;
  width: 100%;
  background: #dddddd;
  .font {
    font-size: 14px;
    line-height: 35px;
    margin-left: 20px;
    font-weight: bold;
  }
}
.from {
  width: 88%;
  margin-left: 40px;
  margin-top: 30px;
  position: relative;
  .zhong {
    margin-left: 47%;
    margin-top: 250px;
    line-height: 8px;
    height: 32px;
    width: 80px;
    border-radius: 3px;
    position: absolute;
    bottom: -350px;
  }
}
</style>