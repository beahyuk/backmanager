<template>
<el-table class="table" ref="filterTable" height="400" 
 style="width: 100%" :data="tableData" row-key="id" 
 >
  <!-- 表头名 -->
  <el-table-column prop="case_name" label="名称" width="400">
  </el-table-column>
  <el-table-column prop="result" label="状态" width="400">
  </el-table-column>
</el-table>
</template>

<script>
export default {

    name: "Table",
    data(){
        return{
            tableData:[],
            taskCaseList: [],
            runCaseList: [],
            completedList: []
        }
    },
    methods:{
        getTableData(){
            var that = this
           
            that.runCaseList = JSON.parse(sessionStorage.getItem('runCaseList'))
            console.log("%%%%%", that.runCaseList)
            that.completedList = JSON.parse(sessionStorage.getItem('completedList'))
            console.log("######",that.completedList)
            for(var index=0; index<that.runCaseList.length; index++){
                if(that.completedList.length>index){
                    that.runCaseList[index]["result"] = that.completedList[index]["case_result"]
                }else{
                    that.runCaseList[index]["result"] = "未执行"
                }
            }
            that.tableData = that.runCaseList
            console.log("that.runCaseList.length", that.runCaseList.length)
            console.log("that.completedList.length", that.completedList.length)
            if(that.runCaseList.length > that.completedList.length){
                setTimeout(()=>{
                    that.getTableData()
                }, 5000)
            }
        }
    },
    mounted(){
        this.getTableData()
    },
    created () {
        // var that = this
        // window.addEventListener('setItem', ()=> {
        // this.newVal = sessionStorage.getItem('watchStorage')

        // that.taskCaseList = that.taskCaseList.concat(JSON.parse(this.newVal))
        // sessionStorage.setItem("taskCaseList",JSON.stringify(that.taskCaseList))
        // console.log("&&&this.newVal", this.newVal)
        // console.log("&&&this.tableData", that.taskCaseList)
        // console.log("&&&this.getItem", JSON.parse(sessionStorage.getItem('completedList')))
        // }),
        // window.addEventListener('setItem', ()=> {
        // this.newVal = sessionStorage.getItem('watchStorage1')
        // that.completedList = that.completedList.concat(JSON.parse(this.newVal))
        // sessionStorage.setItem("completedList",JSON.stringify(that.completedList))
        // console.log("$$$$this.newVal", this.newVal)
        // console.log("$$$$this.tableData", that.completedList)
        // })
    },
}
</script>

<style>
.table {
  height: 100%
}
</style>
