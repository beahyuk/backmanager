<template>
    <el-container direction="vertical">
        <el-col style="height: 100px">
           <el-card style="height: 90px;">
               <Search @searchresult="searchResult"></Search>
            </el-card>
        </el-col>
        <el-main style="height: 585px; width:100%;background-color: rgb(255, 255, 255);" ><Table :SearchMonitor="searchMonitor" :ProjectData="projectData"></Table></el-main>
    </el-container>
</template>

<script>
import Table from "views/category1/pages/projectmanage/Table.vue"
import Search from "views/category1/pages/projectmanage/Search.vue"
export default {
    name: "ProjectManage",
    data(){
        return{
            projectData:[],
            searchMonitor: false
        }
    },
    components: {
        Search,
        Table,
    },
    methods:{
        searchResult(res){
            var that = this
            that.searchMonitor = !that.searchMonitor
            that.projectData = res
        }
    },
    // mounted(){
    //     this.searchResult()
    // }
}
</script>

<style scoped>

</style>