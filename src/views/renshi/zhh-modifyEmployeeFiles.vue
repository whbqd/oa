<template>
  <div class="employeeFiles">
    <!-- 标题 -->
    <div class="top">
      <div class="font" @click="reren" :class="{ col: cli == 0 }">
        <p>个人资料</p>
      </div>
      <div id="jy" class="font" @click="jiao" :class="{ col: cli == 1 }">
        <p>教育经历</p>
      </div>
      <div id="rz" class="font" @click="ruzhi" :class="{ col: cli == 2 }">
        <p>入职信息</p>
      </div>
      <div id="qt" class="font" @click="qi" :class="{ col: cli == 3 }">
        <p>其他相关</p>
      </div>
    </div>
    <!-- 个人资料 -->
    <div v-show="cli == 0" class="geren">
      <!-- 头像 -->
      <div class="tou">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="false"
          list-type="picture-card"
          :show-file-list="false"
          :on-change="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        </el-upload>
      </div>
      <el-form :model="form" label-width="140px" class="froms">
        <el-col :span="7">
          <el-form-item label="姓名 ：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="民族 ：">
            <el-input v-model="form.nationalities"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户口性质 ：">
            <el-select
              v-model="form.registeredNature"
              placeholder="请选择户口性质"
            >
              <el-option label="农村户口" value="农村户口"></el-option>
              <el-option label="城市户口" value="城市户口"></el-option>
              <el-option label="农村居民户口" value="农村居民户口"></el-option>
              <el-option label="集体户口" value="集体户口"></el-option>
              <el-option label="未知" value="未知"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="性别 ：">
            <el-select v-model="form.gender" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
              <el-option label="未知" value="未知"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="政治面貌 ：">
            <el-select
              v-model="form.politicalOutlook"
              placeholder="请选择政治面貌"
            >
              <el-option label="中共党员" value="中共党员"></el-option>
              <el-option label="预备党员" value="预备党员"></el-option>
              <el-option label="团员" value="团员"></el-option>
              <el-option label="民革党员" value="民革党员"></el-option>
              <el-option label="民盟盟员" value="民盟盟员"></el-option>
              <el-option label="民建会员" value="民建会员"></el-option>
              <el-option label="民进会员" value="民进会员"></el-option>
              <el-option label="民工党党员" value="民工党党员"></el-option>
              <el-option label="致公党党员" value="致公党党员"></el-option>
              <el-option label="三九学社社员" value="三九学社社员"></el-option>
              <el-option label="台盟盟员" value="台盟盟员"></el-option>
              <el-option label="无党派人士" value="无党派人士"></el-option>
              <el-option label="群众" value="群众"></el-option>
              <el-option label="未知" value="未知"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户籍所在地 ：">
            <el-input v-model="form.location"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="出生日期 ：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form.brithday"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="家庭住址 ：">
            <el-input v-model="form.homeAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="紧急联系人姓名 ：">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="身份证号 ：">
            <el-input v-model="form.card"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话 ：">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="紧急联系人电话 ：">
            <el-input v-model="form.contactPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="集团号 ：">
            <el-input v-model="form.groupNumber"></el-input>
          </el-form-item>
        </el-col>
        <!-- 上传证件 -->
        <el-col :span="20">
          <el-form-item
            label="附件 ：身份证正面，身份证反面，户口户主，户口本人页"
            style="margin-left: -80px"
          >
            <!-- 弹出 -->
            <!-- <el-dialog
              title="选择"
              :visible.sync="show2"
              append-to-body
              destroy-on-close
            >
              <div style="width: 100%">
                <div class="tou">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :auto-upload="false"
                    list-type="picture-card"
                    :2-file-list="false"
                    :on-change="handleAvatarSuccess"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  </el-upload>
                </div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="show2 = false">取 消</el-button>
                <el-button type="primary" @click="show2 = false"
                  >确 定</el-button
                >
              </div>
            </el-dialog> -->
            <el-col :span="6">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false"
                list-type="picture-card"
                :show-file-list="false"
                :on-change="handleAvatarSuccess2"
              >
                <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
              </el-upload>
            </el-col>
            <el-col :span="6">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false"
                list-type="picture-card"
                :show-file-list="false"
                :on-change="handleAvatarSuccess3"
              >
                <img v-if="imageUrl3" :src="imageUrl3" class="avatar" />
              </el-upload>
            </el-col>
            <el-col :span="6">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false"
                list-type="picture-card"
                :show-file-list="false"
                :on-change="handleAvatarSuccess4"
              >
                <img v-if="imageUrl4" :src="imageUrl4" class="avatar" />
              </el-upload>
            </el-col>
            <el-col :span="6">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false"
                list-type="picture-card"
                :show-file-list="false"
                :on-change="handleAvatarSuccess5"
              >
                <img v-if="imageUrl5" :src="imageUrl5" class="avatar" />
              </el-upload>
            </el-col>

            <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- 教育经历 -->
    <div v-show="cli == 1" class="experience">
      <el-form :model="form2" label-width="140px" class="froms">
        <el-col :span="8">
          <el-form-item label="毕业院校 ：">
            <el-input v-model="form2.graduateSchools"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学历 ：">
            <el-input v-model="form2.education"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专业 ：">
            <el-input v-model="form2.specialty"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="毕业时间 ：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form2.graduationTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学位 ：">
            <el-select v-model="form2.degree" placeholder="请选择学位">
              <el-option label="无" value="0"></el-option>
              <el-option label="学士" value="1"></el-option>
              <el-option label="硕士" value="2"></el-option>
              <el-option label="博士" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学历证书编号 ：">
            <el-input v-model="form2.certificateNumber"></el-input>
          </el-form-item>
        </el-col>
        <!-- 上传证件 -->
        <el-col :span="24">
          <el-form-item label="学历证书 ：">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              list-type="picture-card"
              :show-file-list="false"
              :on-change="handleAvatarSuccess6"
            >
              <img v-if="imageUrl6" :src="imageUrl6" class="avatar" />
            </el-upload>
            <!-- <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              ref="pictureUpload2"
              :limit="1"
              :on-change="handleAvatarSuccess6"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload> -->
            <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!-- 入职信息 -->
    <div v-show="cli == 2" class="information">
      <el-form :model="form3" label-width="140px" class="froms">
        <el-col :span="8">
          <el-form-item label="隶属单位 ：">
            <el-select
              v-model="form3.subordinateUnits"
              placeholder="请选择隶属单位"
            >
              <el-option
                v-for="(company, index) in company"
                :key="index"
                :label="company.unitName"
                :value="company.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用工属性 ：">
            <el-select v-model="form3.employment" placeholder="请选择用工属性">
              <el-option
                v-for="(recruit, index) in recruit"
                :key="index"
                :label="recruit.details"
                :value="recruit.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同性质 ：">
            <el-select
              v-model="form3.contractNature"
              placeholder="请选择合同性质"
            >
              <el-option
                v-for="(contract, index) in contract"
                :key="index"
                :label="contract.contractNature"
                :value="contract.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所在部门 ：">
            <el-select
              @change="findItemNameBYClass"
              v-model="form3.sector"
              placeholder="请选择所在部门"
              :disabled="yuan"
            >
              <el-option
                v-for="(department, index) in department"
                :key="index"
                :label="department.label"
                :value="department.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="岗位 ：">
            <el-select
              v-model="form3.posts"
              placeholder="请选择所在岗位"
              @change="findItemNameBYClass2"
              :disabled="yuan"
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
        <el-col :span="8">
          <el-form-item label="入职时间 ：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form3.entryTime"
              type="date"
              placeholder="选择日期"
              :disabled="yuan"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否在职 ：">
            <el-select v-model="form3.active" placeholder="是否在职">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="条线 ：">
            <el-select
              v-model="form3.line"
              placeholder="请选择条线"
              :disabled="yuan"
            >
              <el-option label="工程" value="工程"></el-option>
              <el-option label="维护" value="维护"></el-option>
              <el-option label="综合" value="综合"></el-option>
              <el-option label="销售" value="销售"></el-option>
              <el-option label="信息" value="信息"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="复用条线 ：">
            <el-select
              v-model="form3.reuseLine"
              placeholder="请选择条线"
              :disabled="reunite"
            >
              <el-option
                v-for="(reuseLines, index) in reuseLines"
                :key="index"
                :label="reuseLines.reuseLine"
                :value="reuseLines.reuseLine"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职称 ：">
            <!-- <el-input v-model="form3.postsInfo"></el-input> -->
            <el-select
              v-model="form3.postsInfo"
              placeholder="请选择所在岗位"
              :disabled="yuan"
            >
              <el-option
                v-for="(post, index) in post"
                :key="index"
                :label="post.postsName"
                :value="post.postsName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入职次数 ：">
            <el-input v-model="form3.entriesNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同编号 ：">
            <el-input v-model="form3.contractNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="服务年限 ：">
            <el-input v-model="form3.serviceLife"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同到期 ：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form3.contractExpired"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="首次签订合同 ：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form3.firstContract"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同起始 ：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form3.contractInitiation"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际离职 ：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form3.actual"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开户银行 ：">
            <el-input v-model="form3.bankAccount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="申请离职 ：">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form3.separationTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="社保缴纳 ：">
            <!-- <el-input v-model="form3.socialSecurity"></el-input> -->
            <el-select v-model="form3.socialSecurity" placeholder="社保缴纳">
              <el-option label="是" value="0"></el-option>
              <el-option label="否" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="建档时间 ：">
            <el-input v-model="form3.createTime"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="工资卡号 ：">
            <el-input v-model="form3.salaryCard"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="20">
          <el-form-item label="备注 ：">
            <el-input v-model="form3.remark" type="textarea"></el-input>
          </el-form-item>
        </el-col> -->
      </el-form>
    </div>
    <!-- 其他相关 -->
    <div v-show="cli == 3" class="other">
      <el-form :model="form4" label-width="140px" class="froms">
        <!-- <el-col :span="8">
          <el-form-item label="车辆 ：">
            <el-input v-model="form4.car"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工器具 ：">
            <el-input v-model="form4.tools"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="劳保 ：">
            <el-input v-model="form4.laoBao"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="oid ：">
            <el-input v-model="form4.oid"></el-input>
          </el-form-item>
        </el-col> -->
        <!-- 上传证件 -->
        <el-col :span="24">
          <el-form-item label="证书 ：">
            <!-- 图片修改弹出 -->
            <el-dialog
              title="选择"
              :visible.sync="show"
              append-to-body
              destroy-on-close
            >
              <div style="width: 100%">
                <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  ref="pictureUpload3"
                  :limit="10"
                  :on-change="handleAvatarSuccessQt"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{ file }">
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="keys">确 定</el-button>
              </div>
            </el-dialog>
            <div
              class="pics"
              v-for="(zhen, index) in zhen"
              :key="index"
              @click="tanc"
            >
              <img :src="zhen" />
              {{ zhen.url }}
            </div>
          </el-form-item>
        </el-col>
      </el-form>
      <el-button class="but col1" @click="tij" :loading="an.xiug"
        >提交</el-button
      >
    </div>
  </div>
</template>
<script>
// import store from "../../store/index";
import jwt from "jsonwebtoken";
import store from "../../store/index";
import { postp, gets, postt } from "../../request/wan";
import URL from "../../http/URL2";
export default {
  data() {
    return {
      cli: "",
      dis: "1",
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
        id: "",
      },
      // 教育经历
      form2: {
        graduateSchools: "",
        education: "",
        specialty: "",
        graduationTime: "",
        degree: "",
        id: "",
        certificateNumber: "",
      },
      // 入职信息
      form3: {
        subordinateUnits: "",
        employment: "",
        contractNature: "",
        sector: "",
        sectorId: "",
        posts: "",
        postsId: "",
        line: "",
        reuseLine: "",
        entryTime: "",
        active: "",
        postsInfo: "",
        entriesNum: "",
        contractNumber: "",
        serviceLife: "",
        contractExpired: "",
        firstContract: "",
        contractInitiation: "",
        actual: "",
        bankAccount: "",
        separationTime: "",
        socialSecurity: "",
        createTime: "",
        salaryCard: "",
        remark: "",
        id: "",
      },
      // 其他
      form4: { car: "", tools: "", laoBao: "", oid: "", id: "" },
      // 上传
      imageUrl: "",
      imageUrl2: "",
      imageUrl3: "",
      imageUrl4: "",
      imageUrl5: "",
      imageUrl6: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      // 自动获取
      company: [],
      recruit: [],
      contract: [],
      department: [],
      post: [],
      reuseLines: [],
      // 组织构架
      datas: [],
      // 图片文件
      show: false,
      // 头像
      files: [],
      files3: [],
      files4: [],
      files22: [],
      files33: [],
      files44: [],
      files55: [],
      files66: [],
      // 文字部门
      den: "",
      den2: "",
      // 图片
      aaa: "",
      sz: "",
      sf: "",
      hz: "",
      hf: "",
      zs: "",
      zhen: [],
      // 按钮状态
      an: {
        xinz: false,
        xiug: false,
      },
      // 保存的数据
      workdata: "",
      schoolprocess: "",
      inducti: "",
      workother: "",
      // 是否正式员工
      yuan: true,
      // 正式工权限
      zhenshi: "",
      reunite: true,
    };
  },
  created() {
    // 复用条线
    var mobile = jwt.decode(sessionStorage.getItem("token")).mobile;
    mobile == 18768114103 ? (this.reunite = false) : (this.reunite = true);
    console.log(this.reunite, "信息");
    // 查看权限
    gets("user/getRoleByUser").then((res) => {
      console.log(res.data, 999988888);
      this.zhenshi = res.data;
    });
    // 隶属单位
    gets("inforConf/selSubunits").then((res) => {
      this.company = res.data.data.records;
      // console.log(res.data.data.records);
    });
    // 用工性质
    gets("employ/selEmploy").then((res) => {
      this.recruit = res.data.data.records;
      // console.log(this.recruit);
    });
    // 合同性质
    gets("contract/selContract").then((res) => {
      this.contract = res.data.items;
      // console.log(this.contract);
    });
    // 组织构架
    gets("sector/getSector").then((res) => {
      // console.log(res.data);
      this.datas = res.data;
      this.qing();
      // console.log("d ", this.data);
    });
    // 复用条线
    gets("ReuseLine/getReuseLine").then((res) => {
      // console.log(res, "复用");
      this.reuseLines = res.data;
      this.counts = res.data.length;
    });
    // console.log(store.state.renyuan[1],5486545644)
    // 个人资料
    gets("work/getWorkDataByWorkInfo", {
      workdataId: store.state.renyuan[1].workData,
    }).then((res) => {
      console.log(res);
      this.workdata = res.data;
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
      this.handleAvatarSuccess();
      this.handleAvatarSuccess2();
      this.handleAvatarSuccess3();
      this.handleAvatarSuccess4();
      this.handleAvatarSuccess5();
    });
    //  教育经历
    gets("work/getSchoolProcessByWorkInfo", {
      SchoolProcessId: store.state.renyuan[1].schoolProcess,
    }).then((res) => {
      this.schoolprocess = res.data;
      this.form2.graduateSchools = res.data.graduateSchools;
      this.form2.education = res.data.education;
      this.form2.specialty = res.data.specialty;
      this.form2.graduationTime = res.data.graduationTime;
      this.form2.degree = res.data.degree;
      this.form2.certificateNumber = res.data.certificateNumber;
      this.zs = URL.nginxUrl + res.data.educationBook;

      this.handleAvatarSuccess6();
    });
    // 入职信息
    gets("work/getInductionByWorkInfo", {
      InductionId: store.state.renyuan[1].induction,
    }).then((res) => {
      console.log(res, "入职");
      this.inducti = res.data;
      this.form3.subordinateUnits = res.data.subordinateUnits;
      this.form3.employment = res.data.employment;
      console.log(this.form3.employment, 988989989898);
      if (this.form3.employment != 1) {
        this.yuan = false;
      }
      this.form3.contractNature = res.data.contractNature;
      // this.form3.sector =res.data.sector;
      // this.form3.posts =res.data.posts;
      // this.form3.postsInfo =res.data.posts;
      this.form3.sectorId = res.data.sector;
      this.form3.postsId = res.data.posts;
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
        this.form3.posts = res.data.data[0].postsName;
        this.form3.postsInfo = res.data.data[0].postsName;
      });
      this.form3.sector = res.data.sector;
      this.form3.entryTime = res.data.entryTime;
      this.form3.active = res.data.active;
      this.form3.entriesNum = res.data.entriesNum;
      this.form3.contractNumber = res.data.contractNumber;
      this.form3.serviceLife = res.data.serviceLife;
      this.form3.contractExpired = res.data.contractExpired;
      this.form3.firstContract = res.data.firstContract;
      this.form3.contractInitiation = res.data.contractInitiation;
      this.form3.actual = res.data.actual;
      this.form3.bankAccount = res.data.bankAccount;
      this.form3.separationTime = res.data.separationTime;
      this.form3.socialSecurity = res.data.socialSecurity;
      this.form3.createTime = res.data.createTime;
      this.form3.salaryCard = res.data.salaryCard;
      this.form3.remark = res.data.remark;
      this.form3.line = res.data.line;
      this.form3.reuseLine = res.data.reuseLine;
    });
    // 其他相关
    gets("work/getWorkOtherByWorkInfo", {
      WorkOtherId: store.state.renyuan[1].workOther,
    }).then((res) => {
      console.log(res.data, 4444444);
      var s, ss;
      s = res.data.certificate;
      this.workother = res.data;
      // 在每个空格字符处进行分解。
      if (res.data.certificate) {
        ss = s.split(",");
        ss.forEach((res) => {
          this.zhen.push(URL.nginxUrl + res);
        });
      }

      // console.log(this.zhen);
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
  },
  methods: {
    // 自动获取部门
    qing() {
      var aa = 0;
      console.log(this.datas, 8888);

      console.log(this.datas[0], 9999);
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
          console.log(this.datas[0].children[i]);
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
      console.log(this.department, 88888888);
    },
    // qing() {
    //   for (var i = 0; i < this.datas[0].children.length; i++) {
    //     // console.log(this.datas[0].children[i].children);
    //     const a = this.datas[0].children[i].sectorVacanciesNum;
    //     const b = this.datas[0].children[i].sectorInNum;
    //     if (a != 0 && b != 0) {
    //       this.department.push(this.datas[0].children[i]);
    //     }
    //     for (var j = 0; j < this.datas[0].children[i].children.length; j++) {
    //       const a = this.datas[0].children[i].children[j].sectorVacanciesNum;
    //       const b = this.datas[0].children[i].children[j].sectorInNum;
    //       if (a != 0 && b != 0) {
    //         this.department.push(this.datas[0].children[i].children[j]);
    //       }
    //     }
    //   }
    //   console.log(this.department, 8888888888);
    // },
    // 自动获取岗位
    findItemNameBYClass(e) {
      console.log(e, 988989);
      // console.log(this.department);
      let obj = {};
      obj = this.department.find((item) => {
        //这里的userList就是上面遍历的数据源
        return item.id === e; //筛选出匹配数据
      });
      this.den = obj.label;
      if (this.zhenshi && this.form3.employment == 7) {
        gets("posts/getRegularWorkerPost", { sector: obj.label }).then(
          (res) => {
            console.log(res.data, 666);
            this.post = res.data;
          }
        );
      } else {
        gets("posts/getPostsBySector", { sector: obj.label }).then((res) => {
          console.log(res.data, 666666);
          this.post = res.data;
        });
      }
    },
    // 岗位名称
    findItemNameBYClass2(e) {
      console.log(e, "岗位热");
      let obj = {};
      obj = this.post.find((item) => {
        //这里的userList就是上面遍历的数据源
        return item.id === e; //筛选出匹配数据
      });
      // console.log(obj)
      this.den2 = obj.postsName;
    },
    // 分页
    handleSizeChange: function (val) {
      this.pagesize = val;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    // 上传
    // 删除
    handleRemove(file) {
      this.$refs.pictureUpload2.handleRemove(file);
      this.$refs.pictureUpload3.handleRemove(file);
    },
    // 放大
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 数据处理
    shujs() {
      // workdata
      this.workdata.name = this.form.name;
      this.workdata.nationalities = this.form.nationalities;
      this.workdata.registeredNature = this.form.registeredNature;
      this.workdata.gender = this.form.gender;
      this.workdata.politicalOutlook = this.form.politicalOutlook;
      this.workdata.location = this.form.location;
      this.workdata.brithday = this.form.brithday;
      this.workdata.homeAddress = this.form.homeAddress;
      this.workdata.contactName = this.form.contactName;
      this.workdata.card = this.form.card;
      this.workdata.phone = this.form.phone;
      this.workdata.contactPhone = this.form.contactPhone;
      this.workdata.groupNumber = this.form.groupNumber;
      // schoolprocess
      this.schoolprocess.graduateSchools = this.form2.graduateSchools;
      this.schoolprocess.education = this.form2.education;
      this.schoolprocess.specialty = this.form2.specialty;
      this.schoolprocess.graduationTime = this.form2.graduationTime;
      this.schoolprocess.degree = this.form2.degree;
      // inducti
      this.inducti.subordinateUnits = this.form3.subordinateUnits;
      this.inducti.employment = this.form3.employment;
      this.inducti.contractNature = this.form3.contractNature;
      this.inducti.sector = this.form3.sectorId;
      this.inducti.posts = this.form3.postsId;
      this.inducti.entryTime = this.form3.entryTime;
      this.inducti.active = this.form3.active;
      this.inducti.postsInfo = this.form3.postsInfo;
      this.inducti.entriesNum = this.form3.entriesNum;
      this.inducti.contractNumber = this.form3.contractNumber;
      this.inducti.serviceLife = this.form3.serviceLife;
      this.inducti.contractExpired = this.form3.contractExpired;
      this.inducti.firstContract = this.form3.firstContract;
      this.inducti.contractInitiation = this.form3.contractInitiation;
      this.inducti.actual = this.form3.actual;
      this.inducti.bankAccount = this.form3.bankAccount;
      this.inducti.separationTime = this.form3.separationTime;
      this.inducti.socialSecurity = this.form3.socialSecurity;
      this.inducti.createTime = this.form3.createTime;
      this.inducti.salaryCard = this.form3.salaryCard;
      this.inducti.remark = this.form3.remark;
      // workother
      // this.findItemNameBYClass(this.inducti.sector);
      // this.findItemNameBYClass2(this.inducti.posts);
    },
    // 提交
    tij() {
      this.shujs();
      // 按钮
      this.an.xiug = true;
      // 文字数据
      // console.log(this.den,55)
      // console.log(this.den2,55)
      // this.form3.sector = "";
      // this.form3.posts = "";
      // this.form3.postsInfo = "";
      var bum = "";
      var gang = "";

      console.log(this.form3.employment, "数据");
      if (this.form3.employment == 1) {
        bum = this.form3.sector;
        gang = this.form3.posts;
      } else {
        bum = this.den;
        gang = this.den2;
      }
      var a = "";
      this.form3.employment == 7 ? (a = 0) : (a = 1);
      const workdata = this.workdata;
      const schoolprocess = this.schoolprocess;
      const workother = this.workother;
      const induction = this.inducti;
      const worker = {
        name: this.form.name,
        sector: bum,
        posts: gang,
        phone: this.form.phone,
        groupNumber: this.form.groupNumber,
        oid: this.form4.oid,
        card: this.form.card,
        employment: a,
        teamId: "",
        rate: "",
        ticket: "",
        sta: "",
        teamStatus: 0,
        id: store.state.renyuan[1].worker,
        reuseLine: this.form3.reuseLine,
      };
      // this.form.id = store.state.renyuan[1].workData;
      // this.form2.id = store.state.renyuan[1].schoolProcess;
      // this.form3.id = store.state.renyuan[1].induction;
      // this.form4.id = store.state.renyuan[1].workOther;
      // 图片数据
      let workFile = [];
      const pid = [];
      // 头像
      if (this.files != "") {
        workFile.push(this.files);
        pid.push("workDocuments");
      }
      // 身份证
      if (this.files22 != "") {
        workFile.push(this.files22);
        pid.push("cardPeople");
      }
      if (this.files33 != "") {
        workFile.push(this.files33);
        pid.push("cardNational");
      }
      if (this.files44 != "") {
        workFile.push(this.files44);
        pid.push("hukoubookHuzhu");
      }
      if (this.files55 != "") {
        workFile.push(this.files55);
        pid.push("hukoubookMyself");
      }
      // // 学历
      if (this.files3) {
        this.files3.forEach((res) => {
          if (res != "") {
            workFile.push(res.raw);
            pid.push("educationBook");
          }
        });
      }
      // 附件
      // workFile.push("null");
      // pid.push("annax");
      // 证书
      var i = 0;
      this.files4.forEach((res) => {
        i = i + 1;
        workFile.push(res.raw);
        pid.push("certificate" + i);
      });
      // 新增人员
      console.log(workdata, 1);
      console.log(schoolprocess, 2);
      console.log(workother, 3);
      console.log(induction, 4);
      console.log(worker, 5);
      // console.log();
      var urls = "";
      var urls2 = "";
      if (store.state.url.name == "employeeFiles") {
        urls = "worker/updataWork";
        urls2 = "worker/workFileUpload";
      } else {
        urls = "worker/updataWork";
        urls2 = "worker/workFileUpload";
      }
      // 提交
      postp(urls, {
        workdata,
        schoolprocess,
        workother,
        induction,
        worker,
      })
        .then((res) => {
          console.log(res.data);
          const formData = new FormData();
          for (var t = 0; t < workFile.length; t++) {
            formData.append("workFile", workFile[t]);
          }
          formData.append("pid", pid);
          formData.append("workinfoId", res.data);
          console.log(pid);
          for (let [key, value] of formData) {
            console.log("key:" + key, value, +" value:" + formData.get(key));
          }
          if (workFile != "") {
            postt(urls2, formData).then((res) => {
              // console.log(res);
              this.$message({
                message: res,
                type: "success",
              });
              // 按钮
              setTimeout(() => {
                this.an.xiug = false;
              }, 500);
              this.$router.push("/homepage/employeeFiles");
            });
          } else {
            // 按钮
            setTimeout(() => {
              this.an.xiug = false;
            }, 500);
            this.$router.push("/homepage/employeeFiles");
          }
        })
        .catch((error) => {
          console.log(error);
          this.an.xiug = false;
        });
    },
    // 个人
    reren() {
      this.cli = 0;
    },
    // 教育
    jiao() {
      this.cli = 1;
      // console.log(store.state.renyuan[1].schoolProcess, 1);
    },
    // 入职
    ruzhi() {
      this.cli = 2;
    },
    // 其他
    qi() {
      this.cli = 3;
    },
    // 头像
    handleAvatarSuccess(res, file) {
      // console.log(file);
      if (file) {
        this.imageUrl = file[file.length - 1].url;
        this.files = file[file.length - 1].raw;
      } else {
        this.imageUrl = this.aaa;
      }
    },
    handleAvatarSuccess2(res, file) {
      // console.log(file);
      if (file) {
        this.imageUrl2 = file[file.length - 1].url;
        this.files22 = file[file.length - 1].raw;
      } else {
        this.imageUrl2 = this.sz;
      }
    },
    handleAvatarSuccess3(res, file) {
      // console.log(file);
      if (file) {
        this.imageUrl3 = file[file.length - 1].url;
        this.files33 = file[file.length - 1].raw;
      } else {
        this.imageUrl3 = this.sf;
      }
    },
    handleAvatarSuccess4(res, file) {
      // console.log(file);
      if (file) {
        this.imageUrl4 = file[file.length - 1].url;
        this.files44 = file[file.length - 1].raw;
      } else {
        this.imageUrl4 = this.hz;
      }
    },
    handleAvatarSuccess5(res, file) {
      // console.log(file);
      if (file) {
        this.imageUrl5 = file[file.length - 1].url;
        this.files55 = file[file.length - 1].raw;
      } else {
        this.imageUrl5 = this.hf;
      }
    },
    // 教育
    handleAvatarSuccess6(res, file) {
      // console.log(file);
      if (file) {
        this.imageUrl6 = file[file.length - 1].url;
        this.files66 = file[file.length - 1].raw;
      } else {
        this.imageUrl6 = this.zs;
      }
      this.files3 = file;
    },
    handleAvatarSuccessQt(res, file) {
      console.log(file);
      this.files4 = file;
    },
    tanc() {
      this.show = true;
      this.zhen = [];
    },
    keys() {
      this.show = false;
      this.files4.forEach((res) => {
        console.log(res.url);
        this.zhen.push(res.url);
      });
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
.el-form {
  .el-input {
    min-width: 180px;
  }
  .el-select {
    min-width: 180px;
    width: 100%;
  }
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
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
  .tou {
    position: relative;
    // left: 20px;
    top: 35px;
    // z-index: 5;
    .avatar-uploader .el-upload {
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    img {
      width: 100% !important;
      height: 100% !important;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .froms {
    position: relative;
    top: -67px;
    left: 100px;
    width: 92%;
  }
  .but {
    position: relative;
    width: 100px;
    height: 30px;
    color: #ffffff;
    border-radius: 3px;
    top: 322px;
    left: -44px;
  }
  .col1 {
    background-color: #0077f1;
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
  .but {
    position: relative;
    width: 100px;
    height: 30px;
    color: #ffffff;
    border-radius: 3px;
    top: 470px;
    left: -70px;
  }
  .col1 {
    background-color: #0077f1;
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
  .but {
    position: relative;
    width: 100px;
    height: 30px;
    color: #ffffff;
    border-radius: 3px;
    top: 470px;
    left: -70px;
  }
  .col1 {
    background-color: #0077f1;
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
  .but {
    position: relative;
    // width: 100px;
    // height: 30px;
    color: #ffffff;
    border-radius: 3px;
    top: 470px;
    left: -70px;
  }
  .col1 {
    background-color: #0077f1;
  }
}
</style>