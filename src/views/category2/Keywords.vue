<template>
<el-card class="box-card">
  <!-- 1.上面导航部分 -->
  <Header></Header>
  <!-- 2.下方表格 -->
  <Table :tableData='keywordTable'></Table>
</el-card>
</template>

<script>
import Header from 'views/category2/pages/keywords/Header.vue'
import Table from "views/category2/pages/keywords/Table";
export default {
  name: "Keywords",
  components: {
    Header,
    Table
  },
  data(){
    return{
      // 关键字表格数据
      keywordTable:[
        {name:'关键字一',parameterType:'String',returnType:'integer',instructions:'为了xxx',section:'部门一',createTime:'2018-05-12'}
      ]
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
</style>
