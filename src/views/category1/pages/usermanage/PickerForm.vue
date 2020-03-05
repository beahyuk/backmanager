<template>
  <el-form ref="form" :model="form" :inline="true" label-width="80px" >
    <el-row>
    <el-form-item label="用户名">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="部门">
        <el-input v-model="form.section"></el-input>
    </el-form-item>
    <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
        <el-input v-model="form.mail"></el-input>
    </el-form-item>
    </el-row>
    <el-row type="flex" justify="end" align="top" class="search-row">
        <el-col :span="5" ><el-form-item >
            <el-button type="primary" plain size="medium" @click='search'>搜索</el-button>
            <el-button type="primary" plain size="medium" @click='reset'>重置</el-button>
        </el-form-item></el-col>
    </el-row>
  </el-form>
  
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        form:{
            name: '',
            section: '',
            phone: '',
            mail: '',
        }
      }
    },
    methods:{
        search(){
            var that = this;
            let param = new URLSearchParams()
            param.append('user_phone', that.form.phone)
            param.append('user_mail', that.form.mail)
            param.append('user_name', that.form.name)
            param.append('section_name', that.form.section)
            this.$axios.get(this.host + '/user/querypagelist',{
                                                        params:param
                                                        })
            .then(function(response){
                var res = response.data
                that.$emit('pickerform', res)
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
    .el-form-item{
        size: inherit
    }
</style>