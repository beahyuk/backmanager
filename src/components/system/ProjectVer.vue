<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/projectmanage' }">项目管理</el-breadcrumb-item>
    <el-breadcrumb-item>项目版本</el-breadcrumb-item>
  </el-breadcrumb>

  <el-container style="height:100%;">
    <el-main style="height:100%; background-color: rgb(255, 255, 255);">
      <el-row>
        <el-button type="primary" plain>添加</el-button>
        <el-table :data="tableData" :stripe="true" style="width: 100%">
          <el-table-column fixed="left" type="selection" width="50" label=""></el-table-column>
          <el-table-column prop="version_number" label="版本号" width="200"></el-table-column>
          <el-table-column prop="project_name" label="项目名称" width="200"></el-table-column>
          <el-table-column prop="imprint" label="版本说明" width="200"></el-table-column>
          <el-table-column prop="remark" label="备注" width="180"></el-table-column>
          <el-table-column label="详细计划" width="180">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="medium">查看</el-button>
              <el-dialog title="版本计划" :visible.sync="dialogTableVisible" :append-to-body="true">
                <div v-for="item in versionPlan" :key="item.key" class="text item">
                  {{item.key}}: {{item.value}}
                </div>
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="editClick(scope.row)" type="text" size="medium">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>
  </el-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      versionPlan: [],
      dialogTableVisible: false,
    }
  },
  name: "version",
  props: ["UserData"],
  methods: {
    showVersionInfo() {
      var that = this;
      let param = new URLSearchParams()
      param.append('project_id', that.$route.query.projectId)
      param.append('project_name', that.$route.query.projectName)
      this.$axios.get(this.host + '/project/version/querypagelist', {
          params: param
        })
        .then(function (response) {
          var res = response.data
          if (res.success) {
            that.tableData = res.versionInfoList
            console.log("allVersionInfo", that.tableData)
            // that.showUserInfo()
          }
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
    handleClick(row) {
      console.log(row);
      var that = this
      that.dialogTableVisible = true
      that.versionPlan = [{
          key: '计划上线日期',
          value: row.plan_launchdate
        },
        {
          key: '实际上线日期',
          value: row.actually_launchdate
        },
        {
          key: '计划开发开始时间',
          value: row.plan_devstart
        },
        {
          key: '实际开发开始时间',
          value: row.actually_devstart
        },
        {
          key: '计划开发结束时间',
          value: row.plan_devend
        },
        {
          key: '实际开发结束时间',
          value: row.actually_devend
        },
        {
          key: '计划测试开始时间',
          value: row.plan_teststart
        },
        {
          key: '实际测试开始时间',
          value: row.actually_teststart
        },
        {
          key: '计划测试结束时间',
          value: row.plan_testend
        },
        {
          key: '实际测试结束时间',
          value: row.actually_testend
        },
      ]
    },
  },
  mounted() {
    this.showVersionInfo()
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 100%;
  height: 300px;
}
</style>
