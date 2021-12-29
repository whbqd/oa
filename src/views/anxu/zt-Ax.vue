<template>
  <div class="ax">
    <div class="search-box">
      <div class="item">
        <label for="" class="mr10">区县:</label
        ><Select
          v-model="county"
          clearable
          style="width: 200px"
          :disabled="!isjudge"
        >
          <Option
            v-for="item in deptList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <div class="item">
        <label for="" class="mr10">时间:</label>
        <Col span="12">
          <DatePicker
            format="yyyy/MM/dd"
            placement="bottom-end"
            placeholder="Select date"
            style="width: 200px"
            v-model="fileUpload"
          ></DatePicker>
        </Col>
      </div>
      <div class="item" v-if="axType !== 'Fqx' && axType !== 'Fgq'">
        <Input
          search
          enter-button
          placeholder="搜索宽带账号"
          v-model="accountNumber"
        />
      </div>
      <div
        class="item"
        v-if="axType !== 'Fqx' && axType !== 'Fgq' && axType !== 'Lx'"
      >
        <Input search enter-button placeholder="搜索地址" v-model="address" />
      </div>
      <!-- <Spin size="small" fix v-if="loading"></Spin> -->
    </div>
    <div class="content">
      <div class="content-button">
        <div class="lf">
          <Button type="success" @click="inShow = true"
            ><Icon type="md-cloud-upload" /> 批量导入</Button
          >
          <Button type="info" @click="download($event)"
            ><Icon type="md-cloud-download" /> 导出</Button
          >
          <Button type="info" @click="isBachDownBox = true"
            ><Icon type="md-cloud-download" /> 批量导出</Button
          >
          <Button type="primary" @click="inPd = true"
            ><Icon type="md-bug" /> 批量派单</Button
          >
          <Button type="error" @click="removeIndex"
            ><icon type="md-trash"></icon> 删除选中</Button
          >
          <Button
            type="error"
            @click="
              () => {
                inDelBox = true;
              }
            "
            ><icon type="ios-trash"></icon> 批量删除</Button
          >
          <Button
            type="warning"
            @click="
              () => {
                this.inFilterBox = true;
              }
            "
            ><Icon type="ios-funnel" /> 筛选</Button
          >
          <Spin size="large" fix v-if="loading"></Spin>
        </div>
        <div class="rt">
          <!-- <Button type="info">统计</Button> -->
          <label for="">按需分类:</label>
          <Select
            v-model="axType"
            style="
              width: 200px;
              margin-left: 30px;
              margin-right: 30px;
              text-align: center;
            "
          >
            <Option
              v-for="item in axTypeList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
          <label for="">派单状态:</label>
          <Select
            v-model="status"
            style="
              width: 200px;
              margin-left: 30px;
              margin-right: 30px;
              text-align: center;
            "
          >
            <Option
              v-for="item in pdList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </div>
      </div>
      <div class="content-table">
        <Table
          max-height="500"
          border
          ref="selection"
          :columns="columns"
          :data="filterData"
          @on-select="getIdList"
          @on-select-all="getIdList"
          @on-selection-change="getIdList"
          @on-select-cancel="getIdList"
          @on-select-all-cancel="getIdList"
          :loading="loading"
          stripe
        >
          <template slot-scope="{ index }" slot="action">
            <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="show(index)"
              :disabled="filterData[index].completion === '完成整改'"
              ><Icon type="md-git-pull-request" />
              {{
                filterData[index].completion === "完成整改" ? "已" : ""
              }}派单</Button
            >
            <Button
              type="success"
              size="small"
              @click="edit(index)"
              style="margin-right: 5px"
              :disabled="filterData[index].completion === '完成整改'"
              ><icon type="md-build"></icon> 修改</Button
            >
            <Button type="error" size="small" @click="view(index)"
              ><icon type="md-eye"></icon> 查看</Button
            >
          </template>
        </Table>
        <div style="margin: 10px; overflow: hidden">
          <div style="float: right">
            <Page
              :total="total"
              :current="1"
              @on-change="changePage"
              @on-page-size-change="changeSizePage"
              show-sizer
              :page-size-opts="[20, 30, 40, 50, 60, 80, 100, 200]"
            ></Page>
          </div>
        </div>
      </div>
    </div>

    <!--批量导入弹窗-->
    <Modal
      title="批量导入"
      v-model="inShow"
      :closable="false"
      @on-ok="inSubmit"
      @on-cancel="inCancel"
      okText="导入"
      cancelText="取消"
      :loading="isUploadOk"
    >
      <div style="margin: 15px 0">
        当前表类型<strong>(可在按需分类里修改)：{{ tableTypeCompute }} </strong
        ><a
          href="javascript:void(0);"
          style="margin-left: 20px"
          @click.stop="downloadTemplate"
          >下载{{ tableTypeCompute }}模板</a
        >
      </div>
      <Form :label-width="150">
        <FormItem label="请选择要上传的类型:">
          <Select v-model="uploadType" style="width: 168px">
            <slot>111</slot>
            <Option
              v-for="item in uploadList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="选择日期:">
          <Col span="12">
            <DatePicker
              type="month"
              placeholder="Select date"
              v-model="date"
            ></DatePicker>
          </Col>
        </FormItem>
      </Form>

      <Upload
        style="margin-left: 150px; width: 100%"
        :before-upload="handleUpload"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        multiple
        action="//jsonplaceholder.typicode.com/posts/"
      >
        <Button icon="ios-cloud-upload-outline">点击选择上传文件</Button>
      </Upload>
      <template v-if="file">
        <div>
          已选择上传的文件: {{ this.file.name }}
          <Icon
            type="md-close"
            style="margin-left: 10px; cursor: pointer"
            @click="handleRemoveFile()"
          />
        </div>
      </template>
    </Modal>

    <!-- 批量派单 -->
    <Modal
      title="批量派单"
      v-model="inPd"
      :closable="false"
      @on-ok="inPdSubmit"
      @on-cancel="inCancel"
      okText="导入"
      cancelText="取消"
      :loading="isUploadOk"
    >
      <div style="margin: 15px 0">
        当前表类型<strong>(可在按需分类里修改)：{{ tableTypeCompute }} </strong>
        <!-- <a
          href="javascript:void(0);"
          style="margin-left: 20px"
          @click.stop="downloadTemplate"
          >下载{{ tableTypeCompute }}模板</a
        > -->
      </div>
      <Form :label-width="150">
        <FormItem label="请选择要上传的类型:">
          <Select v-model="uploadType" style="width: 168px">
            <slot>111</slot>
            <Option
              v-for="item in uploadList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="选择日期:">
          <Col span="12">
            <DatePicker
              type="month"
              placeholder="Select date"
              v-model="date"
            ></DatePicker>
          </Col>
        </FormItem>
      </Form>

      <Upload
        style="margin-left: 150px; width: 100%"
        :before-upload="handleUpload"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        multiple
        action="//jsonplaceholder.typicode.com/posts/"
      >
        <Button icon="ios-cloud-upload-outline">点击选择上传文件</Button>
      </Upload>
      <template v-if="file">
        <div>
          已选择上传的文件: {{ this.file.name }}
          <Icon
            type="md-close"
            style="margin-left: 10px; cursor: pointer"
            @click="handleRemoveFile()"
          />
        </div>
      </template>
    </Modal>
    <!-- 批量删除弹窗 -->
    <Modal
      v-model="inDelBox"
      title="批量删除"
      @on-ok="inDel"
      okText="确认删除"
      cancelText="取消"
    >
      <div style="margin-bottom: 30px; margin-top: 10px">
        当前表类型：<strong>{{ tableTypeCompute }}</strong>
      </div>
      <span style="margin-right: 10px">删除的时间段:</span>
      <DatePicker
        v-model="timeDel"
        type="daterange"
        format="yyyy/MM/dd"
        placeholder="Select date"
        style="width: 200px"
      ></DatePicker>
    </Modal>
    <!-- 批量导出弹窗 -->
    <Modal
      v-model="isBachDownBox"
      title="批量导出"
      @on-ok="batchDownload"
      okText="导出"
      cancelText="取消"
    >
      <div style="margin-bottom: 30px; margin-top: 10px">
        当前表类型：<strong>{{ tableTypeCompute }}</strong>
      </div>
      <span style="margin-right: 10px">导出的时间段:</span>
      <DatePicker
        v-model="timeDownload"
        type="daterange"
        format="yyyy/MM/dd"
        placeholder="Select date"
        style="width: 200px"
      ></DatePicker>
    </Modal>

    <!-- 高级筛选 -->
    <Modal
      v-model="inFilterBox"
      title="高级筛选"
      @on-ok="inFilter"
      okText="筛选"
      cancelText="取消"
    >
      <Hxzg v-if="axType === 'Hxzg'" ref="filter"
        ><strong>当前表类型：{{ tableTypeCompute }} </strong></Hxzg
      >
      <Fqx v-else-if="axType === 'Fqx'" ref="filter">
        <strong>当前表类型：{{ tableTypeCompute }} </strong></Fqx
      >
      <Fgq v-else-if="axType === 'Fgq'" ref="filter">
        <strong>当前表类型：{{ tableTypeCompute }} </strong></Fgq
      >
      <Lx v-else ref="filter"
        ><strong>当前表类型：{{ tableTypeCompute }} </strong></Lx
      >
    </Modal>
  </div>
</template>

<script>
import { getAx, delAx, uploadFile, delForDate } from "@/api/getAxApi";
import { getColums } from "../../util/colum";
import { formatData, getAllDept, judge } from "../../util";
import { mapState } from "vuex";
import URL from "../../http/URL";
export default {
  components: {
    Hxzg: () => import("@/components/axScreen/HxzgFilter"),
    Fqx: () => import("@/components/axScreen/FqxFilter"),
    Fgq: () => import("@/components/axScreen/FgqFilter"),
    Lx: () => import("@/components/axScreen/LxFilter"),
  },
  data() {
    return {
      isjudge: false,
      isBachDownBox: false, // 是否显示批量导出box
      timeDownload: [], //批量导出时间段
      inFilterBox: false, //是否显示筛选框
      loading: true,
      idList: null, //选中的id列表
      uploadType: 0, //选中上传类型
      date: "", //上传数据时间

      uploadList: [
        {
          value: 1,
          label: "户线整改",
        },
        {
          value: 2,
          label: "分纤箱",
        },
        {
          value: 3,
          label: "分光器",
        },
        {
          value: 4,
          label: "零星",
        },
      ],
      file: "", //批量上传文件列表
      inShow: false, //是否显示导入弹窗
      inPd: false,
      data3: this.getMockData(),
      targetKeys3: this.getTargetKeys(),
      listStyle: {
        width: "250px",
        height: "300px",
      },
      axType: "Hxzg", //表类型
      axTypeList: [
        {
          value: "Hxzg",
          label: "户线整改",
        },
        {
          value: "Fqx",
          label: "分纤箱",
        },
        {
          value: "Fgq",
          label: "分光器",
        },
        {
          value: "Lx",
          label: "零星",
        },
      ],

      fileUpload: "",

      deptList: getAllDept(),

      pdList: [
        {
          value: -1,
          label: "全部",
        },
        {
          value: 1,
          label: "已派单",
        },
        {
          value: 0,
          label: "未派单",
        },
      ],
      accountNumber: "", //搜索宽带账号
      address: "", //搜索地址
      columns: null,
      data1: [], //table data

      page: 1,
      pageSize: 10,
      total: 0, //总条数

      timer: null,
      isUploadOk: true,
      timeDel: [], //删除时间段
      inDelBox: false, //删除弹窗 是否显示

      county: "", //区县select
      status: "", //派单状态
      //默认户线整改 高级查询
      itemForm: {
        deviceName: "", //设备接入名称
        contactNumber: "", //手机
        lowerTime: "", //下派时间
        personnel: "", //整改人员
        periodTime: "", //整改有效期
        test: "", //质检
        completion: "", //是否完成
      },
    };
  },
  watch: {
    //表类型改变
    axType() {
      const { axType } = this;
      if (axType === "Hxzg") {
        this.itemForm = {
          deviceName: "", //设备接入名称
          contactNumber: "", //手机
          lowerTime: "", //下派时间
          personnel: "", //整改人员
          periodTime: "", //整改有效期
          test: "", //质检
          completion: "", //是否完成
        };
      } else if (axType === "Fqx") {
        this.itemForm = {
          name: "", //名称
          site: "", //所属站点
          computerRoom: "", //所属机房
          networkPoints: "", //所属网络资源
          location: "", //具体位置
          lowerTime: "", //下派时间
          correctivePersonnel: "", //整改人员
          correctiveTime: "", //整改有效期
          test: "", //质检
          completion: "", //是否完成
        };
      } else if (axType === "Fgq") {
        this.itemForm = {
          spectrometerName: "", //分光器名称
          site: "", //所属站点
          computerRoom: "", //所属机房
          networkResource: "", //所属网络资源点
          attributionOlt: "", //归属OLT
          nextTime: "", //下派时间
          correctivePersonnel: "", //下派小组
          personnel: "", //整改人员
          rectificationDate: "", //整改有效期
          qualityInspection: "", //质检
          completion: "", //是否完成
        };
      } else if (axType === "Lx") {
        this.itemForm = {
          number: "", //工单编号
          finishTime: "", //工单完成时间
          spectroscopeName: "", //分光器名称
          lowerTime: "", //下派时间
          personnel: "", //整改人员
          changeTime: "", //整改有效期
          qualityTesting: "", //质检
          completion: "", //是否完成
        };
      }

      this.accountNumber = "";
      this.address = "";
      this.fileUpload = "";
      this.page = 1;
      this.getData();
    },
    //日期
    fileUpload() {
      this.page = 1;
      this.getData();
    },
    //宽带账号
    accountNumber() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.page = 1;
        this.getData();
      }, 400);
    },
    //地址
    address() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.page = 1;
        this.getData();
      }, 400);
    },
    //派单状态
    status() {
      this.page = 1;
      this.getData();
    },
    //区县
    county() {
      this.page = 1;
      this.getData();
    },
  },
  computed: {
    ...mapState(["dept"]),
    filterData() {
      // if(!this.data1) {
      //   return;
      // }
      this.data1.forEach((it) => {
        it.periodTime ? (it.periodTime += " 23:59:59") : (it.periodTime = "");

        it.correctiveTime
          ? (it.correctiveTime += " 23:59:59")
          : it.correctiveTime;
        it.rectificationDate
          ? (it.rectificationDate += " 23:59:59")
          : it.rectificationDate;
        it.changeTime ? (it.changeTime += " 23:59:59") : it.changeTime;
        if (
          it.test === 0 ||
          it.qualityInspection === 0 ||
          it.qualityTesting === 0
        ) {
          it.test = "通过";
          it.qualityInspection = "通过";
          it.qualityTesting = "通过";
        } else if (
          it.test === 1 ||
          it.qualityInspection === 1 ||
          it.qualityTesting === 1
        ) {
          it.test = "未通过";
          it.qualityInspection = "未通过";
          it.qualityTesting = "未通过";
        } else if (
          it.test === 2 ||
          it.qualityInspection === 2 ||
          it.qualityTesting === 2
        ) {
          it.test = "待质检";
          it.qualityInspection = "待质检";
          it.qualityTesting = "待质检";
        }

        if (it.status == 1 || it.singleStatus == 1) {
          it.status = "未派单";
          it.singleStatus = "未派单";
        } else if (it.status == 0 || it.singleStatus == 0) {
          it.status = "已派单";
          it.singleStatus = "已派单";
        } else if (it.status == 2 || it.singleStatus == 2) {
          it.status = "待派单";
          it.singleStatus = "待派单";
        } else if (it.completion === 0) {
          it.completion = "在途";
        } else if (it.completion === 1) {
          it.completion = "完成整改";
        } else if (it.completion === 2) {
          it.completion = "无法整改";
        }
      });

      return this.data1;
    },
    tableTypeCompute() {
      const { axType } = this;
      if (axType === "Hxzg") {
        return "户线整改";
      } else if (axType === "Fqx") {
        return "分纤箱";
      } else if (axType === "Fgq") {
        return "分光器";
      } else if (axType === "Lx") {
        return "零星";
      }
      return " ";
    },
  },
  methods: {
    getVal(data) {
      console.log(data);
    },
    getMockData() {
      let mockData = [];
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: "Content " + i,
          description: "The desc of content  " + i,
          disabled: Math.random() * 3 < 1,
        });
      }
      return mockData;
    },
    getTargetKeys() {
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map((item) => item.key);
    },
    handleChange3(newTargetKeys) {
      this.targetKeys3 = newTargetKeys;
    },
    render3(item) {
      return item.label + " - " + item.description;
    },
    reloadMockData() {
      this.data3 = this.getMockData();
      this.targetKeys3 = this.getTargetKeys();
    },
    //跳转 -> 派单详情页面
    show(index) {
      this.$store.commit("setAx", this.data1[index]);
      // setSessionStorage(this.data1[index]);
      this.$router.push({
        name: "pd",
        params: {
          type: "single", //单个派单
          id: this.data1[index].id,
          tableType: this.axType,
        },
      });
    },

    // 获取数据
    async getData() {
      this.$Loading.start();
      this.loading = true;
      const { axType, county, accountNumber, status, address, page, pageSize } =
        this;
      let s = status;
      if (status === -1) {
        s = "";
      }
      console.log("账号", accountNumber);
      let { fileUpload } = this;
      fileUpload = fileUpload && formatData(fileUpload);
      this.columns = getColums(this.axType);

      const request = await getAx("ax/sel" + axType, {
        county,
        fileUpload,
        accountNumber,
        status: s,
        address,
        ...this.itemForm,
        page,
        pageSize,
      });
      this.data1 = request.items;

      this.loading = false;

      this.total = request.counts;
      this.$Loading.finish();
    },
    //分页
    changePage(val) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.page = val;
      this.getData();
    },
    //处理导出url
    downloadURL(type) {
      let url = "";
      switch (type) {
        case "Hxzg":
          url = "file/hxzgdown";
          break;
        case "Fqx":
          url = "file/fqxdown";
          break;
        case "Fgq":
          url = "file/fgqdown";
          break;
        case "Lx":
          url = "file/lxdown";
          break;
      }
      return url;
    },

    //批量（导入）
    async inSubmit() {
      const { file, uploadType, date } = this;
      if (!file || !uploadType || !date) {
        this.$Message.error("有未填项");
        this.inShow = false;
        setTimeout(() => {
          this.inShow = true;
        });
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sheetnum", uploadType);
      formData.append("date", formatData(date));
      formData.append("type", 1);
      // for (var value of formData.values()) {
      //   console.log(value);
      // }
      const request = await uploadFile("file/upload", formData);
      if (request.code === 200) {
        this.$Message.success(`导入了${request.data}条数据`);
        this.getData();
      } else {
        if (request) {
          this.$Message.error(request.msg);
          this.inShow = false;
          setTimeout(() => {
            this.inShow = true;
          });
          return;
        }
        this.$Message.error(request.msg);
        this.inShow = false;
        setTimeout(() => {
          this.inShow = true;
        });
        return;
      }
      this.inShow = false; //导入完成后
      this.file = null;
      this.uploadType = "";
      this.date = "";
    },
    // 批量（派单）
    async inPdSubmit() {
      const { file, uploadType, date } = this;
      if (!file || !uploadType || !date) {
        this.$Message.error("有未填项");
        this.inPd = false;
        setTimeout(() => {
          this.inPd = true;
        });
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sheetnum", uploadType);
      formData.append("date", formatData(date));
      formData.append("type", 2);
      const request = await uploadFile("file/upload", formData);
      if (request.code === 200) {
        this.$Message.success(`派单了${request.data}条`);
        this.getData();
      } else {
        this.$Message.error(
          request.msg + "(派单班组或为空,只能导入未派单的工单)"
        );
        this.inPd = false;
        setTimeout(() => {
          this.inPd = true;
        });

        return;
      }
      this.inPd = false; //导入完成后
      this.file = null;
      this.uploadType = "";
      this.date = "";
    },
    inCancel() {
      this.file = null;
      this.uploadType = "";
      this.date = "";
    },

    //取消自动上传
    handleUpload(file) {
      this.file = file;
      return false;
    },

    //删除上传文件
    handleRemoveFile() {
      this.file = null;
    },

    //删除选中
    async removeIndex() {
      if (!this.idList) {
        this.$Message.error("请勾选要删除的内容");
        return;
      }
      const flag = confirm("确定删除？");
      if (!flag) {
        return;
      }
      const res = await delAx("ax/del" + this.axType, this.idList);
      console.log(res);
      if (res) {
        this.$Message.success("success");
        this.getData();
      } else {
        this.$Message.error("error");
      }
    },

    //获取id
    getIdList(selection) {
      if (selection.length) {
        this.idList = selection.map((it) => it.id);
      } else {
        this.idList = null;
      }
      console.log(Object.prototype.toString.call(this.idList));
      console.log(this.idList);
    },

    //导出
    download() {
      if (!this.idList) {
        this.$Message.error("请勾选要下载的条目");
        return;
      }
      const url = this.downloadURL(this.axType);
      let action = "";
      for (let i = 0; i < this.idList.length; i++) {
        action += `ids=${this.idList[i]}&`;
      }
      action = action.slice(0, action.length - 1);
      console.log(URL + url + "?" + action);
      window.open(URL + url + "?" + action, "_blank");
    },
    edit(index) {
      this.$store.commit("setAx", this.data1[index]);
      // setSessionStorage(this.data1[index]);
      this.$router.push({
        name: "pd",
        params: {
          type: "edit", //单个派单
          id: this.data1[index].id,
          tableType: this.axType,
        },
      });
    },
    view(index) {
      this.$store.commit("setAx", this.data1[index]);
      // setSessionStorage(this.data1[index]);
      this.$router.push({
        name: "pd",
        params: {
          type: "view", //单个派单
          id: this.data1[index].id,
          tableType: this.axType,
        },
      });
    },
    // 改变显示条数
    changeSizePage(val) {
      console.log(val);
      this.pageSize = val;
      this.getData();
    },
    // 批量删除
    async inDel() {
      const { axType: type, timeDel: time } = this;
      const req = await delForDate("ax/delByTime", { type, time });
      if (req) {
        this.$Message.success(`删除了${req}条数据`);
        this.inDelBox = false;
        this.getData();
      } else {
        this.$Message.warning(`删除了${req}条数据`);
      }
    },
    // 批量导出
    batchDownload() {
      const { axType, timeDownload } = this;

      if (!timeDownload[0] || !timeDownload[1]) {
        this.$Message.error("请选择要导出的日期范围");
        setTimeout(() => {
          this.isBachDownBox = true;
        });
        return;
      }
      window.open(
        `${URL}file/down${axType}?periodTime=${formatData(
          timeDownload[0]
        )},${formatData(timeDownload[1])}&county=${this.dept}`,
        "_blank"
      );
      this.isBachDownBox = false;
    },
    // 下载模板
    downloadTemplate() {
      let { axType } = this;
      console.log(URL + `file/${axType.toLowerCase()}moban`, 111);
      window.open(URL + `file/${axType.toLowerCase()}moban`, "_blank");
    },

    // 确认筛选
    inFilter() {
      this.itemForm = this.$refs["filter"].getItem();
      this.getData();

      console.log(this.itemForm);
    },
  },
  created() {
    this.isjudge = judge(this.$store.state.dept);
    this.getData();
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

.ax {
  height: 100%;
  overflow: auto;
  .search-box {
    position: relative;
    height: 60px;
    background: #f8f8f9;
    display: flex;
    align-items: center;
    .item {
      display: flex;
      align-items: center;
      margin-left: 80px;
    }
  }
  .content {
    margin-top: 20px;
    .content-button {
      height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .lf {
        position: relative;
      }
      .rt {
        margin: 10px 0;
      }
      button {
        margin-left: 30px;
      }
    }
  }
}
// 适配
@media screen and (max-width: 2070px) {
  .rt {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>

