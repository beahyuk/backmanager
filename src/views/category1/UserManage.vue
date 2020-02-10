<template>
    <el-container direction="vertical">
        <el-col style="height: 200px">
           <el-card header="用户查询" style="height: 190px;">
               <PickerForm @pickerform="pickerformrtn" ></PickerForm>
            </el-card>
        </el-col>
        <el-main style="height: 485px;"><Table :UserData="userData"></Table></el-main>
    </el-container>

</template>

<script>
import PickerForm from "views/category1/pages/usermanage/PickerForm"
import Table from "views/category1/pages/usermanage/Table"
export default {
    name: "UserManage",
    components:{
       PickerForm,
       Table
    },
    data(){
        return{
            userData:[],
        }
    },
    methods:{
        pickerformrtn(data){
            var that = this
            console.log("pickerform返回值：", data)
            that.userData = data.userInfoList
        }
    }
}

</script>

<style scoped>
  .el-card {
    border: 1px solid #eee;
    box-shadow:0 0 10px rgb(190, 190, 190);
    background-color: rgb(255, 255, 255);
    color: #333;
    line-height: 20px;
    border-radius:10px;
  }
  .el-main {
    background-color: rgb(255, 255, 255);
    color: #333;
    
  }

</style>
