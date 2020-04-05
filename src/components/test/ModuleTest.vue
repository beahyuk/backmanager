<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>测试管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/testproject' }">测试项目</el-breadcrumb-item>
    <el-breadcrumb-item>测试模块</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <!-- 调用树形下拉框组件 -->
    <SelectTree :props="props" :options="optionData" :clearable="isClearable" :accordion="isAccordion" @getValue="getValue($event)" @getExpand="getExpand($event)" @getClose="getClose($event)" />

    <!-- 显示table -->
    <SuiteTable v-if="Visible=='suite'" :SuiteData="suiteData"></SuiteTable>
    <ScriptTable v-if="Visible=='script'" :ScriptData="scriptData"></ScriptTable>

  </el-card>
</div>
</template>

<script>
import SelectTree from "components/test/module/TreeSelect.vue";
import SuiteTable from "components/test/module/SuiteTable"
import ScriptTable from "components/test/module/ScriptTable"

export default {

  components: {
    SelectTree,
    SuiteTable,
    ScriptTable,
  },
  data() {
    return {
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      name: [],
      props: { // 配置项（必选）
        label: 'dirname',
        children: 'subList',
        // disabled:true
      },
      optionData: [],
      suiteData: [],
      scriptData: [],
      Visible: ''
    };
  },

  methods: {
    // 取值
    getValue(value) {
      this.name = value
      // console.log(this.name);
    },
    //获取展开的节点信息
    getExpand(data) {
      console.log("getExpand", data)
      var that = this
      if (data.dirname === "Suite") {
        that.suiteData = data.subList
        that.Visible = "suite"
        console.log("suiteData", that.suiteData)
      } else if (data.dirname === "Script" || data.hasOwnProperty("suite_name")) {
        that.scriptData = data.subList
        that.Visible = "script"
        console.log("scriptData", that.scriptData)
      }

    },
    getClose(data) {
      console.log("getClose", data)
      var that = this
      that.Visible = ''
    },
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
            that.optionData = res.projectComponent
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
};
</script>

<style>

</style>
