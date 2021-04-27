<template>
  <div class="process">
    <!-- 标题 -->
    <div class="top">
      <div class="font" @click="cli = 0" :class="{ col: cli == 0 }">
        <p>通用审批</p>
      </div>
      <div class="font" @click="cli = 1" :class="{ col: cli == 1 }">
        <p>物品领用</p>
      </div>
      <div class="font" @click="cli = 2" :class="{ col: cli == 2 }">
        <p>用印申请</p>
      </div>
      <div class="font" @click="cli = 3" :class="{ col: cli == 3 }">
        <p>物料申领</p>
      </div>
      <span class="iconfont icon-icon- tui" @click="tui"></span>
    </div>
    <!-- 表单 -->
    <div>
      <!-- 表单1 -->
      <div :class="{ dis: cli != 0 }" class="gund">
        <el-form label-width="100px" class="from">
          <!-- 申请标题 -->
          <el-form-item label="申请标题：" class="daiban">
            <el-select
              v-model="value"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 内容描述 -->
          <el-form-item label="内容描述：">
            <el-input
              type="textarea"
              v-model="neirong"
              rows="3"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <!-- 图片 -->
          <el-form-item label="图片：">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-remove="handleRemove"
              width="50px"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <!-- 上传附件 -->
          <el-form-item label="上传附件：">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemoves"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload></el-form-item
          >
          <!-- 审批人 -->
          <el-form-item label="审批人：">
            <div class="renyuan">
              <div v-for="(item, index) in toux" :key="index">
                <img :src="item.url" />
                <p class="name">{{ item.name }}</p>
              </div>
              <span
                class="iconfont icon-tianjia1 font"
                @click="show = !show"
              ></span>
              <div :class="{ dis: show }"></div>
            </div>
          </el-form-item>
          <!-- 抄送人 -->
          <el-form-item label="抄送人：" class="dh">
            <div class="renyuan">
              <div v-for="(item, index) in toux2" :key="index">
                <img :src="item.url" />
                <p class="name">{{ item.name }}</p>
              </div>
              <span
                class="iconfont icon-tianjia1 font"
                @click="show2 = !show2"
              ></span>
            </div>
          </el-form-item>
          <el-button type="primary" class="zhong" @click="sub">提交</el-button>
        </el-form>
        <personnel class="personnel" :class="{ dis: show == true }"></personnel>
        <personnel
          class="personnel"
          :class="{ dis: show2 == true }"
        ></personnel>
      </div>
      <div :class="{ dis: cli != 1 }" class="gund">
        <el-form label-width="100px" class="from">
          <!-- 申请标题 -->
          <el-form-item label="申请标题：" class="daiban">
            <el-select
              v-model="value"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 内容描述 -->
          <el-form-item label="内容描述：">
            <el-input
              type="textarea"
              v-model="neirong"
              rows="3"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <!-- 图片 -->
          <el-form-item label="图片：">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-remove="handleRemove"
              width="50px"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <!-- 上传附件 -->
          <el-form-item label="上传附件：">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemoves"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload></el-form-item
          >
          <!-- 审批人 -->
          <el-form-item label="审批人：">
            <div class="renyuan">
              <div v-for="(item, index) in toux" :key="index">
                <img :src="item.url" />
                <p class="name">{{ item.name }}</p>
              </div>
              <span
                class="iconfont icon-tianjia1 font"
                @click="show = !show"
              ></span>
              <div :class="{ dis: show }"></div>
            </div>
          </el-form-item>
          <!-- 抄送人 -->
          <el-form-item label="抄送人：" class="dh">
            <div class="renyuan">
              <div v-for="(item, index) in toux2" :key="index">
                <img :src="item.url" />
                <p class="name">{{ item.name }}</p>
              </div>
              <span
                class="iconfont icon-tianjia1 font"
                @click="show2 = !show2"
              ></span>
            </div>
          </el-form-item>
          <el-button type="primary" class="zhong" @click="sub">提交</el-button>
        </el-form>
        <personnel class="personnel" :class="{ dis: show == true }"></personnel>
        <personnel
          class="personnel"
          :class="{ dis: show2 == true }"
        ></personnel>
      </div>
      <div :class="{ dis: cli != 2 }" class="gund">
        <el-form label-width="100px" class="from">
          <!-- 申请标题 -->
          <el-form-item label="申请标题：" class="daiban">
            <el-select
              v-model="value"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 内容描述 -->
          <el-form-item label="内容描述：">
            <el-input
              type="textarea"
              v-model="neirong"
              rows="3"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <!-- 图片 -->
          <el-form-item label="图片：">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-remove="handleRemove"
              width="50px"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <!-- 上传附件 -->
          <el-form-item label="上传附件：">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemoves"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload></el-form-item
          >
          <!-- 审批人 -->
          <el-form-item label="审批人：">
            <div class="renyuan">
              <div v-for="(item, index) in toux" :key="index">
                <img :src="item.url" />
                <p class="name">{{ item.name }}</p>
              </div>
              <span
                class="iconfont icon-tianjia1 font"
                @click="show = !show"
              ></span>
              <div :class="{ dis: show }"></div>
            </div>
          </el-form-item>
          <!-- 抄送人 -->
          <el-form-item label="抄送人：" class="dh">
            <div class="renyuan">
              <div v-for="(item, index) in toux2" :key="index">
                <img :src="item.url" />
                <p class="name">{{ item.name }}</p>
              </div>
              <span
                class="iconfont icon-tianjia1 font"
                @click="show2 = !show2"
              ></span>
            </div>
          </el-form-item>
          <el-button type="primary" class="zhong" @click="sub">提交</el-button>
        </el-form>
        <personnel class="personnel" :class="{ dis: show == true }"></personnel>
        <personnel
          class="personnel"
          :class="{ dis: show2 == true }"
        ></personnel>
      </div>
      <div :class="{ dis: cli != 3 }" class="gund">
        <el-form label-width="100px" class="from">
          <!-- 申请标题 -->
          <el-form-item label="申请标题：" class="daiban">
            <el-select
              v-model="value"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 内容描述 -->
          <el-form-item label="内容描述：">
            <el-input
              type="textarea"
              v-model="neirong"
              rows="3"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <!-- 图片 -->
          <el-form-item label="图片：">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-remove="handleRemove"
              width="50px"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <!-- 上传附件 -->
          <el-form-item label="上传附件：">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemoves"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload></el-form-item
          >
          <!-- 审批人 -->
          <el-form-item label="审批人：">
            <div class="renyuan">
              <div v-for="(item, index) in toux" :key="index">
                <img :src="item.url" />
                <p class="name">{{ item.name }}</p>
              </div>
              <span
                class="iconfont icon-tianjia1 font"
                @click="show = !show"
              ></span>
              <div :class="{ dis: show }"></div>
            </div>
          </el-form-item>
          <!-- 抄送人 -->
          <el-form-item label="抄送人：" class="dh">
            <div class="renyuan">
              <div v-for="(item, index) in toux2" :key="index">
                <img :src="item.url" />
                <p class="name">{{ item.name }}</p>
              </div>
              <span
                class="iconfont icon-tianjia1 font"
                @click="show2 = !show2"
              ></span>
            </div>
          </el-form-item>
          <el-button type="primary" class="zhong" @click="sub">提交</el-button>
        </el-form>
        <personnel class="personnel" :class="{ dis: show == true }"></personnel>
        <personnel
          class="personnel"
          :class="{ dis: show2 == true }"
        ></personnel>
      </div>
    </div>
  </div>
</template>
<script>
import personnel from "../components/personnel";
export default {
  data() {
    return {
      // 点击
      cli: "",
      // 申请标题
      value: "",
      options: [{ value: "zhan" }, { value: "sd" }, { value: "gdf" }],
      // 内容描述
      neirong: "",
      // 文件
      fileList: [],
      // 头像
      toux: [
        { name: "张呵呵", url: require("../assets/as.jpg") },
        // { name: "张呵呵", url: require("../assets/as.jpg") },
      ],
      toux2: [
        { name: "张呵呵", url: require("../assets/as.jpg") },
        // { name: "张呵呵", url: require("../assets/as.jpg") },
      ],
      // 人员点击
      show: true,
      show2: true,
    };
  },
  components: { personnel },
  methods: {
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 上传附件
    handleRemoves(file, fileList) {
      console.log(file, fileList);
      this.fileList = file;
    },
    handlePreview(file) {
      console.log(1, file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 退出
    tui() {
      this.$router.push("/homepage/approval");
    },
    // 提交
    sub() {
      // this.$router.push("/homepage/approval");
      console.log(1, this.value);
      console.log(2, this.neirong);
      console.log(3, this.fileList);
      console.log(4, this.toux);
      console.log(5, this.toux2);
    },
  },
};
</script>
<style scoped lang="less">
.dh {
  transform: 1s;
}
.gund {
  overflow: auto;
  height: 540px;
}
// 主体
.process {
  width: 100%;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
// 隐藏
.dis {
  display: none;
}
// 头部
.top {
  height: 50px;
  background: #cccccc;
  display: flex;
  position: relative;
  .font {
    font-size: 15px;
    width: 150px;
    line-height: 50px;
    text-align: center;
    font-weight: 600;
  }
  // 点击变色
  .col {
    background: #ffffff;
    color: #0077f1;
  }
  .tui {
    position: absolute;
    right: 10px;
    top: 10px;
    transition: 0.1s;
    font-size: 30px;
  }
  .tui:hover {
    font-size: 35px;
  }
}
// 表单
.from {
  width: 95%;
  margin: auto;
  margin-top: 30px;
  .daiban {
    .el-select {
      width: 300px;
    }
  }
  .renyuan {
    width: 300px;
    // height: 80px;
    display: flex;
    .name {
      margin-top: -20px;
      text-align: center;
      margin-left: 15px;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-left: 15px;
    }
    .font {
      font-size: 30px;
      // line-height: 80px;
      margin-left: 10px;
      color: #c0c0c0;
    }
  }
  .zhong {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    border-radius: 3px;
    height: 32px;
    line-height: 02px;
    margin-bottom:10px ;
  }
}
.personnel {
  width: 700px;
  height: 500px;
  position: absolute;
  top: 50px;
  left: 400px;
}
</style>