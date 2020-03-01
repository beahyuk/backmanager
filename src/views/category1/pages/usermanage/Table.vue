<template>
  <el-table :data="this.UserData" :stripe="true" style="width: 100%" >
    <el-table-column fixed="left" type="selection" width="50" label=""></el-table-column>
    <el-table-column prop="user_head" label="头像" width="120"></el-table-column>
    <el-table-column prop="user_name" label="用户名" width="150"></el-table-column>
    <el-table-column prop="section_name" label="所属部门" width="180"></el-table-column>
    <el-table-column prop="user_role" label="所属职位" width="160"></el-table-column>
    <el-table-column prop="user_mail" label="邮箱" width="160"></el-table-column>
    <el-table-column prop="user_phone" label="手机号" width="150"></el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
          tableData: this.UserData
      }
    },
    props:["UserData"], 
    methods: {
      handleClick(row) {
        console.log(row);
      },
      operate(){
          console.log(this.UserData)
      }
    }
  }
</script>
<style scoped>
   
</style>