<template>
  <div class="uploadItem">
    <Card style="width: 100%; height: 100%">
      <div style="text-align: center">
        <i class="el-icon-document font"></i>
        <h3 class="filename" :title="filename">{{ filename }}</h3>
      </div>
      <div class="status">
        <Tag v-if="status === 0" type="dot" color="default">待上传</Tag>
        <Tag v-else-if="status === 1" type="dot" color="primary">待审核</Tag>
        <Tag v-else-if="status === 2" type="dot" color="success">已完成</Tag>
        <Tag v-else-if="status === 3" type="dot" color="error">已驳回</Tag>
      </div>
      <div class="action">
        <Button size="small" type="primary" @click="download(id)"
          >下载模板</Button
        >
        <Button
          size="small"
          type="success"
          v-if="status === 0 && !uploadhidden"
          @click="uploadhidden = true"
          >上传报表</Button
        >
        <Button
          size="small"
          type="warning"
          v-if="(status === 1 || status === 3) && !uploadhidden"
          @click="uploadhidden = true"
          >重新上传</Button
        >
        <Button type="info" ghost @click="handleClick" v-if="uploadhidden"
          >取消</Button
        >
      </div>
      <div class="upload" v-if="uploadhidden">
        <Upload
          type="drag"
          :before-upload="handleUpload"
          :format="['xls', 'xlsx']"
          action=""
        >
          <div style="padding: 20px 0">
            <Icon
              type="ios-cloud-upload"
              size="52"
              style="color: #3399ff"
            ></Icon>
            <p>点击上传或者将文件拖入此区域</p>
          </div>
        </Upload>
      </div>
    </Card>
  </div>
</template>

<script>
import store from '@/store';
export default {
  props: ["id", "outsideId", "filename", "status", "fileAddress"],
  data() {
    return {
      uploadhidden: false,
    };
  },
  methods: {
    download(id) {
      this.$emit("download", id);
    },
    handleClick() {
      this.uploadhidden = false;
    },
    // 上传处理
    handleUpload(file) {
      console.log(file);
      const { id, outsideId, fileAddress } = this;
      const county = store.state.dept;
      this.$emit('upload', {
        file,
        status: this.status,
        id,
        outsideId,
        fileAddress,
        county
      });
      this.handleClick();
      return false;
    }
  },
};
</script>

<style scoped>
.uploadItem {
  width: 24%;
  height: 165px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 15px;
  float: left;
  padding: 0;
}
.action {
  margin-top: 10px;
  text-align: center;
}
.action button {
  margin-right: 10px;
}
.font {
  font-size: 60px;
}
.status {
  position: absolute;
  right: 0px;
  top: 0px;
}
.filename {
  text-align: center;
  margin-top: 5px;
  height: 30px;
  line-height: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.upload {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>