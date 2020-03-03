<template>
<el-card class="box-card">
  <Table :tableData="suiteData"></Table>
</el-card>
</template>

<script>
import Table from "views/category3/running/Table";
export default {
  data() {
    return {
      suiteData: [{
          id: 1,
          name: "suite1",
          status: "执行完成",
          put: "展开",
          children: [{
              id: 11,
              name: "case1",
              status: "pass"
            },
            {
              id: 12,
              name: "case2",
              status: "fall"
            },

            {
              id: 13,
              name: "case3",
              status: "正在执行"
            },

          ]
        },
        {
          id: 2,
          name: "suite2",
          status: "正在执行",
          put: "展开"
        },

        {
          id: 3,
          name: "suite3",
          status: "未执行",
          put: "展开"
        },

      ]
    }
  },
  components: {
    Table
  }
}
</script>

<style>
.box-card {
  height: 100%;
}
</style>
