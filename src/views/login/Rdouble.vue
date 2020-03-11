<template>
<div id='login'>
  <div id="bgd">
    <canvas id="myCanvas" :width="width" :height="height"></canvas>
  </div>
  <div id="registerBox">
    <h3>注册</h3>
<!-- <div class="login-wrap"> -->
  <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
    <h2>用户注册</h2>
    <el-form-item label="用户名">
      <el-input v-model="formdata.user_name"></el-input>
    </el-form-item>
    <el-form-item label="邮箱/手机号">
      <el-input v-model="formdata.user_account"></el-input>
    </el-form-item>
    <el-form-item label="输入密码">
      <el-input v-model="formdata.password" show-password></el-input>
    </el-form-item>
    <el-form-item label="验证密码">
      <el-input v-model="formdata.repassword" show-password></el-input>
    </el-form-item>
    <el-button class="login-btn" @click='regClick' type="primary">注册</el-button>
    <el-button class="register-btn" @click="cancelClick">取消</el-button>
    <ul class="link"><router-link to="/login" class="nav-link">用户登录</router-link></ul>
  </el-form>
  
</div>
</div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      formdata: {
        user_account: '',
        user_name: '',
        user_phone: '',
        user_mail: '',
        password: '',
        repassword: ""
      }
    }
  },
  methods: {
    regClick() {
        if(this.formdata.user_account===''){
            this.$message.warning("邮箱/手机号不能为空！")
            this.cancelClick()
        }else{
            if(this.formdata.user_account.includes("@")){
                this.formdata.user_mail = this.formdata.user_account
            }else{
                this.formdata.user_phone = this.formdata.user_account
            }
            if(this.formdata.password===this.formdata.repassword){
                console.log(this.formdata)
                this.submitForm()
            }else{
                this.$message.warning("两次密码不相同，请重新输入！")
                this.cancelClick()
            }
        }
    },
    submitForm(){
        var that = this;
        // console.log("前端数据"+this.formdata)
        let param = new URLSearchParams()
        param.append('user_name', that.formdata.user_name)
        param.append('user_mail', that.formdata.user_mail)
        param.append('user_password', that.formdata.password)
        param.append('user_phone',that.formdata.user_phone)
        this.$axios.post(this.host + '/user/register',param)
         .then(function(response){
          console.log(response.data)
          if(response.data.success){
              that.$message.success("注册成功！")
              that.$router.push("/login")
          }else {
              that.$message.warning("注册失败,"+response.data.msg)
              that.cancelClick()
          }
        }) .catch(function (error) { // 请求失败处理
        console.log(error);
      });
    },
    cancelClick(){
        let that = this
        that.reload()
    },
  }
}
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
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
  width: 40%;
  margin: 0 20px 0 10px
}

.login-wrap .register-btn {
  width: 40%;
  margin: 0 10px 0 20px
}

.login-wrap .demo-input-suffix {
  margin: 15px;
}
.link{
    margin: 20 0px 0 20px;
    width: 80px;
    margin:0px auto;
}
.nav-link{
    color: rgb(88, 89, 94)
}
</style>
