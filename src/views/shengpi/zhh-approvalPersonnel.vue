<template>
  <div class="approvalPersonnel">
    <!-- 头部 -->
    <div class="top">
      <el-form class="form" :model="form" label-width="120px">
        <el-col :span="12">
          <el-form-item label="申请部门 ：">
            <el-input
              v-model="form.denp"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="申请时间 ：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.time"
              style="width: 100%"
              :disabled="true"
            ></el-date-picker></el-form-item
        ></el-col>
      </el-form>
    </div>
    <!-- 中间 -->
    <div class="middle">
      <el-form
        class="form"
        :model="dynamicValidateForm"
        label-width="120px"
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="index"
      >
        <el-col :span="8">
          <el-form-item label="申请岗位 ：">
            <el-input
              v-model="domain.postPosition"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="申请人数 ：">
            <el-input
              v-model="domain.applicantsNum"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="原有空缺名额 ：">
            {{ oldPostNum[index] }}
          </el-form-item></el-col
        >
      </el-form>
      <el-form class="form" :model="form" label-width="120px">
        <el-col :span="24">
          <el-form-item label="申请原由 ：">
            <el-input
              v-model="form.dat"
              type="textarea"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
        <!-- 上传附件： -->
        <el-col :span="24">
          <el-button size="small" type="primary" @click="xiaz"
            >点击下载附件</el-button
          ></el-col
        >
      </el-form>
    </div>
    <!-- 审核进度 -->
    <div class="progress">
      <el-form class="form" label-width="120px">
        <el-form-item label="审批进度 :">
          <div class="nnn">
            <div
              class="reny"
              v-for="(sheng, index) in approvalProgress"
              :key="index"
            >
              <!-- <p class="fontSize">维护部</p> -->
              <p class="fontSize">{{ approver[index] }}</p>
              <!-- 同意 -->
              <span
                class="iconfont icon-dui judge"
                :class="{ dis: sheng != 0 }"
              ></span>
              <!-- 驳回 -->
              <span
                class="iconfont icon-cuowu1 judge2"
                :class="{
                  dis: bohui != index || totalApprovalStatus != 1,
                }"
              ></span>
              <!-- 待审批 -->
              <span
                class="iconfont icon-time judge3"
                :class="{
                  dis: sheng != 2,
                  yan2: shengpi == index,
                }"
              ></span>
              <p
                class="fontSize tops"
                :class="{
                  dis: sheng != 0,
                }"
              >
                同意
              </p>
              <p
                class="fontSize tops"
                :class="{
                  dis: shengpi != index || totalApprovalStatus != 2,
                }"
              >
                审批中
              </p>
              <p
                class="fontSize tops"
                :class="{
                  dis: sheng != 2 || shengpi == index,
                }"
              >
                待审批
              </p>
              <p
                class="fontSize tops"
                :class="{
                  dis: bohui != index || totalApprovalStatus != 1,
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
                :class="{
                  dis: index >= shengpi && butt == 1,
                }"
              >
                <el-button slot="reference" class="size">查看信息</el-button>
              </el-popover>
              <!-- 横杆 -->
              <div
                class="heng"
                :class="{ dis: index == 0, yan: index >= approvalProgress }"
              ></div>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 意见 -->
    <div class="opinion" :class="{ dis: butt != 1 }">
      <el-form label-width="120px" class="form">
        <el-form-item label="审批意见 ：">
          <el-input type="textarea" v-model="form2.desc"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <el-button
      type="primary"
      class="zhong"
      style="background: #0077f1"
      @click="tij"
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
  </div>
</template>
<script>
import { gets, postp } from "../../request/wan";
import Url from "../../http/URL2";
export default {
  data() {
    return {
      // 头部表
      form: {
        denp: "",
        time: "",
        dat: "",
      },
      form2: {
        post: "",
        people: "",
        desc: "",
      },
      // 中间
      dynamicValidateForm: {
        domains: [],
      },
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
      // 申请岗位
      gangwei: "",
      // 当前
      location: "",
      // 提交表
      froms: {
        id: "",
        sector: "",
        submitPeople: "",
        postPosition: "",
        applicantsNum: "",
        applicationReason: "",
        attachment: "",
        approvalIds: "",
        approvalStatus: "",
        approvalComments: "",
        approvalTime: "",
      },
      // 是否审批
      butt: "",
      // 审批状态
      totalApprovalStatus: "",
      // 是否驳回
      bohui: "",
      // 审批中的人
      shengpi: "",
      xia: "",
      wenjian: "",
      // 按钮状态
      an: {
        tijiao: false,
      },
      // 初始人员
      oldPostNum: "",
    };
  },
  created() {
    // console.log(this.$store.shengID);
    this.butt = this.$store.butt;
    this.froms.id = this.$store.shengID;
    gets("/PersonnelTransferApproval/getPersonnelTransferApproval", {
      id: this.$store.shengID,
    }).then((res) => {
      console.log(res.data);
      console.log(res.data.oldPostNum);

      if (res.data.oldPostNum) {
        this.oldPostNum = res.data.oldPostNum.split(",");
      }
      this.wenjian = res.data;
      this.xia = res.data.attachment;
      this.form.dat = res.data.applicationReason;
      this.form.time = res.data.approvalTime;
      this.location = res.data.location;
      // 表单
      this.froms.sector = res.data.sector;
      this.froms.submitPeople = res.data.submitPeople;
      this.froms.postPosition = res.data.postPosition;
      this.froms.applicantsNum = res.data.applicantsNum;
      this.froms.applicationReason = res.data.applicationReason;
      this.froms.attachment = res.data.attachment;
      this.froms.approvalIds = res.data.approvalIds;
      this.froms.approvalStatus = res.data.approvalStatus;
      // 存储意见
      this.froms.approvalComments = res.data.approvalComments;
      // 意见
      if (res.data.approvalComments) {
        this.approvalComments = res.data.approvalComments.split("||");
      }

      this.froms.approvalTime = res.data.approvalTime;
      // 审批状态
      this.totalApprovalStatus = res.data.totalApprovalStatus;
      // 进度
      this.approvalProgress = res.data.approvalStatus.split(",");
      for (let i = 0; i < this.approvalProgress.length; i++) {
        // console.log(this.approvalProgress[i]);
        // console.log(i);
        if (this.approvalProgress[i] == 1) {
          this.bohui = i;
        }
        if (this.approvalProgress[i] == 2) {
          this.shengpi = i;
          break;
        }
      }
      // console.log(this.shengpi, 88);
      // console.log(this.bohui);
      // 审批人
      if (res.data.approvalName) {
        this.approver = res.data.approvalName.split(",");
      }
      if (res.data.applicantsNum) {
        var a = res.data.applicantsNum.split(",");
      }

      // console.log(a.length);
      // 岗位
      gets("sector/getSectorByid", { id: res.data.sector }).then((res) => {
        this.form.denp = res.data.sectorName;
        // console.log(this.form.denp, 888);
      });
      // 部门
      gets("posts/selById", { ids: res.data.postPosition }).then((res) => {
        console.log(res);
        let i = 0;
        res.data.data.forEach((res) => {
          this.dynamicValidateForm.domains.push({
            postPosition: res.postsName,
            applicantsNum: a[i],
          });
          i = i + 1;
        });
      });
    });
  },
  methods: {
    // 数据
    shuj() {
      this.wenjian.id = this.froms.id;
      this.wenjian.sector = this.froms.sector;
      this.wenjian.submitPeople = this.froms.submitPeople;
      this.wenjian.postPosition = this.froms.postPosition;
      this.wenjian.applicantsNum = this.froms.applicantsNum;
      this.wenjian.applicationReason = this.froms.applicationReason;
      this.wenjian.attachment = this.froms.attachment;
      this.wenjian.approvalIds = this.froms.approvalIds;
      this.wenjian.approvalName = this.froms.approvalName;
      this.wenjian.approvalStatus = this.froms.approvalStatus;
      this.wenjian.approvalComments = this.froms.approvalComments;
      this.wenjian.type = this.froms.type;
    },
    tij() {
      // console.log(this.location);
      this.an.tijiao = true;
      this.approvalProgress[this.location] = "0";
      if (this.location == 0) {
        if (this.form2.desc == "") {
          this.froms.approvalComments = "无意见";
        } else {
          this.froms.approvalComments = this.form2.desc;
        }
      } else {
        if (this.form2.desc == "") {
          this.froms.approvalComments =
            this.froms.approvalComments + "||" + "无意见";
        } else {
          this.froms.approvalComments =
            this.froms.approvalComments + "||" + this.form2.desc;
        }
      }
      this.froms.approvalStatus = this.approvalProgress.toString();
      // console.log(this.approvalProgress.toString());
      // console.log(this.froms);
      this.shuj();
      console.log(this.wenjian);
      postp(
        "PersonnelTransferApproval/updatePersonnelTransferApproval",
        this.wenjian
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
    // 驳回
    bo() {
      this.an.tijiao = true;
      // this.froms.approvalComments = this.form2.desc;
      this.approvalProgress[this.location] = "1";
      if (this.location == 0) {
        if (this.form2.desc == "") {
          this.froms.approvalComments = "无意见";
        } else {
          this.froms.approvalComments = this.form2.desc;
        }
      } else {
        if (this.form2.desc == "") {
          this.froms.approvalComments =
            this.froms.approvalComments + "||" + "无意见";
        } else {
          this.froms.approvalComments =
            this.froms.approvalComments + "||" + this.form2.desc;
        }
      }
      this.froms.approvalStatus = this.approvalProgress.toString();
      // console.log(this.approvalProgress.toString());
      // console.log(this.froms);
      this.shuj();
      console.log(this.wenjian);
      postp(
        "PersonnelTransferApproval/updatePersonnelTransferApproval",
        this.wenjian
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
      console.log(this.xia);
      if (this.xia) {
        var sss = this.xia;
        var str = sss.lastIndexOf("ahtml");
        var xiaz = sss.substring(str, sss.length);
        window.open(Url.apiUrl + xiaz);
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
.dis {
  display: none !important;
}
.approvalPersonnel {
  width: 100%;
  height: 100%;
  overflow: auto;
}
// 头部
.top {
  background-color: #ffffff;
  width: 100%;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow: auto;
  .form {
    position: relative;
    top: 30px;
    left: 20px;
    width: 80%;
  }
}
// 中间
.middle {
  background-color: #ffffff;
  width: 100%;
  height: 307px;
  margin-top: 15px;
  overflow: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .form {
    position: relative;
    top: 30px;
    left: 20px;
    width: 80%;
    .shan {
      font-size: 20px;
      position: relative;
      left: 20px;
      top: 6px;
    }
  }
  .tianJ {
    font-size: 25px;
    position: relative;
    top: 33px;
    color: #dfdfdf;
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