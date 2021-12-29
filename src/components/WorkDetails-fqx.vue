<template>
  <!-- 分纤箱Form -->
  <Form :model="formItem" :label-width="120" style="margin-top: 20px">
    <FormItem label="区县">
      <Select v-model="formItem.county">
        <Option :value="item.value" v-for="item in deptList" :key="item.id">{{
          item.label
        }}</Option>
      </Select>
    </FormItem>
    <FormItem label="站点">
      <Input v-model="formItem.site" placeholder="无数据"></Input>
    </FormItem>
    <FormItem label="机房">
      <Input v-model="formItem.computerRoom" placeholder="无数据"></Input>
    </FormItem>
    <FormItem label="网络资源点">
      <Input v-model="formItem.networkPoints" placeholder="无数据"></Input>
    </FormItem>
    <FormItem label="具体位置">
      <Input v-model="formItem.location" placeholder="无数据"></Input>
    </FormItem>
    <FormItem label="整改人员">
      <Input
        v-model="formItem.correctivePersonnel"
        placeholder="无数据"
      ></Input>
    </FormItem>

    <FormItem label="质检">
      <Input v-model="formItem.test" placeholder="无数据"></Input>
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
    <FormItem label="整改日期">
      <Select v-model="formItem.correctiveTime">
        <Option :value="item" v-for="item in 12" :key="item + new Date()"
          >{{ item }}月后</Option
        >
      </Select>
    </FormItem>
    <FormItem>
      <Button
        type="primary"
        @click="distributeLeaflets"
        :disabled="!(formItem.correctiveTime && checkTeam)"
        v-if="$route.params.type !== 'edit'  && $route.params.type !== 'view'"
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
import { getDept, formatData } from "@/util";
import { singlePd_other, editAx } from "@/api/getAxApi";
export default {
  data() {
    return {
      workDetails: "",
      deptList: getDept(),
      formItem: {
        county: "",
        site: "", //站点
        computerRoom: "", //机房
        networkPoints: "", //网络资源点
        location: "", //具体位置
        correctivePersonnel: "", //整改人员
        correctiveTime: "", //整改有效期
        test: "",
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
    // handleCheck() {
    //   console.log("班组选择click", this.$route.params);
    //   //   this.$router.push({
    //   //     name: "bz",
    //   //     query: { isLook: false },
    //   //   });
    // },

    //数据回填
    dataBackfill() {
      this.workDetails = this.ax.ax; //获取vuex data
      console.log("data", this.workDetails);
      for (const key in this.formItem) {
        const v = this.workDetails[key];
        console.log(v);
        if (v) {
          this.formItem[key] = v;
        }
      }
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
    //派单
    async distributeLeaflets() {
      const { id, teamName } = this.$route.params;
      if (typeof this.formItem.correctiveTime !== "number") {
        this.$Message.error("请填写整改日期");
        return;
      }
      let { correctiveTime } = this.formItem;
      const time = new Date(new Date().setMonth(new Date().getMonth() + correctiveTime));
      const res = await singlePd_other("sin/singleOneFqx", {
        id: +id,
        time,
        teamName,
      });
      // console.log(res);
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
      if (this.formItem.test == "通过") {
        this.formItem.test = 0;
      } else if (this.formItem.test == "未通过") {
        this.formItem.test = 1;
      } else if (this.formItem.test == "待质检") {
        this.formItem.test = 2;
      }
      if (typeof this.formItem.correctiveTime == "number") {
        this.formItem.correctiveTime = new Date(
          new Date().setMonth(
            new Date().getMonth() + this.formItem.correctiveTime
          )
        );
        this.formItem.correctiveTime = formatData(this.formItem.correctiveTime);
      }
      const {
        county,
        site, //站点
        computerRoom, //机房
        networkPoints, //网络资源点
        location, //具体位置
        correctivePersonnel, //整改人员
        correctiveTime, //整改有效期
        test,
      } = this.formItem;
      const res = await editAx("sin/upFqx", {
        county,
        site, //站点
        computerRoom, //机房
        networkPoints, //网络资源点
        location, //具体位置
        correctivePersonnel, //整改人员
        changeTime: correctiveTime, //整改有效期
        test,
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
    this.ax.ax.changeTime = this.ax.ax.correctiveTime;
    this.dataBackfill();
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