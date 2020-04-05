<template>
    <el-container>
        <el-aside  >
            <el-tree :data="data" 
            :props="defaultProps" 
            @node-expand="handleNodeClick"
             @node-collapse="handleNodeClose" 
             :indent="25" 
             :highlight-current="true" ></el-tree>

        </el-aside>
        <el-main style="height:100%;">
            <SuiteTable v-if="Visible=='suite'" :SuiteData="suiteData" ></SuiteTable>
            <ScriptTable v-if="Visible=='script'" :ScriptData="scriptData"></ScriptTable>
        </el-main>
    </el-container>
</template>

<script>
import Tree from  "views/category2/pages/testproject/testmodule/Tree/"
import SuiteTable from "views/category2/pages/testproject/testmodule/SuiteTable"
import ScriptTable from "views/category2/pages/testproject/testmodule/ScriptTable"
export default {
    props:["componentTree"],
    components:{
        SuiteTable,
        ScriptTable,
        Tree
    },
    data() {
        return {
            data: [
            ],
            defaultProps: {
                children: 'subList',
                label: 'dirname'
            },
            suiteData:[],
            scriptData:[],
            Visible: ''
        }
    },
    watch:{
        componentTree:function (val, oldVal) {
            this.showProjectTree()
        }
    },
    methods: {
        showProjectTree(){
            var that = this
            that.data = that.componentTree
        },

        handleNodeClick(data) {
            console.log(data);
            var that = this
            if(data.dirname === "Suite"){
                that.suiteData = data.subList
                that.Visible = "suite"
                console.log("suiteData",that.suiteData)
            }else if(data.dirname === "Script"|| data.hasOwnProperty("suite_name")){
                that.scriptData = data.subList
                that.Visible = "script"
                console.log("scriptData",that.scriptData)
            }
        },

        handleNodeClose(){
            var that = this
            that.Visible = ''
        }
    },
    mounted(){
        this.showProjectTree()
    }
  }
    
</script>

<style scoped>
    .el-aside {
        background-color:rgb(206, 206, 206);
        color: #333;
        text-align: center;
        height: 645px;
        border-right: 2px solid rgb(238, 238, 238);
    }
    .el-tree{
        background-color: rgb(206, 206, 206);
        color:#333
    }
    .el-tree-node__content:hover {
        background-color: #66b1ff87;
    }


</style>