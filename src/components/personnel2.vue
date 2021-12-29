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
            <!-- 姓名 -->
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.name" placeholder="请输入"></el-input>
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
        card: "",
        name: "",
        posts: "",
        phone: "",
        pageSize: "5000",
        page: "1",
      },
    };
  },
  created() {
    gets("user/getApproval", { name: "" }).then((res) => {
      this.data = res.data;
      this.person = res.data;
      res.data.forEach((res) => {
        this.name.push(res.userName);
      });
    });
    this.checkboxGroup = [];
  },
  methods: {
    // 单个人名
    handleCheckedCitiesChange() {
      // 选中个数
      this.sele = this.checkboxGroup.length;

      // 选中姓名
      var mo = JSON.parse(JSON.stringify(this.checkboxGroup));
      console.log(mo);
      this.$store.name = JSON.parse(JSON.stringify(this.checkboxGroup));

      this.person.forEach((res) => {
        if (mo == res.userName) {
          console.log(res, 55);
          // console.log(this.$store.fromPerson);
          this.$store.fromPerson = res;
        }
      });
    },
    // 提交
    reny() {
      this.name = [];
      // const sa = {
      //   sector: this.sector,
      //   card: this.card,
      //   name: this.name,
      //   posts: this.posts,
      //   phone: this.phone,
      // };
      postp("/worker/selectWorker", this.form)
        .then((res) => {
          this.person = res.data.pageResult.items;
          console.log("45", res);
          res.data.pageResult.items.forEach((res) => {
            this.name.push(res.name);
            this.chazhao = false;
          });
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