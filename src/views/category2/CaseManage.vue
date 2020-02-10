<template>
<el-card class="box-card">
  <!-- 1.上面的导航部分  -->
  <Navitable></Navitable>
  <!-- 2.中间的button -->
  <Button></Button>
  <!-- 3.下面的table类型 -->
  <Table :tableData="suiteData"></Table>
</el-card>
</template>

<script>
import Navitable from 'views/category2/pages/casemanage/Navitable'
import Table from 'views/category2/pages/casemanage/Table'
import Button from 'views/category2/pages/casemanage/Button'
export default {
  name: "CaseManage",
  components: {
    Navitable,
    Table,
    Button
  },
  data() {
    return {
      suiteData: [{
          name: "suite1",
          describe: "为了测试1",
          remark: "已完善"
        },
        {
          name: "suite2",
          describe: "为了测试2",
          remark: "未完善"
        },

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
