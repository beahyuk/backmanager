<template>
    <el-form ref="form" :model="form" :inline="true" label-width="80px" >
    <el-row>
        <el-col :span="8" ><el-form-item label="项目名称">
            <el-input v-model="form.projectname" style="width: 200px;"></el-input>
        </el-form-item></el-col>
        <el-col :span="8" ><el-form-item label="部门名称">
            <el-input v-model="form.sectionname" style="width: 200px;"></el-input>
        </el-form-item></el-col>
        <el-col :span="8" ><el-form-item >
            <el-button type="primary" plain size="medium" @click='search'>搜索</el-button>
            <el-button type="primary" plain size="medium" @click='reset'>重置</el-button>
        </el-form-item></el-col>
    </el-row>
  </el-form>
  
</template>

<script>
export default {
    inject: ['reload'],
    data(){
        return{
            form: {
                projectname: '',
                sectionname: '',
            }
        }
    },
    methods:{
        search(){
            var that = this;
            let param = new URLSearchParams()
            param.append('project_name', that.form.projectname)
            param.append('section_name', that.form.sectionname)
            this.$axios.get(this.host + '/project/querypagelist',{
                                                        params:param
                                                        })
            .then(function(response){
                var res = response.data
                that.$emit('searchresult', res.projectInfoList)
            }) 
            .catch(function (error) { // 请求失败处理
                console.log(error);
            });
        },
        reset(){
            let that = this
            that.reload()
        }
    }
    
}
</script>

<style scoped>

</style>