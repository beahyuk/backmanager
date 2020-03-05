<template>
<el-tabs v-model="activeName" type="card" @tab-click="handleClick" stretch >
  <el-tab-pane label="自定义关键字" name="first" >
    <el-button class="button" @click="addGlobal">
      添加全局关键字
    </el-button>
    <ExternalTable :tableData='externalKeyword'></ExternalTable>
  </el-tab-pane>
  <el-tab-pane label="内置关键字" name="second">
      <BuildInTable :tableData='buildInKeyword'></BuildInTable>
  </el-tab-pane>

</el-tabs>
</template>

<script>

import BuildInTable from "views/category2/pages/keywords/BuildInTable";
import ExternalTable from "views/category2/pages/keywords/ExternalTable";
export default {
    components: {
        BuildInTable,
        ExternalTable
    },
    data() {
        return {
        activeName: 'first',
        buildInKeyword: [],
        externalKeyword: []
        };
    },
    methods:{
        queryBuildInKeyword(){
            var that = this
            let param = new URLSearchParams()
            this.$axios.get(this.host + '/test/buildinkeyword/querypagelist',{
                                                        params:param
                                                        })
            .then(response=>{
                var res = response.data
                if(res.success){
                    console.log("res", res)
                    that.buildInKeyword = res.buildInKeywordInfo
                }
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },

        queryGlobalKeyword(){
            var that = this
            let param = new URLSearchParams()
            param.append("section_id", JSON.parse(localStorage.getItem('userInfo')).section_id)
            this.$axios.get(this.host + '/test/externalkeyword/querypagelist',{
                                                        params:param
                                                        })
            .then(response=>{
                var res = response.data
                if(res.success){
                    that.externalKeyword = res.keywordList
                    console.log("globalres", that.externalKeyword)
                }
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },
        handleClick(){

        },
        addGlobal(){
            this.$router.push({name: "globalfunc"})
        }
    },
    mounted(){
        this.queryBuildInKeyword()
        this.queryGlobalKeyword()
    }
}
</script>

<style>
.button{
  margin: 5px;
}
</style>
