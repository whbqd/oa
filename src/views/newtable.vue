<template>
  <div class="newtable" style="padding-left: 20px">
    
    <div class="dateWapper">
      <el-date-picker
        v-model="date"
        type="datetime"
        placeholder="选择日期时间"
        align="right"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
      <el-button plain style="margin-left: 30px" @click="download"
        >导出</el-button
      >
    </div>

    <ul class="box">
      <!-- 日期 -->
      <li class="dateBox descBox">
        <div class="title">日期</div>
        <div
          class="date desc"
          v-for="item in dateList"
          :key="item + getRandom()"
        >
          {{ item }}
        </div>
      </li>
      <!-- 区县上传情况 -->
      <li
        class="deptBox descBox"
        v-for="(item, index) in data.length"
        :key="item + getRandom()"
      >
        <div class="title">{{ data[index].sector }}</div>
        <div
          class="state desc"
          v-for="state in data[index].map"
          :key="state + getRandom()"
          :class="{ ok: +state, no: !+state }"
        >
          {{ +state ? "✔" : "×" }}
        </div>
      </li>
    </ul>
    <el-backtop :bottom="30"> </el-backtop>
  </div>
</template>


<script>
import { getTable } from "../api/videoAPI";
import { formatData,judge } from "../util";
import URL from "../http/URL2";
export default {
  data() {
    return {
      url: URL,
      data: [],
      deptList: [
        {
          value: "上城",
          label: "上城",
        },
        {
          value: "下城",
          label: "下城",
        },
        {
          value: "西湖",
          label: "西湖",
        },
        {
          value: "江干",
          label: "江干",
        },
        {
          value: "拱墅",
          label: "拱墅",
        },
        {
          value: "滨江",
          label: "滨江",
        },
        {
          value: "萧山",
          label: "萧山",
        },
        {
          value: "余杭",
          label: "余杭",
        },
        {
          value: "临安",
          label: "临安",
        },
        {
          value: "富阳",
          label: "富阳",
        },
        {
          value: "建德",
          label: "建德",
        },
        {
          value: "桐庐",
          label: "桐庐",
        },
        {
          value: "淳安",
          label: "淳安",
        },
        {
          value: "武林",
          label: "武林",
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },

      date: "",
    };
  },

  computed: {
    // ...mapState(['dept']),
    dateList() {
      const { data } = this;
      if (!data.length) {
        return [];
      }
      const list = Object.keys(data[0].map);
      return list.map((it) => {
        return it.split("-")[1] + "-" + it.split("-")[2];
      });
    },

  },
  watch: {
    date() {
      this.getData();
    },
  },
  methods: {
    async getData() {
      let { date } = this;
      console.log(formatData(date));
      const res = await getTable("video/videoRecords", formatData(date));
      if(!judge(this.$store.state.dept)) {
        this.data = [];
        this.data.push(res[0]);
        return;
      }
      this.data = res;
    },
    getRandom() {
      return Math.random() * 9999999 + +new Date();
    },

    // 导出
    download() {
      const { date } = this;
      const dept = this.$store.state.dept;
      console.log('导出', `${URL.apiUrl}video/down?county=维护部&date=${formatData(date)}&county=${dept}`);
      window.open(
        `${URL.apiUrl}video/down?date=${formatData(date)}&county=${dept}`,
        "_blank"
      );
    },
  },
  created() {
    this.getData();
  },
  props: {
    dept: String,
  },
};
</script>

<style scoped>
.newtable {
  width: 100%;
  height: 100%;
  overflow: auto;
}
ul,
li {
  margin: 0;
  padding: 0;
}
.nav {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  font-weight: 2000;
  font-size: 22px;
  position: relative;
}
.nav i {
  position: absolute;
  left: -15px;
  top: 10px;
  transition: all 0.3s;
}
.nav i:hover {
  color: #8e44ad;
}
.dateWapper {
  height: 60px;
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.box {
  display: flex;
  list-style: none;
  min-width: 700px;
  overflow: auto;
  /* background: #000; */
}
.box .descBox {
  min-width: 80px;
  flex: 1;
  text-align: center;
}
.box .title {
  font-size: 17px;
  height: 60px;
  line-height: 60px;
}
.box .desc {
  font-size: 15px;
  height: 60px;
  line-height: 60px;
}
.box .ok {
  color: #2ecc71;
}
.box .no {
  color: #e74c3c;
}
</style>