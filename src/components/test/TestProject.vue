<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>测试管理</el-breadcrumb-item>
    <el-breadcrumb-item>测试项目</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="card">
    <!-- 三个按钮 -->
    <el-row>
      <el-button @click="createNew">新建项目</el-button>
      <el-button @click="multiAction">批量执行</el-button>
      <el-button @click="multiDelete">批量删除</el-button>
    </el-row>
    <!-- 表格table -->
    <el-table :data="tableData" stripe style="width: 100%,  background-color: rgba(169, 216, 184, 0.5);" :highlight-current-row="true" @row-click="toModuleInfo">
      <el-table-column fixed="left" type="selection" label=""></el-table-column>
      <el-table-column label="测试项目名称">
        <template slot-scope="scope">
          <el-button type="text" size="medium">{{scope.row.testproject_name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="section_name" label="所属部门"></el-table-column>
      <el-table-column prop="project_name" label="项目名称">

      </el-table-column>
      <el-table-column prop="version_number" label="版本名称"></el-table-column>
      <el-table-column prop="user_name" label="创建者"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-tooltip :enterable="false" effect="dark" content="编辑" placement="top-start">
            <el-button type="success" @click="handleClick(scope.row)" icon="el-icon-edit" size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>

    </el-table>

  </el-card>
</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    createNew() {
      console.log("createNew")
    },
    multiAction() {
      console.log("multiAction")
    },
    multiDelete() {
      console.log("multiDelete")
    },
    showTestProjectInfo() {
      console.log("***********")
      var that = this;
      let param = new URLSearchParams()
      this.$axios.get(this.host + '/test/testproject/querypagelist', {
          params: param
        })
        .then(function (response) {
          var res = response.data
          console.log("2222222222222222222222222222")
          if (res.success) {
            that.tableData = res.testProjectInfo
            console.log("allTestProjectInfo", that.tableData)
            // that.showUserInfo()
          }
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
    toModuleInfo(val) {
      // console.log(val)
      var that = this
      that.$router.push({
        name: "moduletest", //待修改的路由名称
        query: val
      })
    },

    handleClick(row) {
      console.log(row);
    },
    operate() {
      console.log(this.UserData)
    }

  },
  mounted() {
    this.showTestProjectInfo()
  }
}
</script>

<style>
/* .card{
  height: 100%;
  background-color: rgba(183, 226, 197, 0.7);
} */
</style>
