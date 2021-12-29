<template>
  <div class="js">
    <div class="seach-box">
      <div class="item">
        <label for="" style="margin-right: 10px">区县:</label
        ><Select v-model="county" style="width: 200px" :disabled="!isjudge">
          <Option
            v-for="item in deptList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </div>
      <div class="item">
        <Col span="12" class="ml20">
          <DatePicker
            v-model="fileUpload"
            format="yyyy/MM/dd"
            placeholder="时间"
            style="width: 200px"
          ></DatePicker>
        </Col>
      </div>
      <div class="item" v-if="jsType !== 'Fqx' && jsType !== 'Fgq'">
        <Input
          class="ml20"
          search
          enter-button
          placeholder="搜索宽带账号"
          v-model="accountNumber"
        />
      </div>
    </div>
    <ul class="num">
      <li>
        <Icon type="md-pricetag" />
        工资包额度:
        <span>{{ budgetMoney.limit || 0 }}</span>
        元
      </li>
      <li class="yjs" @click.stop="isShow = !isShow" style="position: relative">
        <Icon type="md-reorder" />
        预结算:
        <span>{{ budgetMoney.predict || 0 }}</span>
        元
        <transition tag="div" name="js">
          <div class="yjsxq" v-if="isShow">
            <Icon type="md-close" class="out" @click.stop="isShow = false" />
            <h5 class="title">
              预结算: <span>{{ budgetMoney.predict || 0 }}</span
              >元
            </h5>
            <ul class="cont">
              <li v-for="item in budget" :key="item.name">
                <span>{{ item.name }}</span>
                <span>{{ item.number }}单</span>
                <span>{{ item.money }}元</span>
              </li>
            </ul>
          </div>
        </transition>
        <Spin size="large" fix v-if="loading"></Spin>
      </li>
      <li>
        <Icon type="md-pricetag" />
        可用额度:
        <span>{{ budgetMoney.available || 0 }}</span>
        元
      </li>
    </ul>

    <div class="content">
      <div class="content-button">
        <div class="item-lf" style="position: relative">
          <!-- <Button type="dashed">反选</Button> -->

          <Button type="info" @click="download" class="ml20">导出</Button>
          <Button type="info" @click="isBatchDownload = true" class="ml20"
            >批量导出</Button
          >
          <!-- isBatchDownload -->
          <Button type="primary" @click="inShow = true" class="ml20"
            >批量结算</Button
          >
          <Button
            type="warning"
            class="ml20"
            @click="
              () => {
                this.inFilterBox = true;
              }
            "
            ><Icon type="ios-funnel" /> 筛选</Button
          >
          <Spin size="large" fix v-if="loading"></Spin>
        </div>
        <div class="item-rf">
          <label for="">按需分类:</label>
          <Select
            v-model="jsType"
            style="
              width: 200px;
              margin-left: 30px;
              margin-right: 30px;
              text-align: center;
            "
          >
            <Option
              v-for="item in jsTypeList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
          <Select v-model="jsStatus" style="width: 200px">
            <Option
              v-for="item in jsStatusList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </div>
      </div>
      <div class="content-table">
        <Table
          border
          max-height="500"
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
            <Button type="success" size="small" @click="show(index)"
              ><Icon type="md-eye" /> 查看</Button
            >
          </template>
        </Table>
        <div style="padding: 20px; overflow: hidden">
          <div style="float: right">
            <Page
              :total="total"
              :current="1"
              @on-change="changePage"
              @on-page-size-change="changeSizePage"
              show-sizer
              :page-size-opts="[20, 30, 40, 50, 60, 80, 100, 150]"
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
      okText="导入"
      cancelText="取消"
      :loading="true"
    >
      <Form :label-width="150">
        <FormItem label="请选择要上传的类型:">
          <Select v-model="uploadType" style="width: 168px">
            <Option
              v-for="item in uploadList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
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
            @click="handleRemoveFile(index)"
          />
        </div>
      </template>
    </Modal>

    <!-- 高级筛选 -->
    <Modal
      v-model="inFilterBox"
      title="高级筛选"
      @on-ok="inFilter"
      okText="筛选"
      cancelText="取消"
    >
      <Hxzg v-if="jsType === 'Hxzg'" ref="filter"
        ><strong>当前表类型：{{ tableTypeCompute }} </strong></Hxzg
      >
      <Fqx v-else-if="jsType === 'Fqx'" ref="filter">
        <strong>当前表类型：{{ tableTypeCompute }} </strong></Fqx
      >
      <Fgq v-else-if="jsType === 'Fgq'" ref="filter">
        <strong>当前表类型：{{ tableTypeCompute }} </strong></Fgq
      >
      <Lx v-else ref="filter"
        ><strong>当前表类型：{{ tableTypeCompute }} </strong></Lx
      >
    </Modal>
    <!-- 批量导出弹窗 -->
    <Modal
      v-model="isBatchDownload"
      title="批量导出"
      @on-ok="batchDownload"
      okText="导出"
      cancelText="取消"
    >
      <span style="margin-right: 10px">导出的时间段:</span>
      <DatePicker
        v-model="timeDownload"
        type="daterange"
        format="yyyy/MM/dd"
        placeholder="Select date"
        style="width: 200px"
      ></DatePicker>
    </Modal>
    <!-- 查看 -->
    <Modal v-model="showItem" title="查看" footer-hide scrollable>
      <div class="showBox">
        <div class="showItem" v-for="item in lookItem" :key="item.id">
          <span class="title">{{ item.name }}:</span>
          <Input
            placeholder="暂无数据"
            :value="item.value"
            style="width: 500px"
            readonly
          />
        </div>
      </div>
    </Modal>
    <!-- <div v-for="item in lookItem" :key="item + new Date()">{{ item }} {{ cs1 }}</div> -->
  </div>
</template>
<script>
import URL from "@/http/URL";
import { getAllDept, formatData,judge } from "@/util";
import { getJs, batchJs, uploadJsFile, showJsById } from "@/api/getJsApi";
import { getColumsJs } from "@/util/colum";
import axios from "axios";
export default {
  components: {
    Hxzg: () => import("@/components/jsScreen/HxzgFilter"),
    Fqx: () => import("@/components/jsScreen/FqxFilter"),
    Fgq: () => import("@/components/jsScreen/FgqFilter"),
    Lx: () => import("@/components/jsScreen/LxFilter"),
  },
  data() {
    return {
      isjudge: false,
      isBatchDownload: false, //是否显示批量导出窗口
      timeDownload: [], //批量导出时间
      showItem: false,
      look: [],
      inFilterBox: false,
      loading: true,
      idList: null, //选中的id列表
      uploadType: "Hxzg", //选中上传类型
      date: "", //上传数据时间
      uploadList: [
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
      file: [], //批量上传文件列表
      inShow: false, //是否显示导入弹窗
      jsType: "Hxzg", //表类型
      fileUpload: "", //日期
      accountNumber: "", //宽带账号
      jsTypeList: [
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
      county: "", //区县
      deptList: getAllDept(),
      jsStatus: "",
      jsStatusList: [
        {
          label: "全部",
          value: "",
        },
        {
          label: "已结算",
          value: 0,
        },
        {
          label: "未结算",
          value: 1,
        },
        {
          label: "待结算",
          value: 2,
        },
      ],
      isShow: false,
      columns: getColumsJs("Hxzg"),
      data: [], //表数据
      page: 1,
      pageSize: 10,
      total: 0,
      //额度展示
      budgetMoney: {},
      // 预结算详情
      budget: null,

      //默认户线整改 高级查询
      itemForm: {
        userPhone: "", //联系方式
        people: "", //整改人员
        test: "", //质检
        money: "", //结算金额
      },
    };
  },
  watch: {
    //表类型改变
    jsType() {
      const { jsType } = this;
      if (jsType === "Hxzg") {
        this.itemForm = {
          userPhone: "", //联系方式
          people: "", //整改人员
          test: "", //质检
          money: "", //结算金额
        };
      } else if (jsType === "Fqx") {
        this.itemForm = {
          correctivePersonnel: "", //整改人员
          test: "", //质检
          money: "", //结算金额
        };
      } else if (jsType === "Fgq") {
        this.itemForm = {
          correctivePersonnel: "", //整改人员
          test: "", //质检
          money: "", //结算金额
        };
      } else if (jsType === "Lx") {
        this.itemForm = {
          personnel: "", //整改人员
          test: "",
          money: "",
        };
      }
      console.log("itemForm：", this.itemForm);
      this.page = 1;
      this.accountNumber = "";
      this.fileUpload = '';
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
    //派单状态
    jsStatus() {
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
    lookItem() {
      const { look } = this;
      if (look.length === 0) {
        return [];
      }
      const keys = Object.keys(look);
      const values = Object.values(look);
      const data = [];
      keys.forEach((it, i) =>
        data.push({
          name: it,
          value: values[i],
          id: +new Date() + Math.random() * 100000,
        })
      );
      return data;
    },
    filterData() {
      return this.data.map((it) => {
        if (it.balance == 0) {
          it.balance = "已结算";
        } else if (it.balance == 1) {
          it.balance = "未结算";
        } else if (it.balance == 2) {
          it.balance = "待结算";
        }
        if (it.test == 0) {
          it.test = "合格";
        } else if (it.test == 1) {
          it.test = "不合格";
        } else {
          it.test = "待质检";
        }
        return it;
      });
    },
    tableTypeCompute() {
      const { jsType } = this;
      if (jsType === "Hxzg") {
        return "户线整改";
      } else if (jsType === "Fqx") {
        return "分纤箱";
      } else if (jsType === "Fgq") {
        return "分光器";
      } else if (jsType === "Lx") {
        return "零星";
      }
      return " ";
    },
  },
  methods: {
    // 确认筛选
    inFilter() {
      this.itemForm = this.$refs["filter"].getItem();
      this.getData();

      console.log(this.itemForm);
    },

    //获取数据
    async getData() {
      this.$Loading.start();

      this.loading = true;
      const { itemForm } = this;
      const {
        county,
        fileUpload,
        accountNumber,
        jsStatus: balance,
        page,
        pageSize,
      } = this;

      this.columns = getColumsJs(this.jsType);
      const res = await getJs("bal/sel" + this.jsType, {
        county,
        fileUpload,
        accountNumber,
        balance,
        page,
        pageSize,
        ...itemForm,
      });
      this.total = res.counts;
      this.data = res.items;
      this.loading = false;
      this.$Loading.finish();
    },
    // 分页
    changePage(val) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.page = val;
      this.getData();
    },
    // 改变显示条数
    changeSizePage(val) {
      console.log(val);
      this.pageSize = val;
      this.getData();
    },
    //批量导入
    async inSubmit() {
      const { file, uploadType, jsType } = this;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("sheetnum", uploadType);
      // formData.append("date", formatData(date));
      const request = await uploadJsFile(
        "bal/up" + jsType,
        formData
      ); /*await uploadFile("file/upload", formData)*/
      if (request) {
        this.$Message.success("success");
        this.getData();
      } else {
        this.$Message.error("error");
      }
      this.inShow = false; //导入完成后
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

    //批量结算
    async batch() {
      const { idList } = this;
      if (!idList) {
        this.$Message.error("请选择要批量结算的选项");
        return;
      }
      const res = await batchJs("/bal/balance" + this.jsType, { idList });
      if (!res) {
        this.$Message.success("success");
      } else if (res == null) {
        this.$Message.error("error");
      }
    },

    // 预结算金额/预结算
    settlementData() {
      console.log(axios, 123123213)
      axios.all([axios.get(URL+"bal/predict", { headers: {token: sessionStorage.getItem('token')}}), axios.get(URL+"bal/predictAll", { headers: {token: sessionStorage.getItem('token')}})]).then(
        axios.spread((res1, res2) => {
          this.budgetMoney = res1.data;
          this.budget = res2.data;
          console.log(this.budgetMoney, this.budget)
        })
      );
    },

    // 导出
    async download() {
      const { idList, jsType } = this;
      if (!idList) {
        this.$Message.error("请选择要批量导出的选项");
        return;
      }
      function formarString(ids) {
        if (typeof ids === "number") {
          return ids;
        }
        let str = "";
        for (let i = 0; i < ids.length; i++) {
          str += ids[i] + ",";
        }
        return str.slice(0, str.length - 1);
      }
      const ids = formarString(idList);
      window.open(URL + "bal/down" + jsType + "?ids=" + ids, "_black");
    },

    // 查看
    async show(index) {
      const id = this.data[index].id;
      this.look = await showJsById(`bal/sel${this.jsType}Id`, id);
      console.log(this.look);
      this.showItem = true;
    },

    // 批量导出
    batchDownload() {
      const { jsType, timeDownload } = this;
      if (!timeDownload[0] || !timeDownload[1]) {
        this.$Message.error("请选择要导出的日期范围");
        setTimeout(() => {
          this.isBatchDownload = true;
        });
        return;
      }
      window.open(
        `${URL}bal/down${jsType}ByTime?periodTime=${formatData(
          timeDownload[0]
        )},${formatData(timeDownload[1])}&county=${this.$store.state.dept}`,
        "_blank"
      );
      this.isBatchDownload = false;
    },
  },
  created() {
    this.isjudge = judge(this.$store.state.dept)
    this.getData();
    this.settlementData();
  },
};
</script>
<style lang="less" scoped>
.js {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .seach-box {
    height: 80px;
    line-height: 80px;
    display: flex;
    label {
      min-width: 50px;
    }
    .item {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }
  }
  .num {
    display: flex;
    justify-content: flex-end;
    min-width: 550px;
    margin-left: auto;
    li {
      margin-right: 50px;
      span {
        color: #3498db;
      }
    }
    .yjs {
      cursor: pointer;
      position: relative;
      .yjsxq {
        width: 300px;
        height: 360px;
        padding: 0 30px;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 7px;
        position: absolute;
        top: 40px;
        z-index: 999;
        .out {
          position: absolute;
          right: 10px;
          top: 7px;
          cursor: pointer;
        }
        &:hover {
          display: block;
        }
        &::before {
          content: "";
          position: absolute;
          top: -10px;
          width: 0;
          height: 0;
          background: none;
          border: 10px solid transparent;
          border-bottom-color: #fff;
          border-top: none;
          z-index: 8;
        }
        &::after {
          content: "";
          position: absolute;
          top: -11px;
          left: 29px;
          width: 0;
          height: 0;
          background: none;
          border: 11px solid transparent;
          border-bottom-color: #ddd;
          border-top: none;
          z-index: 7;
        }

        .title {
          height: 60px;
          line-height: 60px;
          font-size: 15px;
        }
        .cont {
          li {
            width: 100%;
            margin-left: 10px;
            height: 60px;
            line-height: 60px;
            display: flex;

            span {
              margin-right: 20px;
              width: 80px;
              color: #000;
            }
          }
        }
      }
    }
  }

  .content {
    .content-button {
      height: 80px;
      line-height: 80px;
      display: flex;
      justify-content: space-between;
      .item-lf {
        display: flex;
        align-items: center;
        label {
          min-width: 50px;
        }
      }
      .item-rf {
        // margin-left: auto;
        // margin-right: 30px;
        button {
          margin-left: 10px;
        }
      }
    }
  }
}
.showBox {
  height: 400px;
  overflow: auto;
  .showItem {
    height: 40px;
    margin: 15px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title {
      margin-right: 10px;
      display: inline-block;
      width: 120px;
      text-align: right;
    }
  }
}
.js-enter,
.js-leave-to {
  opacity: 0;
}
.js-enter-active,
.js-leave-active {
  transition: all 0.5s;
}
.js-enter-to,
.js-leave {
  opacity: 1;
}

.ml20 {
  margin-left: 20px;
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>