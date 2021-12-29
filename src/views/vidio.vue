
<template>
  <div class="vidio">
    <div class="nav">
      <div class="item">
        <span class="title">区县:</span>
        <el-select v-model="dept" placeholder="请选择" :disabled = '!isJudge'>

          <el-option
            v-for="item in deptList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div style="margin-left: 26px">
          <el-date-picker
            v-model="date"
            type="datetimerange"
            :shortcuts="shortcuts"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="item">
        <el-button @click="isUploadBox = true">
          <i class="el-icon-upload" /> 上传</el-button
        >
        <!-- <el-button @click="download"
          ><i class="el-icon-download" /> 下载</el-button
        > -->
      </div>
    </div>
    <div class="content" @scroll.passive="getScroll($event)">
      <h2 class="noData" v-if="data.length == 0">无数据</h2>
      <div
        class="videoItem"
        @click="changeIsVideoBox(item.videoUrl)"
        v-for="item in data"
        :key="item.pictureUrl"
      >
        <!-- 图片 -->
        <el-image
          style="width: 100%; height: 100%"
          :src="nginxUrl + item.pictureUrl"
          fit="cover"
        ></el-image>

        <i class="el-icon-video-play iconPlay" />
        <div class="desc">
          <el-button
            type="text"
            class="oneDownload"
            @click.stop="oneDownload(item.id)"
            >下载</el-button
          >

          <span class="uploadTime"
            ><i class="el-icon-user-solid" />{{ item.unit }}</span
          >
          <span class="uploadTime"
            ><i class="el-icon-date" />: {{ item.uploadTime }}</span
          >
        </div>
      </div>

      <el-backtop :bottom="200" target=".content"> </el-backtop>
    </div>

    <!-- 视频弹窗 -->
    <el-dialog
      title="视频"
      :visible.sync="isVideoBox"
      :fullscreen="true"
      @close="closeVideBox"
      :append-to-body="true"
    >
      <video controls autoplay ref="videoDom" :src="videoSrc"></video>
    </el-dialog>

    <!-- 上传弹窗 -->
    <el-dialog
      title="上传"
      :visible.sync="isUploadBox"
      @close="closeuoloadBox"
      width="400px"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        multiple
        ref="my-upload"
        :action="uploadUrl"
        name = "video"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :headers="{ token }"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传video/mp4文件，且不超过5GB
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isUploadBox = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import URL from "../http/URL2";
import { queryVideoList } from "../api/videoAPI";
import { formatData,judge } from "../util";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isJudge: false,
      nginxUrl: URL.nginxUrl,
      timer: null,
      isNext: true,
      data: [],
      page: 1,
      pageSize: 30,
      dept: "",
      deptList: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "上城",
          label: "上城",
        },
        {
          value: "下城",
          label: "下城",
        },
        {
          value: "西湖",
          label: "西湖",
        },
        {
          value: "江干",
          label: "江干",
        },
        {
          value: "拱墅",
          label: "拱墅",
        },
        {
          value: "滨江",
          label: "滨江",
        },
        {
          value: "萧山",
          label: "萧山",
        },
        {
          value: "余杭",
          label: "余杭",
        },
        {
          value: "临安",
          label: "临安",
        },
        {
          value: "富阳",
          label: "富阳",
        },
        {
          value: "建德",
          label: "建德",
        },
        {
          value: "桐庐",
          label: "桐庐",
        },
        {
          value: "淳安",
          label: "淳安",
        },
        {
          value: "武林",
          label: "武林",
        },
      ],
      shortcuts: [
        {
          text: "最近一周",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          })(),
        },
        {
          text: "最近一个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          })(),
        },
        {
          text: "最近三个月",
          value: (() => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          })(),
        },
      ],
      date: [],

      isVideoBox: false,
      videoSrc: "",
      isUploadBox: false,
    };
  },
  watch: {
    dept() {
      this.page = 1;
      this.isNext = true;
      this.data = [];
      this.getData();
    },
    date() {
      this.page = 1;
      this.isNext = true;
      this.data = [];
      this.getData();
    },
  },
  computed: {
    ...mapState(["token"]),
    uploadUrl() {
      return URL.apiUrl + "video/videoUpload";
    },
  },
  methods: {
    getScroll(event) {
      // 滚动条距离底部的距离scrollBottom
      let scrollBottom =
        event.target.scrollHeight -
        event.target.scrollTop -
        event.target.clientHeight;
      if (scrollBottom < 40) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.page++;
          this.getData();
          clearTimeout(this.timer);
          this.timer = "";
        }, 300);
      }
    },
    // 获取数据
    async getData() {
      if (!this.isNext) {
        return;
      }
      const { dept, date, page, pageSize } = this;
      let periodTime = "";
      if (date && date.length > 0) {
        periodTime = formatData(date[0]) + "," + formatData(date[1]);
      }
      const res = await queryVideoList("img/imageJson", {
        county: dept,
        periodTime,
        page,
        pageSize,
      });
      if (res.data.length == 0) {
        this.isNext = false;
      }

      this.data = [...this.data, ...res.data];
    },

    // 下载
    download() {
      // window.open(`${URL}redio/player`);
    },
    // 下载单个视频
    async oneDownload(id) {
      // let res = await videoDownload("video/player", id);
      // console.log(res);
      window.open(`${URL.apiUrl}video/player23?a=${id}`, "_blank");
      // 1
      // let u = window.URL.createObjectURL(new Blob([res]));
      // let a = document.createElement("a");
      // a.download = "daiwdji.mp4";
      // a.href = u;
      // a.style.display = "none";
      // document.body.appendChild(a);
      // a.click();
      // a.remove();

      // 2
      // var blob = new Blob([res], {
      //     type:
      //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
      //   }),
      // Temp = document.createElement("a");
      // Temp.href = window.URL.createObjectURL(blob);
      // Temp.download = new Date().getTime() + ".mp4";
      // document.getElementsByTagName('body')[0].append(Temp);
      // Temp.click();

      // 3
      // var downloadElement = document.createElement("a");
      // var href = window.URL.createObjectURL(new Blob([res])); //创建下载的链接
      // downloadElement.href = href;
      // downloadElement.download = "文件名.mp4"; //下载后文件名
      // document.body.appendChild(downloadElement);
      // downloadElement.style.display = "none";
      // downloadElement.click(); //点击下载
      // document.body.removeChild(downloadElement); //下载完成移除元素
      // window.URL.revokeObjectURL(href); //释放掉blob对象
    },

    // 跳转表报页面
    gitTable() {
      this.$router.push("/newtable");
    },

    // 显示视频对话框
    changeIsVideoBox(videoUrl) {
      const url = URL.nginxUrl + videoUrl;
      this.isVideoBox = true;
      //请求获取对应的视频
      this.videoSrc = url;
    },
    // 关闭视频对话框
    closeVideBox() {
      this.isVideoBox = false;
      this.videoSrc = "";
    },
    clearFiles() {
      this.$refs["my-upload"].clearFiles();
    },
    // 关闭上传对话框
    closeuoloadBox() {
      this.clearFiles();
      this.data = [];
      this.getData();
    },
    // 上传成功
    handleAvatarSuccess() {},

    // 上传前
    beforeAvatarUpload(file) {
      console.log("当前传入的视频格式",file.type);
      // return;
      const MYTYPE=["video/mp4","video/quicktime","video/avi","video/wmv"];
      let isMp4 = false; 
      for(let i = 0; i < MYTYPE.length; i ++) {
        if(file.type === MYTYPE[i]) {
          isMp4 = true;
          break;
        }
      }
      // isMp4 = file.type === "video/mp4";
      const isLt1G = file.size / 1024 / 1024 < (1024 * 5); //M
      if (!isMp4) {
        this.$message.error("上传视频只能是 mp4或者mov 格式!");
      }
      if (!isLt1G) {
        this.$message.error("上传头像图片大小不能超过 1G!");
      }
      return isMp4 && isLt1G;
    },

    
  },
  created() {
    this.isJudge = judge(this.$store.state.dept);
    console.log(this.$store.state.dept, '区县',this.isJudge)
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.vidio {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
}
.nav {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  display: flex;
  // margin: 0 auto;
  // justify-content: space-between;
  background: #ddd;
  font-size: 15px;
  padding: 0 30px;
  justify-content: space-between;

  .title {
    margin-right: 10px;
  }
  .item {
    display: flex;
    align-items: center;
    height: 60px;
  }
  .item:nth-last-of-type(1) {
  }
}
.content {
  // margin: 30px 30px 0;
  height: calc(~"100% - 60px");
  background: #fff;
  overflow: auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.content .videoItem {
  width: 200px;
  height: 250px;
  /* background: #000; */
  margin: 20px 20px;
  border: 1px solid #ddd;
  transition: all 0.4s;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
}
.videoItem:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
}
.videoItem:hover .iconPlay {
  display: block;
}
.videoItem:hover .desc {
  // transform: translateY(0);
}
.videoItem .iconPlay {
  font-size: 50px;
  color: #2d3436;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  display: none;
}

.desc {
  width: 100%;
  height: 50px;
  /* background: rgba(0, 0, 0, 0.2); */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 0;
  // transform: translateY(50px);
  transition: all 0.2s;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
}
.desc .uploadTime {
  flex: 1;
  font-size: 12px;
  margin-right: 10px;
  padding-top: 6px;
}
video {
  width: 100%;
  height: 600px;
}
.noData {
  font-size: 20px;
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
}
.oneDownload {
  position: absolute;
  left: 10px;
}
</style>