<template>
  <div class="quit">
    <!-- 头部 -->
    <div class="top">
      <!-- 头像 -->
      <div class="pic"><img :src="imgs" /></div>
      <!-- 表单 -->
      <el-form class="fomt" ref="form" :model="form" label-width="120px">
        <el-col :span="6">
          <el-form-item label="晋升员工 ：">
            <div @click="show = true">
              <el-input v-model="form.name" :disabled="true"></el-input>
            </div> </el-form-item
        ></el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="原职位 ：">
            <el-input v-model="form.titleOld" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="晋升职位 ：">
            <el-input v-model="form.titleNew" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="晋升原因 ：">
            <el-input
              v-model="form.active"
              type="textarea"
              :disabled="true"
            ></el-input> </el-form-item
        ></el-col>
      </el-form>
    </div>
    <div class="bottom">
      <!-- 表单 -->
      <el-form
        class="froms"
        :model="form"
        label-width="150px"
        label-position="top"
      >
        <!-- 下载附件： -->
        <el-col :span="24">
          <el-form-item label="下载附件：">
            <el-button size="small" type="primary" @click="xiaz"
              >点击下载</el-button
            >
          </el-form-item></el-col
        >
      </el-form>
      <!-- <el-button type="primary" class="zhong">提交</el-button> -->
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
      // 头部
      form: {
        name: "",
        id1: "",
        titleOld: "",
        titleNew: "",
        ids: "",
        denp: "",
        tiao: "",
        active: "",
      },
      form2: { desc: "" },
      show: false,
      show2: false,
      // 头像
      toux: [],
      // 图片
      imgs: "",
      // 是否审批
      butt: "",
      // 审批状态
      totalApprovalStatus: "",
      // 是否驳回
      bohui: "",
      // 审批中的人
      shengpi: "",
      // 当前
      location: "",
      // 进度
      approvalProgress: "",
      // 审批人
      approver: "",
      // 多个内容
      approvalComments: "",
      // 提交表
      froms: {
        id: "",
        workerId: "",
        handoverPerson: "",
        activeDate: "",
        activeReasons: "",
        wageHandove: "",
        companyHandove: "",
        annx: "",
        approvalIds: "",
        approvalName: "",
        approvalStatus: "",
        approvalComments: "",
        type: "员工晋升",
      },
      xia: "",
      wenjian: "",
      // 按钮状态
      an: {
        tijiao: false,
      },
    };
  },
  created() {
    this.butt = this.$store.butt;
    this.froms.id = this.$store.shengID;
    gets("Promotionw/getPromotionwById", {
      id: this.$store.shengID,
    }).then((res) => {
      console.log(res);
      // 查看
      this.wenjian = res.data;
      this.xia = res.data.annx;
      this.form.name = res.data.jinshengren.name;
      this.form.titleOld = res.data.professionaOld;
      this.form.titleNew = res.data.professiona;
      this.form.active = res.data.promotionwReason;
      this.location = res.data.location;
      // 存储意见
      this.froms.approvalComments = res.data.approvalComments;
      // 审批状态
      this.totalApprovalStatus = res.data.totalApprovalStatus;
      // 意见
      if (res.data.approvalComments) {
        this.approvalComments = res.data.approvalComments.split("||");
      }
      // 进度
      this.approver = res.data.approvalName.split(",");
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
      // 提交表
      this.froms.workerId = res.data.workerId;
      this.froms.handoverPerson = res.data.handoverPerson;
      this.froms.activeDate = res.data.activeDate;
      this.froms.activeReasons = res.data.activeReasons;
      this.froms.wageHandove = res.data.wageHandove;
      this.froms.companyHandove = res.data.companyHandove;
      // this.froms.annx =  res.data.id;
      this.froms.approvalIds = res.data.approvalIds;
      this.froms.approvalName = res.data.approvalName;
      this.froms.approvalStatus = res.data.approvalStatus;
      // this.froms.approvalComments = "";
      this.froms.type = "员工晋升";
    });
  },
  methods: {
    // 数据
    shuj() {
      this.wenjian.id = this.froms.id;
      this.wenjian.workerId = this.froms.workerId;
      this.wenjian.handoverPerson = this.froms.handoverPerson;
      this.wenjian.activeDate = this.froms.activeDate;
      this.wenjian.activeReasons = this.froms.activeReasons;
      this.wenjian.wageHandove = this.froms.wageHandove;
      this.wenjian.companyHandove = this.froms.companyHandove;
      // this.wenjian.annx = this.froms.annx;
      this.wenjian.approvalIds = this.froms.approvalIds;
      // this.wenjian.approvalName = this.froms.approvalName;
      this.wenjian.approvalStatus = this.froms.approvalStatus;
      this.wenjian.approvalComments = this.froms.approvalComments;
      this.wenjian.type = this.froms.type;
    },
    // 提交
    tij() {
      this.an.tijiao = true;
      this.approvalProgress[this.location] = "0";
      // 审批意见
      if (this.location == 0) {
        if (this.form2.desc == "") {
          this.froms.approvalComments = "无意见";
        } else {
          this.froms.approvalComments = this.form2.desc;
        }
      } else {
        if (this.form2.desc == "") {
          this.froms.approvalComments = "无意见";
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

      postp("Promotionw/updataPromotionw", this.wenjian)
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
      // 审批意见
      if (this.location == 0) {
        if (this.form2.desc == "") {
          this.froms.approvalComments = "无意见";
        } else {
          this.froms.approvalComments = this.form2.desc;
        }
      } else {
        if (this.form2.desc == "") {
          this.froms.approvalComments = "无意见";
        } else {
          this.froms.approvalComments =
            this.froms.approvalComments + "||" + this.form2.desc;
        }
      }
      this.froms.approvalStatus = this.approvalProgress.toString();
      // console.log(this.approvalProgress.toString());

      this.shuj();
      console.log(this.wenjian);
      postp("Promotionw/updataPromotionw", this.wenjian)
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
  display: none;
}
img {
  width: 100%;
  height: 100%;
}
.quit {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.el-form {
  .el-input {
    min-width: 160px;
  }
  .el-select {
    min-width: 160px;
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
.bottom {
  background-color: #ffffff;
  width: 100%;
  height: 150px;
  margin-top: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  overflow: auto;
  // 表单
  .froms {
    position: relative;
    top: 30px;
    left: 50px;
    width: 90%;
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
} // 提交
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