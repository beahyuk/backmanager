import {request} from './request'

export function getLoginMsg(info) {
  //得到登录的url
  // return request ({
  //   url:''
  // })
 
  //测试，写死数据
  return {
    username : 'admin',
    password : '123456',
    msg1:'登录成功',
    msg2:'账户/密码输入错误',
    msg3:'账户/密码不能为空',
  } 
}