<template>
  <Form :model="formItem" :label-width="120" style="margin-top: 20px">
    <FormItem label="区县">
      <Select v-model="formItem.county">
        <Option :value="item.value" v-for="item in deptList" :key="item.id">{{
          item.label
        }}</Option>
      </Select>
    </FormItem>
    <FormItem label="宽带账号">
      <Input v-model="formItem.accountNumber" placeholder="无数据"></Input>
    </FormItem>
    <FormItem label="用户联系方式">
      <Input v-model="formItem.contactNumber" placeholder="无数据"></Input>
    </FormItem>
    <FormItem label="整改类型">
      <Select v-model="$route.params.tableType" disabled>
        <Option value="Hxzg">户县整改</Option>
        <Option value="Fqx">分纤箱</Option>
        <Option value="Fgq">分光器</Option>
        <Option value="Lx">零星</Option>
        <Option value="Bgh">B改H</Option>
      </Select>
    </FormItem>
    <FormItem label="接入设备名称">
      <Input v-model="formItem.deviceName" placeholder="无数据"></Input>
    </FormItem>
    <FormItem label="业务接入地址">
      <Input v-model="formItem.address" placeholder="无数据"></Input>
    </FormItem>
    <FormItem label="接入设备端口/端口拼装名称">
      <Input v-model="formItem.devicePort" placeholder="无数据"></Input>
    </FormItem>

    <FormItem label="派单班组">
      <div class="gdzx">
        <ul class="fz">
          <li>{{ checkTeam || ax.ax.lowerGroup || "请选择班组" }}</li>
        </ul>
        <div class="edit">
          <Button type="success" @click="handleCheck" :disabled="$route.params.type == 'view'">班组选择</Button>
        </div>
      </div>
    </FormItem>
    <FormItem label="整改有效期">
      <Select v-model="formItem.periodTime">
        <Option :value="item" v-for="item in 12" :key="item + new Date()"
          >{{ item }}月后</Option
        >
      </Select>
    </FormItem>
    <FormItem>
      <Button
        v-if="$route.params.type !== 'edit' && $route.params.type !== 'view'"
        type="primary"
        @click="distributeLeaflets"
        :disabled="!(formItem.periodTime && checkTeam)"
        >派单</Button
      >
      <Button
        v-if="$route.params.type === 'edit'"
        type="primary"
        @click="editSubmit"
        >修改</Button
      >
    </FormItem>
  </Form>
</template>

<script>
import { mapState } from "vuex";
import { getDept, typeFormat, formatData } from "@/util";
import { singlePd_hxzg, editAx } from "@/api/getAxApi";
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      teamName: null, //小组名称
      workDetails: null,
      deptList: getDept(),
      type: null, //整改类型
      formItem: {
        county: null,
        accountNumber: null, //宽带账号
        contactNumber: null, //用户联系方式
        deviceName: null, //接入设备名称
        address: null, //业务接入地址
        devicePort: null, //接入设备端口/端口拼装名称
        periodTime: null, //整改有效期
      },
    };
  },
  computed: {
    ...mapState(["ax"]),
    checkTeam() {
      return this.$route.params.teamName || null;
    },
  },
  methods: {
    async getWorkDetails() {
      const { tableType, id } = this.$route.params;
      console.log("组件：", tableType, id);

      this.workDetails = this.ax.ax; //获取vuex data
      console.log("workDetails", this.workDetails);
      this.dataBackfill();

      // const request = await workDetails(
      //   "sin/select" + this.$route.params.tableType,
      //   this.$route.params.id
      // );
      // this.workDetails = request;
    },
    //班组选择
    handleCheck() {
      console.log("班组选择click", this.$route.params);
      const { id, tableType, type } = this.$route.params;
      this.$router.push({
        name: "bz",
        params: {
          type, //单个派单
          id,
          tableType,
        },
        query: { isLook: false },
      });
    },
    //数据回填
    dataBackfill() {
      for (const key in this.formItem) {
        const v = this.workDetails[key];

        if (v) {
          this.formItem[key] = v;
        }
      }
    },
    //派单
    async distributeLeaflets() {
      const { id, teamName } = this.$route.params;
      let { periodTime: date } = this.formItem;
      let { type } = this;
      type = typeFormat(type);
      const time = new Date(new Date().setMonth(new Date().getMonth() + date));
      const res = await singlePd_hxzg("sin/singleOneHxzg", {
        id,
        type,
        time,
        teamName,
      });
      console.log(res);
      if (res) {
        this.$Message.success("派单成功");
        this.$router.push("/homepage/Ax");
      } else {
        this.$Message.error("error");
      }
    },
    // 修改
    async editSubmit() {
      const { id, teamName } = this.$route.params;
      if (typeof this.formItem.periodTime == "number") {
        this.formItem.periodTime = new Date(
          new Date().setMonth(new Date().getMonth() + this.formItem.periodTime)
        );
        this.formItem.periodTime = formatData(this.formItem.periodTime);
      }
      const res = await editAx("sin/upHxzg", {
        ...this.formItem,
        id,
        teamName,
      });
      if (res) {
        this.$Message.success("修改成功");
        this.$router.push("/homepage/Ax");
      } else {
        this.$Message.error("error");
      }
    },
  },
  created() {
    this.getWorkDetails();
    this.type = this.$route.params.tableType;
    console.log("修改后", this.formItem);
  },
};
</script>

<style lang='less' scoped>
.gdzx {
  height: 100px;
  border: 1px solid #ddd;
  .fz {
    display: flex;
    margin-left: 10px;
    li {
      margin-right: 10px;
      color: #aaa;
    }
  }
  .edit {
    position: absolute;
    right: 5px;
    bottom: 5px;
    button {
      margin: 5px;
    }
  }
}
</style>