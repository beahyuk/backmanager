<template>
<div>
  <el-row>
    <!-- 返回按钮 -->
    <el-col :span="4">
      <div class="pic" @click="returnclick()">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
    </el-col>
    <!-- 标题 -->
    <el-col :span="18">
      <div class="name">
        <h3>测试后台系统</h3>
      </div>
    </el-col>
    <!-- 退出 -->
    <el-col :span="2">
      <div class='loginout' @click="outClick">
        <a href="#">退出 </a>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "Header",
  methods:{
    returnclick(){
      this.$emit("returnclick")
    },
    outClick(){
      this.$emit("outClick")
    }
  }
}
</script>

<style scoped>
.pic {
  float: left;
  line-height: 60px;
  text-decoration: none
}

.name {
  text-align: center;
}

.loginout {
  float: right;
  line-height: 60px;
  text-decoration: none
}
</style>
