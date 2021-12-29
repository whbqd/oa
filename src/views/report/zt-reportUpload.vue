<template>
  <div>
    <upload-item
      v-for="item in filterList"
      v-bind="item"
      :key="item.id"
      @upload="upload"
      @download="download"
    ></upload-item>
  </div>
</template>

<script>
import uploadItem from "./components/UploadItem.vue";
import * as api from "@/api/report";

export default {
  components: {
    uploadItem,
  },
  data() {
    return {
      list: [],
    };
  },
  computed: {
    filterList() {
      const { list } = this;
      if (this.list.length === 13) {
        return list;
      }
      // 获取outsideId []
      const outside = list.map((it) => it.outsideId);
      const allId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
      const noSide = allId.filter((i) => !outside.includes(i));
      const newList = [...list];
      noSide.forEach((it) => {
        const id = Math.random().toString(32).slice(4);
        newList.push({
          id,
          outsideId: it,
          filename: "",
          status: 0,
        });
      });
      return newList;
    },
  },
  methods: {
    async getList() {
      try {
        const resp = await api.getreport();
        this.list = resp.data;
      } catch (error) {
        this.list = [];
      }
    },
    async upload(data) {
      const formData = new FormData();
      const { id, file, county, outsideId, fileAddress, status } = data;
      formData.append("file", file);
      formData.append("county", county);
      formData.append("outsideId", outsideId);
      formData.append("status", status);
      if (status) {
        // 重新上传
        formData.append("id", id);
        formData.append("fileAddress", fileAddress);
      } else {
        // 上传
        formData.append("id", "1");
        formData.append("fileAddress", "1");
      }
      const resp = await api.upload(formData);
      this.$Message.info(resp.message);
      await this.getList();
      console.log('11', resp);
    },
    async download(id) {
      const resp = await api.download(id);
      console.log(resp);
      window.open(resp.data);
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style>
</style>