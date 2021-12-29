<template>
  <div>
    <div class="box">
      <!-- 左边 -->
      <div class="left">
        <div class="top">
          <p class="font">组织构架</p>
        </div>
        <!-- 树形结构 -->
        <div class="xuan">
          <el-tree
            :data="data"
            :props="defaultProps"
            default-expand-all
            show-checkbox
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
          ></el-tree>
        </div>
      </div>
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
          >
        </div>
        <!-- 人名选择 -->
        <div class="xuan">
          <el-checkbox-group
            v-model="checkboxGroup"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox-button
              v-for="(name, index) in name"
              :label="name"
              :key="index"
              style="margin-left: 20px; margin-top: 20px; width: 83px"
              >{{ name }}</el-checkbox-button
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
            <!-- 所在部门 -->
            <el-form-item label="所在部门" :label-width="formLabelWidth">
              <el-input v-model="form.sector" placeholder="请输入"></el-input>
            </el-form-item>
            <!-- 身份证号 -->
            <el-form-item label="身份证号" :label-width="formLabelWidth">
              <el-input v-model="form.card" placeholder="请输入"></el-input>
            </el-form-item>
            <!-- 姓名 -->
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
            </el-form-item>
            <!-- 岗位 -->
            <el-form-item label="岗位" :label-width="formLabelWidth">
              <el-input v-model="form.posts" placeholder="请输入"></el-input>
            </el-form-item>
            <!-- 手机 -->
            <el-form-item label="手机" :label-width="formLabelWidth">
              <el-input v-model="form.phone" placeholder="请输入"></el-input>
            </el-form-item>
            <!-- 用工属性 -->

            <el-form-item label="用工属性" :label-width="formLabelWidth">
              <el-select v-model="form.employ" placeholder="请选择">
                <el-option label="外包员工" value="外包员工"></el-option>
                <el-option label="正式员工" value="正式员工"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="chadakai">取 消</el-button>
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
      defaultProps: {
        children: "children",
        label: "label",
      },
      // 选中的val值
      checkboxGroup: [],
      // 显示的姓名
      name: [],
      // 已选择姓名
      names: "",
      // 选中个数
      sele: 0,
      // 已选择姓名
      selected: [],
      // 人员名单
      person: "",
      // 人员数据
      people: "",
      // 弹出查找
      chazhao: false,
      formLabelWidth: "80px",
      // 查找条件
      form: {
        sector: "",
        card: "",
        name: "",
        posts: "",
        phone: "",
        employ: "",
        pageSize: "5000",
        page: "1",
      },
      // 是否全选
      quan: 0,
      // 取消人员
      qu: "",
    };
  },
  created() {
    // 组织构架
    gets("sector/getSector")
      .then((res) => {
        this.data = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
    this.checkboxGroup = [];
  },
  methods: {
    // 返回人员
    fan() {
      // console.log(123);
      // 选中姓名
      var mo = JSON.parse(JSON.stringify(this.checkboxGroup));
      this.$store.name = mo;
      const ss = [];
      for (let i = 0; i <= this.$store.name.length - 1; i++) {
        // console.log(mo[i]);

        this.people.forEach((res) => {
          if (mo[i] == res.name) {
            if (this.$store.name.length == 1) {
              this.$store.fromPerson = res;
            } else {
              this.$store.fromPerson = [];
              ss.push(res);
              this.$store.fromPersons = ss;
            }
          }
        });
      }
    },
    // 选择部门人员名单
    handleNodeClick(data) {
      this.form.sector = data.label;
      gets("user/getUserBySector", { sector: data.label }).then((res) => {
        this.person = res.data;
        this.people = res.data;

        // console.log("45", res);
        // 查看
        if (this.quan == 0) {
          this.name = [];
          res.data.forEach((res) => {
            this.name.push(res.name);
          });
          this.fan();
          this.sele = this.checkboxGroup.length;
        }
        // 全选
        if (this.quan > 0) {
          this.name = [];
          res.data.forEach((res) => {
            this.checkboxGroup.push(res.name);
            this.name.push(res.name);
          });
          this.quan--;
          this.fan();
          this.sele = this.checkboxGroup.length;
        }
        // 取消全员
        if (this.quan < 0) {
          this.name = [];
          res.data.forEach((res) => {
            for (var i = this.checkboxGroup.length - 1; i >= 0; i--) {
              // console.log(this.checkboxGroup[i]);
              if (this.checkboxGroup[i] == res.name) {
                this.checkboxGroup.splice(i, 1);
              }
            }
            this.name.push(res.name);
          });
          this.fan();
          this.quan++;
          this.sele = this.checkboxGroup.length;
        }
      });
      // console.log(this.quan, 1);
      // console.log(this.name);
      // console.log(this.checkboxGroup, 88);
    },
    // 全选
    handleCheckChange(data, val) {
      // 全选
      if (val) {
        if (data.UpSector != 0 && data.UpSector != 26) {
          this.quan++;
          this.handleNodeClick(data);
        }
      }
      // 取消全选
      if (!val) {
        // console.log(1)
        if (data.UpSector != 0 && data.UpSector != 26) {
          console.log("222", data.label);
          this.quan--;
          this.handleNodeClick(data);
          console.log(this.quan, 2);
        }
        // 部门人员名单
        this.sele = this.checkboxGroup.length;
      }
    },
    // 单个人名
    handleCheckedCitiesChange() {
      // 选中个数
      this.sele = this.checkboxGroup.length;
      // console.log(this.checkboxGroup);
      this.fan();
    },
    // 提交
    over() {
      console.log(JSON.stringify(this.checkboxGroup));
      // console.log(this.checkboxGroup);
    },
    chadakai() {
      this.chazhao = false;
    },
    // 查找
    reny() {
      this.name = [];
      // 不能为空
      var sss = Object.values(this.form);
      var a = 0;
      for (var i = 0; i <= sss.length - 2; i++) {
        if (sss[i] == 0) {
          a++;
        }
      }
      if (a == 6) {
        this.chazhao = false;
        return;
      }
      postp("/worker/selectWorker", this.form)
        .then((res) => {
          this.people = res.data.pageResult.items;
          this.person = res.data.pageResult.items;
          console.log("45", res);
          res.data.pageResult.items.forEach((res) => {
            this.name.push(res.name);
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
  .left {
    width: 50%;
    .xuan {
      width: 100%;
      height: 380px;
      overflow: auto;
    }
  }
  .rigth {
    width: 50%;
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