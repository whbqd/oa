<template>
  <div class="read" v-html="texts">

  </div>
</template>
<script>
export default {
  data() {
    return {
      texts: "",
      editorOption: {},
    };
  },
  created() {
    console.log(this.$store.state.text);
    this.texts = this.$store.state.text;
  },
};
</script>

<style scoped lang="less">
.read {
  width: 100%;
  height: 100%;
  background: #ffffff;
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
</style>
