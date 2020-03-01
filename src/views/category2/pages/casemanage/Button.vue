<template>
  <div>
  <el-button @click="createNew" size="small">新建case</el-button>
  <el-button @click="multiAction" size="small">批量执行</el-button>
  <el-button @click="multiDelete" size="small">批量删除</el-button>
  </div>
</template>

<script>
export default {
    // watch: {
    //         caseList: function(newdate, olddate) {
    //             sessionStorage.setItem('runCaseList', JSON.stringify(this.caseList))
    //             console.log("!!!!",sessionStorage.getItem('runCaseList'))
    //             this.resetSetItem('watchStorage', JSON.stringify(this.caseList))
    //         },
    //         completedList: function(newdate, olddate) {
    //             sessionStorage.setItem('completedList', JSON.stringify(this.completedList))
    //             console.log("@@@@",sessionStorage.getItem('completedList'))
    //             this.resetSetItem('watchStorage1', JSON.stringify(this.completedList))
    //         }
    //     },
    name : "Button",
    props:["CaseSelected", "SuiteSelected"],
    data(){
        return{
            taskList:[],
            caseList:[],
            completedList:[]
        }
    },
    methods:{
        createNew(){
            console.log('createNew')
        },
        multiAction(){
            // console.log('multiAction', this.CaseSelected, this.SuiteSelected)
            var that = this
            var taskItem = {}
            var startDate = new Date()
            taskItem["taskStartDate"] = startDate.getFullYear() + "-" +(startDate.getMonth()+1) + "-" + startDate.getDate() + " " + startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds();
            taskItem["completedList"] = []
            taskItem["suiteList"] = that.SuiteSelected
            that.taskList.push(taskItem)
            let param = new URLSearchParams()
            param.append("caseList", JSON.stringify(that.CaseSelected))
            param.append("suiteList", JSON.stringify(that.SuiteSelected))
            param.append("section_id", JSON.parse(localStorage.getItem('userInfo')).section_id)
            param.append("user_id", JSON.parse(localStorage.getItem('userInfo')).user_id)
            this.$axios.get(this.host + '/test/task/run',{
                                                        params:param
                                                        })
            .then(response=>{
                var res = response.data
                if(res.success){
                    // console.log("res", res)
                    taskItem["res"]="success"
                }else{
                    taskItem["res"]="fail"
                }
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
            that.getTaskList(taskItem)
            that.getResult(taskItem["taskStartDate"], taskItem)
        },

        getResult(date, taskItem){
            var that = this
            let param = new URLSearchParams()
            param.append("startDate", date)
            param.append("section_id", JSON.parse(localStorage.getItem('userInfo')).section_id)
            param.append("user_id", JSON.parse(localStorage.getItem('userInfo')).user_id)
            this.$axios.get(this.host + '/test/task/get',{
                                                        params:param
                                                        })
            .then(response=>{
                var res = response.data
                if(res.success){
                    if(res.hasOwnProperty("endDate")){
                        var newStartDate = res.endDate
                        taskItem["completedList"].push(res.completedList)
                        sessionStorage.setItem('taskList',JSON.stringify(that.taskList))
                        that.completedList = that.completedList.concat(res.completedList)
                        sessionStorage.setItem('completedList', JSON.stringify(that.completedList))
                        console.log("@@@@",sessionStorage.getItem('completedList'))
                    }
                    else{
                        var newStartDate = date
                    }
                    // console.log("taskItem", taskItem)
                    if(!taskItem.hasOwnProperty("res")){
                        setTimeout(()=>{
                            var d = new Date()
                            that.getResult(newStartDate, taskItem)
                        }, 2300)
                    }
                    
                    console.log("res", res)
                }
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        }, 
        getTaskList(taskItem){
            var that = this
            let param = new URLSearchParams()
            param.append("caseList", JSON.stringify(that.CaseSelected))
            param.append("suiteList", JSON.stringify(that.SuiteSelected))
            this.$axios.get(this.host + '/test/task/getlist',{
                                                        params:param
                                                        })
            .then(response=>{
                var res = response.data
                taskItem["caseList"] = res.taskCaseList
                sessionStorage.setItem('taskList',JSON.stringify(that.taskList))
                that.caseList = that.caseList.concat(res.runCaseList)
                sessionStorage.setItem('runCaseList', JSON.stringify(this.caseList))
                console.log("!!!!",sessionStorage.getItem('runCaseList'))
                sessionStorage.setItem('completedList', JSON.stringify(that.completedList))
                console.log("¥¥¥¥¥",sessionStorage.getItem('completedList'))
                // console.log("case**List", that.caseList)
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },

        multiDelete(){
            console.log('multiDelete')
        },
    }
}
</script>

<style>

</style>