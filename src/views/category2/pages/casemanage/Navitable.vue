<template>
<<<<<<< HEAD
<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
  <!-- 头部标题1 -->
  <el-tab-pane label="按suite管理" name="first">
    <!-- 筛选条件部分 -->
    <el-dropdown v-for="item in chooseData" :key="item.name" class="dropdown" trigger="click">
      <el-button class="button">
        <span class="text"> {{item.name}} </span>
        <i class="el-icon-arrow-down" style="float:right;margin:0;
  width:30%;"></i>

      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in item.choice" :key="item">{{item}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </el-tab-pane>
  <!-- 头部标题2 -->
  <el-tab-pane label="按Tag管理" name="second">配置管理</el-tab-pane>
</el-tabs>
=======
    <el-form ref="form" :model="form" :inline="true" label-width="100px" >
    <el-form-item v-for="it in labels" :key="it.name"  :label="it.name" >
        <el-select v-model="it.value" size="medium" multiple filterable allow-create @focus="handleFocus(it)" @blur="handleBlur" @change="handleChange(it)" placeholder="请选择">
            <el-option v-for="item in it.options" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-row  class="search-row">
            <el-row :gutter="10" >
                <el-col :span="10" :push="10">
                <el-button type="primary" plain size="medium" @click='search'>搜索</el-button>
                </el-col>
                <el-col :span="10" :push="12">
                <el-button type="primary" plain size="medium" @click='reset'>重置</el-button>
                </el-col>
            </el-row>
        </el-row>
    </el-form-item>
  </el-form>
>>>>>>> aea649f2a6e73252a2f535e5373efe66575895b7
</template>

<script>
export default {
<<<<<<< HEAD
  data() {
    return {
      activeName: 'first',
      chooseData: [{
          name: "部门",
          choice: ["部门一", "部门二", "部门三", "部门四", ],
        },
        {
          name: "项目",
          choice: ["项目一", "项目二", "项目三", "项目四", ],
        },

        {
          name: "版本",
          choice: ["版本V1", "版本V2", "版本V3", "版本V4", ],
        },

        {
          name: "测试项目",
          choice: ["名称一", "名称二", "名称三", "名称四", ],
        },

        {
          name: "模块",
          choice: ["模块一", "模块二", "模块三", "模块四", ],
        },

      ],

    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
=======
    data() {
        return {
            form: {
            } ,
            labels:[
                {
                    name:"部门",
                    options:[],
                    value:''
                }, 
                {
                    name:"项目",
                    options:[],
                    value:''
                },
                {
                    name: "版本",
                    options:[],
                    value:''
                },
                {
                    name: "测试项目",
                    options:[],
                    value:''
                },
                {
                    name: "模块",
                    options:[],
                    value:''
                }],
            dataReturn:[],
            dataChange:{}
        }
    },
    methods: {
        async handleFocus(data){
            var that = this
            if(data.name === "部门"){
                var url = '/section/queryleafsection'
                await new Promise((resolve) => { 
                    that.getHttpRequest(url).then(function(){
                        data.options = JSON.parse(JSON.stringify(that.dataReturn.sectionList).replace(/section_name/g, 'name'))
                })
                })
            }
            if(data.name === "项目"){
                var url = '/project/querypagelist'
                await new Promise((resolve) => { 
                    that.getHttpRequest(url).then(function(){
                        data.options = JSON.parse(JSON.stringify(that.dataReturn.projectInfoList).replace(/project_name/g, 'name'))
                })
                })
            }
            if(data.name === "版本"){
                var url = '/project/version/querylist'
                if(that.dataChange["项目"] == undefined || that.dataChange["项目"].length==0){
                    data.options = []
                }
                var projectName = that.dataChange["项目"]
                var param = {
                    key: "project_name",
                    value: projectName
                }
                await new Promise((resolve) => { 
                    that.getHttpRequest(url, param)
                    .then(function(){
                        if(that.dataReturn.hasOwnProperty("versionInfoList")){
                            var verList = that.dataReturn.versionInfoList
                            data.options = JSON.parse(JSON.stringify(verList).replace(/version_number/g, 'name'))
                        }else{
                            data.options = []
                        }
                    })
                })
            }
            if(data.name === "测试项目"){
                var url = '/test/testproject/querylist'
                await new Promise((resolve) => { 
                    that.getHttpRequest(url).then(function(){
                        data.options = JSON.parse(JSON.stringify(that.dataReturn.testProjectInfo).replace(/testproject_name/g, 'name'))
                        console.log("*****", data.options)
                })
                })
            }
            if(data.name === "模块"){
                var url = '/test/testproject/module/querylist'
                if(that.dataChange["测试项目"] == undefined || that.dataChange["测试项目"].length==0){
                    data.options = []
                }
                var testprojectName = that.dataChange["测试项目"]
                var param = {
                    key: "testproject_name",
                    value: testprojectName
                }
                await new Promise((resolve) => { 
                    that.getHttpRequest(url, param)
                    .then(function(){
                        if(that.dataReturn.hasOwnProperty("moduleInfoList")){
                            var moduleList = that.dataReturn.moduleInfoList
                            data.options = JSON.parse(JSON.stringify(moduleList).replace(/testmodule_name/g, 'name'))
                        }else{
                            data.options = []
                        }
                    })
                })
            }
        },
        async search(){
            console.log(this.dataChange)
            var that = this
            var param = {
                    key: "dataChange",
                    value: JSON.stringify(that.dataChange) 
                }
            
            var url = '/test/testproject/suite/querylist'
                await new Promise((resolve) => { 
                    that.getHttpRequest(url, param).then(function(){
                        console.log('dataReturn', that.dataReturn)
                        that.$emit("suitelist",that.dataReturn.suiteList)
                })
                })
        },
        reset(){

        },
        // 异步请求
        async getHttpRequest(url, par=''){
            var that = this;
                let param = new URLSearchParams()
                if(par != ''){
                    param.append(par.key, par.value)
                }
                await this.$axios.get(this.host + url,{ params: param })
                .then(function(response){
                    var res = response.data
                    that.dataReturn = res
                    console.log("params",par.value)
                }) .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
        },
        handleChange(data){
            var that = this
            that.dataChange[data.name] = data.value
            console.log("change",that.dataChange)
        },
        handleBlur(){
            var that = this
            that.options = []
        },
        
    },
    mounted(){
    }
>>>>>>> aea649f2a6e73252a2f535e5373efe66575895b7
}
</script>

<style>
<<<<<<< HEAD
.dropdown {
  display: flex;
  flex-direction: column;
  width: 10%;
  margin: 5px;
}

.text {
  text-align: start;
  width: 60%;
  margin:0;
  padding: 0;
}
.button{
  padding:15px 5px 15px 4px;
  text-align: start;
}
=======

>>>>>>> aea649f2a6e73252a2f535e5373efe66575895b7
</style>
