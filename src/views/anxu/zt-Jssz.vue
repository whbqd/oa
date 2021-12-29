<template>
  <div id="bz">
    <div class="title">结算设置</div>
    <div class="content">
      <div class="content-button">
        <Button type="success" @click="addSalary">新增</Button>
        <Button type="error" @click="batchRemove">批量删除</Button>
      </div>
      <div class="content-table">
        <Table
          @on-select="getIdList"
          @on-select-all="getIdList"
          @on-selection-change="getIdList"
          @on-select-cancel="getIdList"
          @on-select-all-cancel="getIdList"
          border
          ref="selection"
          :columns="columns"
          :data="data"
          :loading="loading"
        >
          <!-- slot-scope="{ index }" -->
          <template slot="action" slot-scope="{ index }">
            <template>
              <Button type="primary" size="small" @click="setJs(index)"
                >修改</Button
              >
              <Button
                type="error"
                size="small"
                style="margin-left: 5px"
                @click="delJs(index)"
                >删除</Button
              >
            </template>
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
    <!-- 新增 -->
    <Modal
      v-model="isAdd"
      :title="type === 'edit' ? '修改' : '新增'"
      @on-ok="ok('formItem')"
      @on-cancel="cancel"
    >
      <Form
        :model="formItem"
        :label-width="110"
        :rules="ruleValidate"
        ref="formItem"
      >
        <FormItem label="id" prop="id" v-if="type === 'edit'">
          <Input v-model="formItem.id" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="项目类别" prop="rectificationType">
          <Select v-model="formItem.rectificationType">
            <Option value="户线整改">户线整改</Option>
            <Option value="分纤箱">分纤箱</Option>
            <Option value="分光器">分光器</Option>
            <Option value="零星">零星</Option>
            <Option value="B改H">B改H</Option>
          </Select>
        </FormItem>

        <FormItem label="整改操作类型" prop="operationType">
          <Input
            v-model="formItem.operationType"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="结算单价" prop="settlementUnit">
          <Input
            v-model="formItem.settlementUnit"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="系数" prop="coefficient">
          <Input
            v-model="formItem.coefficient"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem label="折损" prop="losses">
          <Input
            v-model="formItem.losses"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import {
  getSalary,
  setSalary,
  updateSalary,
  delSalary,
} from "@/api/getJsszApi";
export default {
  data() {
    return {
      type: "add",
      thisData: null,
      formItem: {
        id: "",
        rectificationType: "", //整改类型
        operationType: "", //整改操作类型
        settlementUnit: "", //结算单价
        coefficient: "", //系数
        losses: "", //折损
      },
      ruleValidate: {
        rectificationType: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "change",
          },
        ],
        operationType: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        settlementUnit: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        coefficient: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
        losses: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur",
          },
        ],
      },
      isAdd: false,
      isEdit: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "项目类别",
          key: "rectificationType",
        },
        {
          title: "整改操作类型",
          key: "operationType",
        },
        {
          title: "结算单价",
          key: "settlementUnit",
        },
        {
          title: "系数",
          key: "coefficient",
        },
        {
          title: "折损",
          key: "losses",
        },

        {
          title: "Action",
          slot: "action",
          width: 250,
          align: "center",
          fixed: "right",
        },
      ],
      data: [],
      page: 1,
      pagesize: 10,
      total: 0,
      getList: null,
      loading: true,
    };
  },
  methods: {
    async getData() {
      this.loading = true;
      const { page, pagesize } = this;
      const res = await getSalary("salary/getSalary", { page, pagesize });
      this.data = res.items;
      this.total = res.counts;
      this.loading = false;
    },

    // 新增
    async addSalary() {
      this.$refs["formItem"].resetFields();
      this.isAdd = true;
      this.type = "add";
    },
    ok(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // 提交表单
          const {
            id,
            rectificationType,
            operationType,
            settlementUnit,
            coefficient,
            losses,
          } = this.formItem;
          if (this.type === "add") {
            setSalary("salary/insertSalary", {
              rectificationType,
              operationType,
              settlementUnit,
              coefficient,
              losses,
            }).then((res) => {
              if (res) {
                this.$refs[name].resetFields();
                this.getData();
                this.$Message.success("Success!");
              } else {
                this.$refs[name].resetFields();
                this.$Message.success("error!");
              }
            });
          } else {
            updateSalary("salary/updateSalary", {
              id,
              rectificationType,
              operationType,
              settlementUnit,
              coefficient,
              losses,
            }).then((res) => {
              if (res) {
                this.$refs[name].resetFields();
                this.getData();
                this.$Message.success("Success!");
              } else {
                this.$refs[name].resetFields();
                this.$Message.success("error!");
              }
            });
          }
        } else {
          setTimeout(() => {
            this.isAdd = true;
          });
          this.$Message.error("Fail!");
        }
      });
    },
    cancel() {},
    // 删除
    async delJs(index) {
      const idList = this.data[index].id;
      const res = await delSalary("salary/deleteSalary", { idList });
      if (res) {
        this.$Message.success("success");

        this.getData();
      } else {
        this.$Message.error("error");
      }
    },
    // 批量删除
    async batchRemove() {
      const { idList } = this;
      if (!idList) {
        this.$Message.error("请选择要批量删除的选项");
        return;
      }
      const res = await delSalary("salary/deleteSalary", { idList });
      if (res) {
        this.$Message.success("success");
        this.getData();
      } else {
        this.$Message.error("error");
      }
    },
    // 修改
    async setJs(index) {
      this.isAdd = true;
      this.type = "edit";
      this.thisData = this.data[index];
      for (const prop in this.formItem) {
        console.log(prop);
        this.formItem[prop] = this.thisData[prop];
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

    // 分页
    changePage(val) {
      this.page = val;
      this.getData();
    },
    changeSizePage(val) {
      this.pagesize = val;
      this.getData();
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
#bz {
  height: 100%;
  overflow: auto;

  .title {
    height: 60px;
    line-height: 60px;
    background: #ddd;
    padding-left: 20px;
    font-size: 15px;
    font-weight: 700;
    position: relative;
    span {
      font-size: 13px;
      font-weight: 600;
      position: absolute;
      left: 0;
      top: -60px;
      cursor: pointer;
    }
  }
  .content {
    .content-button {
      height: 55px;
      line-height: 55px;
      button {
        margin-left: 15px;
      }
    }
    .content-table {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .fzSubmit {
        width: 100px;
        margin: 30px auto;
      }
    }
  }
}
</style>