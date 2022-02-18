import axios from "axios";
import { MessageBox, Message } from "element-ui";

import { getToken } from "@/utils/auth";
import store from "@/store"

const service = axios.create({ // 创建一个axios实例，可以自定义配置
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000//
})
//拦截请求，在请求头中根据自己的需求加相应的配置，如token，
service.interceptors.request.use(
  config => {
    //获取token加到请求头上
    if(getToken()) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.code !== 0) {
      Message({
        message: res.msg || '请求出错',
        type: 'error',
        duration: 5 * 1000
      })
      if(res.code === -2) {
        MessageBox.confirm('token失效，请重新登陆',{
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }else {
      return res
    }
  },
  error => {
    let message = error.message || '请求失败'
    if (error.response && error.response.data) {
      const {data} = error.response
      message = data.msg
    }
    Message({
      message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service