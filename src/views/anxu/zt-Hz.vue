<template>
  <div class="hz">
    <div class="left-box mybox-shadow">
      <Tabs value="name2" :animated="false">
        <TabPane label="区县排行" name="name1">
          <dept-hz />
        </TabPane>
        <TabPane label="小组排行" name="name2">
          <class-hz />
        </TabPane>
        <TabPane label="个人排行" name="name3">
          <person-hz />
        </TabPane>
      </Tabs>
    </div>
    <div class="right-box mybox-shadow">
      <h5 class="title">工单完成情况</h5>
      <div id="echars-box"></div>
    </div>
  </div>
</template>

<script>
import { Pie } from "@antv/g2plot";
import { getOrder } from "@/api/getHzApi";
export default {
  components: {
    classHz: () => import("@/components/HzClass"),
    personHz: () => import("@/components/HzPerson"),
    deptHz: () => import("@/components/HzDept"),
  },
  data() {
    return {
      className: null,
      data: [
        // { type: "未派单", value: 27 },
        // { type: "处理中", value: 25 },
        // { type: "已报结", value: 18 },
        // { type: "无法完成", value: 15 },
      ],
      totalOrders: 0,
    };
  },
  computed: {
    dataFzFilter() {
      if (!this.className) {
        return this.dataFz;
      }
      return this.dataFz.filter((item) => {
        return item.mc.includes(this.className);
      });
    },
  },
  methods: {
    getPie() {
      const piePlot = new Pie("echars-box", {
        appendPadding: 10,
        data: this.data,
        angleField: "value",
        colorField: "type",
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: "inner",
          offset: "-50%",
          content: "{value}",
          style: {
            textAlign: "center",
            fontSize: 14,
          },
        },
        interactions: [
          { type: "element-selected" },
          { type: "element-active" },
        ],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: "pre-wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            },
            formatter: () => `订单总数\n\r${this.totalOrders}`,
          },
        },
      });

      piePlot.render();
    },
    // 获取订单(饼图)
    async getOrderData() {
      const res = await getOrder("toji/Statistics", { time: "" });
      this.data.push(
        { type: "未派单", value: res.noOrders },
        { type: "处理中", value: res.rocessingp },
        { type: "已报结", value: res.reportedClosure },
        { type: "无法完成", value: res.canNotDo },
        { type: "已结算", value: res.close }
      );
      this.totalOrders = res.totalOrders;
      this.getPie();
    },
  },
  created() {},
  mounted() {
    // this.getPie();
    this.getOrderData();
  },
};
</script>

<style lang="less" scoped>
.hz {
  height: 100%;
  display: flex;
  overflow: auto;

  .left-box {
    flex: 3;
  }
  .right-box {
    margin-left: 30px;
    flex: 2;
    position: relative;
    .title {
      height: 40px;
      line-height: 40px;
      font-size: 15px;
      margin-left: 20px;
      font-weight: 700;
    }
    #echars-box {
      margin-left: auto;
      margin-right: auto;
      width: 400px;

      // background: yellowgreen;
    }
  }
}
</style>