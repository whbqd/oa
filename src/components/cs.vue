<template>
  <div class="hello">
    <div v-test="tedt">123</div>
    <div v-test="name">123</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "1",
      tedt: "",
    };
  },
  created(){
    this.name=this.$store.state.data[0]
    console.log(this.name)
  }
  // directives: {
  //   test: {
  //     inserted: function (el, binding) {
  //       // 指令的定义
  //       //el为绑定元素，可以对其进行dom操作
  //       console.log(binding); //一个对象，包含很多属性属性
  //       console.log(el);
  //     },
  //     bind: function (el, binding) {
  //       el.innerHTML = binding.value;
  //     },
  //   },
  // },
};
</script>