<template>
  <div>
    <div class="box">
      <!-- 右边 -->
      <div class="rigth">
        <!-- 头部 -->
        <div class="top">
          <span class="fonts">
            已选<span>{{ sele }}</span
            >/<span></span>人 </span
          ><el-button
            @click="chazhao = true"
            type="primary"
            size="mini"
            class="an"
            >查找</el-button
          ><el-button @click="quans" type="primary" size="mini" class="an"
            >全选</el-button
          >
        </div>
        <!-- 人名选择 -->
        <div class="xuan">
          <el-checkbox-group
            v-model="checkboxGroup"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox-button
              v-for="(name, index) in person"
              :label="name"
              :key="index"
              style="margin-left: 20px; margin-top: 20px; width: 83px"
              >{{ name.userName }}</el-checkbox-button
            >
          </el-checkbox-group>
        </div>
      </div>
      <!-- 弹出查找 -->
      <el-dialog
        title="查找"
        :visible.sync="chazhao"
        append-to-body
        destroy-on-close
      >
        <div style="width: 100%">
          <el-form :model="form" class="fom">
            <!-- 姓名 -->
            <el-form-item label="姓名" label-width="120px">
              <el-input v-model="form.userName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="部门" label-width="120px">
              <el-select v-model="form.sector">
                <el-option
                  v-for="(department, index) in department"
                  :key="index"
                  :label="department.label"
                  :value="department.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否审批人" label-width="120px">
              <el-radio v-model="form.approval" label="0">是</el-radio>
              <el-radio v-model="form.approval" label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="是否条线负责人" label-width="120px">
              <el-radio v-model="form.responsible" label="0">是</el-radio>
              <el-radio v-model="form.responsible" label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="是否区县负责人" label-width="120px">
              <el-radio v-model="form.sectorHead" label="0">是</el-radio>
              <el-radio v-model="form.sectorHead" label="1">否</el-radio>
            </el-form-item>
            <el-form-item label="是否正式员工" label-width="120px">
              <el-radio v-model="form.employment" label="0">是</el-radio>
              <el-radio v-model="form.employment" label="1">否</el-radio>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="chazhao = false">取 消</el-button>
          <el-button type="primary" @click="reny">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { gets, postp } from "../request/wan";

export default {
  data() {
    return {
      // 树形结构
      data: [],
      datas: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 选中的val值
      checkboxGroup: [],
      // 显示的姓名
      name: [],
      // 选中个数
      sele: 0,
      // 已选择姓名
      selected: [],
      // 人员名单
      person: "",
      // 弹出查找
      chazhao: false,
      formLabelWidth: "80px",
      // 查找条件
      form: {
        sector: "",
        userName: "",
        approval: "",
        responsible: "",
        sectorHead: "",
        employment: "",
        pageSize: "5000",
        page: "1",
      },
      // 是否全选
      quan: false,
      department: [],
    };
  },
  created() {
    // 组织构架
    gets("sector/getSector").then((res) => {
      console.log(res.data, "树形结构");
      this.datas = res.data;
      this.qing();
      // console.log("d ",this.data)
    });
    gets("user/getUser", {
      pagesize: 999,
      page: this.currentPage,
    }).then((res) => {
      this.data = res.data.items;
      this.person = res.data.items;
      // 数据总条数
      this.counts = res.data.counts;
    });
    gets("user/getApproval", { name: "" }).then((res) => {
      this.data = res.data;
      this.person = res.data;
    });
    this.checkboxGroup = [];
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
    // 返回人员
    fan() {
      // console.log(123);
      // 选中姓名
      var mo = JSON.parse(JSON.stringify(this.checkboxGroup));
      console.log(mo);
      // this.$store.name = mo;
      const ss = [];
      for (let i = 0; i <= mo.length - 1; i++) {
        ss.push(mo[i]);
        this.$store.fromPersons = ss;
      }
    },
    // 全选
    quans() {
      // 全选
      if (this.quan == false) {
        console.log(1);
        console.log(this.quan);
        this.name = [];
        this.person.forEach((quan) => {
          this.checkboxGroup.push(quan);
          this.name.push(quan);
        });
        this.quan = true;
        this.fan();
        this.sele = this.checkboxGroup.length;
        return;
      }
      // 取消全员
      if (this.quan == true) {
        console.log(2);
        this.name = [];
        this.person.forEach((quxiao) => {
          for (var i = this.checkboxGroup.length - 1; i >= 0; i--) {
            // console.log(this.checkboxGroup[i], 8);
            // console.log(quxiao, 9);
            if (this.checkboxGroup[i].id == quxiao.id) {
              this.checkboxGroup.splice(i, 1);
            }
          }
          this.name.push(quxiao);
        });
        this.fan();
        this.quan = false;
        this.sele = this.checkboxGroup.length;
        return;
      }
    },
    // 单个人名
    handleCheckedCitiesChange() {
      // 选中个数
      this.sele = this.checkboxGroup.length;

      // 选中姓名
      var mo = JSON.parse(JSON.stringify(this.checkboxGroup));
      console.log(mo);
      this.$store.name = JSON.parse(JSON.stringify(this.checkboxGroup));
      this.$store.fromPersons = mo;
      // this.$store.fromPerson = res;
    },
    // 查找提交
    reny() {
      this.name = [];
      // const sa = {
      //   sector: this.sector,
      //   card: this.card,
      //   name: this.name,
      //   posts: this.posts,
      //   phone: this.phone,
      // };
      postp("user/getUserByUserVo", this.form)
        .then((res) => {
          this.person = res.data;
          console.log("45", res);
          res.data.forEach((res) => {
            this.name.push(res);
            // console.log(res);
            this.name.userName = this.name.name;
          });
          this.chazhao = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped lang="less">
.el-checkbox-button.is-checked .el-checkbox-button__inner {
  background-color: #ff9213 !important;
  box-shadow: unset !important;
}
.box {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #fcfcfc;
  border: 1px solid #e2e2e2;
  display: -webkit-flex;
  display: flex;
  .rigth {
    width: 100%;
    border-left: 1px solid #e2e2e2;
    .xuan {
      width: 100%;
      height: 380px;
      overflow: auto;
    }
    .nameFont {
      width: 65px;
      border: 1px solid #dfdfdf;
      font-size: 17px;
      text-align: center;
      line-height: 40px;
      margin-left: 50px;
    }
    .fontCol {
      border: 1px solid #0077f1;
    }
  }
  .top {
    width: 100%;
    height: 40px;
    background: #c0c0c0;
    .font {
      font-size: 18px;
      line-height: 40px;
      font-weight: bold;
      margin-left: 20px;
    }
    .fonts {
      font-size: 18px;
      line-height: 40px;
      text-align: center;
    }
    .an {
      float: right;
      margin-top: 8px;
      margin-left: 10px;
    }
    .wei {
      position: absolute;
      right: 0;
      top: 6px;
    }
  }
  .bott {
    width: 50px;
    position: absolute;
    bottom: 0;
    left: 45%;
  }
}
</style>