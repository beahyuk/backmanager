<template>
<el-card class="box-card">
  <Header></Header>
  <Table :tableData="taskData"></Table>
</el-card>
</template>

<script>
import Table from "views/category3/taskrunning/Table";
import Header from "views/category3/taskrunning/Header"
export default {
  data() {
    return {
      taskData: [{
        name: "suite1",
        startTime: "05-21-11:00:03",
        finishTime: "05-21-12:00:03",
        taskStatus: "执行完成",
        passNum: "18",
        failNum: "3",
        total: "21"
      }]
    }
  },
  components: {
    Table,
    Header
  }
}
</script>

<style>
.box-card {
  height: 100%;
}
</style>
