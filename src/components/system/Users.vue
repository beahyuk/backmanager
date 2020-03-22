<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>系统管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 主页内容 -->
  <el-card>
    <!-- 搜索表单 -->
    <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
      <el-row type="flex" class="row-bg">
        <el-col :span="5">
          <el-form-item label="用户名">
            <el-input v-model="form.name" style="width:10em"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="部门">
            <el-input v-model="form.section" style="width:10em"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="手机号">
            <el-input v-model="form.phone" style="width:10em"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="邮箱">
            <el-input v-model="form.mail" style="width:12em"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" plain size="medium" @click='search'>搜索</el-button>
            <el-button type="primary" plain size="medium" @click='reset'>重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <!-- 搜索结果展示表格 -->
    <el-table :data="UserData" :stripe="true" border strip style="width: 100%">
      <el-table-column fixed="left" type="selection"  label=""></el-table-column>
      <el-table-column prop="user_head" label="头像" ></el-table-column>
      <el-table-column prop="user_name" label="用户名" ></el-table-column>
      <el-table-column prop="section_name" label="所属部门"></el-table-column>
      <el-table-column prop="user_role" label="所属职位" ></el-table-column>
      <el-table-column prop="user_mail" label="邮箱" ></el-table-column>
      <el-table-column prop="user_phone" label="手机号" ></el-table-column>
      <el-table-column fixed="right" label="操作" >
        <template slot-scope="scope">
          <!-- 查看 -->
          <el-tooltip :enterable="false" effect="dark" content="查看" placement="top-start">
            <el-button type="primary" icon="el-icon-view" size="mini" @click="handleClick(scope.row)"></el-button>
          </el-tooltip>
          <!-- 编辑 -->
          <el-tooltip :enterable="false" effect="dark" content="编辑" placement="top-start">
            <el-button type="success" icon="el-icon-edit" size="mini"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

  </el-card>
</div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      form: {
        name: '',
        section: '',
        phone: '',
        mail: '',
      },
      UserData: []
    }
  },
  methods: {
    search() {
      var that = this;
      let param = new URLSearchParams()
      param.append('user_phone', that.form.phone)
      param.append('user_mail', that.form.mail)
      param.append('user_name', that.form.name)
      param.append('section_name', that.form.section)
      this.$axios.get(this.host + '/user/querypagelist', {
          params: param
        })
        .then(function (response) {
          var res = response.data
          that.UserData = res.userInfoList
          console.log(that.UserData, res)
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
    reset() {
      let that = this
      that.reload()
    },
    handleClick(row) {
      console.log(row);
    },

  }
}
</script>

<style>

</style>
