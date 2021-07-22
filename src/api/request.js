import axios from 'axios'

export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  //请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    //打印错误信息
  })

  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    //打印错误信息
  })

  //进行网络请求 并将结果返回出去
  return instance(config)
}