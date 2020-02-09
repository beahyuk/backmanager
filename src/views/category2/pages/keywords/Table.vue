<template>
  <el-table class="table" 
  ref="filterTable"
   height="250" 
   style="width: 100%" 
  :data="tableData">
  <!-- 表头名 -->
  <el-table-column label="序号" type="index" width="80">
  </el-table-column>
  <el-table-column prop="name" label="关键字名称" width="150">
  </el-table-column>
  <el-table-column prop="parameterType" label="入参类型" width="150">
  </el-table-column>
  <el-table-column prop="returnType" label="返回值类型" width="150">
  </el-table-column>
    <el-table-column prop="instructions" label="说明" width="150">
  </el-table-column>
    <el-table-column prop="section" label="部门" width="150">
  </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="150">
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