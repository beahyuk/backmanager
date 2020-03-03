<template>
  <el-table class="table" 
  ref="filterTable"
   height="585" 
   style="width: 100%" 
  :data="tableData">
  <!-- 表头名 -->
  <el-table-column prop="name" label="关键字名称" width="350">
  </el-table-column>
  <el-table-column prop="describe" label="说明" width="500">
  </el-table-column>
  <el-table-column fixed="right" label="操作" width="300">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="medium">编辑</el-button>
      </template>
    </el-table-column>
</el-table>
</template>
    
<script>
export default {
  props:["tableData"]
}
</script>

<style>
.table {
  height: 100%
}
</style>