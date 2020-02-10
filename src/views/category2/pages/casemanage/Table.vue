<template>
<el-table class="table" ref="filterTable" height="250" style="width: 100%" :data="tableData">
  <!-- 表头名 -->
  <el-table-column label="序号" type="index" width="80">
  </el-table-column>
  <el-table-column prop="name" label="suite名称" width="150">
  </el-table-column>
  <el-table-column prop="describe" label="描述" width="150">
  </el-table-column>
  <el-table-column prop="remark" label="备注" width="100">
  </el-table-column>

  <!-- 操作列 -->
  <el-table-column prop="tag" label="操作" width="400">
    <template slot-scope="scope">
      <el-button size="mini" type="primary" plain @click="handleDelete(scope.$index, scope.row)">查看</el-button>
      <el-button size="mini" type="primary" plain>新增case</el-button>
      <el-button size="mini" type="primary" plain>展开case</el-button>
      <el-button size="mini" type="primary" plain>执行</el-button>
    </template>
  </el-table-column>
</el-table>
</template>

<script>
export default {
  props: ['tableData'],
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>

<style>
.table {
  height: 100%
}
</style>
