<template>
<el-card class="box-card">
  <!-- 1.上面导航部分 -->
  <Header></Header>
  <!-- 2.下方表格 -->
  
</el-card>
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
