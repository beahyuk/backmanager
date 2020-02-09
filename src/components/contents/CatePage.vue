<template>
<el-container class="container">
  <!-- 头部 -->
  <el-header class="header"> 
    <Header @returnclick="backClick" @outClick="outClick"></Header> </el-header>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px"> <Aside :childName='projectName'></Aside>
    </el-aside>
    <!-- 主体内容 -->
    <el-main class="main">
      <!-- main进行侧边栏点击的路由渲染 -->
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import Header from "views/home/Header";
import Aside from "views/home/Aside";
export default {
  name: "Category1",
  props:["projectName"],
  components: {
    Header,
    Aside,
  },
  methods:{
    backClick(){
      history.back(-1)
    },
    outClick(){
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}

.header {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>
