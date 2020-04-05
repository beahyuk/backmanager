<template>
<div>

      <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>测试管理</el-breadcrumb-item>
    <el-breadcrumb-item>关键字</el-breadcrumb-item>
  </el-breadcrumb>
<el-card class="box-card">
  <!-- 1.上面导航部分 -->
  <Header></Header>
  <!-- 2.下方表格 -->
  
</el-card></div>
</template>

<script>
import Header from 'views/category2/pages/keywords/Header.vue'
export default {
    name: "Keywords",
    components: {
        Header,
    },
    data(){
        return{
        // 关键字表格数据
        keywordTable:[]
        }
    },
    
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
</style>
