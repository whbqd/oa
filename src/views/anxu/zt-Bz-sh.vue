<template>
  <div id="bz">
    <div class="title">班组审核</div>
    <div class="content">
      <div class="content-button">
        <Button type="success" @click="batchAgree">审批通过</Button>
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
          :data="dataFilter"
        >
          <!-- slot-scope="{ index }" -->
          <template slot="action" slot-scope="{ index }">
            <template>
              <Button
                type="primary"
                size="small"
                style="margin-right: 5px"
                @click="agree(index)"
                >同意</Button
              >
              <Button type="error" size="small" @click="rebut(index)"
                >驳回</Button
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
            ></Page>          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getExamineClass, agreeRebut, batchAgree } from "@/api/getBzshApi";
export default {
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "小组名称",
          key: "teamsName",
        },
        {
          title: "小组可见区县",
          key: "teamsVisible",
        },
        {
          title: "小组所在区县",
          key: "teamCounty",
        },
        {
          title: "班组状态",
          key: "status",
        },
        {
          title: "派单状态",
          key: "singleStatus",
        },
        {
          title: "小组审核状态",
          key: "teamAudit",
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
    };
  },
  computed: {
    dataFilter() {
      return this.data.map((it) => {
        it.teamsMembership = !it.teamsMembership ? "启用" : "未启用";
        it.singleStatus = !it.singleStatus ? "已派单" : "未派单";
        it.status = !it.status ? "开启" : "关闭";
        if (it.teamAudit === 0) {
          it.teamAudit = "无需审核";
        } else if (it.teamAudit === 1) {
          it.teamAudit = "待审核";
        } else if (it.teamAudit === 2) {
          it.teamAudit = "已审核";
        } else {
          it.teamAudit = "审核未通过";
        }
        return it;
      });
    },
  },
  methods: {
    async getData() {
      const { page, pagesize } = this;
      const res = await getExamineClass("audit/getTeamAudit", { page, pagesize });
      this.data = res.items;
      this.total = res.counts;
    },
    // 同意
    async agree(index) {
      const id = this.data[index].id; //获取id
      const res = await agreeRebut("audit/updateTeamAudit", { id, type: 2 });
      if (res) {
        this.$Message.success("success");
        this.getData();
      } else {
        this.$Message.error("error");
      }
    },
    //驳回
    async rebut(index) {
      const id = this.data[index].id; //获取id
      const res = await agreeRebut("audit/updateTeamAudit", { id, type: 3 });
      if (res) {
        this.$Message.success("success");
        this.getData();
      } else {
        this.$Message.error("error");
      }
    },
    //审批通过
    async batchAgree() {
      const { idList } = this;

      if (!idList) {
        this.$Message.error("请选择要审批的选项");
        return;
      }
      if (idList.length > 1) {
        this.$Message.error("目前只能选择一项数据");
        return;
      }
      const res = await batchAgree("audit/updateTeamAudit", { idList });
      if (res) {
        this.$Message.success("success");
        this.getData();
      } else {
        this.$Message.error("error");
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
    }
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