<template>
  <div id="demo">
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      :auto-upload="false"
      :on-change="handleRemove"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <div @click="tj">提交</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      file: [],
    };
  },
  methods: {
    tj() {
      const formData = new FormData();
      for (var t = 0; t < this.file.length; t++) {
        // console.log(this.file[t].raw);
        formData.append("workFile", this.file[t].raw);
        formData.append("cid", this.file[t].name.replace(".jpg",""));
      }
      console.log(this.file,999);
      this.$axios.post("http://www.cmtthz.com/work/workFileUpload1", formData).then((res) => {
        console.log(res);
      });
    },
    handleRemove(file) {
      // console.log(fileList);

      this.file.push(file);
    },
  },
  created() {
    console.log(132);
  },
};
</script>
<style scoped>
</style>