<template>
  <div>
    <!-- 头部 -->
    <div class="top">
      <el-form class="form" :model="form" label-width="120px">
        <el-col :span="12">
          <el-form-item label="申请部门 ：" :required="true">
            <el-select
              @change="findItemNameBYClass"
              v-model="form.sector"
              placeholder="请选择所在部门"
            >
              <el-option
                v-for="(department, index) in department"
                :key="index"
                :label="department.label"
                :value="department.id"
              ></el-option>
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item
            label="是否岗位调整"
            :label-width="formLabelWidth"
            class="dis"
            v-test="{ name: '新增岗位内调审批' }"
          >
            <el-radio-group v-model="form.radio" @change="getRadioVal">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item></el-col
        >
      </el-form>
    </div>
    <!-- 申请人员 -->
    <div class="middle" :class="{ dis: form.radio == 0 }">
      <!-- 新增人数 -->
      <el-form
        class="form"
        :model="dynamicValidateForm"
        label-width="120px"
        v-for="domain in dynamicValidateForm.domains"
        :key="domain.key"
      >
        <el-col :span="10">
          <el-form-item label="申请岗位 ：" :required="true">
            <el-select
              v-model="domain.postPosition"
              placeholder="请选择所在岗位"
            >
              <el-option
                v-for="(post, index) in post"
                :key="index"
                :label="post.postsName"
                :value="post.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="申请人数 ：" :required="true">
            <el-input v-model="domain.applicantsNum"></el-input> </el-form-item
        ></el-col>
        <el-col :span="4">
          <span
            class="iconfont icon-shanchu shan"
            @click.prevent="removeDomain(domain)"
          ></span>
        </el-col>
      </el-form>
      <span class="iconfont icon-tianjia1 tianJ" @click="addDomain"></span>
      <el-form class="form" :model="form" label-width="120px">
        <!-- 理由 -->
        <el-col :span="24">
          <el-form-item label="申请原由 ：" :required="true">
            <el-input
              v-model="applicationReason"
              type="textarea"
            ></el-input> </el-form-item
        ></el-col>
        <!-- 条线 -->
        <el-col :span="24">
          <el-form-item label="所属条线 ：" :required="true">
            <el-select v-model="tiao" placeholder="请选择所属条线">
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
            </el-upload></el-form-item
          ></el-col
        >
      </el-form>
    </div>
    <!-- 人员调整 -->
    <div class="middle" :class="{ dis: form.radio == 1 }">
      <!-- 新增人数 -->
      <el-form class="form" :model="form2" label-width="120px">
        <el-col :span="7">
          <el-form-item label="原岗位 ：" :required="true">
            <el-select
              v-model="form2.postPositionOld"
              placeholder="请选择所在岗位"
              @change="renshu"
            >
              <el-option
                v-for="(post, index) in post2"
                :key="index"
                :label="post.postsName"
                :value="post.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="申请岗位 ：" :required="true">
            <el-select
              v-model="form2.postPosition"
              placeholder="请选择所在岗位"
            >
              <el-option
                v-for="(post, index) in post"
                :key="index"
                :label="post.postsName"
                :value="post.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="申请人数 ：" :required="true">
            <el-input v-model="form2.applicantsNum"></el-input> </el-form-item
        ></el-col>
        <el-col :span="4">
          <el-form-item label="可用名额：">
            {{ shengqing }}
          </el-form-item></el-col
        >
      </el-form>
      <el-form class="form" :model="form" label-width="120px">
        <!-- 理由 -->
        <el-col :span="24">
          <el-form-item label="申请原由 ：" :required="true">
            <el-input
              v-model="applicationReason"
              type="textarea"
            ></el-input> </el-form-item
        ></el-col>
        <!-- 条线 -->
        <el-col :span="24">
          <el-form-item label="所属条线 ：" :required="true">
            <el-select v-model="tiao" placeholder="请选择所属条线">
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
            </el-upload></el-form-item
          ></el-col
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
    <!-- 审批人选择弹出 -->
    <el-dialog
      title="选择"
      :visible.sync="show"
      append-to-body
      destroy-on-close
    >
      <div style="width: 100%">
        <personnel2></personnel2>
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
import personnel2 from "../../components/personnel2";
import { gets, postp } from "../../request/wan";
export default {
  data() {
    return {
      formLabelWidth: "",
      // 头部表
      form: {
        sector: "",
        radio: "1",
      },
      form2: {
        postPositionOld: "",
        postPosition: "",
        applicantsNum: "",
      },
      // 自动获取
      department: [],
      post: [],
      post2: [],
      // 中间
      dynamicValidateForm: {
        domains: [
          {
            postPosition: "",
            applicantsNum: "",
          },
        ],
      },
      // 理由
      applicationReason: "",
      // 获取的部门
      data: "",
      // 组织构架
      datas: [],
      // 文件
      fileList: [],
      // 人员点击
      show: false,
      show2: false,
      show3: false,
      show4: false,
      // 头像
      toux: [],
      tiao: "",
      // 附件
      files: [],
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
      // 接口切换
      url: "",
      url2: "",
      // 可申请人数
      shengqing: "",
      // 按钮状态
      an: {
        tijiao: false,
      },
      // 审批人不能少
      moban: false,
    };
  },
  components: { personnel2 },
  created() {
    // 部门
    gets("/PersonnelTransferApproval/getSector").then((res) => {
      console.log(res);
      this.form.sector = res.data.id;
      gets("posts/getPostsBySector1" + "?id=" + res.data.id).then((res) => {
        this.post = res.data;
        console.log(this.post);
      });
      // 人员过多岗位
      gets("posts/getPosts" + "?id=" + res.data.id).then((res) => {
        this.post2 = res.data;
        console.log(this.post2);
      });
    });
    // 组织构架
    gets("sector/getSector")
      .then((res) => {
        // console.log(res.data);
        this.datas = res.data;
        this.qing();
        // console.log("d ", this.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // 审批前的名额
    minge(val) {
      var ss = val.split(",");
      var aa = "";
      for (let a = 0; a < ss.length; a++) {
        this.post.forEach((res) => {
          aa = aa + (res.id == ss[a] ? res.vacanciesNum + "," : "");
        });
      }
      return aa;
    },
    // 内调审批前的名额
    minge2(val) {
      var a;
      this.post.forEach((res) => {
        if (res.id == val) {
          console.log(res);
          console.log(res.vacanciesNum);
          a = res.vacanciesNum;
        }
      });
      console.log(a);
      return a;
    },
    // 自动获取部门
    qing() {
      var aa = 0;
      // console.log(this.datas, 8888);
      // console.log(this.datas[0], 9999);
      Object.keys(this.datas[0]).forEach((key) => {
        // console.log(key);
        if (key == "children") {
          aa = 1;
        }
      });
      if (aa == 1) {
        for (var i = 0; i < this.datas[0].children.length; i++) {
          // console.log(this.datas[0].children[i].children);
          const a = this.datas[0].children[i].UpSector;
          if (a != 0 && a != 26) {
            this.department.push(this.datas[0].children[i]);
          }
          for (var j = 0; j < this.datas[0].children[i].children.length; j++) {
            const a = this.datas[0].children[i].children[j].UpSector;
            if (a != 0 && a != 26) {
              this.department.push(this.datas[0].children[i].children[j]);
            }
          }
        }
      } else {
        // console.log(this.datas[0].children[i].children);
        const a = this.datas[0].UpSector;
        if (a != 0 && a != 26) {
          this.department.push(this.datas[0]);
        }
      }
    },
    // 岗位
    findItemNameBYClass(val) {
      // 中间
      this.form2 = {
        postPositionOld: "",
        postPosition: "",
        applicantsNum: "",
      };
      // 中间
      this.dynamicValidateForm = {
        domains: [
          {
            postPosition: "",
            applicantsNum: "",
          },
        ],
      };
      gets("posts/getPostsBySector1" + "?id=" + val).then((res) => {
        this.post = res.data;
        console.log(this.post);
      });
      // 人员过多岗位
      gets("posts/getPosts" + "?id=" + val).then((res) => {
        this.post2 = res.data;
        console.log(this.post2);
      });
    },
    getRadioVal(val) {
      console.log(val, 888888);
      this.toux = [];
      this.applicationReason = "";
      // this.tian = "";
      if (val == 1) {
        this.form2 = {
          postPositionOld: "",
          postPosition: "",
          applicantsNum: "",
        };
      }
    },
    // 手动选择审批人
    shodong(index) {
      this.index = index;
      this.show2 = !this.show2;
    },
    // 删除表单
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    // 添加表单
    addDomain() {
      this.dynamicValidateForm.domains.push({
        postPosition: "",
        applicantsNum: "",
        key: Date.now(),
      });
    },
    // 人员选择
    reny() {
      var len = 0;
      len = this.$store.name.length;
      if (len == 1) {
        // console.log(this.$store.fromPerson);
        this.toux[this.index].name = this.$store.fromPerson.userName;
        this.toux[this.index].ids = this.$store.fromPerson.id;
        this.show = false;
      } else {
        this.$alert("请选择一人", "提示", {
          confirmButtonText: "确定",
        });
        this.show = true;
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
    // 模板审批人员选择
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
    // 附件
    handleAvatarSuccess(raw, file) {
      this.files = file;
      // console.log(file);
      // console.log(file[0].raw);
    },
    // 生成审批人
    sheng() {
      this.moban = false;
      this.toux = [];
      // console.log(666666666);
      if (this.tiao == "") {
        console.log(666666666);

        this.$message({
          message: "请填写条线",
          type: "error",
        });
        return;
      }
      gets("/user/getApprovalBySector2" + "?line=" + this.tiao).then((res) => {
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
        var type = "";
        if (this.form.radio != 0) {
          type = "岗位申请";
        } else {
          type = "岗位调整";
        }
        gets(
          "user/getApprovalTemBySector" + "?line=" + this.tiao + "&type=" + type
        ).then((res3) => {
          console.log(res3, 6666666);

          this.moData = res3.data;
          if (this.moData != "") {
            this.show4 = true;
          }
        });
      });
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
      const name = dat.names.split(",");
      const id = dat.approvalIds.split(",");
      console.log(name.length);
      console.log(id);
      for (let i = 0; i <= name.length - 1; i++) {
        if (this.toux[0].name != name[i] && this.toux[0].name != name[i])
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
      // 申请表单
      // 岗位ID拼接
      var postPosition = "";
      // 申请人数拼接
      var applicantsNum = "";
      var approvalId = ",";
      var approvalName = "";
      var approvalStatus = "";

      this.dynamicValidateForm.domains.forEach((gang) => {
        console.log(gang);
        postPosition = postPosition + gang.postPosition + ",";
        applicantsNum = applicantsNum + gang.applicantsNum + ",";
      });
      // 去除最后，
      postPosition = postPosition.substr(0, postPosition.length - 1);
      applicantsNum = applicantsNum.substr(0, applicantsNum.length - 1);
      // 审批人ID
      this.toux.forEach((ren) => {
        // console.log(ren, 999);
        approvalId = approvalId + ren.ids + ",";
        approvalName = approvalName + ren.name + ",";
        approvalStatus = approvalStatus + "2,";
      });
      approvalStatus = approvalStatus.substr(0, approvalStatus.length - 1);
      approvalName = approvalName.substr(0, approvalName.length - 1);
      if (this.form.radio == 1) {
        this.url = "PersonnelTransferApproval/insertPersonnelTransferApproval";
        this.url2 = "PersonnelTransferApproval/fileUpload";
        // 提交表
        this.forms = {
          sector: this.form.sector,
          postPosition: postPosition,
          applicantsNum: applicantsNum,
          approvalIds: approvalId,
          approvalStatus: approvalStatus,
          applicationReason: this.applicationReason,
          approvalName: approvalName,
          oldPostNum: this.minge(postPosition),
        };
      } else {
        this.url = "PostsAssignment/insertPostsAssignment";
        this.url2 = "PostsAssignment/fileUpload";
        // 提交表
        this.forms = {
          sector: this.form.sector,
          postsId: this.form2.postPositionOld,
          jobId: this.form2.postPosition,
          postsSum: this.form2.applicantsNum,
          approvalIds: approvalId,
          reason: this.applicationReason,
          approvalStatus: approvalStatus,
          approvalName: approvalName,
          type: "岗位调整",
          annx: "",
          postNum: this.minge2(this.form2.postPositionOld),
          jobNum: this.minge2(this.form2.postPosition),
        };
      }
    },
    // 判断空数据
    empty() {
      // console.log(Object.values(this.forms), 788989);
      const aa = Object.values(this.forms);
      for (var i = 0; i < aa.length; i++) {
        // console.log(aa[i]);
        if (
          (aa[i] == "" && i != 9 && i != 10 && i != 11 && i != 12 && i != 0) ||
          aa[i] == ","
        ) {
          this.kong = 1;
          if (this.form.radio == 1) {
            switch (i) {
              case 0:
                this.$message({
                  message: "请填写部门",
                  type: "error",
                });
                break;
              case 1:
                this.$message({
                  message: "请填写申请岗位",
                  type: "error",
                });
                break;
              case 2:
                this.$message({
                  message: "请填写申请人数",
                  type: "error",
                });
                break;
              case 3:
                this.$message({
                  message: "请选择审批人",
                  type: "error",
                });
                break;
              case 5:
                this.$message({
                  message: "请填写理由",
                  type: "error",
                });
                break;
            }
          } else {
            switch (i) {
              case 0:
                this.$message({
                  message: "请填写部门",
                  type: "error",
                });
                break;
              case 1:
                this.$message({
                  message: "请填写原岗位",
                  type: "error",
                });
                break;
              case 2:
                this.$message({
                  message: "请填写新岗位",
                  type: "error",
                });
                break;
              case 3:
                this.$message({
                  message: "请输入人数",
                  type: "error",
                });
                break;
              case 4:
                this.$message({
                  message: "请选择审批人",
                  type: "error",
                });
                break;
              case 5:
                this.$message({
                  message: "请填写理由",
                  type: "error",
                });
                break;
            }
          }
          this.an.tijiao = false;
          return;
        }
      }
    },
    // 提交
    tij() {
      console.log(this.form.sector)
      if (this.form2.applicantsNum > this.shengqing) {
        this.$message({
          message: "申请人数超过可用人数",
          type: "error",
        });
        this.an.tijiao = false;
        return;
      }
      // 按钮
      this.an.tijiao = true;
      // 提交前数据处理
      this.kong = 0;
      this.tifront();
      // 判断是否为空
      this.empty();
      // console.log(this.kong, 33333);
      console.log(this.forms, 99);
      if (this.kong != 1) {
        const formData = new FormData();
        // 提交请求
        postp(this.url, this.forms)
          .then((res) => {
            for (var t = 0; t < this.files.length; t++) {
              formData.append("file", this.files[t].raw);
            }
            formData.append("id", res.data);
            if (this.files != "") {
              postp(this.url2, formData).then((res) => {
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
      console.log(5646566);
    },
    renshu() {
      console.log(this.form2.postPositionOld);
      this.post2.forEach((res) => {
        console.log(res);
        if (this.form2.postPositionOld == res.id) {
          this.shengqing = res.vacanciesNum;
        }
      });
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
#img {
  width: 25px !important;
  height: 25px !important;
}
.dis {
  display: none;
}
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
}
</style>