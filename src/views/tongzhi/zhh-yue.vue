<template>
  <div class="noticeAdmin">
    <!-- 表格 -->
    <el-table
      ref="singleTable"
      stripe
      :data="tableData"
      highlight-current-row
      style="width: 100%"
      height="555"
      id="se"
      :cell-style="{ padding: '1px', textAlign: 'center', fontSize: '12px' }"
      :header-cell-style="{
        background: '#dddddd',
        color: '#606266',
        textAlign: 'center',
        fontSize: '14px',
      }"
    >
      <el-table-column property="receivingname" label="姓名"> </el-table-column>
      <el-table-column property="receivingPhone" label="手机号">
      </el-table-column>
      <el-table-column property="read" label="阅读状态"> </el-table-column>
      <el-table-column property="received1" label="发送状态"> </el-table-column>
      <el-table-column property="notificationName" label="标题">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pagesize"
      :total="counts"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>
<script>
import { gets } from "../../request/wan";
// import URL from "../../http/URL2";
export default {
  data() {
    return {
      tableData: [],
      // 查看
      form: {
        name: "",
        card: "",
        sector: "",
        infoDate: "",
        notes: "",
      },
      pagesize: 50,
      currentPage: 1,
      counts: 0,
    };
  },
  created() {
    //离职
    gets("Notification/getNotificationRecord", {
      id: this.$store.state.tongId,
    })
      .then((res) => {
        console.log(res.data);
        this.counts = res.data.length;
        this.tableData = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    shuj() {
      gets("Notification/getNotificationRecord", {
        id: this.$store.state.tongId,
      })
        .then((res) => {
          console.log(res.data);
          this.counts = res.data.length;
          this.tableData = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleSizeChange: function (val) {
      this.pagesize = val;
      this.shuj();
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
      this.shuj();
    },
    gets() {
      this.dialogFormVisible = false;
    },
  },
};
</script>
<style scoped lang="less">
.a {
  display: none;
}
.noticeAdmin {
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #ffffff;
}
.top {
  height: 50px;
  background: #ffffff;
  .but {
    width: 100px;
    height: 30px;
    color: #ffffff;
    border-radius: 3px;
    margin-top: 10px;
    margin-left: 30px;
  }
  .col1 {
    background-color: #0077f1;
  }
  .col2 {
    background-color: #fe5722;
  }
  .yan {
    background: #ffffff;
    width: 250px;
    height: 30px;
    border-radius: 20px;
    padding-left: 20px;
    margin-top: 10px;
    margin-left: 30px;
    border: 0px;
  }
  .sosuo {
    position: absolute;
    left: 270px;
    top: 18px;
    color: rgb(165, 165, 165);
  }
  .col {
    color: #000;
  }
  .icon {
    font-size: 22px;
    line-height: 20px;
  }
  .icon:hover {
    color: #ffffff;
  }
  .item {
    width: 10px;
    height: 30px;
    position: relative;
    left: 380px;
    top: -25px;
    background: #dddddd;
    border: none;
  }
}
.xiu {
  font-size: 8px;
}
.judge3 {
  font-size: 18px;
  color: #00a2ff;
}
.judge2 {
  font-size: 18px;
  color: #ff0000;
}
.judge {
  font-size: 18px;
  color: #07d800;
}
.col {
  color: #a2a2a2;
  font-size: 18px;
}

.kuan {
  display: flex;
  .pic {
    position: relative;
    width: 100px;
    height: 120px;
    top: 45px;
    left: 70px;
    border: 1px solid #d3d3d3;
  }
  .form {
    position: relative;
    width: 70%;
  }
}
</style>