<template>
  <div class="login-wrap">
    <el-form  class="login-form" label-position="top"  label-width="80px"  :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button class="login-btn" @click='clickbtn' type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import {getLoginMsg} from "../../network/loginMsg";

export default {
  name:'Login',
  data(){
    return{
      formdata:{
        username: '',
        password: '',
      }
    }
  },
  methods:{
    clickbtn(){
      //得到登录信息的数据返回
      // getLoginMsg().then(res =>{
      //   把下面的判断放到这边
      // })

      //写死数据的测试登录
      var res = getLoginMsg()
      if (res.username === this.formdata.username & res.password === this.formdata.password){
        this.$message.success(res.msg1);
      }
      else if(this.formdata.username === '' | this.formdata.password === ''){
        this.$message.warning(res.msg3);
      }
      else{
        this.$message.error(res.msg2);
      }
    }
  }
}
</script>

<style>
    .login-wrap {
        background-color:#324152;
        height: 100%;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .login-wrap .login-form {
        background-color: #fff;
        width: 400px;
        padding: 30px;
        border-radius: 5px;
    }
    .login-wrap .login-btn {
        width: 100%;
    }
</style>