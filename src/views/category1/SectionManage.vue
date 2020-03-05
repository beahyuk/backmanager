<template>
  <el-container style="height:100%;">
    <el-header style="height:15%;">Header</el-header>
    <el-container>
        <el-aside width="25%" style="height:100%;"><SectionTree @getuserlist="getUserList" ></SectionTree></el-aside>
        <el-main style="height:100%;"><UserList :userlist="userList"></UserList></el-main>
    </el-container>
  </el-container>
</template>
<script>
    import SectionTree from "views/category1/pages/sectionmanage/SectionTree"
    import UserList from "views/category1/pages/sectionmanage/UserList"
    export default {
        name: "SectionManage",
        components:{
            SectionTree,
            UserList
        },
        data(){
            return{
                userList:[]
            }
        },
        methods:{
            getUserList(res){
                console.log("####",res)
                this.userList = res.userInfoList
            }
        },
        mounted(){
            // this.getUserList()
        }
    }
</script>
<style scoped>
  .el-header {
    background-color: rgb(255, 255, 255);
    text-align: center;
    line-height: 60px;
    height: 200px;
    box-shadow:0 0 10px rgb(190, 190, 190);
    border-radius:5px;
    border-bottom: 2px solid rgb(231, 231, 231);
  }
  
  .el-aside {
    background-color: rgb(255, 255, 255);
    color: #333;
    text-align: center;
<<<<<<< HEAD
    line-height: 200px;
=======
>>>>>>> aea649f2a6e73252a2f535e5373efe66575895b7
    height: 485px;
    border-right: 2px solid rgb(238, 238, 238);
  }
  
  .el-main {
    background-color: rgb(255, 255, 255);
    color: rgb(43, 42, 42);
    text-align: center;
    line-height: 160px;
    height: 485px;
  }
</style>