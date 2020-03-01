<template>
    <el-table :data="this.userlist" :stripe="true" style="width: 100%" >
    <el-table-column fixed="left" prop="user_head" label="头像" width="80"></el-table-column>
    <el-table-column prop="user_name" label="用户名" width="150"></el-table-column>
    <el-table-column prop="section_name" label="所属部门" width="160"></el-table-column>
    <el-table-column prop="user_role" label="所属职位" width="160"></el-table-column>
    <el-table-column prop="user_mail" label="邮箱" width="160"></el-table-column>
    <el-table-column fixed="right" prop="user_phone" label="手机号" width="150"></el-table-column>
  </el-table>
</template>

<script>
export default {
    props:["userlist"], 

    methods: {
      handleClick(row) {
        console.log(row);
      },
      operate(){
          console.log(this.userlist)
      }
    }
}
</script>

<style scoped>

</style>