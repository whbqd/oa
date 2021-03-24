
<template>
  <div>
    <div
      v-for="(item, index) in semesterSelection"
      @click="changSemester(index)"
      :key="index"
      :class="{ blue: i === index }"
    >
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      semesterSelection: [{ name: "xyz" }, { name: "lm" }],
      i: 0,
    };
  },
  methods: {
    //点击改变文字颜色
    changSemester(index) {
      console.log(index);
      this.i = index;
    },
  },
};
</script>
 
<style scoped>
/*点击文字变颜色*/
.blue {
  color: blue;
}
</style>