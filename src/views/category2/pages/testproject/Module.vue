<template>
<el-container direction="vertical">
    <el-col style="height: 100px">
        <el-card style="height: 90px;">
            <Search ></Search>
        </el-card>
    </el-col>
    <el-main style="height: 585px; width:100%;background-color: rgb(255, 255, 255);">
        <NaviMenu></NaviMenu>
        <Table></Table>
    </el-main>
</el-container>
</template>

<script>
import Search from "views/category2/pages/testproject/testmodule/Search"
import NaviMenu from "views/category2/pages/testproject/testmodule/NaviMenu"
export default {
    // name: "Module",
    components: {
        Search,
        NaviMenu,
    },
    data() {
        return {
        }
    },
    methods: {

        showTable(){
            var that = this
            var testProjectId = that.$route.query.testproject_id
            console.log(testProjectId)
            let param = new URLSearchParams()
            param.append('testproject_id', testProjectId)
            this.$axios.get(this.host + '/test/testproject/queryprojectcomponent',{
                                                        params:param
                                                        })
            .then(function(response){
                var res = response.data
                if(res.success){
                    // that.tableData = res.testProjectInfo
                    console.log("projectComponentInfo",res)
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
