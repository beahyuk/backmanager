<template>
  <el-table class="table" 
  ref="filterTable"
   height="585" 
   style="width: 100%" 
  :data="tableData">
  <!-- 表头名 -->
  <el-table-column prop="keyword" label="关键字名称" width="300">
  </el-table-column>
  <el-table-column prop="section_name" label="所属部门" width="300">
  </el-table-column>
  <el-table-column prop="script_name" label="所属脚本" width="350">
  </el-table-column>
  <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="medium">查看</el-button>
      </template>
    </el-table-column>
</el-table>
</template>
    
<script>
export default {
  props:["tableData"],

  methods:{
      handleClick(row){
        console.log(row)
        this.$router.push({name: "globalfunc", query: {scriptName: row.script_name}})
      }
  }
}
</script>

<style>
.table {
  height: 100%
}
</style>