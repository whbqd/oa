<template>
  <div class="processApproval">
    <!-- 上方 -->
    <div class="top">
      <!-- 左边 -->
      <div class="left">
        <!-- 标题 -->
        <div class="title">
          <p class="titleFont">进度查询</p>
          <span class="iconfont icon-icon- tui" @click="tui"></span>
        </div>
        <!-- 表 -->
        <div class="gund">
          <el-form label-width="100px" class="from">
            <!-- 申请标题 -->
            <el-form-item label="申请标题：" class="daiban">
              <el-input v-model="value" placeholder="请选择文章标签">
              </el-input>
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
              <img src="../assets/移动.png" />
            </el-form-item>
            <!-- 上传附件 -->
            <el-form-item label="上传附件：">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :limit="3"
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
              </div>
            </el-form-item>
            <!-- 抄送人 -->
            <el-form-item label="抄送人：" class="dh">
              <div class="renyuan">
                <div v-for="(item, index) in toux" :key="index">
                  <img :src="item.url" />
                  <p class="name">{{ item.name }}</p>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 右边 -->
      <div class="ringth">
        <div class="ringthTop">
          <p class="ringthTopFont">用时：<span>2天5小时30分20秒</span></p>
          <el-button type="warning" class="zhong" size="mini">催办</el-button>
        </div>
        <!-- 时间 -->
        <div class="date">
          <div class="renyuans">
            <div v-for="(item, index) in toux" :key="index">
              <img :src="item.url" />
              <p class="name">{{ item.name }}</p>
            </div>
            <p class="renyuansFont">2021-01-25 10:30:54</p>
          </div>
          <div class="renyuans">
            <div v-for="(item, index) in toux" :key="index">
              <img :src="item.url" />
              <p class="name">{{ item.name }}</p>
            </div>
            <p class="renyuansFont">2021-01-25 10:30:54</p>
          </div>
          <div class="renyuans">
            <div v-for="(item, index) in toux" :key="index">
              <img :src="item.url" />
              <p class="name">{{ item.name }}</p>
            </div>
            <p class="renyuansFont">2021-01-25 10:30:54</p>
          </div>
          <div class="renyuans">
            <div v-for="(item, index) in toux" :key="index">
              <img :src="item.url" />
              <p class="name">{{ item.name }}</p>
            </div>
            <p class="renyuansFont">2021-01-25 10:30:54</p>
          </div>
        </div>
        <div style="height: 400px" class="liu">
          <el-steps direction="vertical" :active="3" finish-status="success">
            <el-step title="已完成"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step
              title="步骤 3"
              description="这是一段很长很长很长的描述性文字"
              icon="el-icon-circle-check"
            ></el-step>
            <el-step
              title="步骤 3"
              description="这是一段很长很长很长的描述性文字"
            ></el-step>
          </el-steps>
        </div>
      </div>
    </div>
    <!-- 下方 -->
    <div class="bottom">
      <el-form class="from">
        <el-col :span="6">
          <el-form-item label="审批意见：" label-width="100px" class="input">
            <el-input
              v-model="opinion"
              placeholder="请填写"
            ></el-input> </el-form-item
        ></el-col>

        <el-col :span="2" :offset="13">
          <el-button size="small" type="warning" class="butt"
            >同意</el-button
          ></el-col
        >
        <el-col :span="2">
          <el-button size="small" type="primary" class="butt"
            >驳回</el-button
          ></el-col
        >
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 申请标题
      value: "办公用品领用申请",
      // 内容描述
      neirong: "文件夹一个，订书机一个",
      // 文件
      fileList: [],
      // 头像
      toux: [
        { name: "张呵呵", url: require("../assets/as.jpg") },
      ],
      opinion: "",
    };
  },
  methods: {
    // 退出
    tui() {
      this.$router.push("/homepage/approval");
    },
  },
};
</script>
<style scoped lang="less">
.processApproval {
  width: 100%;
  height: 100%;
}
.top {
  display: flex;
  .left {
    flex: 8;
    height: 510px;
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .title {
      width: 100%;
      height: 40px;
      background: #dddddd;
      .titleFont {
        font-size: 15px;
        line-height: 40px;
        margin-left: 30px;
      }
      .tui {
        position: relative;
        left: 96%;
        top: -35px;
        transition: 0.1s;
        font-size: 30px;
      }
      .tui:hover {
        font-size: 35px;
      }
    }
    .gund {
      overflow: auto;
      height: 470px;
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
          width: 100px;
        }
      }
    }
  }
  .ringth {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    flex: 3;
    height: 510px;
    background: #ffffff;
    margin-left: 40px;
    .ringthTop {
      width: 100%;
      height: 50px;
      margin-top: 10px;
      position: relative;
      .ringthTopFont {
        font-size: 14px;
        margin-left: 30px;
        line-height: 50px;
      }
      .zhong {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
    .date {
      float: left;
      width: 50%;
      height: 450px;
      .renyuans {
        width: 300px;
        margin-top: 30px;
        display: flex;
        .name {
          margin-top: 10px;
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
          margin-left: 10px;
          color: #c0c0c0;
        }
        .renyuansFont {
          font-size: 14px;
          width: 100px;
          line-height: 20px;
          margin-top: 5px;
          text-align: center;
        }
      }
    }
    .liu {
      float: right;
      width: 50%;
      margin-top: 30px;
    }
  }
}

.bottom {
  width: 100%;
  height: 60px;
  margin-top: 20px;
  background: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .from {
    position: relative;
    top: 10px;
    left: 30px;
  }
  .input {
    .el-input {
      width: 300px;
    }
  }
  .butt {
    width: 80px;
    margin-top: 5px;
  }
}
</style>