<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
    <el-breadcrumb-item>项目管理</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <!-- 搜索框 -->
    <el-form ref="form" :model="form" :inline="true" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input v-model="form.projectname" style="width: 12em;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门名称">
            <el-input v-model="form.sectionname" style="width: 12em;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" plain size="medium" @click='search'>搜索</el-button>
            <el-button type="primary" plain size="medium" @click='reset'>重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" :stripe="true" style="width: 100%">
      <el-table-column fixed="left" type="selection" width="50" label=""></el-table-column>
      <el-table-column prop="project_name" label="项目名称" width="200">
        <template slot-scope="scope">
          <router-link tag="a" :to="{ 
            name:'version', 
            query:{projectId:scope.row.project_id,projectName:scope.row.project_name}}">{{ scope.row.project_name}}</router-link>
          <div>
            <router-view></router-view>
          </div>
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
      <el-table-column prop="section_name" label="所属部门" ></el-table-column>
      <el-table-column prop="describe" label="描述" ></el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="medium">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
export default {
  inject: ['reload'],
  watch: {
    SearchMonitor: function (val, oldVal) {
      if (val === !oldVal) {
        this.tableData = this.ProjectData
      }
    }
  },

  data() {
    return {
      form: {
        projectname: '',
        sectionname: '',
      },
      tableData: [],
      userData: [],
      dialogTableVisible: false,
      projectData: [],
      searchMonitor: false
    }
  },
  methods: {
    // 搜索请求
    search() {
      var that = this;
      let param = new URLSearchParams()
      param.append('project_name', that.form.projectname)
      param.append('section_name', that.form.sectionname)
      this.$axios.get(this.host + '/project/querypagelist', {
          params: param
        })
        .then(function (response) {
          var res = response.data
          that.searchMonitor = !that.searchMonitor
          that.projectData = res.projectInfoList
          // that.$emit('searchresult', res.projectInfoList)
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
    // 重置功能
    reset() {
      let that = this
      that.reload()
    },
    // 显示搜索出来的项目信息
    showProjectInfo() {
      var that = this;
      let param = new URLSearchParams()
      this.$axios.get(this.host + '/project/querypagelist', {
          params: param
        })
        .then(function (response) {
          var res = response.data
          if (res.success) {
            that.tableData = res.projectInfoList
            console.log("allProjectInfo", that.tableData)
            // that.showUserInfo()
          }
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
    // 显示用户信息
    showUserInfo(data) {
      var that = this
      that.dialogTableVisible = true
      that.userData = [{
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
  mounted() {
    this.showProjectInfo()
  }

}
</script>

<style>

</style>
