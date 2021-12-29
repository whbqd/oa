<template>
  <div class="employeeFiles">
    <!-- 标题 -->
    <div class="top">
      <div class="font" @click="reren" :class="{ col: cli == 0 }">
        <p>个人资料</p>
      </div>
      <div
        id="jy"
        class="font"
        @click="jiao"
        :class="{ col: cli == 1, dis: dis < 2 }"
      >
        <p>教育经历</p>
      </div>
      <div
        id="rz"
        class="font"
        @click="ruzhi"
        :class="{ col: cli == 2, dis: dis < 3 }"
      >
        <p>入职信息</p>
      </div>
      <div
        id="qt"
        class="font"
        @click="qi"
        :class="{ col: cli == 3, dis: dis < 4 }"
      >
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
          <el-form-item label="姓名 ：" :required="true">
            <el-input @input="usernameInput()" v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="民族 ：" :required="true">
            <el-input
              @input="usernameInput()"
              v-model="form.nationalities"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="户口性质 ：" :required="true">
            <el-select
              @change="usernameInput()"
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
          <el-form-item label="性别 ：" :required="true">
            <el-select v-model="form.gender" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
              <el-option label="未知" value="未知"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="政治面貌 ：" :required="true">
            <el-select
              @change="usernameInput()"
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
          <el-form-item label="户籍所在地 ：" :required="true">
            <el-input
              @input="usernameInput()"
              v-model="form.location"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="出生日期 ：" :required="true">
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
          <el-form-item label="家庭住址 ：" :required="true">
            <el-input
              @input="usernameInput()"
              v-model="form.homeAddress"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="紧急联系人姓名 ：" :required="true">
            <el-input
              @input="usernameInput()"
              v-model="form.contactName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="身份证号 ：" :required="true">
            <el-input @input="usernameInput()" v-model="form.card"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话 ：" :required="true">
            <el-input @input="usernameInput()" v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="紧急联系人电话 ：" :required="true">
            <el-input
              @input="usernameInput()"
              v-model="form.contactPhone"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="集团号 ：">
            <el-input
              @input="usernameInput()"
              v-model="form.groupNumber"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- 上传证件 -->
        <el-col :span="20">
          <el-form-item
            label="附件 ：身份证正面，身份证反面，户口户主，户口本人页"
            style="margin-left: -80px"
          >
            <!-- <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              ref="pictureUpload"
              :limit="4"
              :on-change="handleAvatarSuccessZj"
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
      <button class="but col1" @click="xia1">下一步</button>
    </div>
    <!-- 教育经历 -->
    <div v-show="cli == 1" class="experience">
      <el-form :model="form2" label-width="140px" class="froms">
        <el-col :span="8">
          <el-form-item label="毕业院校 ：" :required="true">
            <el-input
              @input="usernameInput()"
              v-model="form2.graduateSchools"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学历 ：" :required="true">
            <!-- <el-input @input="usernameInput()" v-model="form2.education"></el-input> -->
            <el-select v-model="form2.education" placeholder="请选择学历">
              <el-option label="初中及以下" value="初中及以下"></el-option>
              <el-option label="中专" value="中专"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="全日制专科" value="全日制专科"></el-option>
              <el-option label="全日制本科" value="全日制本科"></el-option>
              <el-option label="其他专科" value="其他专科"></el-option>
              <el-option label="其他本科" value="其他本科"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专业 ：" :required="true">
            <el-input
              @input="usernameInput()"
              v-model="form2.specialty"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="毕业时间 ：" :required="true">
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
          <el-form-item label="学位 ：" :required="true">
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
            <el-input
              @input="usernameInput()"
              v-model="form2.certificateNumber"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- 上传证件 -->
        <el-col :span="24">
          <el-form-item label="学历证书 ：">
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              ref="pictureUpload2"
              :limit="1"
              :on-change="handleAvatarSuccessJy"
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
          </el-form-item>
        </el-col>
      </el-form>
      <button class="but col1" @click="xia2">下一步</button>
    </div>
    <!-- 入职信息 -->
    <div v-show="cli == 2" class="information">
      <el-form :model="form3" label-width="140px" class="froms">
        <el-col :span="8">
          <el-form-item label="隶属单位 ：" :required="true">
            <el-select
              @change="usernameInput()"
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
          <el-form-item label="用工属性 ：" :required="true">
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
          <el-form-item label="合同性质 ：" :required="true">
            <el-select
              @change="usernameInput()"
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
          <el-form-item label="所在部门 ：" :required="true">
            <el-select
              @change="findItemNameBYClass"
              v-model="form3.sector"
              placeholder="请选择所在部门"
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
          <el-form-item label="岗位 ：" :required="true">
            <el-select
              v-model="form3.posts"
              placeholder="请选择所在岗位"
              @change="findItemNameBYClass2"
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
          <el-form-item label="入职时间 ：" :required="true">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="form3.entryTime"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="条线 ：" :required="true">
            <el-select v-model="form3.line" placeholder="请选择条线">
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
            <el-select v-model="form3.reuseLine" placeholder="请选择条线">
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
            <!-- <el-input @input="usernameInput()" v-model="form3.postsInfo"></el-input> -->
            <el-select v-model="form3.postsInfo" placeholder="请选择所在岗位">
              <el-option
                v-for="(zhiCheng, index) in zhiCheng"
                :key="index"
                :label="zhiCheng.professionalTitle"
                :value="zhiCheng.professionalTitle"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="入职次数 ：">
            <el-input @input="usernameInput()" v-model="form3.entriesNum"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="合同编号 ：">
            <el-input
              @input="usernameInput()"
              v-model="form3.contractNumber"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="服务年限 ：">
            <el-input @input="usernameInput()" v-model="form3.serviceLife"></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="8">
          <el-form-item label="合同到期 ：" :required="true">
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
          <el-form-item label="首次签订合同 ：" :required="true">
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
          <el-form-item label="合同起始 ：" :required="true">
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
          <el-form-item label="开户银行 ：" :required="true">
            <el-input
              @input="usernameInput()"
              v-model="form3.bankAccount"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="社保缴纳 ：" :required="true">
            <el-select v-model="form3.socialSecurity" placeholder="社保缴纳">
              <el-option label="是" value="0"></el-option>
              <el-option label="否" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工资卡号 ：" :required="true">
            <el-input
              @input="usernameInput()"
              v-model="form3.salaryCard"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="备注 ：">
            <el-input
              @input="usernameInput()"
              v-model="form3.remark"
              type="textarea"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <button class="but col1" @click="xia3">下一步</button>
    </div>
    <!-- 其他相关 -->
    <div v-show="cli == 3" class="other">
      <el-form :model="form4" label-width="140px" class="froms">
        <!-- <el-col :span="8">
          <el-form-item label="车辆 ：">
            <el-input @input="usernameInput()" v-model="form4.car"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工器具 ：">
            <el-input @input="usernameInput()" v-model="form4.tools"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="劳保 ：">
            <el-input @input="usernameInput()" v-model="form4.laoBao"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="oid ：">
            <el-input @input="usernameInput()" v-model="form4.oid"></el-input>
          </el-form-item>
        </el-col> -->
        <!-- 上传证件 -->
        <el-col :span="24">
          <el-form-item label="证书 ：">
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
          </el-form-item>
        </el-col>
      </el-form>
      <el-button class="but col1" @click="hei" :loading="an.xinz"
        >提交</el-button
      >
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible2"
      append-to-body
      width="30%"
    >
      <span>该人员在黑名单是否继续添加</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="(dialogVisible2 = false), (an.xinz = false)"
          >取 消</el-button
        >
        <el-button type="primary" @click="removeBlack">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible3"
      append-to-body
      width="30%"
    >
      <span>该人员在离职名单是否继续添加</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="(dialogVisible3 = false), (an.xinz = false)"
          >取 消</el-button
        >
        <el-button type="primary" @click="tijs">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import store from "../../store/index";
import { postp, gets, postt, posts } from "../../request/wan";
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
        entryTime: "",
        line: "",
        contractExpired: "",
        firstContract: "",
        contractInitiation: "",
        bankAccount: "",
        socialSecurity: "",
        salaryCard: "",
        active: "是",
        entriesNum: "",
        contractNumber: "",
        serviceLife: "",
        actual: "",
        separationTime: "",
        createTime: "",
        remark: "",
        postsInfo: "",
        reuseLine: "",
        // 文字部门
        den: "",
        den2: "",
      },
      // 其他
      form4: { car: "", tools: "", laoBao: "", oid: "" },
      // 上传
      imageUrl: "",
      imageUrl2: "",
      imageUrl3: "",
      imageUrl4: "",
      imageUrl5: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      // 是否黑名单
      dialogVisible2: false,
      // 是否离职
      dialogVisible3: false,
      // 自动获取
      company: [],
      recruit: [],
      contract: [],
      department: [],
      zhiCheng: [],
      post: [],
      reuseLines: [],
      // 组织构架
      datas: [],
      // 图片文件
      // 头像
      files: [],
      files3: [],
      files4: [],
      files22: [],
      files33: [],
      files44: [],
      files55: [],
      // 空数据判断
      kong: 0,
      // 黑名单，离职修改ID
      workinfo: "",
      // 按钮状态
      an: {
        xinz: false,
        xiug: false,
      },
    };
  },
  created() {
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
    // 职称
    gets("ProfessionalTitle/getProfessionalTitlePage").then((res) => {
      this.zhiCheng = res.data.items;
      console.log(res.data, 55664464);
    });
    // 复用条线
    gets("ReuseLine/getReuseLine").then((res) => {
      // console.log(res, "复用");
      this.reuseLines = res.data;
      this.counts = res.data.length;
    });
    // 组织构架
    gets("sector/getSector")
      .then((res) => {
        // console.log(res.data);
        this.datas = res.data;
        // console.log("d ", this.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(JSON.parse(JSON.stringify(store.state.newPeople1)), "保留数据");
    // console.log(JSON.parse(JSON.stringify(store.state.newPeople2)), "保留数据");
    // console.log(JSON.parse(JSON.stringify(store.state.newPeople3)), "保留数据");
    // console.log(JSON.parse(JSON.stringify(store.state.newPeople4)), "保留数据");
    for (var p = 1; p <= 4; p++) {
      var shu = JSON.parse(JSON.stringify(store.state["newPeople" + p]));
      // console.log(shu, "保留数据");
      // console.log(Object.keys(shu).length , "保留999");
      if (Object.keys(shu).length != 0) {
        this.$confirm("是否读取前一次数据", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.form = store.state.newPeople1;
            this.form2 = store.state.newPeople2;
            this.form3 = store.state.newPeople3;
            console.log(this.form3);
            this.form4 = store.state.newPeople4;
          })
          .catch(() => {
            store.state.newPeople1 = {};
            store.state.newPeople2 = {};
            store.state.newPeople3 = {};
            store.state.newPeople4 = {};
          });
      }
    }
  },
  methods: {
    usernameInput() {
      console.log("输入了");
      store.state.newPeople1 = this.form;
      store.state.newPeople2 = this.form2;
      store.state.newPeople3 = this.form3;
      store.state.newPeople4 = this.form4;
    },
    // 自动获取部门
    qing() {
      var aa = 0;
      console.log(this.datas, 8888);

      console.log(this.datas[0], 9999);
      Object.keys(this.datas[0]).forEach((key) => {
        console.log(key);
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
    // 自动获取岗位
    findItemNameBYClass(e) {
      console.log(e);
      let obj = {};
      obj = this.department.find((item) => {
        //这里的userList就是上面遍历的数据源
        return item.id === e; //筛选出匹配数据
      });
      this.form3.den = obj.label;
      gets("posts/getPostsBySector", { sector: obj.label }).then((res) => {
        // console.log(res.data, 666);
        // this.post = res.data;
        res.data == ""
          ? (this.form3.posts = "暂无空缺名额岗位")
          : ((this.post = res.data), (this.form3.posts = ""));
      });
    },
    // 岗位名称
    findItemNameBYClass2(e) {
      console.log(e);
      let obj = {};
      obj = this.post.find((item) => {
        //这里的userList就是上面遍历的数据源
        return item.id === e; //筛选出匹配数据
      });
      // console.log(obj)
      this.form3.den2 = obj.postsName;
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
    // 下一步1
    xia1() {
      this.dis = 2;
      document.getElementById("jy").click();
    },
    xia2() {
      this.dis = 3;
      document.getElementById("rz").click();
      if (this.department == "") {
        this.qing();
      }
    },
    xia3() {
      this.dis = 4;
      document.getElementById("qt").click();
    },
    phones(sp) {
      if (sp == 0) {
        this.kong = 4;
        this.an.xinz = false;
        this.$message({
          message: "请使用移动号码",
          type: "error",
        });
        return;
      }
    },
    // 判断空数据
    empty() {
      const aa = Object.values(this.form);
      const bb = Object.values(this.form2);
      const cc = Object.values(this.form3);
      var sp = 0;
      var top = this.form.phone.slice(0, 3);
      var topPhone = [
        150, 151, 152, 153, 157, 158, 159, 134, 135, 136, 137, 138, 139, 178,
        182, 183, 184, 187, 188, 147, 195, 198,
      ];

      for (let a = 0; a < topPhone.length; a++) {
        if (top == topPhone[a]) {
          console.log(top);
          console.log(topPhone[a]);
          sp = 1;
        }
      }
      for (var i = 0; i < aa.length - 2; i++) {
        if (aa[i] == "") {
          console.log(i);
          this.kong = 1;
          switch (i) {
            case 0:
              this.$message({
                message: "请输入姓名",
                type: "error",
              });
              break;
            case 1:
              this.$message({
                message: "请输入民族",
                type: "error",
              });
              break;
            case 2:
              this.$message({
                message: "请选择户口性质",
                type: "error",
              });
              break;
            case 3:
              this.$message({
                message: "请选择性别",
                type: "error",
              });
              break;
            case 4:
              this.$message({
                message: "请选择政治面貌",
                type: "error",
              });
              break;
            case 5:
              this.$message({
                message: "请输入户籍所在地",
                type: "error",
              });
              break;
            case 6:
              this.$message({
                message: "请选择出生日期",
                type: "error",
              });
              break;
            case 7:
              this.$message({
                message: "请输入家庭住址",
                type: "error",
              });
              break;
            case 8:
              this.$message({
                message: "请输入紧急联系人姓名",
                type: "error",
              });
              break;
            case 9:
              this.$message({
                message: "请输入身份证号",
                type: "error",
              });
              break;
            case 10:
              this.$message({
                message: "请输入联系电话",
                type: "error",
              });
              break;
            case 11:
              this.$message({
                message: "请输入紧急联系人电话",
                type: "error",
              });
              break;
          }
          this.an.xinz = false;
          return;
        }
      }
      for (var a = 0; a < bb.length - 1; a++) {
        if (bb[a] == "") {
          console.log(a);
          this.kong = 2;
          switch (a) {
            case 0:
              this.$message({
                message: "请输入毕业院校",
                type: "error",
              });
              console.log(a);
              break;
            case 1:
              this.$message({
                message: "请输入学历",
                type: "error",
              });
              console.log(a);
              break;
            case 2:
              this.$message({
                message: "请输入专业",
                type: "error",
              });
              console.log(a);

              break;
            case 3:
              this.$message({
                message: "请选择毕业时间",
                type: "error",
              });
              console.log(a);
              break;
            case 4:
              this.$message({
                message: "请选择学位",
                type: "error",
              });
              console.log(a);
              break;
          }
          this.an.xinz = false;
          return;
        }
      }
      for (var c = 0; c < cc.length - 12; c++) {
        if (cc[c] == "") {
          this.kong = 3;
          console.log(c);
          switch (c) {
            case 0:
              this.$message({
                message: "请选择隶属单位",
                type: "error",
              });
              break;
            case 1:
              this.$message({
                message: "请选择用工属性",
                type: "error",
              });

              break;
            case 2:
              this.$message({
                message: "请选择合同性质",
                type: "error",
              });
              break;
            case 3:
              this.$message({
                message: "请选择所在部门",
                type: "error",
              });

              break;
            case 4:
              this.$message({
                message: "请选择所在岗位",
                type: "error",
              });

              break;
            case 5:
              this.$message({
                message: "请选择入职时间",
                type: "error",
              });

              break;
            case 6:
              this.$message({
                message: "请选择所在条线",
                type: "error",
              });

              break;
            case 7:
              this.$message({
                message: "请选择合同到期时间",
                type: "error",
              });

              break;
            case 8:
              this.$message({
                message: "请选择首次签订合同时间",
                type: "error",
              });

              break;

            case 9:
              this.$message({
                message: "请选择合同起始时间",
                type: "error",
              });

              break;
            case 10:
              this.$message({
                message: "请输入开户银行",
                type: "error",
              });
              break;
            case 11:
              this.$message({
                message: "请选择社保是否缴纳",
                type: "error",
              });
              break;
            case 12:
              this.$message({
                message: "请输入工资卡号",
                type: "error",
              });
              break;
            case 13:
              this.$message({
                message: "请输入条线",
                type: "error",
              });
              break;
          }
          this.an.xinz = false;
          return;
        }
      }
      gets("Phone/checkPhone" + "?phone=" + this.form.phone).then((res) => {
        console.log(res.data, "号码");
        if (res.data == true) {
          sp = 1;
        }
        this.phones(sp);
      });
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
          message: "该时间段暂停入职",
          type: "error",
        });
        this.an.tijiao = false;
      }
    },
    // 是否移除黑名单
    removeBlack() {
      // 移除黑名单
      posts("BlackList/deleteBlackList", {
        ids: this.remove,
      }).then((res) => {
        console.log(res);
        console.log("移除成功");
        this.hei();
      });
    },
    // 黑名单校验
    hei() {
      this.an.xinz = true;
      this.dateFormat();
      if (this.kong != 1) {
        this.empty();
      }
      console.log(this.kong, "空数据");
      if (this.kong != 0) {
        console.log(123);
        console.log(this.kong);
        this.kong = 0;
        console.log(this.kong);
        return;
      }
      // 是否黑名单
      gets("BlackList/checkBlackList", { card: this.form.card }).then((res) => {
        console.log(res.data);
        if (!res.data.bool) {
          this.dialogVisible2 = true;
          this.remove = res.data.id;
        } else {
          // this.tij();
          gets("Remployment/chackActive", { card: this.form.card }).then(
            (res) => {
              if (!res.data.message) {
                this.workinfo = res.data.workinfo;
                this.dialogVisible3 = true;
                // 离职修改
                gets(
                  "Remployment/updateActive" + "?id=" + this.workinfo.induction
                ).then((res) => {
                  console.log(res.data);
                });
              } else {
                this.tij();
              }
            }
          );
        }
      });

      // 是否离职
      // gets("Remployment/chackActive", { card: this.form.card }).then((res) => {
      //   console.log(res);
      //   if (!res.data.message) {
      //     this.workinfo = res.data.workinfo;
      //     this.dialogVisible3 = true;
      //     // 离职修改
      //     gets(
      //       "Remployment/updateActive" + "?id=" + this.workinfo.induction
      //     ).then((res) => {
      //       console.log(res.data);
      //     });
      //   } else {
      //     // 是否黑名单
      //     gets("BlackList/checkBlackList", { card: this.form.card }).then(
      //       (res) => {
      //         console.log(res.data);
      //         if (!res.data.bool) {
      //           this.dialogVisible2 = true;
      //           this.remove = res.data.id;
      //         } else {
      //           this.tij();
      //         }
      //       }
      //     );
      //   }
      // });
    },
    // 提交
    tij() {
      // 文字数据
      // console.log(this.den,55)
      // console.log(this.den2,55)
      // 按钮
      // 生成表单
      const workdata = this.form;
      const schoolprocess = this.form2;
      const workother = this.form4;
      const induction = this.form3;
      const worker = {
        line: this.form3.line,
        name: this.form.name,
        sector: this.form3.den,
        posts: this.form3.den2,
        phone: this.form.phone,
        groupNumber: this.form.groupNumber,
        title: this.form3.postsInfo,
        oid: this.form4.oid,
        card: this.form.card,
        teamId: "",
        rate: "",
        ticket: "",
        sta: "",
        teamStatus: 0,
        reuseLine: this.form3.reuseLine,
      };
      // console.log(this.form, 1);
      // console.log(this.form2, 2);
      // console.log(this.form3, 3);
      // console.log(this.form4, 4);
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
      this.files3.forEach((res) => {
        if (res) {
          workFile.push(res.raw);
          pid.push("educationBook");
        }
      });
      // 附件
      workFile.push("");
      console.log(workFile);
      // 证书
      var i = 0;
      this.files4.forEach((res) => {
        i = i + 1;
        workFile.push(res.raw);
        pid.push("certificate" + i);
      });
      // console.log(workFile);
      // 新增人员
      postp("work/insertWork", {
        workdata,
        schoolprocess,
        workother,
        induction,
        worker,
      })
        .then((res) => {
          var k = 0;
          console.log(res.data);
          if (res.data == "插入数据失败") {
            this.$message({
              message: "插入数据失败,该人员已录入",
              type: "error",
            });
            // 按钮
            setTimeout(() => {
              this.an.xinz = false;
            }, 500);
            return;
          }
          const formData = new FormData();
          for (var t = 0; t < workFile.length - 1; t++) {
            if (workFile[t] == "") {
              k++;
            }
            formData.append("workFile", workFile[t]);
          }
          formData.append("pid", pid);
          formData.append("workinfoId", res.data);
          // 成功后发送图片
          console.log(k);
          if (k != 6 && res.data != "插入数据失败") {
            postt("/work/workFileUpload", formData)
              .then((res) => {
                // console.log(res);
                this.$message({
                  message: res,
                  type: "success",
                });
                // 按钮
                setTimeout(() => {
                  this.an.xinz = false;
                }, 500);
                this.$router.push("/homepage/employeeFiles");
              })
              .catch(() => {
                this.an.xinz = false;
                this.$message({
                  message: "插入图片失败",
                  type: "error",
                });
              });
          } else {
            this.$message({
              message: "插入成功",
              type: "success",
            });
            // 按钮
            setTimeout(() => {
              this.an.xinz = false;
            }, 500);
            this.$router.push("/homepage/employeeFiles");
          }
        })
        .catch(() => {
          this.$message({
            message: "插入数据失败",
            type: "error",
          });
          this.an.xinz = false;
        });
    },
    // 离职或黑名单修改提交
    // 提交
    tijs() {
      // 文字数据
      // console.log(this.den,55)
      // console.log(this.den2,55)
      var a = "";
      this.form3.employment == 7 ? (a = 0) : (a = 1);
      // this.form3.sector = "";
      // this.form3.posts = "";
      this.form3.postsInfo = "";
      const workdata = this.form;
      const schoolprocess = this.form2;
      const workother = this.form4;
      const induction = this.form3;
      const worker = {
        name: this.form.name,
        sector: this.form3.den,
        posts: this.form3.den2,
        phone: this.form.phone,
        // title: this.form3.postsInfo,
        groupNumber: this.form.groupNumber,
        oid: this.form4.oid,
        card: this.form.card,
        employment: a,
        teamId: "",
        rate: "",
        ticket: "",
        sta: "",
        teamStatus: 0,
        id: this.workinfo.worker,
        active: 0,
      };
      this.form.id = this.workinfo.workData;
      this.form2.id = this.workinfo.schoolProcess;
      this.form3.id = this.workinfo.induction;
      this.form4.id = this.workinfo.workOther;
      // console.log(this.form, 1);
      // console.log(this.form2, 2);
      // console.log(this.form3, 3);
      // console.log(this.form4, 4);
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
      console.log(workdata);
      console.log(schoolprocess);
      console.log(workother);
      console.log(induction);
      console.log(worker);
      // console.log();
      var urls = "";
      var urls2 = "";
      urls = "work/updataWork";
      urls2 = "work/workFileUpload";
      postp(urls, {
        workdata,
        schoolprocess,
        workother,
        induction,
        worker,
      }).then((res) => {
        console.log(res.data);
        const formData = new FormData();
        for (var t = 0; t < workFile.length; t++) {
          formData.append("workFile", workFile[t]);
        }
        formData.append("pid", pid);
        formData.append("workinfoId", res.data);
        console.log(pid);
        // 成功后发送图片;
        if (workFile != "") {
          postt(urls2, formData).then((res) => {
            // console.log(res);
            this.$message({
              message: res,
              type: "success",
            });
            this.$router.push("/homepage/employeeFiles");
          });
        } else {
          this.$router.push("/homepage/employeeFiles");
        }
      });
    },
    // 个人
    reren() {
      this.cli = 0;
    },
    // 教育
    jiao() {
      this.cli = 1;
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
      this.imageUrl = file[file.length - 1].url;
      this.files = file[file.length - 1].raw;
    },
    handleAvatarSuccess2(res, file) {
      // console.log(file);
      this.imageUrl2 = file[file.length - 1].url;
      this.files22 = file[file.length - 1].raw;
    },
    handleAvatarSuccess3(res, file) {
      // console.log(file);
      this.imageUrl3 = file[file.length - 1].url;
      this.files33 = file[file.length - 1].raw;
    },
    handleAvatarSuccess4(res, file) {
      // console.log(file);
      this.imageUrl4 = file[file.length - 1].url;
      this.files44 = file[file.length - 1].raw;
    },
    handleAvatarSuccess5(res, file) {
      // console.log(file);
      this.imageUrl5 = file[file.length - 1].url;
      this.files55 = file[file.length - 1].raw;
    },
    handleAvatarSuccessZj(res, file) {
      // console.log(file);
      this.files2 = file;
    },
    // 教育
    handleAvatarSuccessJy(res, file) {
      // console.log(file);
      this.files3 = file;
    },
    handleAvatarSuccessQt(res, file) {
      // console.log(file);
      this.files4 = file;
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
    height: 35px;
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
    height: 35px;
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
    height: 35px;
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
  .but {
    position: relative;
    width: 100px;
    height: 35px;
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