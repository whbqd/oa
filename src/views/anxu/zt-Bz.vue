<template>
  <div id="bz">
    <div class="title">
      {{ look ? "班组设置" : "班组查看" }}
      <span v-if="!look" @click="$router.go(-1)"
        ><Icon type="ios-arrow-back" />返回</span
      >
    </div>
    <div class="content">
      <div class="content-button" v-if="look">
        <Button type="error" @click="delBatch">删除选中</Button>

        <Button type="success" @click="isDept = true">新增</Button>
        <Button type="primary" @click="downloadClass">导出</Button>
        <Button type="primary" @click="isBatchDownload = true" v-if='isjudge'>批量导出</Button>
      </div>
      <div class="content-table" v-if="data">
        <Button class="fzSubmit" type="primary" v-if="!look" @click="batch"
          >确定</Button
        >
        <Table
          border
          ref="selection"
          height="500"
          :columns="columnsFilter"
          :data="data"
          @on-select="getIdList"
          @on-select-all="getIdList"
          @on-selection-change="getIdList"
          @on-select-cancel="getIdList"
          @on-select-all-cancel="getIdList"
          :loading="loading"
        >
          <template slot="kg" slot-scope="{ index }">
            <i-switch
              :value="!data[index].status"
              true-color="#13ce66"
              false-color="#ff4949"
              @on-change="changeStatus(data[index].id)"
            />
          </template>

          <template slot-scope="{ index }" slot="action">
            <!-- <Button
              type="primary"
              size="small"
              style="margin-right: 5px"
              @click="view(index)"
              >查看</Button
            > -->
            <template v-if="look">
              <!-- <Button
                type="info"
                @click="edit(index)"
                size="small"
                style="margin-right: 5px"
                >修改</Button
              > -->
              <Button type="error" @click="del(index)" size="small"
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
    <Modal
      v-model="isDept"
      draggable
      scrollable
      title="请选择区县"
      @on-ok="okDept"
    >
      <Select v-model="dept" style="width: 200px">
        <Option
          v-for="item in deptList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</Option
        >
      </Select>
    </Modal>
    <!-- 新增 -->
    <Modal
      v-if="look"
      v-model="isClass"
      title="新建分组"
      @on-ok="ok"
      @on-cancel="cancel"
      width="720px"
    >
      <div class="serch">
        <div class="item">
          <label for="">新建小组名称</label>
          <Input
            v-model="value"
            placeholder="小组名称不能重复"
            style="width: 200px"
          />
        </div>
        <div class="item" :style="{ marginLeft: '40px' }">
          <label for="">班组可见区县</label>
          <Select v-model="lookDept" style="width: 200px">
            <Option
              v-for="item in deptList"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</Option
            >
          </Select>
        </div>
      </div>
      <Transfer
        v-if="userData"
        :titles="['可选员工', '已选员工']"
        :data="userData"
        :target-keys="targetKeys3"
        :list-style="listStyle"
        :operations="['移回', '添加']"
        filterable
        @on-change="handleChange3"
      >
        <div :style="{ float: 'right', margin: '5px' }">
          <Button size="small" style="visibility: hidden">Refresh</Button>
        </div>
      </Transfer>
      <Button
        v-if="userData"
        size="small"
        @click="loaddingData"
        style="position: relative; top: -30px; left: 5px"
        >加载更多</Button
      >
    </Modal>

    <!-- 批量删除弹窗 -->
    <Modal
      v-model="inDelBox"
      title="批量删除"
      @on-ok="inDel"
      okText="确认删除"
      cancelText="取消"
    >
      <span style="margin-right: 10px">删除的时间段:</span>
      <DatePicker
        v-model="timeDel"
        type="daterange"
        format="yyyy/MM/dd"
        placeholder="Select date"
        style="width: 200px"
      ></DatePicker>
    </Modal>
    <!-- 批量导出弹窗 -->
    <Modal
      v-model="isBatchDownload"
      title="批量导出"
      @on-ok="batchDownload"
      okText="导出"
      cancelText="取消"
    >
      <span style="margin-right: 10px">区县:</span>
      <Select v-model="countyDownload" clearable style="width: 200px">
        <Option
          v-for="item in deptList2"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</Option
        >
      </Select>
    </Modal>
  </div>
</template>
<script>
import URL from "../../http/URL";
import { getDept,getAllDeptV,judge } from "@/util/index";
import {
  queryClass,
  delClass,
  editStatusClass,
  deptQueryClass,
  createClass,
  bacthPd,
} from "@/api/getAxApi";
export default {
  data() {
    return {
      isjudge: false,
      countyDownload: "",
      isBatchDownload: false,
      loading: true,
      isLook: true,
      targetKeys3: [],
      listStyle: {
        width: "250px",
        height: "300px",
      },
      value: null,
      modal11: false,
      lookDept: "武林",
      dept: "武林",
      deptList: getDept(),
      deptList2: getAllDeptV(),
      isDept: false, //新增选择区县

      data: null,
      page: 1,
      pagesize: 10,
      total: 0,
      idList: null,
      isClass: false,
      userData: null,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "班组名称",
          key: "teamName",
        },
        {
          title: "班组可见",
          key: "teamsVisible",
          width: 100,
          align: "center",
        },
        {
          title: "班组成员",
          key: "teamsMembership",
        },
        {
          slot: "kg",
          title: "开关",
          align: "center",
          width: 100,
        },
        {
          title: "操作",
          slot: "action",
          width: 120,
          align: "center",
          fixed: "right",
        },
      ],
      inDelBox: false,
      timeDel: [], //删除时间段
    };
  },
  methods: {
    getTargetKeys() {
      return this.userData.map((it) => it);
    },
    handleChange3(newTargetKeys, b, c) {
      this.targetKeys3 = newTargetKeys;
      console.log(b, c);
    },
    render3(item) {
      return item.label;
    },
    reloadMockData() {
      this.getUserData();
    },
    //创建小组
    async ok() {
      const { value, lookDept, targetKeys3, dept } = this;

      if (!value || !targetKeys3.length) {
        this.$Message.error("有未填写项");
        setTimeout(() => {
          this.isClass = true;
        });
        return;
      }
      //获取已选中列表里的员工名
      const dom = document
        .querySelectorAll(".ivu-transfer-list-content")[1]
        .querySelectorAll(".ivu-transfer-list-content-item > span");
      const nameArr = [];
      dom.forEach((it) => nameArr.push(it.innerText));

      const res = await createClass("team/insertTeam", {
        value,
        lookDept,
        targetKeys3,
        nameArr,
        dept,
      });
      if (res) {
        this.$Message.success("success");
        this.getData();
        this.value = "";
        this.lookDept = "";
      } else {
        this.$Message.error("error");
      }

      console.log(res);
    },
    cancel() {},
    async getData() {
      this.loading = true;
      const { page, pagesize } = this;
      const res = await queryClass("team/getTeams", { page, pagesize });
      this.total = res.counts;
      this.data = res.items;
      this.loading = false;
      console.log(res);
    },
    //分页
    changePage(page) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      this.page = page;
      this.getData();
    },
    //删除
    async delBatch() {
      if (!this.idList) {
        this.$Message.error("请选择要删除的选项");
        return;
      }
      const flag = confirm("确定删除？");
      if (!flag) {
        return;
      }

      const res = await delClass("team/deleteTeam", this.idList);
      if (res) {
        this.$Message.success("删除成功!");
        this.getData();
      } else {
        this.$Message.error("error");
      }
    },
    async del(index) {
      const flag = confirm("确定删除？");
      if (!flag) {
        return;
      }
      const res = await delClass("team/deleteTeam", this.data[index].id);
      if (res) {
        this.$Message.success("删除成功!");
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
    //修改状态
    async changeStatus(id) {
      const res = await editStatusClass("team/updateTeams", id);
      if (res) {
        this.$Message.success("状态已修改");
      } else {
        this.$Message.error("error");
      }
    },
    //区县确定
    async okDept() {
      await this.getUserData();
      this.isClass = true;
      this.lookDept = this.dept;
    },
    async getUserData() {
      this.page = 1;
      const { dept, page, pagesize } = this;
      const res = await deptQueryClass("team/getUserStaff", {
        dept,
        page,
        pagesize,
      });

      this.userData = res.items;
      this.userData.forEach((it) => {
        it.key = it.id;
        it.label = it.name;
      });
    },
    async loaddingData() {
      this.page++;
      const { dept, page, pageSize } = this;
      const res = await deptQueryClass("team/getUserStaff", {
        dept,
        page,
        pageSize,
      });
      res.items.forEach((it) => {
        it.key = it.id;
        it.label = it.name;
      });
      this.userData = [...this.userData, ...res.items];
      console.log(this.userData);
    },

    //批量派单/确定小组
    async batch() {
      if (!this.idList) {
        this.$Message.error("请选择班组");
        return;
      }
      if (this.idList.length > 1) {
        this.$Message.error("只能选择一个班组");
        return;
      }
      const { type, tableType, ids, id } = this.$route.params;
      const { dept } = this;
      const teamids = this.idList[0]; //选中的班组ID
      if (type === "batch") {
        const res = await bacthPd("sin/single" + tableType, { ids, teamids });
        if (res) {
          this.$Message.success("success");
          this.$router.go(-1);
        } else {
          this.$Message.error("error");
        }
      } else if (type === "single") {
        const teamName = this.data.filter((it) => it.id === teamids)[0]
          .teamName; //获取id对应的小组名称
        this.$router.push({
          name: "pd",
          params: {
            type,
            tableType,
            id,
            teamName,
            dept, //新增 传入区县
          },
        });
      } else if (type === "edit") {
        const teamName = this.data.filter((it) => it.id === teamids)[0]
          .teamName; //获取id对应的小组名称
        this.$router.push({
          name: "pd",
          params: {
            type,
            tableType,
            id,
            teamName,
            dept, //新增 传入区县
          },
        });
      }
    },
    view() {
      //暂未
      this.$Message.warning("功能暂未开发");
    },
    edit() {
      this.$Message.warning("功能暂未开发");
    },
    changeSizePage(val) {
      this.pagesize = val;
      this.getData();
    },
    // 根据时间删除
    inDel() {},
    // 导出班组
    downloadClass() {
      if (!this.idList) {
        this.$Message.error("请选择要导出的选项");
        return;
      }
      let action = "";
      for (let i = 0; i < this.idList.length; i++) {
        action += `teamIds=${this.idList[i]}&`;
      }
      action = action.slice(0, action.length - 1);
      console.log(URL + "team/downTeams" + "?" + action);
      window.open(URL + "team/downTeams" + "?" + action, "_blank");
    },
    // 批量导出班组
    batchDownload() {
      const { countyDownload } = this;
      if(!countyDownload) {
        setTimeout(() => {
          this.$Message.error("请选择要导出的区县");
          this.isBatchDownload = true;
        })
        return;
      }
      window.open(`${URL}team/byCounty?county=${countyDownload}`, '_blank');
    },
  },
  created() {
    this.isjudge = judge(this.$store.state.dept);
    this.getData();
  },
  computed: {
    look() {
      console.log(this.$route.query.isLook);
      if (this.$route.query.isLook === undefined) {
        return true;
      }
      return false;
    },
    columnsFilter() {
      this.look || this.$delete(this.columns, 5);
      return this.columns;
    },
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
        margin: 15px auto;
      }
    }
  }
}
.serch {
  display: flex;
  margin-bottom: 20px;
  margin-left: 20px;

  .item {
    margin-right: 20px;
    label {
      margin-right: 10px;
    }
  }
}
</style>