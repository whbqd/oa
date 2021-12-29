<template>
  <div id="pay">
    <!-- 标题 -->
    <div class="top" @click="dian($event)">
      <div class="font a" :class="{ col: cli == '家客薪酬' }">
        <p>家客薪酬</p>
      </div>
      <div class="font a" :class="{ col: cli == '集客薪酬' }">
        <p>集客薪酬</p>
      </div>
      <div class="font a" :class="{ col: cli == '综合维建薪酬' }">
        <p>综合维建薪酬</p>
      </div>
      <div class="font a" :class="{ col: cli == '其他人员薪酬' }">
        <p>其他人员薪酬</p>
      </div>
      <div class="font a" :class="{ col: cli == '外包费其他' }">
        <p>外包费其他</p>
      </div>
      <div class="font a" :class="{ col: cli == '项目人员薪酬' }">
        <p>项目人员薪酬</p>
      </div>
    </div>
    <!-- 查找 -->
    <div class="cha">
      <xiaLa @addNum="getNum"></xiaLa>
      <div class="block datas">
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <input
        type="text"
        name="lookup"
        placeholder="搜索"
        autocomplete="off"
        class="yan"
      />
      <div><span class="iconfont icon-sousuo sosuo"></span></div>
      <el-button size="medium" type="primary">重置</el-button>
    </div>
    <!-- 导出 -->
    <div class="butt">
      <el-button size="medium" type="primary">新增</el-button>
      <el-button size="medium" type="primary">导入</el-button>
      <el-button size="medium" type="primary">导出</el-button>
      <el-button size="medium" type="primary">下载模板</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      ref="singleTable"
      stripe
      :data="tableData"
      highlight-current-row
      @selection-change="handleSelectionChange"
      style="width: 100%; margin-top: 25px"
      height="423"
      id="se"
      :cell-style="{
        padding: '1px',
        textAlign: 'center',
        fontSize: '12px',
      }"
      :header-cell-style="{
        background: '#dddddd',
        color: '#606266',
        textAlign: 'center',
        fontSize: '14px',
        padding: '5px',
      }"
    >
      <el-table-column width="50" type="selection"> </el-table-column>
      <el-table-column
        v-for="(jiaKe, index) in jiaKe"
        :key="index"
        :property="jiaKe.tape"
        :label="jiaKe.name"
        min-width="120px"
      >
      </el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="seet(scope.row)"
            ><span class="iconfont icon-yanjing xiu"></span
          ></el-button>
          <el-button type="text" size="small" @click="xia(scope.row)"
            ><span class="iconfont icon-xiazai xiu"></span
          ></el-button>
        </template></el-table-column
      > -->
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pagesize"
      :total="counts"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>
<script>
import xiaLa from "../../components/buttom/xiaLa.vue";
export default {
  data() {
    return {
      // 时间快捷
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      // shijian
      value2: "",
      // 默认选中
      cli: "家客薪酬",
      // 表格
      tableData: [],
      currentPage: 1,
      pagesize: 50,
      counts: 0,
      multipleSelection: [],
      // 家客薪酬
      jiaKe: [
        { name: "地市", tape: "1" },
        { name: "区县", tape: "2" },
        { name: "月份", tape: "3" },
        { name: "班组名称", tape: "4" },
        { name: "装维人员姓名", tape: "4" },
        { name: "身份证号", tape: "4" },
        { name: "装维手机号", tape: "4" },
        { name: "岗位", tape: "4" },
        { name: "是否大组长", tape: "4" },
        { name: "在职状态", tape: "4" },
        { name: "装维量级", tape: "4" },
        { name: "装机薪酬", tape: "4" },
        { name: "维护用户量", tape: "4" },
        { name: "维护补贴系数", tape: "4" },
        { name: "组长津贴", tape: "4" },
      ],
    };
  },
  methods: {
    dian(e) {
      // var dom=document.getElementsByClassName("top")
      // console.log(e.target.innerText);
      this.cli = e.target.innerText;
      switch (this.cli) {
        case "家客薪酬":
          this.jiaKe = [
            { name: "地市", tape: "1" },
            { name: "区县", tape: "2" },
            { name: "月份", tape: "3" },
            { name: "班组名称", tape: "4" },
            { name: "装维人员姓名", tape: "4" },
            { name: "身份证号", tape: "4" },
            { name: "装维手机号", tape: "4" },
            { name: "岗位", tape: "4" },
            { name: "是否大组长", tape: "4" },
            { name: "在职状态", tape: "4" },
            { name: "装维量级", tape: "4" },
            { name: "装机薪酬", tape: "4" },
            { name: "维护用户量", tape: "4" },
            { name: "维护补贴系数", tape: "4" },
            { name: "组长津贴", tape: "4" },
          ];
          break;
        case "集客薪酬":
          this.jiaKe = [
            { name: "地市", tape: "1" },
            { name: "区县", tape: "2" },
            { name: "月份", tape: "3" },
            { name: "人数", tape: "4" },
            { name: "班组名称", tape: "4" },
            { name: "装维人员姓名", tape: "4" },
            { name: "身份证号", tape: "4" },
            { name: "装维手机号", tape: "4" },
            { name: "岗位", tape: "4" },
            { name: "是否大组长", tape: "4" },
            { name: "在职状态", tape: "4" },
            { name: "装维量级", tape: "4" },
            { name: "维护量", tape: "4" },
            { name: "岗位薪酬", tape: "4" },
            { name: "维护薪酬", tape: "4" },
            { name: "装机薪酬", tape: "4" },
            { name: "按需薪酬", tape: "4" },
            { name: "延展业务薪酬", tape: "4" },
            { name: "组长津贴", tape: "4" },
          ];
          break;
        case "综合维建薪酬":
          this.jiaKe = [
            { name: "地市", tape: "1" },
            { name: "区县", tape: "2" },
            { name: "月份", tape: "3" },
            { name: "综合维建人员姓名", tape: "4" },
            { name: "身份证号", tape: "4" },
            { name: "手机号", tape: "4" },
            { name: "岗位", tape: "4" },
            { name: "是否大组长", tape: "4" },
            { name: "岗位薪酬", tape: "4" },
            { name: "维护薪酬", tape: "4" },
            { name: "网络政治薪酬", tape: "4" },
            { name: "支撑按需薪酬", tape: "4" },
            { name: "组长津贴", tape: "4" },
            { name: "通信补贴", tape: "4" },
            { name: "车辆补贴", tape: "4" },
            { name: "电脑补贴", tape: "4" },
            { name: "餐补", tape: "4" },
            { name: "高温补贴", tape: "4" },
          ];
          break;
        case "其他人员薪酬":
          this.jiaKe = [
            { name: "地市", tape: "1" },
            { name: "区县", tape: "2" },
            { name: "月份", tape: "3" },
            { name: "人员归属部门", tape: "4" },
            { name: "业务名称", tape: "4" },
            { name: "专业", tape: "4" },
            { name: "姓名", tape: "4" },
            { name: "身份证号", tape: "4" },
            { name: "联系电话", tape: "4" },
            { name: "总薪酬", tape: "4" },
            { name: "公司社保", tape: "4" },
          ];
          break;
        case "外包费其他":
          this.jiaKe = [
            { name: "地市", tape: "1" },
            { name: "区县", tape: "2" },
            { name: "月份", tape: "3" },
            { name: "业务名称", tape: "4" },
            { name: "劳保用品", tape: "4" },
            { name: "安全用品", tape: "4" },
            { name: "残保金", tape: "4" },
            { name: "雇主责任险", tape: "4" },
            { name: "差旅费", tape: "4" },
            { name: "会议费", tape: "4" },
            { name: "福利费", tape: "4" },
            { name: "其他费用", tape: "4" },
            { name: "总薪酬", tape: "4" },
          ];
          break;
        case "项目人员薪酬":
          this.jiaKe = [
            { name: "地市", tape: "1" },
            { name: "区县", tape: "2" },
            { name: "月份", tape: "3" },
            { name: "业务名称", tape: "4" },
            { name: "姓名", tape: "4" },
            { name: "身份证号", tape: "4" },
            { name: "手机号吗", tape: "4" },
            { name: "专业", tape: "4" },
            { name: "岗位", tape: "4" },
            { name: "基本薪酬", tape: "4" },
            { name: "绩效薪酬", tape: "4" },
            { name: "本月绩效考核", tape: "4" },
            { name: "高温补贴", tape: "4" },
            { name: "持证补贴", tape: "4" },
            { name: "其他补贴", tape: "4" },
            { name: "奖励考核", tape: "4" },
            { name: "总薪酬", tape: "4" },
            { name: "公司社保", tape: "4" },
          ];
          break;
      }
      this.$nextTick(() => {
        this.$refs.singleTable.doLayout();
        // el-table添加ref="tableName"
      });
    },
    getNum(a) {
      console.log(a);
    },
    handleSizeChange: function (val) {
      this.pagesize = val;
      // this.shuj();
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      // this.shuj();
    },
    // 表格多选
    handleSelectionChange(val) {
      this.multipleSelection = [];
      for (var i = 0; i <= val.length - 1; i++) {
        if (i < val.length - 1) {
          this.multipleSelection = this.multipleSelection + val[i].id + ",";
        } else {
          this.multipleSelection = this.multipleSelection + val[i].id;
        }
      }
    },
  },
  components: { xiaLa },
};
</script>
<style lang="less" scoped>
#pay {
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-button {
  position: relative;
  left: 30px;
  top: 1px;
  // width: 80px;
  height: 30px;
  border-radius: 8px;
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
// 查找
.cha {
  position: relative;
  top: 15px;
  display: flex;
  // 时间
  .datas {
    position: relative;
    left: 40px;
    top: -5px;
  } // 查找
  .yan {
    position: relative;
    left: 30px;
    top: -9px;
    background: #ffffff;
    width: 250px;
    height: 30px;
    border-radius: 20px;
    padding-left: 20px;
    margin-top: 10px;
    margin-left: 30px;
    border: 1px solid #cacaca;
    outline: none;
  }
  .sosuo {
    position: relative;
    // left: 250px;
    top: 6px;
    color: rgb(165, 165, 165);
  }
}
.butt {
  position: relative;
  top: 17px;
  left: 50px;
  width: 400px;
  // border: 1px solid #000000;
  display: flex;
  justify-content: space-between;
}
</style>