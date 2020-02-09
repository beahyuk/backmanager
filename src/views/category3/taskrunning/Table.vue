<template>
<el-table class="table" ref="filterTable" height="400" style="width: 100%" 
 :data="tableData">

  <!-- 表头名 -->

  <el-table-column prop="name" label="任务" width="100">
  </el-table-column>
  <el-table-column prop="startTime" label="开始时间" width="200">
  </el-table-column>
  <el-table-column prop="finishTime" label="结束时间" width="200">
  </el-table-column>
  <el-table-column prop="taskStatus" label="任务状态" width="150">
  </el-table-column>
  <el-table-column prop="passNum" label="Pass" width="100">
  </el-table-column>
  <el-table-column prop="failNum" label="Fail" width="100">
  </el-table-column>
  <el-table-column prop="total" label="总计" width="100">
  </el-table-column>

</el-table>
</template>

<script>
export default {
  props: ["tableData"]
}
</script>

<style>

</style>
