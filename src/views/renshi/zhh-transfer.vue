<template>
  <div class="transfer">
    <!-- 头部 -->
    <div class="top">
      <!-- 头像 -->
      <div class="pic"><img :src="imgs" /></div>
      <!-- 表单 -->
      <el-form class="fomt" ref="form" :model="form" label-width="100px">
        <el-col :span="6">
          <el-form-item label="申请人 ：" :required="true">
            <div @click="show = true">
              <el-input v-model="form.name" placeholder="请选择"></el-input>
            </div> </el-form-item
        ></el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="所在部门 ：" :required="true">
            <el-input
              v-model="form.denp"
              placeholder="自动获取"
            ></el-input> </el-form-item
        ></el-col>

        <el-col :span="6" :offset="2">
          <el-form-item label="职位 ：" :required="true">
            <el-input
              v-model="form.position"
              placeholder="自动获取"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="6">
          <el-form-item label="身份证号 ：" :required="true">
            <el-input
              v-model="form.Uid"
              placeholder="自动获取"
            ></el-input> </el-form-item
        ></el-col>
      </el-form>
    </div>
    <!-- 中间 -->
    <div class="middle">
      <!-- 表单 -->
      <el-form class="fomt" ref="form2" :model="form2" label-width="125px">
        <!-- 申请调入部门 -->
        <el-col :span="6">
          <el-form-item label="申请调入部门 ：" :required="true">
            <el-select
              @change="findItemNameBYClass"
              v-model="form2.traDenp"
              placeholder="请选择所在部门"
            >
              <el-option
                v-for="(department, index) in department"
                :key="index"
                :label="department.sectorName"
                :value="department.id"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
        <!-- 申请调入职位 -->
        <el-col :span="6" :offset="2">
          <el-form-item label="申请调入职位 ：" :required="true">
            <el-select v-model="form2.traPosition" placeholder="请选择所在岗位">
              <el-option
                v-for="(post, index) in post"
                :key="index"
                :label="post.postsName"
                :value="post.id"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
        <!-- 申请调入时间 -->
        <el-col :span="6" :offset="2">
          <el-form-item label="申请调入时间 ：" :required="true">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form2.traTime"
              style="width: 100%"
            ></el-date-picker> </el-form-item
        ></el-col>
        <!-- 调职理由 -->
        <el-col :span="16">
          <el-form-item label="调职理由 ：" :required="true">
            <el-input
              type="textarea"
              v-model="form2.desc"
              placeholder="请输入调职理由"
            ></el-input> </el-form-item
        ></el-col>
        <!-- 条线 -->
        <el-col :span="6">
          <el-form-item label="所属条线 ：" :required="true">
            <el-select v-model="form2.tiao" placeholder="请选择所属条线">
              <el-option label="维护" value="维护"></el-option>
              <el-option label="销售" value="销售"></el-option>
              <el-option label="工程" value="工程"></el-option>
              <el-option label="信息" value="信息"></el-option>
              <el-option label="综合" value="综合"></el-option> </el-select
          ></el-form-item>
        </el-col>
        <!-- 上传附件： -->
        <el-col :span="24">
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
      </el-form>
    </div>
    <!-- 提交底部 -->
    <div class="bottom">
      <!-- 审批人： -->
      <el-form class="fomt" label-width="120px">
        <el-form-item label="审批人：">
          <div class="renyuan">
            <div v-for="(item, index) in toux" :key="index">
              <div style="margin-left: 15px">
                <img id="img" src="../../static/移动.png" />
              </div>
              <p class="name">{{ item.name }}</p>
              <p class="name2">{{ item.sector }}</p>
              <span
                class="iconfont icon-tianjia1 font"
                :class="{ dis: item.ren != 1 }"
                @click="shodong(index)"
              ></span>
            </div>
            <span
              class="iconfont icon-tianjia1 font2"
              :class="{ dis: mo != 1 }"
              @click="show3 = true"
            ></span>
          </div>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="zhongs" @click="sheng"
        >生成审批人</el-button
      >
      <el-button type="primary" class="zhong" @click="tij" :loading="an.tijiao"
        >提交</el-button
      >
    </div>

    <!-- 人选择弹出 -->
    <el-dialog
      title="选择"
      :visible.sync="show"
      append-to-body
      destroy-on-close
    >
      <div style="width: 100%">
        <personnel></personnel>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="reny">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 审批人选择弹出 -->
    <el-dialog
      title="选择"
      :visible.sync="show2"
      append-to-body
      destroy-on-close
    >
      <div style="width: 100%">
        <personnel2></personnel2>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show2 = false">取 消</el-button>
        <el-button type="primary" @click="reny2">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 审批人模板选择弹出 -->
    <el-dialog
      title="选择"
      :visible.sync="show3"
      append-to-body
      destroy-on-close
    >
      <div style="width: 100%">
        <personnel2></personnel2>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show3 = false">取 消</el-button>
        <el-button type="primary" @click="reny3">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择审批人模板 -->
    <el-dialog
      title="选择模板"
      :visible.sync="show4"
      append-to-body
      destroy-on-close
    >
      <div style="width: 100%">
        <el-form class="fom">
          <el-form-item>
            <div v-for="(moData, index) in moData" :key="index">
              <el-col :span="1">
                <el-radio v-model="radio" :label="index">:</el-radio>
              </el-col>

              <span style="color: blue">{{ moData.type }}：</span>
              {{ moData.names
              }}<span style="color: blue; margin-left: 20px">备注：</span>
              {{ moData.annx }}
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show4 = false">取 消</el-button>
        <el-button type="primary" @click="que">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { gets, postp } from "../../request/wan";
import personnel from "../../components/personnel";
import personnel2 from "../../components/personnel2";
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
        upgrade: "",
        time2: "",
        ids: "",
      },
      form2: {
        traDenp: "",
        traPosition: "",
        traTime: "",
        desc: "",
        tiao: "",
      },
      // 自动获取
      department: [],
      post: [],
      // 文件
      fileList: [],
      // 人员点击
      show: false,
      show2: false,
      show3: false,
      show4: false,
      // 头像
      toux: [],
      // 图片
      imgs: "",
      // 部门名称
      denps: "",
      // 手动选择审批人位置
      index: "",
      // 是否选择模板审批人
      mo: 0,
      // 选择模板的id：
      radio: "",
      // 存放模板
      moData: "",
      // 提交的表单
      forms: "",
      // 空数据判断
      kong: 0,
      // 按钮状态
      an: {
        tijiao: false,
      },
      // 审批人不能少
      moban: false,
    };
  },
  components: { personnel, personnel2 },
  created() {
    // 获取部门
    gets("tran/canSector")
      .then((res) => {
        console.log(res);
        this.department = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // 部门id转名字
    zuan() {
      console.log(this.form2.traDenp);
      this.department.forEach((res) => {
        if (this.form2.traDenp == res.id) {
          this.denps = res.sectorName;
          console.log(res);
        }
        // console.log(this.form2.traDenp,888);
        // console.log(res.id);
      });
    },
    // 手动选择审批人
    shodong(index) {
      this.index = index;
      this.show2 = !this.show2;
    },
    // 人员选择
    reny() {
      var len = 0;
      len = this.$store.name.length;
      if (len == 1) {
        console.log(this.$store.fromPerson);
        this.imgs = URL.nginxUrl + this.$store.fromPerson.workDocuments;
        this.form.name = this.$store.fromPerson.name;
        this.form.denp = this.$store.fromPerson.sector;
        this.form.position = this.$store.fromPerson.posts;
        this.form.Uid = this.$store.fromPerson.card;
        this.form.ids = this.$store.fromPerson.id;
        // this.form.time2 = this.$store.fromPerson.name;
        this.show = false;
      } else {
        this.$alert("请选择一人", "提示", {
          confirmButtonText: "确定",
        });
        this.show = true;
      }
      console.log(this.imgs);
    },
    // 审批人员选择
    reny2() {
      var len = 0;
      len = this.$store.name.length;
      if (len == 1) {
        this.toux[this.index].name = this.$store.fromPerson.userName;
        this.toux[this.index].ids = this.$store.fromPerson.id;
        this.show2 = false;
      } else {
        this.$alert("请选择一人", "提示", {
          confirmButtonText: "确定",
        });
        this.show2 = true;
      }
    },
    reny3() {
      var len = 0;
      len = this.$store.name.length;
      if (len == 1) {
        console.log(this.$store.fromPerson);
        this.toux.push({
          name: this.$store.fromPerson.userName,
          ids: this.$store.fromPerson.id,
          ren: "0",
        });
        this.show3 = false;
      } else {
        this.$alert("请选择一人", "提示", {
          confirmButtonText: "确定",
        });
        this.show3 = true;
      }
    },
    // 人员删除
    shan(index) {
      // console.log(index);
      this.toux.splice(index, 1);
    },
    // 获取岗位
    findItemNameBYClass() {
      this.form2.traPosition = "";
      gets("tran/canPosts" + "?" + "sectorId=" + this.form2.traDenp)
        .then((res) => {
          console.log(res);
          this.post = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 上传附件
    handleAvatarSuccess(raw, file) {
      this.fileList = file;
      // console.log(file);
      // console.log(file[0].raw);
    },
    // 生成审批人
    sheng() {
      this.moban = false;
      this.toux = [];
      this.zuan();
      console.log(this.denps, 8888);
      if (
        this.form.denp != "" &&
        this.form.ids != "" &&
        this.form2.tiao != "" &&
        this.form2.traDenp != ""
      ) {
        gets(
          "/user/getApprovalBySector" +
            "?sector=" +
            this.denps +
            "&id=" +
            this.form.ids +
            "&line=" +
            this.form2.tiao
        ).then((res) => {
          console.log(res);
          if (res.data != "") {
            for (let i = 0; i <= res.data.length - 1; i++)
              this.toux.push({
                name: res.data[i].userName,
                ids: res.data[i].id,
                sector: res.data[i].sector,
                position: res.data[i].position,
                annx: res.data[i].annx,
                ren: "0",
              });
          }
          gets(
            "user/getApprovalTemBySector" +
              "?line=" +
              this.form2.tiao +
              "&type=" +
              "人员调动"
          ).then((res3) => {
            console.log(res3);
            this.moData = res3.data;
            if (this.moData != "") {
              this.show4 = true;
            } else {
              const aa = [];
              this.toux.forEach((res) => {
                // console.log(res.name);
                aa.push(res.name);
              });
              this.toux = this.del(aa);
            }
          });
        });
      } else {
        this.$message({
          message: "请选择申请人或调出条线和部门",
          type: "error",
        });
      }
    },
    // 去重
    del(arr) {
      let result = [];
      let result2 = [];
      for (let i = 0; i < arr.length; i++) {
        // console.log(result.indexOf(arr[i]), 888);
        if (result.indexOf(arr[i]) == -1) {
          result.push(arr[i]);
          result2.push(this.toux[i]);
        }
      }
      return result2;
    },
    // 确定模板
    que() {
      const dat = this.moData[this.radio];
      const name = dat.names.split(",");
      const id = dat.approvalIds.split(",");
      // console.log(name.length);
      for (let i = 0; i <= name.length - 1; i++) {
        this.toux.push({
          name: name[i],
          ids: id[i],
        });
      }
      this.mo = 0;
      this.show4 = false;
      // console.log(this.toux);
      const aa = [];
      this.toux.forEach((res) => {
        // console.log(res.name);
        aa.push(res.name);
      });
      this.toux = this.del(aa);
      this.moban = true;
    },
    // 时间
    dateFormat() {
      // console.log(time,789)
      var date = new Date();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      // 拼接
      if (day >= 14 && day <= 20) {
        this.kong = 1;
        this.$message({
          message: "该时间段暂停调岗",
          type: "error",
        });
        this.an.tijiao = false;
      }
    },
    // 提交前数据处理
    tifront() {
      // 申请人ID
      var approver = "";
      this.toux.forEach((ren) => {
        // console.log(ren, 888);
        approver = approver + ren.ids + ",";
      });
      approver = approver.substr(0, approver.length - 1);
      // 提交表
      this.forms = {
        applicantionId: this.form.ids,
        toDepartment: this.form2.traDenp,
        transferPost: this.form2.traPosition,
        applicationReason: this.form2.desc,
        applicantionTime: this.form2.traTime,
        line: this.form2.tiao,
        approver: approver,
        oldSector: this.form.denp,
        oldPost: this.form.position,
      };

      // 判断是否为空
      this.empty();
    },
    // 判断空数据
    empty() {
      // console.log(Object.values(this.forms), 788989);
      const aa = Object.values(this.forms);
      for (var i = 0; i < aa.length - 2; i++) {
        if (aa[i] == "") {
          this.kong = 1;
          console.log(i);
          switch (i) {
            case 0:
              this.$message({
                message: "请选择申请人",
                type: "error",
              });
              break;
            case 1:
              this.$message({
                message: "请填写调入部门",
                type: "error",
              });
              break;
            case 2:
              this.$message({
                message: "请填写调入岗位",
                type: "error",
              });
              break;
            case 3:
              this.$message({
                message: "请输入理由",
                type: "error",
              });
              break;
            case 4:
              this.$message({
                message: "请选择时间",
                type: "error",
              });
              break;
            case 5:
              this.$message({
                message: "请选择条线",
                type: "error",
              });
              break;
            case 6:
              this.$message({
                message: "请选择审批人",
                type: "error",
              });
              break;
          }
          this.an.tijiao = false;
          return;
        }
      }
    },
    // 提交
    tij() {
      // 按钮
      this.an.tijiao = true;
      this.kong = 0;
      // 提交前数据处理
      this.tifront();
      console.log(this.kong);
      this.dateFormat();
      if (this.kong != 1) {
        const formData = new FormData();
        // 提交请求
        postp("tran/transfer", this.forms)
          .then((res) => {
            console.log(res, 78978);
            for (var t = 0; t < this.fileList.length; t++) {
              formData.append("file", this.fileList[t].raw);
            }
            formData.append("id", res.data);
            if (this.fileList != "") {
              postp("tran/upFile", formData).then((res) => {
                this.$message({
                  message: res.data,
                  type: "success",
                });
                // 按钮
                setTimeout(() => {
                  this.an.tijiao = false;
                }, 500);
                this.$router.push("employeeFiles");
              });
            } else {
              // 按钮
              setTimeout(() => {
                this.an.tijiao = false;
              }, 500);
              this.$router.push("employeeFiles");
            }
          })
          .catch((error) => {
            console.log(error);
            this.an.tijiao = false;
          });
      }
    },
  },
  watch: {
    show4(val) {
      if (val == false && this.moban == false) {
        this.toux = [];
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
#img {
  width: 25px !important;
  height: 25px !important;
}
.transfer {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.el-form {
  .el-input {
    min-width: 180px;
  }
  .el-select {
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
  overflow: auto;

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
      .shan {
        position: relative;
        left: 50px;
        top: -95px;
        font-size: 22px;
      }
      .name {
        margin-top: -20px;
        text-align: center;
        // line-height: 30px;
        // margin-left: 5px;
        width: 80px;
        // border: 1px solid #000000;
      }
      .name2 {
        margin-top: -10px;
        text-align: center;
        line-height: 20px;
        // margin-left: 5px;
        width: 80px;
        // border: 1px solid #000000;
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 15px;
      }
      .font {
        font-size: 30px;
        color: #c0c0c0;
        margin-left: 22px;
      }
      .font2 {
        font-size: 30px;
        margin-left: 10px;
        margin-top: 5px;
        color: #c0c0c0;
      }
    }
    // 提交
    .zhong {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      border-radius: 3px;
      height: 32px;
      line-height: 02px;
      top: 80px;
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
          left: 85px;
          border-radius: 100px;
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
  width: 100px;
  border-radius: 3px;
  height: 32px;
  line-height: 02px;
  margin-left: 70px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.zhongs {
  position: relative;
  left: 40%;
  transform: translateX(-50%);
  width: 100px;
  border-radius: 3px;
  height: 32px;
  line-height: 02px;
  margin-left: 40px;
  margin-top: 28px;
  margin-bottom: 10px;
}
</style>