<template>
  <el-table :data="tableData" :stripe="true" style="width: 100%" >
    <el-table-column fixed="left" type="selection" width="50" label=""></el-table-column>
    <el-table-column prop="project_name" label="项目名称" width="200">
        <template slot-scope="scope">
           <router-link tag="a" :to="{ name:'version', query:{projectId:scope.row.project_id,projectName:scope.row.project_name}}" >{{ scope.row.project_name}}</router-link>
           <div><router-view></router-view></div>
        </template>
    </el-table-column>
    <el-table-column prop="user_name" label="项目负责人" width="200">
        <template slot-scope="scope">
            <el-button type="text" @click="showUserInfo(scope.row)">{{ scope.row.user_name}}</el-button>
            <el-dialog title="用户信息" :visible.sync="dialogTableVisible" :append-to-body="true">
            <el-row justify="center" v-for="item in userData" :key="item.key" style="height:60px;">
                <span>{{item.key}}: {{item.value}}</span>
            </el-row>
            </el-dialog>
        </template>
    </el-table-column>
    <el-table-column prop="section_name" label="所属部门" width="200"></el-table-column>
    <el-table-column prop="describe" label="描述" width="240"></el-table-column>
    <el-table-column fixed="right" label="操作" width="150">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="medium">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import Version from "views/category1/pages/projectmanage/Version"
  export default {
    props:["ProjectData", "SearchMonitor"], 
    watch:{
        SearchMonitor:function (val, oldVal) {
            if(val===!oldVal){
                this.tableData = this.ProjectData
            }
        }
    },
    data() {
        return {
            tableData: [],
            userData:[],
            dialogTableVisible: false,
        }
    },
    methods: {
        showProjectInfo(){
            var that = this;
            let param = new URLSearchParams()
            this.$axios.get(this.host + '/project/querypagelist',{
                                                        params:param
                                                        })
            .then(function(response){
                var res = response.data
                if(res.success){
                    that.tableData = res.projectInfoList
                    console.log("allProjectInfo",that.tableData)
                    // that.showUserInfo()
                }
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },
        showUserInfo(data){
            var that = this
            that.dialogTableVisible = true
            that.userData = [
                {
                  key: "头像",
                  value: data.user_head
              },
              { 
                key: "姓名",
                value: data.user_name
              },
              {
                  key: "电话",
                  value: data.user_phone
              },
              {
                  key: "邮箱",
                  value: data.user_mail
              },
            ]
        },
        handleClick(row) {
            console.log(row);
        },
    },
    mounted(){
        this.showProjectInfo()
    }
  }
</script>
<style scoped>
   
</style>