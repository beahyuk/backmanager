<template>
<el-table class="table" ref="filterTable" height="400" 
 style="width: 100%" :data="tableData" row-key="id" 
 :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
  <!-- 表头名 -->
  <el-table-column prop="name" label="名称" width="400">
  </el-table-column>
  <el-table-column prop="status" label="状态" width="400">
  </el-table-column>
  <el-table-column prop="put" label="展开/收起" width="100">
  </el-table-column>

</el-table>
</template>

<script>
export default {
  name: "Table",
  props: ['tableData']
}
</script>

<style>
.table {
  height: 100%
}
</style>
