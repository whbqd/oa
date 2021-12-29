<template>
  <div class="noticeEdit">
    <!-- 标题 -->
    <div class="top">
      <p class="topFont">新建通知</p>
      <span class="iconfont icon-icon- tui" @click="tui"></span>
    </div>
    <!-- 表单 -->
    <el-form label-width="100px" class="from">
      <!-- 标题 -->
      <el-col :span="12">
        <el-form-item label="标题：">
          <el-input v-model="title" placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
      <!-- 任务归属 -->
      <el-col :span="12">
        <el-form-item label="类型" class="yourForm">
          <el-select v-model="types">
            <el-option label="公司文件" value="公司文件"></el-option>
            <el-option label="党建工作" value="党建工作"></el-option>
            <el-option label="通知公告" value="通知公告"></el-option>
            <el-option label="规章制度" value="规章制度"></el-option>
            <el-option label="学习材料" value="学习材料"></el-option>
          </el-select> </el-form-item
      ></el-col>
      <!-- 备注 -->
      <el-col :span="24">
        <el-form-item label="备注：" class="yourForm">
          <el-input
            v-model="remark"
            placeholder="请输入"
          ></el-input> </el-form-item
      ></el-col>
      <!-- 上传附件： -->
      <el-col :span="12">
        <el-form-item label="上传附件：">
          <el-upload
            class="upload-demo"
            action=""
            multiple
            :auto-upload="false"
            :limit="3"
            :file-list="fileList"
            :on-change="handleAvatarSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item></el-col
      >
      <!-- 选择接收人 -->
      <el-col :span="12">
        <el-form-item label="接收人：">
          <el-button size="small" type="primary" @click="xuanzhe"
            >点击选择</el-button
          >
          <!-- 查看 -->
          <el-button type="text" size="small" @click="innerVisible2 = true"
            ><span class="iconfont icon-yanjing xiu"></span
          ></el-button> </el-form-item
      ></el-col>
    </el-form>

    <div class="zhongjian">
      <div class="chao">
        <!-- 表格 -->
        <el-table
          ref="singleTable"
          stripe
          :data="tableData"
          highlight-current-row
          style="width: 100%"
          height="538"
          id="se"
          :cell-style="{
            padding: '1px',
            textAlign: 'center',
            fontSize: '12px',
          }"
          :header-cell-style="{
            background: '#dddddd',
            color: '#606266',
            textAlign: 'center',
            fontSize: '14px',
          }"
        >
          <el-table-column property="title" label="标题"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="seet(scope.row)"
                ><span class="iconfont icon-yanjing xiu"></span
              ></el-button>
              <el-button type="text" size="small" @click="deleteRow(scope.row)"
                ><span class="iconfont icon-shanchu"></span
              ></el-button> </template
          ></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pagesize"
          :total="counts"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
      <!-- 编辑 -->
      <div id="demo">
        <div id="aaa"></div>
      </div>
    </div>
    <el-button type="primary" class="zhong" @click="a">发布</el-button>
    <!-- 弹出人员 -->
    <el-dialog
      title="人员"
      :visible.sync="innerVisible"
      append-to-body
      destroy-on-close
    >
      <div style="width: 100%">
        <personnelTong2></personnelTong2>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="reny">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹出查看-->
    <el-dialog
      title="人员"
      :visible.sync="innerVisible2"
      append-to-body
      destroy-on-close
    >
      <div style="width: 100%">
        <div>{{ fasongName }}</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible2 = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import E from "wangeditor";
import { gets, postp } from "../../request/wan";
import personnelTong2 from "../../components/personnelTong2.vue";
export default {
  data() {
    return {
      id: "",
      title: "",
      types: "公司文件",
      remark: "",
      text: "",
      editor: null,
      tableData: [],
      sendIds: "",
      sendName: "",
      // 分页
      currentPage: 1,
      pagesize: 50,
      counts: 0,
      // 文件
      fileList: [],
      innerVisible: false,
      innerVisible2: false,
      // 接受人ID
      fasong: "",
      fasongName: "",
    };
  },
  components: { personnelTong2 },
  created() {
    // 请求通知数据
    gets("Notification/getNotification", {
      pagesize: this.pagesize,
      page: this.currentPage,
      type: 1,
    }).then((res) => {
      console.log(res);
      this.tableData = res.data.items;
      this.counts = res.data.counts;
      // console.log("64", res.data);
    });
  },
  methods: {
    // 选择弹出
    xuanzhe() {
      this.$store.fromPerson = "";
      this.$store.fromPersons = [];
      this.innerVisible = true;
      this.fasong = "";
      this.fasongName = "";
    },
    // 人员选择
    reny() {
      // var len = 0;
      // len = this.$store.name.length;
      if (this.$store.fromPerson == "") {
        this.$store.fromPersons.forEach((res) => {
          console.log(res.id);
          this.fasong = this.fasong + res.id + ",";
          this.fasongName = this.fasongName + res.userName + ",";
        });
        this.fasong = this.fasong.slice(0, this.fasong.length - 1);
        this.fasongName = this.fasongName.slice(0, this.fasongName.length - 1);
        console.log(this.fasong, 7);
      } else {
        this.fasong = JSON.stringify(this.$store.fromPerson.id);
        console.log(this.fasong, 8);
      }
      this.innerVisible = false;
    },
    // 上传附件
    handleAvatarSuccess(raw, file) {
      this.fileList.push(file[0].raw);
    },
    // 请求通知数据
    shuj() {
      gets("Notification/getNotification", {
        pagesize: this.pagesize,
        page: this.currentPage,
        type: 1,
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.items;
        // this.counts = res.data.counts;
        // console.log("64", res.data);
      });
    },
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    // 查看
    seet(row) {
      this.xingxi = row;
      console.log(row);
      var testdiv = document.getElementById("aaa");
      testdiv.innerHTML = row.content;
      this.id = row.id;
      this.title = row.title;
      this.types = row.types;
      this.remark = row.remark;
      this.fasong = row.sendIds;
      this.fasongName = row.sendName;
    },
    // 删除草稿
    deleteRow(row) {
      postp("Notification/deleteNotification" + "?id=" + row.id).then(() => {
        this.shuj();
      });
    },
    // 退出
    tui() {
      this.$router.push("/homepage/notice");
    },
    // 时间
    getNowTime() {
      let dateTime;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      dateTime = yy + "-" + mm + "-" + dd + " " + hh + ":" + mf + ":" + ss;
      return dateTime;
    },
    // 发通知
    a() {
      this.text = this.editor.txt.html();
      const content = {
        id: this.xingxi.id,
        title: this.title,
        types: this.types,
        remark: this.remark,
        send: 0,
        content: this.text,
        sendIds: this.fasong,
        sendTime: this.getNowTime(),
        sendName: this.fasongName,
      };
      // 保存通知
      postp("Notification/updateNotification", content).then((res) => {
        // console.log(res.data, 8989);
        if (this.fileList != "") {
          const formData = new FormData();
          formData.append("file", this.fileList[0]);
          formData.append("id", res.data);
          postp("Notification/fileUpload", formData).then((res) => {
            console.log(res);
            this.$router.push("/homepage/noticeAdmin");
          });
        } else {
          this.$router.push("/homepage/noticeAdmin");
        }
      });
      console.log(this.getNowTime());
    },
    // a() {
    //   this.text = this.editor.txt.html();
    //   const content = {
    //     title: this.title,
    //     types: this.types,
    //     remark: this.remark,
    //     send: 1,
    //     content: this.text,
    //   };
    //   // 保存通知
    //   postp("Notification/insertNotification", content).then((res) => {
    //     // 保存附件或直接发送
    //     if (this.fileList == "") {
    //       postp("Notification/sendNotification", {
    //         id: res.data,
    //         sendids: this.fasong,
    //       }).then((res) => {
    //         console.log(res);
    //         this.$router.push("/homepage/noticeAdmin");
    //       });
    //     } else {
    //       // 上传文件
    //       const formData = new FormData();
    //       formData.append("file", this.fileList[0]);
    //       formData.append("id", res.data);
    //       postp("Notification/fileUpload", formData).then((resFile) => {
    //         console.log(resFile);
    //         // 发送
    //         postp("Notification/sendNotification", {
    //           id: res.data,
    //           sendids: this.fasong,
    //         }).then((res) => {
    //           console.log(res);
    //           this.$message({
    //             message: res.data,
    //             type: "success",
    //           });
    //           this.$router.push("/homepage/noticeAdmin");
    //         });
    //       });
    //     }
    //   });
    //   // this.$router.push("/homepage/notice");
    // },
  },
  mounted() {
    // 创建编辑器
    this.editor = new E(`#demo`);
    this.editor.config.height = 450;
    this.editor.config.uploadImgShowBase64 = true;
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
#demo {
  width: 50%;
}
.chao {
  width: 50%;
  // border: 1px solid #000000;
}
.zhongjian {
  display: flex;
  width: 100%;
}
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
  width: 100%;
  // margin: auto;
  margin-top: 30px;
  // height: 350px;
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
    // height: 500px;
  }
}
.zhong {
  position: relative;
  left: 50%;
  // transform: translateX(-200%);
  width: 80px;
  height: 32px;
  line-height: 8px;
  // margin-left: 50px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.xiu {
  font-size: 8px;
}
.col {
  color: #a2a2a2;
  font-size: 18px;
}
.noticeEdit {
  overflow: auto;
  height: 590px;
}
</style>