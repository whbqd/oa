<template>
  <div class="transferSheng">
    <!-- 头部 -->
    <div class="top">
      <!-- 头像 -->
      <div class="pic"><img :src="imgs" /></div>

      <!-- 表单 -->
      <el-form class="fomt" ref="form" :model="form" label-width="100px">
        <el-col :span="6">
          <el-form-item label="申请人 ：">
            <el-input
              v-model="form.name"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="所在部门 ：">
            <el-input
              v-model="form.denp"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="职位 ：">
            <el-input
              v-model="form.position"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="身份证号 ：">
            <el-input
              v-model="form.Uid"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
        <!-- <el-col :span="6" :offset="2">
          <el-form-item label="出生日期 ：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.time2"
              style="width: 100%"
            ></el-date-picker></el-form-item
        ></el-col> -->
      </el-form>
    </div>
    <!-- 中间 -->
    <div class="middle">
      <!-- 表单 -->
      <el-form class="fomt" ref="form2" :model="form2" label-width="120px">
        <!-- 申请调入部门 -->
        <el-col :span="6">
          <el-form-item label="申请调入部门 ：">
            <el-input
              v-model="form2.traDenp"
              placeholder="请选择部门"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
        <!-- 申请调入职位 -->
        <el-col :span="6" :offset="2">
          <el-form-item label="申请调入职位 ：">
            <el-input
              v-model="form2.traPosition"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
        <!-- 申请调入时间 -->
        <el-col :span="6" :offset="2">
          <el-form-item label="申请调入时间 ：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form2.traTime"
              style="width: 100%"
              :disabled="true"
            ></el-date-picker> </el-form-item
        ></el-col>
        <!-- 调职理由 -->
        <el-col :span="14">
          <el-form-item label="调职理由 ：">
            <el-input
              type="textarea"
              v-model="form2.desc"
              placeholder="请选择部门"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
        <!-- 申请调入条线 -->
        <el-col :span="6" :offset="2">
          <el-form-item label="条线 ：">
            <el-input
              v-model="form2.lines"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
        <!-- 下载附件： -->
        <el-col :span="24">
          <el-button size="small" type="primary" @click="xiaz"
            >点击下载附件</el-button
          >
        </el-col>
      </el-form>
    </div>
    <!-- 审核进度 -->
    <div class="progress">
      <el-form class="form" label-width="120px">
        <el-form-item label="审批进度 :">
          <div class="nnn">
            <div class="reny" v-for="(sheng, index) in approver" :key="index">
              <div
                class="heng"
                :class="{ dis: index == 0, yan: index >= approvalProgress }"
              ></div>
              <!-- <p class="fontSize">维护部</p> -->
              <p class="fontSize">{{ sheng }}</p>
              <!-- 同意 -->
              <span
                class="iconfont icon-dui judge"
                :class="{
                  dis: index >= tongyi,
                }"
              ></span>
              <!-- 驳回 -->
              <span
                class="iconfont icon-cuowu1 judge2"
                :class="{
                  dis: approvalProgress - 2 != index || totleStatus != 1,
                }"
              ></span>
              <span
                class="iconfont icon-time judge3"
                :class="{
                  dis: index < approvalProgress - 1,
                  yan2: index == approvalProgress - 1,
                }"
              ></span>
              <p
                class="fontSize tops"
                :class="{
                  dis: index >= tongyi,
                }"
              >
                同意
              </p>
              <p
                class="fontSize tops"
                :class="{
                  dis: index != approvalProgress - 1,
                }"
              >
                审批中
              </p>
              <p
                class="fontSize tops"
                :class="{
                  dis: index < approvalProgress,
                }"
              >
                待审批
              </p>
              <p
                class="fontSize tops"
                :class="{
                  dis: approvalProgress - 2 != index || totleStatus != 1,
                }"
              >
                驳回
              </p>

              <el-popover
                placement="top-start"
                title="意见"
                width="300"
                trigger="hover"
                :content="approvalComments[index]"
                :class="{ dis: index >= approvalProgress - 1 && butt == 1 }"
              >
                <el-button slot="reference" class="size">查看信息</el-button>
              </el-popover>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 意见 -->
    <div class="opinion" :class="{ dis: butt != 1 }">
      <el-form label-width="120px" class="form">
        <el-form-item label="审批意见 ：">
          <el-input
            type="textarea"
            v-model="dates"
            placeholder="请输入审批意见"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      class="zhong"
      style="background: #0077f1"
      @click="tong"
      :class="{ dis: butt != 1 }"
      :loading="an.tijiao"
      >提交</el-button
    >
    <el-button
      type="primary"
      class="zhong"
      style="background: #ff5722"
      @click="bo"
      :class="{ dis: butt != 1 }"
      :loading="an.tijiao"
      >驳回</el-button
    >

    <!-- 审批人选择弹出 -->
    <el-dialog title="选择" :visible.sync="show" :append-to-body="true">
      <div style="width: 100%">
        <personnel></personnel>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="gets">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import personnel from "../../components/personnel";
import { gets } from "../../request/wan";
import URL from "../../http/URL2";
export default {
  data() {
    return {
      // 头部
      form: {
        name: "",
        denp: "",
        position: "",
        Uid: "",
        time2: "",
      },
      form2: {
        traDenp: "",
        traPosition: "",
        traTime: "",
        desc: "",
        lines: "",
      },
      // 意见
      dates: "",
      // 文件
      fileList: [],
      // 人员点击
      show: false,
      // 头像
      toux: [{ name: "张呵呵" }],
      // 审批人
      approver: "",
      // 进度
      approvalProgress: "",
      // 内容
      approvalComments: "",
      // 是否同意
      tongyi: "",
      // 图片
      imgs: "",
      // 是否审批
      butt: "",
      // 审批状态
      totleStatus: "",
      // 要下载的附件路径
      xia: "",
      // 保存内容
      wenjian: "",
      // 按钮状态
      an: {
        tijiao: false,
      },
    };
  },
  components: { personnel },
  created() {
    // console.log(this.$store.shengID);
    this.butt = this.$store.butt;

    gets("tran/selTran" + "?tranId=" + this.$store.shengID).then((res) => {
      console.log(res.data);
      this.wenjian = res.data;
      // 要下载的附件路径
      this.xia = res.data.attachment;
      this.form.name = res.data.userName;
      this.form.denp = res.data.oldSector;
      this.form.position = res.data.oldPost;
      this.form.Uid = res.data.tranCard;
      this.form.time2 = res.data.depName;
      this.form2.traDenp = res.data.depName;
      this.form2.traPosition = res.data.tranName;
      this.form2.lines = res.data.line;
      this.form2.traTime = res.data.transferDate;
      this.form2.desc = res.data.applicationReason;
      this.approver = res.data.approver;
      // 审批进度
      this.approvalProgress = res.data.approvalProgress;
      // 意见
      if (res.data.approvalComments) {
        this.approvalComments = res.data.approvalComments.split("||");
      }
      // 头像
      this.imgs = URL.nginxUrl + res.data.workDocuments;
      // 审批状态
      this.totleStatus = res.data.totleStatus;
      if (this.totleStatus != 2) {
        this.tongyi = this.approvalProgress - 2;
      } else {
        this.tongyi = this.approvalProgress - 1;
      }
      // console.log(this.imgs);
      // console.log(this.approvalComments);
    });

    console.log(this.$store.butt);
  },
  methods: {
    // 审批人
    gets() {
      this.show = false;
      this.toux = this.$store.name;
      // console.log(this.$store.name);
    },
    // 提交
    tong() {
      if (this.dates == "") {
        this.dates == "无意间";
      }
      this.an.tijiao = true;
      gets(
        "tran/perapproval" +
          "?tranId=" +
          this.$store.shengID +
          "&" +
          "status=" +
          0 +
          "&" +
          "comments=" +
          this.dates
      )
        .then((res) => {
          console.log(res);
          // 按钮
          setTimeout(() => {
            this.an.tijiao = false;
          }, 500);
          console.log(new Date());
          this.$router.push("/homepage/approval");
        })
        .catch((error) => {
          console.log(error);
          this.an.tijiao = false;
        });
    },
    // 驳回
    bo() {
      if (this.dates == "") {
        this.dates == "无意间";
      }
      this.an.tijiao = true;
      gets(
        "tran/perapproval" +
          "?tranId=" +
          this.$store.shengID +
          "&" +
          "status=" +
          1 +
          "&" +
          "comments=" +
          this.dates
      )
        .then((res) => {
          console.log(res);
          // 按钮
          setTimeout(() => {
            this.an.tijiao = false;
          }, 500);
          this.$router.push("/homepage/approval");
        })
        .catch((error) => {
          console.log(error);
          this.an.tijiao = false;
        });
    },
    // 下载
    xiaz() {
      if (this.xia != "") {
        window.open(URL.apiUrl + "ahtml/" + this.xia);
      } else {
        this.$message({
          message: "无附件",
          type: "error",
        });
      }
    },
  },
};
</script>
<style scoped lang="less">
img {
  width: 100%;
  height: 100%;
}
.dis {
  display: none;
}

.transferSheng {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.el-form {
  .el-input {
    min-width: 180px;
  }
}
// 上方
.top {
  background-color: #ffffff;
  width: 100%;
  height: 160px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow: auto;
  // 头像
  .pic {
    position: relative;
    width: 100px;
    height: 120px;
    top: 15px;
    left: 20px;
    border: 1px solid #d3d3d3;
  }
  // 表单
  .fomt {
    position: relative;
    width: 85%;
    top: -100px;
    left: 120px;
    // border: 1px solid #d3d3d3;
  }
}
// 中间
.middle {
  background-color: #ffffff;
  width: 100%;
  height: 250px;
  margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow: auto;
  // 表单
  .fomt {
    position: relative;
    width: 90%;
    top: 50px;
    left: 50px;
  }
}
// 底部
.bottom {
  background-color: #ffffff;
  width: 100%;
  height: 150px;
  margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  // 审批人
  .fomt {
    position: relative;
    width: 85%;
    top: 20px;
    left: 40px;
    // 上传
    .renyuan {
      width: 300px;
      display: flex;
      .name {
        margin-top: -20px;
        text-align: center;
        margin-left: 15px;
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 15px;
      }
      .font {
        font-size: 30px;
        // line-height: 80px;
        margin-left: 10px;
        color: #c0c0c0;
      }
    }
    // 提交
    .zhong {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      border-radius: 3px;
      height: 32px;
      line-height: 02px;
      margin-bottom: 10px;
    }
  }
}
// 审核进度
.progress {
  background-color: #ffffff;
  width: 100%;
  height: 200px;
  margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .form {
    position: relative;
    width: 85%;
    left: 10px;
    top: 10px;
    .nnn {
      display: flex;
      .reny {
        width: 100px;
        margin-left: 20px;
        position: relative;
        .touX {
          position: relative;
          left: 22px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .fontSize {
          font-size: 12px;
          text-align: center;
          line-height: 20px;
        }
        .judge {
          position: relative;
          top: -10px;
          font-size: 18px;
          color: #00a2ff;
          margin-left: 40px;
          line-height: 0px;
        }
        .judge2 {
          position: relative;
          top: -10px;
          font-size: 18px;
          color: #ff0000;
          margin-left: 40px;
          line-height: 0px;
        }
        .judge3 {
          position: relative;
          top: -10px;
          font-size: 18px;
          color: #444444;
          margin-left: 40px;
          line-height: 0px;
        }
        .size {
          font-size: 12px;
          height: 25px;
          width: 100px;
          background-color: #c9c9c9;
          line-height: 5px;
          text-align: center;
        }
        .tops {
          margin-top: -20px;
        }
        .heng {
          position: absolute;
          width: 40px;
          height: 5px;
          background-color: #00a2ff;
          top: 22px;
          left: -30px;
          border-radius: 100px;
        }
        .yan {
          background-color: rgb(110, 110, 110) !important;
        }
        .yan2 {
          color: #00a2ff !important;
        }
      }
    }
  }
}
// 意见
.opinion {
  background-color: #ffffff;
  width: 100%;
  margin-top: 15px;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow: auto;
  .form {
    position: relative;
    left: 20px;
    top: 30px;
    width: 85%;
  }
}
// 提交
.zhong {
  position: relative;
  left: 40%;
  transform: translateX(-50%);
  width: 80px;
  border-radius: 3px;
  height: 32px;
  line-height: 02px;
  margin-left: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>