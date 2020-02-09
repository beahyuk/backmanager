<template>
  <el-table :data="tableData" :stripe="true" style="width: 100%" :highlight-current-row="true" @row-click="toModuleInfo">
    <el-table-column fixed="left" type="selection" width="50" label=""></el-table-column>
    <el-table-column prop="testproject_name" label="测试项目名称" width="200">
    </el-table-column>
    <el-table-column prop="section_name" label="所属部门" width="160"></el-table-column>
    <el-table-column prop="project_name" label="项目名称" width="160"></el-table-column>
    <el-table-column prop="version_number" label="版本名称" width="160"></el-table-column>
    <el-table-column prop="user_name" label="创建者" width="150"></el-table-column>
    <el-table-column prop="create_time" label="创建时间" width="160"></el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="medium">编辑</el-button>
      </template>
    </el-table-column>
    
  </el-table>
  
</template>

<script>
import Category2 from "views/category2/Category2"
  export default {
    data() {
      return {
          tableData: []
      }
    },
    methods: {
        showTestProjectInfo(){
            var that = this;
            let param = new URLSearchParams()
            this.$axios.get(this.host + '/test/testproject/querypagelist',{
                                                        params:param
                                                        })
            .then(function(response){
                var res = response.data
                if(res.success){
                    that.tableData = res.testProjectInfo
                    // console.log("allTestProjectInfo",that.tableData)
                    // that.showUserInfo()
                }
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },
        toModuleInfo(val){
            // console.log(val)
            var that = this
            that.$router.push({ name: "module",
                                query: val
                                })
        },


        handleClick(row) {
            console.log(row);
        },
        operate(){
            console.log(this.UserData)
        }
    },
    mounted(){
        this.showTestProjectInfo()
    }
  }
</script>
<style scoped>
   
</style>