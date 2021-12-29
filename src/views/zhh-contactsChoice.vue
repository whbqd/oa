<template>
  <div class="contacts">
    <!-- 左边 -->
    <div class="left">
      <!-- 搜索 -->
      <div class="so">
        <input
          type="text"
          name="lookup"
          placeholder="搜索部门，人名"
          autocomplete="off"
          class="yan"
        />
        <div class="ding"><span class="iconfont icon-sousuo"></span></div>
      </div>
      <!-- 头部 -->
      <div class="top">
        <p class="font">组织构架</p>
      </div>
      <!-- 树结构 -->
      <div class="xuan">
        <el-tree
          :data="data"
          :props="defaultProps"
          show-checkbox
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
        ></el-tree>
      </div>
    </div>
    <!-- 右边 -->
    <div class="rigth">
      <!-- 头部 -->
      <div class="top">
        <p class="fonts">
          已选<span>{{ sele }}</span
          >/<span>50</span>人
        </p>
        <el-button type="primary" size="mini" class="wei" @click="over"
          >确定</el-button
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
            style="margin-left: 20px; margin-top: 20px"
            >{{ name.name }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 左边
      data: [
        {
          label: "公司领导",
          name: "ling",
          checked: false,
        },
        {
          label: "维护部",
          name: "wei",
          checked: false,
          children: [
            {
              label: "维护部（家集客）",
              name: "weihu",
              checked: true,
            },
            {
              label: "维护部（网管）",
              name: "weihu2",
              checked: true,
            },
          ],
        },
        {
          label: "建设部",
          name: "jian",
          checked: true,
          children: [
            {
              label: "建设外",
              name: "jianshe",
              checked: true,
            },
            {
              label: "建设内",
              name: "jianshe2",
              checked: true,
            },
          ],
        },
      ],
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

      ssss: "",
    };
  },
  created() {
    // 获取人员名单
    this.$axios.get("/api/choice").then((res) => {
      // console.log(res.data.list[0]);
      this.ssss = res.data.list[0];
    });
    // console.log(111)
  },
  methods: {
    // 选择部门人员名单
    handleNodeClick(data) {
      this.name = this.ssss[data.name];
    },
    // 全选
    handleCheckChange(data, val) {
      // console.log("222", val);
      this.name = this.ssss[data.name];
      var dons = 0;
      var dons2 = 0;

      // 全选
      if (val) {
        // 存储原始数据
        const a = this.checkboxGroup;
        //存储添加数据
        const b = [];
        // 判断人员是否存在
        console.log(121, this.name.length);

        for (var x = 0; x < this.name.length; x++) {
          console.log(111, this.name.length);
          dons++;
          // 添加人员
          const add = this.name[x].name;
          var ss = 0;
          // 原始人员
          for (var y = 0; y < this.checkboxGroup.length; y++) {
            dons2++;
            const origin = this.checkboxGroup[y].name;
            // 判断是否存在
            if (add == origin) {
              ss = 1;
            }
          }
          if (ss == 0) {
            // 存在保留
            b.push(this.name[x]);
          }
        }
        console.log(dons);
        console.log(dons2);

        //合并数据
        this.checkboxGroup = a.concat(b);
        // 已选择人数
        this.sele = this.checkboxGroup.length;
      }
      // 取消全选
      if (!val) {
        for (var j = 0; j <= this.name.length - 1; j++) {
          const del = this.name[j].name;
          for (var i = this.checkboxGroup.length - 1; i >= 0; i--) {
            const origin = this.checkboxGroup[i].name;
            if (origin == del) {
              this.checkboxGroup.splice(i, 1);
            }
          }
        }
        // 部门人员名单
        this.sele = this.checkboxGroup.length;
      }
    },

    // 单个人名
    handleCheckedCitiesChange() {
      // 选中个数
      this.sele = this.checkboxGroup.length;
    },
    // 提交
    over() {
      console.log(JSON.stringify(this.checkboxGroup));
      // console.log(this.checkboxGroup);
    },
  },
};
</script>
<style scoped lang="less">
.contacts {
  width: 100%;
  height: 100%;
  display: flex;
}
.left {
  width: 30%;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background: #ffffff;
  .so {
    height: 50px;
    .yan {
      border: 1px solid #d3d3d3;
      width: 60%;
      height: 30px;
      border-radius: 20px;
      padding-left: 15%;
      margin-top: 10px;
      margin-left: 17%;
    }
    .ding {
      width: 20px;
      position: relative;
      left: 95px;
      top: -23px;
      color: #d3d3d3;
    }
  }
  .xuan {
    width: 100%;
    height: 460px;
  }
  .top {
    width: 100%;
    height: 40px;
    background: #dddddd;
    .font {
      font-size: 15px;
      line-height: 40px;
      font-weight: bold;
      margin-left: 20px;
    }
  }
}
.rigth {
  width: 68%;
  border-left: 1px solid #e2e2e2;
  background: #ffffff;
  margin-left: 2%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .top {
    width: 100%;
    height: 40px;
    background: #dddddd;
    .font {
      font-size: 15px;
      line-height: 40px;
      font-weight: bold;
      margin-left: 20px;
    }
    .fonts {
      font-size: 18px;
      line-height: 40px;
      text-align: center;
    }
    .wei {
      position: absolute;
      right: 10px;
      top: 6px;
    }
  }
  .xuan {
    width: 100%;
    height: 460px;
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
</style>