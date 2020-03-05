<template>
<div class="login-wrap">
  <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
    <h2>用户登录</h2>
    <el-form-item label="用户名">
      <el-input v-model="formdata.useraccount"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formdata.password" show-password @keyup.enter.native="clickbtn"></el-input>
    </el-form-item>
    <el-button class="login-btn" @click='clickbtn' type="primary">登录</el-button>
    <el-button class="register-btn" @click="regClick">注册</el-button>
  </el-form>

</div>
</template>

<script>
import {
  getLoginMsg
} from "../../network/loginMsg";

export default {
  name: 'Login',
  inject: ['reload'],
  data() {
    return {
      formdata: {
        useraccount: '',
        userphone: '',
        usermail: '',
        password: '',
      },
    }
  },
  methods: {
    clickbtn() {
      //得到登录信息的数据返回
      // getLoginMsg().then(res =>{
      //   把下面的判断放到这边
      // })

      //写死数据的测试登录
        
        if(this.formdata.useraccount === '' | this.formdata.password === ''){
            this.$message.warning("用户名和密码不能为空！")
            this.cancelClick
        }else{
            if(this.formdata.useraccount.includes("@")){
                this.formdata.usermail = this.formdata.useraccount
            }else{
                this.formdata.userphone = this.formdata.useraccount
            }
            this.submitForm()
        }
    },
    submitForm(){
        var that = this;
        let param = new URLSearchParams()
        param.append('user_phone', that.formdata.userphone)
        param.append('user_mail', that.formdata.usermail)
        param.append('user_password', that.formdata.password)
        this.$axios.get(this.host + '/user/login',{
                                                    params:param
                                                    })
          .then(function(response){
          var res = response.data
          console.log("data", res)
          if(res.success){
              console.log(res)
              that.$message.success("登录成功！")
              that.formdata["user_id"] = res.user_id
              that.$router.push({ path: "/home", 
                                  query:that.formdata
                                })
              localStorage.setItem("userInfo",JSON.stringify(res))
          }else {
              that.$message.error("登录失败,"+res.msg)
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

    regClick() {
      this.$router.push("/register")
    },

    // get(){
    //     axios
    //   .get('http://:8080/user/get?user_id=')
    //   .then(response => (this.info = response.data.sites))
    //   .catch(function (error) { // 请求失败处理
    //     console.log(error);
    //   });
    // }



  },
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
</style>
