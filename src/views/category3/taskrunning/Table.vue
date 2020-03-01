<template>
<el-table class="table" ref="filterTable" height="400" style="width: 100%" 
    :data="tableData">

    <!-- 表头名 -->

    <el-table-column prop="case_name" label="任务" width="180">
    </el-table-column>
    <el-table-column prop="user_name" label="执行人" width="160">
    </el-table-column>
    <el-table-column prop="startDate" label="开始时间" width="220">
    </el-table-column>
    <el-table-column prop="endDate" label="结束时间" width="220">
    </el-table-column>
    <el-table-column prop="result" label="任务状态" width="150">
    </el-table-column>
    <el-table-column prop="pass_count" label="Pass" width="100">
    </el-table-column>
    <el-table-column prop="fail_count" label="Fail" width="100">
    </el-table-column>
</el-table>
</template>

<script>
export default {
    data(){
        return{
            tableData: [],
            runCaseList: [],
            completedList: []
        }
    },
    methods:{
        getTableData(){
            var that = this
            // console.log(JSON.parse(sessionStorage.getItem('taskList')))
            that.runCaseList = JSON.parse(sessionStorage.getItem('runCaseList'))
            console.log("%%%%%", that.runCaseList)
            that.completedList = JSON.parse(sessionStorage.getItem('completedList'))
            console.log("######",that.completedList)
            for(var index=0; index<that.runCaseList.length; index++){
                if(that.completedList.length>index){
                    that.runCaseList[index]["result"] = that.completedList[index]["case_result"]
                    that.runCaseList[index]["startDate"] = that.completedList[index]["case_start_date"]
                    that.runCaseList[index]["endDate"] = that.completedList[index]["case_end_date"]
                    if(that.runCaseList[index]["result"]==="PASS"){
                        that.runCaseList[index]["pass_count"]+=1
                    }else{
                        that.runCaseList[index]["fail_count"]+=1
                    }
                }else{
                    that.runCaseList[index]["result"] = "未执行"
                    that.runCaseList[index]["startDate"] = "--"
                    that.runCaseList[index]["endDate"] = "--"
                }
                that.runCaseList[index]["user_name"] = JSON.parse(localStorage.getItem('userInfo')).user_name
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
        
    }
}
</script>

<style>

</style>
