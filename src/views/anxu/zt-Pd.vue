<template>
  <div class="pd">
    <!-- 派单 -->
    <div class="pd-box mybox-shadow">
      
      <div class="title">工单详情</div>
      <span style="font-size:15px; cursor: pointer;padding-left:10px" @click="() => { this.$router.push('/homepage/Ax')}">
             <Icon type="md-arrow-round-back" />返回
      </span>
 
      <div class="content .pd-content">
        <component :is="disForm" />
      </div>
    </div>
    <!-- 右侧数据区 -->
    <div class="jr-box">
      <!-- 工单进度 -->
      <div class="gd-box mybox-shadow">
        <div class="title">工单进度</div>
        <div class="content">
          <Steps :current="1" status="error">
            <Step title="已派单" content="已派单"></Step>
            <Step title="处理中" content="处理中"></Step>
            <Step title="报结" content="报结"></Step>
            <Step title="质检" content="质检"></Step>
            <Step title="结算" content="结算"></Step>
          </Steps>
        </div>
      </div>
      <!-- 操作记录 -->
      <div class="cz-box mybox-shadow">
        <div class="title">操作记录</div>
        <div class="content">
          <Table :columns="columns1" :data="data1"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    Hxzg: () => import('@/components/WorkDetails-hxzg'),
    Fqx: () => import('@/components/WorkDetails-fqx'),
    Fgq: () => import('@/components/WorkDetails-fgq'),
    Lx: () => import('@/components/WorkDetails-lx'),
  },
  computed: {
    disForm() {
      return this.$route.params.tableType
    }
  },
  data() {
    return {
      workDetails: null, //工单详情数据
      pdFrom: 'axzgFrom',
      columns1: [
        {
          title: "时间",
          key: "date",
        },
        {
          title: "姓名",
          key: "name",
        },
        {
          title: "进度",
          key: "jd",
        },
      ],
      data1: [
        {
          name: "Tony",
          jd: "New York No. 1 Lake Park",
          date: "2016-10-03",
        },
        {
          name: "Tony",
          jd: "London No. 1 Lake Park",
          date: "2016-10-01",
        },
        {
          name: "Tony",
          jd: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
        },
        {
          name: "Tony",
          jd: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
        },
      ],
    };
  },
  methods: {
    


  },
  created() {
    console.log("当前表类型",this.disForm)
    console.log('pd', this.$route.params)
  }
};
</script>

<style lang="less" scoped>
.pd {
  height: 100%;
  display: flex;
  overflow: auto;

  .title {
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    background: #ddd;
    font-size: 17px;
  }
  .content {
    box-sizing: border-box;
    overflow: auto;
    padding: 30px;
    height: calc(~"100% - 40px");
  }

  .pd-box {
    flex: 3;
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
  }
  .jr-box {
    flex: 2;
    margin-left: 40px;
    display: flex;
    flex-direction: column;
    .gd-box {
      flex: 1;
      .content {
        display: flex;
        align-items: center;
      }
    }
    .cz-box {
      margin-top: 40px;
      flex: 2;
     
    }
  }
}
</style>


