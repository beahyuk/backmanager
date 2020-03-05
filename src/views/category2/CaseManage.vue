<template>
<el-card class="box-card">
  <!-- 1.上面的导航部分  -->
  <Navitable @suitelist="suiteList" ></Navitable>
  <!-- 2.中间的button -->
  <Button :CaseSelected="caseSelected" :SuiteSelected="suiteSelected"></Button>
  <!-- 3.下面的table类型 -->
  <Table :SuiteData="suiteData" @suiteselected="suiteSelect" @caseselected="caseSelect"></Table>
</el-card>
</template>

<script>
import Navitable from 'views/category2/pages/casemanage/Navitable'
import Table from 'views/category2/pages/casemanage/Table'
import Button from 'views/category2/pages/casemanage/Button'
export default {
    name: "CaseManage",
    components: {
        Navitable,
        Table,
        Button
    },
    data() {
        return {
        suiteData: [],
        suiteSelected: [],
        caseSelected:[],
        }
    },
    
    methods:{
        suiteList(res){
            var that = this
            that.suiteData = res
            console.log(that.suiteData)
        },
        initSuiteData(){
            var that = this
            let param = new URLSearchParams()
            this.$axios.get(this.host + '/test/testproject/suite/querypagelist',{
                                                        params:param
                                                        })
            .then(function(response){
                var res = response.data
                if(res.success){
                    that.suiteData = res.suitelist
                }
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },
        suiteSelect(val){
            var that = this
            that.suiteSelected = val
            console.log("convey_suite", val)
        },
        caseSelect(val){
            var that = this
            that.caseSelected = val
            console.log("convey_case", val)
        }
    },
    
    mounted(){
        this.initSuiteData()
    }
}
</script>

<style scoped>
.box-card {
  height: 100%;
}
</style>
