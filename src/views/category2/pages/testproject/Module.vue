<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>测试管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/testproject' }">测试项目</el-breadcrumb-item>
    <el-breadcrumb-item>测试模块</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <NaviMenu :componentTree="componentTree"></NaviMenu>
  </el-card>

</div>
</template>

<script>
import Search from "views/category2/pages/testproject/testmodule/Search"
import NaviMenu from "views/category2/pages/testproject/testmodule/NaviMenu"
export default {
  // name: "Module",
  components: {
    Search,
    NaviMenu,
  },
  data() {
    return {
      componentTree: []
    }
  },
  methods: {
    showTable() {
      var that = this
      var testProjectId = that.$route.query.testproject_id
      console.log(testProjectId)
      let param = new URLSearchParams()
      param.append('testproject_id', testProjectId)
      this.$axios.get(this.host + '/test/testproject/queryprojectcomponent', {
          params: param
        })
        .then(function (response) {
          var res = response.data
          if (res.success) {
            console.log("projectComponent", res)
            that.componentTree = res.projectComponent
          }
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    }
  },
  mounted() {
    this.showTable()
  }
}
</script>

<style>
.table {
  height: 100%;
  margin-top: 15px;
}
</style>
