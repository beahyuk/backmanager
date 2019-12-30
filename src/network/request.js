import axios from 'axios'

//发起网络请求
export function request(config) {
  const instance = axios.create({
    baseURL:'',
    timeout:5000
  })
//拦截器
  instance.interceptors.request.use(config => {
    return config
  })
//响应拦截 
  instance.interceptors.response.use(res => {
    return res.data
  })

  return instance(config)
}