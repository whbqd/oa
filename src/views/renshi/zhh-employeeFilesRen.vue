<template>
  <div class="employeeFiles">
    <!-- 标题 -->
    <div class="top">
      <div class="font" @click="reren" :class="{ col: cli == 0 }">
        <p>个人资料</p>
      </div>
      <div class="font" @click="jiao" :class="{ col: cli == 1 }">
        <p>教育经历</p>
      </div>
      <div class="font" @click="ruzhi" :class="{ col: cli == 2 }">
        <p>入职信息</p>
      </div>
      <div class="font" @click="qi" :class="{ col: cli == 3 }">
        <p>其他相关</p>
      </div>
    </div>
    <!-- 个人资料 -->
    <div v-show="cli == 0" class="geren">
      <!-- 头像 -->
      <div class="pic"><img :src="aaa" /></div>
      <el-form :model="form" label-width="140px" class="froms">
        <el-col :span="7">
          <el-form-item label="姓名 ：">
            <el-input v-model="form.name" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="民族 ：">
            <el-input v-model="form.nationalities" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户口性质 ：">
            <el-select
              v-model="form.registeredNature"
              :disabled="true"
              placeholder="请选择户口性质"
            >
              <el-option label="农村户口" value="0"></el-option>
              <el-option label="城镇户口" value="1"></el-option>
              <el-option label="农村居民户口" value="2"></el-option>
              <el-option label="集体户口" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="性别 ：">
            <el-select
              v-model="form.gender"
              :disabled="true"
              placeholder="请选择性别"
            >
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="政治面貌 ：">
            <el-input
              v-model="form.politicalOutlook"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户籍所在地 ：">
            <el-input v-model="form.location" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="出生日期 ：">
            <el-input v-model="form.brithday" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="家庭住址 ：">
            <el-input v-model="form.homeAddress" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="紧急联系人姓名 ：">
            <el-input v-model="form.contactName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="身份证号 ：">
            <el-input v-model="form.card" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话 ：">
            <el-input v-model="form.phone" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="紧急联系人电话 ：">
            <el-input v-model="form.contactPhone" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="集团号 ：">
            <el-input v-model="form.groupNumber" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="附件 ：">
            <div class="qq" @click="picBig">
              <div class="pics"><img :src="sz" /></div>
              <div class="pics"><img :src="sf" /></div>
              <div class="pics"><img :src="hz" /></div>
              <div class="pics"><img :src="hf" /></div>
            </div>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- 教育经历 -->
    <div v-show="cli == 1" class="experience">
      <el-form :model="form2" label-width="140px" class="froms">
        <el-col :span="8">
          <el-form-item label="毕业院校 ：">
            <el-input
              v-model="form2.graduateSchools"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学历 ：">
            <el-input v-model="form2.education" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专业 ：">
            <el-input v-model="form2.specialty" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="毕业时间 ：">
            <el-input
              v-model="form2.graduationTime"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学位 ：">
            <el-input v-model="form2.degree" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学历证书编号 ：">
            <el-input
              v-model="form2.certificateNumber"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- 上传证件 -->
        <el-col :span="24">
          <el-form-item label="学历证书 ：">
            <div class="pics"><img :src="zs" /></div>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- 入职信息 -->
    <div v-show="cli == 2" class="information">
      <el-form :model="form3" label-width="140px" class="froms">
        <el-col :span="8">
          <el-form-item label="隶属单位 ：">
            <el-input
              v-model="form3.subordinateUnits"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用工属性 ：">
            <el-input v-model="form3.employment" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同性质 ：">
            <el-input
              v-model="form3.contractNature"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所在部门 ：">
            <el-input v-model="form3.sector" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="岗位 ：">
            <el-input v-model="form3.posts" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入职时间 ：">
            <el-input v-model="form3.entrytime" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="条线 ：">
            <el-input v-model="form3.line" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="复用条线 ：">
            <el-input v-model="form3.reuseLine" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否在职 ：">
            <el-input v-model="form3.active" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="岗位细分 ：">
            <el-input v-model="form3.postsinfo" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入职次数 ：">
            <el-input v-model="form3.entriesNum" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同编号 ：">
            <el-input
              v-model="form3.contractnumber"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="服务年限 ：">
            <el-input v-model="form3.servicelife" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同到期 ：">
            <el-input
              v-model="form3.contractexpired"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="首次签订合同 ：">
            <el-input v-model="form3.firstcontract" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同起始 ：">
            <el-input
              v-model="form3.contractinitiation"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际离职 ：">
            <el-input v-model="form3.actual" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户银行 ：">
            <el-input v-model="form3.bankaccount" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请离职 ：">
            <el-input
              v-model="form3.separationtime"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="社保缴纳 ：">
            <el-input
              v-model="form3.socialsecurity"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="建档时间 ：">
            <el-input v-model="form3.createtime" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工资卡号 ：">
            <el-input v-model="form3.salarycard" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="24">
          <el-form-item label="备注 ：">
            <el-input v-model="form3.remark" type="textarea"></el-input>
          </el-form-item>
        </el-col> -->
      </el-form>
    </div>
    <!-- 其他相关 -->
    <div v-show="cli == 3" class="other">
      <el-form :model="form4" label-width="140px" class="froms">
        <el-col :span="8">
          <el-form-item label="车辆 ：">
            <el-input v-model="form4.car" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工器具 ：">
            <el-input v-model="form4.tools" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="劳保 ：">
            <el-input v-model="form4.laoBao" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="oid ：">
            <el-input v-model="form4.oid" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <!-- 上传证件 -->
        <el-col :span="24">
          <el-form-item label="证书 ：">
            <div class="pics" v-for="(zhen, index) in zhen" :key="index">
              <img :src="zhen" />
              {{ zhen.url }}
            </div>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- 图片 -->
    <el-dialog
      title="图片查看"
      :visible.sync="bigP"
      width="50%"
      append-to-body
      destroy-on-close
    >
      <div id="big"><img :src="bigs" /></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bigP = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import store from "../../store/index";
import { gets } from "../../request/wan";
import URL from "../../http/URL2";
export default {
  data() {
    return {
      cli: "",
      // 图片
      aaa: "",
      sz: "",
      sf: "",
      hz: "",
      hf: "",
      zs: "",
      bigs:"",
      zhen: [],
      // 表格
      tableData: [],
      // multipleSelection: [],
      // 分页
      currentPage: 1,
      pagesize: 50,
      fileList: [],
      // 个人资料
      form: {
        name: "",
        nationalities: "",
        registeredNature: "",
        gender: "",
        politicalOutlook: "",
        location: "",
        brithday: "",
        homeAddress: "",
        contactName: "",
        card: "",
        phone: "",
        contactPhone: "",
        groupNumber: "",
      },
      // 教育经历
      form2: {
        graduateSchools: "",
        education: "",
        specialty: "",
        graduationTime: "",
        degree: "",
        certificateNumber: "",
      },
      // 入职信息
      form3: {
        subordinateUnits: "",
        employment: "",
        contractNature: "",
        sector: "",
        posts: "",
        entrytime: "",
        active: "",
        postsinfo: "",
        entriesnum: "",
        line: "",
        reuseLine: "",
        contractnumber: "",
        servicelife: "",
        contractexpired: "",
        firstcontract: "",
        contractinitiation: "",
        actual: "",
        bankaccount: "",
        separationtime: "",
        socialsecurity: "",
        createtime: "",
        salarycard: "",
        remark: "",
      },
      // 其他
      form4: { car: "", tools: "", laoBao: "", oid: "" },
      // 上传
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      bigP: false,
    };
  },
  created() {
    gets("work/getWorkDataByWorkInfo", {
      workdataId: store.state.renyuan[1].workData,
    }).then((res) => {
      console.log(res);
      this.form.name = res.data.name;
      this.form.nationalities = res.data.nationalities;
      this.form.registeredNature = res.data.registeredNature;
      this.form.gender = res.data.gender;
      this.form.politicalOutlook = res.data.politicalOutlook;
      this.form.location = res.data.location;
      this.form.brithday = res.data.brithday;
      this.form.homeAddress = res.data.homeAddress;
      this.form.contactName = res.data.contactName;
      this.form.card = res.data.card;
      this.form.phone = res.data.phone;
      this.form.contactPhone = res.data.contactPhone;
      this.form.groupNumber = res.data.groupNumber;
      this.aaa = URL.nginxUrl + res.data.workDocuments;
      this.sz = URL.nginxUrl + res.data.cardPeople;
      this.sf = URL.nginxUrl + res.data.cardNational;
      this.hz = URL.nginxUrl + res.data.hukoubookHuzhu;
      this.hf = URL.nginxUrl + res.data.hukoubookMyself;
    });
    // console.log()
  },
  methods: {
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    // 上传
    // 删除
    handleRemove(file) {
      this.$refs.pictureUpload.handleRemove(file);
    },
    // 放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 个人
    reren() {
      this.cli = 0;
      // console.log(store.state.renyuan[1].workData, 1);
      gets("work/getWorkDataByWorkInfo", {
        workdataId: store.state.renyuan[1].workData,
      })
        .then((res) => {
          // console.log(res);
          this.form.name = res.data.name;
          this.form.nationalities = res.data.nationalities;
          this.form.registeredNature = res.data.registeredNature;
          this.form.gender = res.data.gender;
          this.form.politicalOutlook = res.data.politicalOutlook;
          this.form.location = res.data.location;
          this.form.brithday = res.data.brithday;
          this.form.homeAddress = res.data.homeAddress;
          this.form.contactName = res.data.contactName;
          this.form.card = res.data.card;
          this.form.phone = res.data.phone;
          this.form.contactPhone = res.data.contactPhone;
          this.form.groupNumber = res.data.groupNumber;
          this.aaa = URL.nginxUrl + res.data.workDocuments;
          this.sz = URL.nginxUrl + res.data.cardPeople;
          this.sf = URL.nginxUrl + res.data.cardNational;
          this.hz = URL.nginxUrl + res.data.hukoubookHuzhu;
          this.hf = URL.nginxUrl + res.data.hukoubookMyself;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 教育
    jiao() {
      this.cli = 1;
      // console.log(store.state.renyuan[1].schoolProcess, 1);
      gets("work/getSchoolProcessByWorkInfo", {
        SchoolProcessId: store.state.renyuan[1].schoolProcess,
      }).then((res) => {
        // console.log(res.data, 456);
        this.form2.graduateSchools = res.data.graduateSchools;
        this.form2.education = res.data.education;
        this.form2.specialty = res.data.specialty;
        this.form2.graduationTime = res.data.graduationTime;
        this.form2.degree = res.data.degree;
        this.form2.certificateNumber = res.data.certificateNumber;
        this.zs = URL.nginxUrl + res.data.educationBook;
      });
    },
    // 入职
    ruzhi() {
      this.cli = 2;
      console.log(store.state.renyuan[1].induction, 2);
      // 单位
      gets("work/getInductionByWorkInfo", {
        InductionId: store.state.renyuan[1].induction,
      }).then((res) => {
        gets("inforConf/selById", { ids: res.data.subordinateUnits }).then(
          (res) => {
            // console.log(res.data.data[0].unitName);
            this.form3.subordinateUnits = res.data.data[0].unitName;
          }
        );
        // 用工
        gets("employ/selEmployById", { ids: res.data.employment }).then(
          (res) => {
            // console.log(res.data.data[0].details);
            this.form3.employment = res.data.data[0].details;
          }
        );
        // 合同
        gets("contract/selContractById", {
          ids: res.data.contractNature,
        }).then((res) => {
          // console.log(res.data.data[0].contractNature);
          this.form3.contractNature = res.data.data[0].contractNature;
        });
        // 部门
        gets("sector/getSectorByid", {
          id: res.data.sector,
        }).then((res) => {
          this.form3.sector = res.data.sectorName;
        });
        // 岗位
        gets("posts/selById", {
          ids: res.data.posts,
        }).then((res) => {
          // console.log(res.data.data[0]);
          this.form3.posts = res.data.data[0].postsName;
          this.form3.postsinfo = res.data.data[0].postsName;
        });
        // this.form3.subordinateUnits = res.data.subordinateUnits;
        // this.form3.employment = res.data.employment;
        // this.form3.contractNature = res.data.contractNature;
        this.form3.sector = res.data.sector;
        // this.form3.posts = res.data.posts;
        this.form3.entrytime = res.data.entryTime;

        this.form3.active = res.data.active;
        // this.form3.postsinfo = res.data.postsInfo;
        this.form3.entriesNum = res.data.entriesNum;
        this.form3.contractnumber = res.data.contractNumber;
        this.form3.servicelife = res.data.serviceLife;
        this.form3.contractexpired = res.data.contractExpired;

        this.form3.firstcontract = res.data.firstContract;
        this.form3.contractinitiation = res.data.contractInitiation;
        this.form3.actual = res.data.actual;
        this.form3.bankaccount = res.data.bankAccount;
        this.form3.separationtime = res.data.separationTime;
        this.form3.socialsecurity = res.data.socialSecurity;
        this.form3.createtime = res.data.createTime;
        this.form3.salarycard = res.data.salaryCard;
        this.form3.remark = res.data.remark;
        this.form3.line = res.data.line;
        this.form3.reuseLine = res.data.reuseLine;
      });
    },
    // 其他
    qi() {
      this.cli = 3;
      // console.log(store.state.renyuan[1].workOther, 3);
      console.log(this.zhen);
      if (this.zhen == "") {
        // 获取其他ID
        gets("work/getWorkOtherByWorkInfo", {
          WorkOtherId: store.state.renyuan[1].workOther,
        }).then((res) => {
          // console.log(res.data.certificate, 456);
          var s, ss;
          s = res.data.certificate;
          // 在每个空格字符处进行分解。
          if (s) {
            ss = s.split(",");
            ss.forEach((res) => {
              this.zhen.push(URL.nginxUrl + res);
            });
          }

          console.log(this.zhen);
          this.form4.car = res.data.car;
          this.form4.tools = res.data.tools;
          this.form4.laoBao = res.data.laoBao;
          this.form4.oid = res.data.oid;
          // 汽车查询
          gets("CarAllot/getCarAllotByWorkInfo", {
            carAllotId: res.data.id,
          }).then((resCar) => {
            console.log(resCar, 55);
          }); // 工器具查询
          gets("ToolsAllot/getToolsAllotByWorkInfo", {
            toolsAllotId: res.data.id,
          }).then((resPage) => {
            console.log(resPage, 56);
          }); // 劳保查询
          gets("GoodAllot/getGoodsAllotByWorkinfo", {
            goodsAllotId: res.data.id,
          }).then((resWorkinfo) => {
            console.log(resWorkinfo, 57);
          });
        });
      }
    },
    // 图片点击
    picBig(event) {
      // console.log(event.target.src);
      this.bigs=event.target.src
      this.bigP = true;
    },
  },
};
</script>
<style scoped lang="less">
img {
  width: 100%;
  height: 100%;
}
#big {
  width: 90%;
  height: 90%;
  transform:rotate(-90deg);
}
.el-form {
  .el-input {
    min-width: 180px;
  }
  .el-select {
    min-width: 170px;
    width: 100%;
  }
}
.employeeFiles {
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
// 头部
.top {
  height: 40px;
  background: #dddddd;
  display: flex;
  .font {
    font-size: 15px;
    width: 150px;
    line-height: 40px;
    text-align: center;
  }
  // 点击变色
  .col {
    background: #ffffff;
    color: #0077f1;
  }
  .yan {
    background: #ffffff;
    width: 250px;
    height: 30px;
    border-radius: 20px;
    padding-left: 20px;
    margin-top: 10px;
    margin-left: 180px;
  }
  .ding {
    position: relative;
    right: 30px;
    top: 17px;
  }
  .pai {
    width: 80px;
    height: 30px;
    font-size: 10px;
    margin-top: 10px;
    margin-left: 30px;
  }
}
.from {
  width: 95%;
  margin: auto;
  .sosuo {
    color: #c0c0c0;
    font-size: 15px;
  }
}
// 个人资料
.geren {
  // 头像
  .pic {
    position: relative;
    width: 100px;
    height: 120px;
    top: 55px;
    left: 50px;
    border: 1px solid #d3d3d3;
  }
  .qq {
    display: flex;
    width: 100%;
    .pics {
      position: relative;
      width: 150px;
      height: 150px;
      margin-left: 50px;
      border: 1px solid #d3d3d3;
    }
  }

  .froms {
    position: relative;
    top: -67px;
    left: 100px;
    width: 92%;
  }
}
// 教育经历
.experience {
  .froms {
    position: relative;
    top: 30px;
    left: 20px;
    width: 90%;
  }
  .pics {
    position: relative;
    width: 150px;
    height: 150px;
    margin-left: 50px;
    border: 1px solid #d3d3d3;
  }
}
// 入职信息
.information {
  overflow: auto;
  height: 92%;
  // border: solid;
  .froms {
    position: relative;
    top: 30px;
    left: 20px;
    width: 90%;
  }
}
// 其他相关
.other {
  .froms {
    position: relative;
    top: 30px;
    left: 20px;
    width: 90%;
  }
  .pics {
    position: relative;
    width: 150px;
    height: 150px;
    margin-left: 50px;
    border: 1px solid #d3d3d3;
    float: left;
  }
}
</style>