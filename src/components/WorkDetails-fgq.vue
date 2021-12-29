<template>
  <!-- 分光器Form -->
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
      <Input v-model="formItem.networkResource" placeholder="无数据"></Input>
    </FormItem>
    <FormItem label="归属OLT">
      <Input v-model="formItem.attributionOlt" placeholder="无数据"></Input>
    </FormItem>
    <!-- <FormItem label="具体位置">
      <Input
        v-model="formItem.location"
        placeholder="无数据"
      ></Input>
    </FormItem> -->
    <FormItem label="整改人员">
      <Input
        v-model="formItem.correctivePersonnel"
        placeholder="无数据"
      ></Input>
    </FormItem>

    <FormItem label="质检">
      <Input v-model="formItem.singleStatus" placeholder="无数据"></Input>
    </FormItem>
    <FormItem label="派单班组">
      <div class="gdzx">
        <ul class="fz">
          <li>{{ checkTeam || "请选择班组" }}</li>
        </ul>
        <div class="edit">
          <Button type="success" @click="handleCheck" :disabled="$route.params.type == 'view'">班组选择</Button>
        </div>
      </div>
    </FormItem>
    <FormItem label="整改日期">
      <Select v-model="formItem.date">
        <Option :value="item" v-for="item in 12" :key="item + new Date()"
          >{{ item }}月后</Option
        >
      </Select>
    </FormItem>
    <FormItem>
      <Button
        type="primary"
        @click="distributeLeaflets"
        :disabled="!(formItem.date && checkTeam)"
        v-if="$route.params.type !== 'edit'"
        >派单</Button
      >
      <Button
        v-if="$route.params.type === 'edit'  && $route.params.type !== 'view'"
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
import { singlePd_other,editAx } from "@/api/getAxApi";
export default {
  data() {
    return {
      workDetails: null,
      deptList: getDept(),
      formItem: {
        county: "",
        site: "", //站点
        computerRoom: "", //机房
        networkResource: "", //网络资源点
        attributionOlt: "", //归属OLT
        correctivePersonnel: "", //整改人员
        date: "", //整改有效期
        singleStatus: "", //质检状态
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
      console.log(this.workDetails);
      for (const key in this.formItem) {
        const v = this.workDetails[key];
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
      let { date } = this.formItem;
      const time = new Date(new Date().setMonth(new Date().getMonth() + date));
      const res = await singlePd_other("sin/singleOneFgq", {
        id,
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
    async editSubmit() {
      const { id, teamName } = this.$route.params;
      if (this.formItem.singleStatus == "通过") {
        this.formItem.singleStatus = 0;
      } else if (this.formItem.singleStatus == "未通过") {
        this.formItem.singleStatus = 1;
      } else if (this.formItem.singleStatus == "待质检") {
        this.formItem.singleStatus = 2;
      }
      if (typeof this.formItem.date == "number") {
        this.formItem.date = new Date(
          new Date().setMonth(new Date().getMonth() + this.formItem.date)
        );
        this.formItem.date = formatData(this.formItem.date);
      }
      const {
        county,
        site, //站点
        computerRoom, //机房
        networkResource, //网络资源点
        attributionOlt, //归属OLT
        correctivePersonnel, //整改人员
        date, //整改有效期
        singleStatus, //质检状态 }
      } = this.formItem;
      const res = await editAx("sin/upFgq", {
        regionsCounties:county,
        site, //站点
        computerRoom, //机房
        networkResource, //网络资源点
        attributionOlt, //归属OLT
        personnel: correctivePersonnel, //整改人员
        rectificationDate: date, //整改有效期
        qualityInspection: singleStatus, //质检状态 }
        id,
        correctivePersonnel: teamName,
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
    // this.formItem.county = this.formItem.regionsCounties;
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