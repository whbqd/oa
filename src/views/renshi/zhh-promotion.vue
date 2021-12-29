<template>
  <div class="quit">
    <!-- 头部 -->
    <div class="top">
      <!-- 头像 -->
      <div class="pic"><img :src="imgs" /></div>
      <!-- 表单 -->
      <el-form class="fomt" ref="form" :model="form" label-width="120px">
        <el-col :span="6">
          <el-form-item label="晋升员工 ：" :required="true">
            <div @click="show = true">
              <el-input v-model="form.name"></el-input>
            </div> </el-form-item
        ></el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="原职位 ：" :required="true">
            <el-input v-model="form.titleOld"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <el-form-item label="晋升职位 ：" :required="true">
            <el-select
              v-model="form.titleNew"
              placeholder="请选择职位"
              :required="true"
            >
              <el-option
                v-for="(title, index) in titles"
                :key="index"
                :label="title.professionalTitle"
                :value="title.id"
              ></el-option> </el-select
          ></el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="晋升原因 ：" :required="true">
            <el-input
              v-model="form.active"
              type="textarea"
            ></el-input> </el-form-item
        ></el-col>
        <!-- 条线 -->
        <el-col :span="6">
          <el-form-item label="所属条线 ：" :required="true">
            <el-select v-model="form.tiao" placeholder="请选择所属条线">
              <el-option label="维护" value="维护"></el-option>
              <el-option label="销售" value="销售"></el-option>
              <el-option label="工程" value="工程"></el-option>
              <el-option label="信息" value="信息"></el-option>
              <el-option label="综合" value="综合"></el-option> </el-select
          ></el-form-item>
        </el-col>
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
      <!-- <el-button type="primary" class="zhong">提交</el-button> -->
    </div>
    <!-- 提交底部 -->
    <div class="bottom2">
      <!-- 审批人： -->
      <el-form class="fomt" label-width="120px">
        <el-form-item label="审批人：">
          <div class="renyuan">
            <div v-for="(item, index) in toux" :key="index">
              <div style="margin-left: 28px">
                <img id="img" src="../../static/移动.png" />
              </div>
              <p class="name">{{ item.name }}</p>
              <p class="name2">{{ item.sector }}</p>
              <!-- <span
                class="iconfont icon-icon- shan"
                @click="shan(index)"
              ></span> -->
              <span
                class="iconfont icon-tianjia1 font"
                :class="{ dis: item.ren != 1 }"
                @click="shodong(index)"
              ></span>
            </div>
            <span
              class="iconfont icon-tianjia1 font2"
              :class="{ dis: mo != 1 }"
              @click="show5 = true"
            ></span>
          </div>
        </el-form-item>
        <el-button type="primary" class="zhongs" @click="sheng"
          >生成审批人</el-button
        >
        <el-button
          type="primary"
          class="zhong"
          @click="tij"
          :loading="an.tijiao"
          >提交</el-button
        >
      </el-form>
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
    <!-- 模板审批人选择弹出 -->
    <el-dialog
      title="选择"
      :visible.sync="show5"
      append-to-body
      destroy-on-close
    >
      <div style="width: 100%">
        <personnel2></personnel2>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show5 = false">取 消</el-button>
        <el-button type="primary" @click="reny5">确 定</el-button>
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
              <div style="margin-left: 20px">
                <span style="color: blue">{{ moData.type }}：</span>
              </div>
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
export default {
  data() {
    return {
      // 头部
      form: {
        name: "",
        id1: "",
        titleOld: "",
        titleNew: "",
        nameNew: "",
        denp: "",
        tiao: "",
        active: "",
      },
      show: false,
      show2: false,
      show4: false,
      show5: false,
      // 文件
      fileList: [],
      // 头像
      toux: [],
      // 图片
      imgs: "",
      //职位存放
      titles: "",
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
    gets("ProfessionalTitle/getAll").then((res) => {
      // console.log(res.data);
      this.titles = res.data;
    });
  },
  methods: {
    // 转id
    ids() {
      this.titles.forEach((res) => {
        // console.log(res);
        if (this.form.titleNew == res.id) {
          this.form.nameNew = res.professionalTitle;
          // console.log(res)
        }
      });
    },
    // 上传附件
    handleAvatarSuccess(raw, file) {
      this.fileList = file;
      // console.log(file);
      // console.log(file[0].raw);
    },
    // 手动选择审批人
    shodong(index) {
      this.index = index;
      this.show2 = !this.show2;
    },
    // 人员删除
    shan(index) {
      // console.log(index);
      this.toux.splice(index, 1);
    },
    // 人员选择
    reny() {
      var len = 0;
      len = this.$store.name.length;
      if (len == 1) {
        console.log(this.$store.fromPerson);
        this.imgs = URL.nginxUrl + this.$store.fromPerson.workDocuments;
        this.form.name = this.$store.fromPerson.name;
        this.form.id1 = this.$store.fromPerson.id;
        this.form.denp = this.$store.fromPerson.sector;
        this.form.titleOld = this.$store.fromPerson.title;
        this.show = false;
      } else {
        this.$alert("请选择一人", "提示", {
          confirmButtonText: "确定",
        });
        this.show = true;
      }
      // console.log(this.imgs);
    },
    // 模板人员选择
    reny5() {
      var len = 0;
      len = this.$store.name.length;
      if (len == 1) {
        console.log(this.$store.fromPerson);
        this.toux.push({
          name: this.$store.fromPerson.userName,
          ids: this.$store.fromPerson.id,
          ren: "0",
        });
        this.show5 = false;
      } else {
        this.$alert("请选择一人", "提示", {
          confirmButtonText: "确定",
        });
        this.show5 = true;
      }
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
    // 生成审批人
    sheng() {
      this.moban = false;
      this.toux = [];
      // console.log(this.denps, 8888);
      if (this.form.id1 != "" && this.form.tiao != "") {
        gets("/user/getApprovalBySector1" + "?id=" + this.form.id1).then(
          (res) => {
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
                this.form.tiao +
                "&type=" +
                "员工晋升"
            ).then((res3) => {
              console.log(res3);

              this.moData = res3.data;
              if (this.moData != "") {
                this.show4 = true;
              }
            });
          }
        );
      } else {
        this.$message({
          message: "请选择申请人或条线",
          type: "error",
        });
      }
    },
    // 去重
    del(arr) {
      let result = [];
      let result2 = [];
      for (let i = 0; i < arr.length; i++) {
        console.log(result.indexOf(arr[i]), 888);
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
      console.log(dat);
      const name = dat.names.split(",");
      const id = dat.approvalIds.split(",");
      // console.log(name.length);
      // console.log(id);
      console.log(name);
      for (let i = 0; i <= name.length - 1; i++) {
        this.toux.push({
          name: name[i],
          ids: id[i],
        });
      }
      this.mo = 0;
      this.show4 = false;
      const aa = [];
      this.toux.forEach((res) => {
        // console.log(res.name);
        aa.push(res.name);
      });
      this.toux = this.del(aa);
      this.moban = true;
    },
    // 提交前数据处理
    tifront() {
      this.ids();
      // 申请人ID
      var approvalIds = ",";
      var approvalName = "";
      var approvalStatus = "";
      this.toux.forEach((ren) => {
        // console.log(ren, 888);
        approvalIds = approvalIds + ren.ids + ",";
        approvalName = approvalName + ren.name + ",";
        approvalStatus = approvalStatus + "2,";
      });
      approvalStatus = approvalStatus.substr(0, approvalStatus.length - 1);
      approvalName = approvalName.substr(0, approvalName.length - 1);
      // 提交表
      this.forms = {
        workerId: this.form.id1,
        professionaOld: this.form.titleOld,
        professionaId: this.form.titleNew,
        promotionwReason: this.form.active,
        approvalIds: approvalIds,
        approvalName: approvalName,
        approvalStatus: approvalStatus,
        professiona: this.form.nameNew,
        type: "员工晋升",
        annx: "",
        approvalComments: "",
      };
    },
    // 判断空数据
    empty() {
      const aa = Object.values(this.forms);
      for (var i = 0; i < aa.length - 2; i++) {
        if (aa[i] == "" || aa[i] == ",") {
          this.kong = 1;
          // console.log(i);
          switch (i) {
            case 0:
              this.$message({
                message: "请选择晋升员工",
                type: "error",
              });
              break;
            case 1:
              this.$message({
                message: "请选择原职位",
                type: "error",
              });
              break;
            case 2:
              this.$message({
                message: "请选择晋升职位",
                type: "error",
              });
              break;
            case 3:
              this.$message({
                message: "请输入原因",
                type: "error",
              });
              break;
            case 4:
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
      // 提交前数据处理
      this.kong = 0;
      this.tifront();
      // 判断是否为空
      this.empty();
      if (this.kong != 1) {
        const formData = new FormData();
        // 提交请求
        postp("Promotionw/insertPromotionw", this.forms)
          .then((res) => {
            console.log(res, 78978);
            // this.$router.push("employeeFiles");
            for (var t = 0; t < this.fileList.length; t++) {
              formData.append("file", this.fileList[t].raw);
            }
            formData.append("id", res.data);
            if (this.fileList != "") {
              postp("Promotionw/fileUpload", formData).then((res) => {
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
// 底部
.bottom2 {
  overflow: auto;
  background-color: #ffffff;
  width: 100%;
  height: 250px;
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
        margin-left: 15px;
      }
      .name2 {
        margin-top: -10px;
        text-align: center;
        line-height: 20px;
        margin-left: 15px;
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
      left: 40%;
      transform: translateX(-50%);
      width: 100px;
      border-radius: 3px;
      height: 32px;
      line-height: 02px;
      margin-left: 270px;
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
      margin-left: 50px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>