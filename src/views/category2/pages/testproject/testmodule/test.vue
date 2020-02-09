<template>
<el-table class="table" ref="table" height="500" style="width: 100%" :data="tableData">
  <!-- 展开的内容 -->
  <el-table-column type="expand">
    <template > -->
      <!-- 二级内容：模块部分 -->      
      <el-button type="primary" plain>操作</el-button>
      <el-button type="primary" plain>添加脚本</el-button>
    </template>
  </el-table-column>
  <!-- 表头名 -->
  <el-table-column label="序号" type="index" width="90">
  </el-table-column>
  <el-table-column prop="name" label="测试项目名称" width="200">
  </el-table-column>
  <el-table-column prop="sector" label="部门" width="100">
  </el-table-column>
  <el-table-column prop="project" label="项目" width="100">
  </el-table-column>
  <el-table-column prop="version" label="版本" width="100">
  </el-table-column>
  <el-table-column prop="creater" label="创建者" width="100">
  </el-table-column>
  <el-table-column prop="createTime" label="创建时间" width="140">
  </el-table-column>
  <!-- 操作列 -->
  <el-table-column prop="tag" label="操作" width="100">
    <el-button type="primary" plain>操作</el-button>
  </el-table-column>
</el-table>
</template>

<script>
export default {
    name: "Module",
    data() {
        return {
        // 获取row的key值
        getRowKeys(row) {
            return row.id;
        },
        expands: [],
        tableData: []
        }
    },
    methods: {
        showTable(){
            var that = this
            var testProjectId = that.$route.query.testproject_id
            let param = new URLSearchParams()
            param.append('testproject_id', testproject_id)
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
        }
    },
    mounted(){
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
